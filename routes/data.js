const router = require('express').Router();
const client = require("./../postgre/client"); // importing the client of the database

client.connect(); // connecting to the database

// [GET] /data/conditioned-apartment/...
router.get("/conditioned-apartment", async (req,res)=>{
    // the plan is simple
    // using req.query, we get a dictionary of all queries passed onto the selection
    // based on that query set, we all create a request string that will be used inside the postgres client
    // and the output will be passed directly into the user as json

    let request_string = "SELECT * FROM apartments";
    let is_first_condition = true; // used add AND between conditions

    // the main function used to handle conditions being concatinated to the request_string
    const check_condition = (condition_name, is_number = false, comparison_sign = "=") => {
        if (req.query[condition_name]) { // if you are using the query
            let value = undefined;
            if (is_number) { // checking wether the the query is number or not to add ''
                value = String(req.query[condition_name]);
            } else {
                value = `'${req.query[condition_name]}'`
            }

            let query_name = condition_name; // this is used to check wether we need to remove the prefixes
            if (comparison_sign !== "=") { // the sign being in comparison
                query_name = query_name.replace("min-","").replace("max-","");
            }

            request_string = request_string.concat(` ${is_first_condition ? "WHERE" : "AND"} ${query_name} ${comparison_sign} ${value}`);
            is_first_condition = false;
        }
    }

    // list of all the accessible conditions

    check_condition("title", false, "=");

    check_condition("min-rate", true, ">");
    check_condition("rate", true, "=",);

    check_condition("min-guests", true, ">");
    check_condition("guests", true, "=");

    check_condition("min-bedroom", true, ">");
    check_condition("bedroom", true, "=");

    check_condition("min-bathroom", true, ">");
    check_condition("bathroom", true, "=");

    check_condition("type", true, "=");

    check_condition("geo", false, "=");

    check_condition("lat", true, "=");
    check_condition("lng", true, "=");
    
    check_condition("free_cancellation", true, "=");

    check_condition("instant_book", true, "=");

    check_condition("min-price", true, ">");
    check_condition("max-price", true, "<");
    check_condition("price", true, "=");

    // the use of an index variable allows you to make complicated logic for order
    // you can give orders as followed: ?order-0=price&order-1=bathroom
    // NOTE: if you miss an index, EX: ?order-0=...&order-2=...
    // from the index you missed, the rest will be ignored
    // in the above example, order-2 is ignored cause there exists no order-1
    let order_index = 0;
    while (true) { // ORDER BY s.t (DESC), s.t (DESC) ...
        if (req.query[`order-${order_index}`]) {
            if (order_index === 0) { // first order item
                request_string = request_string.concat(` ORDER BY ${req.query[`order-${order_index}`]}`);
            } else {
                request_string = request_string.concat(` , ${req.query[`order-${order_index}`]}`);
            }

            if (req.query[`desc-${order_index}`] === "1") {
                request_string = request_string.concat(" DESC");
            }

            order_index++;
            continue;
        }

        break;
    }

    // limited selection
    // lets you select a limited number of items from the list
    // EX: ?limit=5
    if (req.query["limit"]) {
        request_string = request_string.concat(` LIMIT ${req.query["limit"]}`);

        // offset selection
        // lets you choose which page of items you would like to see if they were limited
        // EX: ?offset=1
        if (req.query["offset"]) {
            request_string = request_string.concat(` OFFSET ${req.query["offset"]}`);
        }
    }

    try { // checking if the request process went well
        res.send((await client.query(request_string)).rows);
    } catch (e) { // returning the error incase there happens to be any
        res.send(e);
    }
});

// [GET] /data/house-by-id/{id}
router.get("/house-by-id/:id", async (req,res)=>{
    const id = req.params.id;
    const request_string = `SELECT * FROM apartments WHERE hotel_id='${id}'`;
    const hotel = (await client.query(request_string)).rows[0]; // requesting the hotel from database

    res.send(hotel);
});

module.exports = router; // exporting all the above to be used inside index.js