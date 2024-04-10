PGDMP              
        |            Hotel    16.0    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16396    Hotel    DATABASE     �   CREATE DATABASE "Hotel" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "Hotel";
                postgres    false            �            1259    16397 
   apartments    TABLE     �  CREATE TABLE public.apartments (
    hotel_id text NOT NULL,
    title text NOT NULL,
    rate integer DEFAULT 0 NOT NULL,
    guests integer DEFAULT 0 NOT NULL,
    bedroom integer DEFAULT 0 NOT NULL,
    bathroom integer DEFAULT 0 NOT NULL,
    type integer DEFAULT 0 NOT NULL,
    lat numeric,
    lng numeric,
    free_cancellation boolean DEFAULT false NOT NULL,
    instant_book boolean DEFAULT false NOT NULL,
    price numeric
);
    DROP TABLE public.apartments;
       public         heap    postgres    false            �          0    16397 
   apartments 
   TABLE DATA           �   COPY public.apartments (hotel_id, title, rate, guests, bedroom, bathroom, type, lat, lng, free_cancellation, instant_book, price) FROM stdin;
    public          postgres    false    215   �       !           2606    16410    apartments apartments_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.apartments
    ADD CONSTRAINT apartments_pkey PRIMARY KEY (hotel_id);
 D   ALTER TABLE ONLY public.apartments DROP CONSTRAINT apartments_pkey;
       public            postgres    false    215            �   �   x�%��j�0���S�,vWZ���"$R�Jc�tC�����#�|�~;3#�y��K?�%�@!�
��	,!x�"M���
!�F"��9OK�9�?��4�zBM��q����óx[�2�K��,��=P�3b��aP6IT"ռ+X����w����VZ"7���m2>q8j��4���rϒF��T�d��X�86����������r�UpMe�h�z1VE�.�L�u��2E�     