const router = require('express').Router();
const client = require("./../postgre/client");

client.connect();

router.get("/conditioned-apartment", async (req,res)=>{
    // the plan is simple
    // using req.query, we get a dictionary of all queries passed onto the selection
    // based on that query set, we all create a request string that will be used inside the postgres client
    // and the output will be passed directly into the user as json

    let request_string = "SELECT * FROM apartments";
    let is_first_condition = true;

    const check_condition = (condition_name, is_number = false, comparison_sign = "=", query_name = undefined) => {
        if (query_name === undefined) query_name = condition_name;
        if (req.query[condition_name]) {
            let value = undefined;
            if (is_number) {
                value = String(req.query[condition_name]);
            } else {
                value = `'${req.query[condition_name]}'`
            }

            request_string = request_string.concat(` ${is_first_condition ? "WHERE" : "AND"} ${query_name} ${comparison_sign} ${value}`);
            is_first_condition = false;
        }
    }

    if (req.query["id"]) { // having the id means not needing anything else
        request_string = request_string.concat(` hotel_id='${req.query["id"]}'`);
        res.send((await client.query(request_string)).rows);
        console.log(request_string);
        return;
    }

    check_condition("title", false, "=");

    check_condition("min-rate", true, ">", "rate");
    check_condition("rate", true, "=",);

    check_condition("min-guests", true, ">", "guests");
    check_condition("guests", true, "=");

    check_condition("min-bedroom", true, ">", "bedroom");
    check_condition("bedroom", true, "=");

    check_condition("min-bathroom", true, ">", "bathroom");
    check_condition("bathroom", true, "=");

    check_condition("type", true, "=");

    check_condition("geo", false, "=");

    check_condition("location", false, "=");
    
    check_condition("free_cancellation", true, "=");

    check_condition("instant_book", true, "=");

    check_condition("min-price", true, ">", "price");
    check_condition("max-price", true, "<", "price");
    check_condition("price", true, "=");

    // adding order
    if (req.query["order"]) {
        request_string = request_string.concat(` ORDER BY ${req.query["order"]}`);

        // being descending
        if (req.query["desc"] && req.query["desc"] === '1') {
            request_string = request_string.concat(" DESC");
            console.log(request_string);
        }
    }

    // limited selection
    if (req.query["limit"]) {
        request_string = request_string.concat(` LIMIT ${req.query["limit"]}`);

        // offset selection
        if (req.query["offset"]) {
            request_string = request_string.concat(` OFFSET ${req.query["offset"]}`);
        }
    }

    try {
        res.send((await client.query(request_string)).rows);
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;