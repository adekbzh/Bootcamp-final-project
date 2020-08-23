DROP TABLE IF EXISTS cities;

CREATE TABLE cities(
    id SERIAL PRIMARY KEY,
    image_url VARCHAR NOT NULL,
    city VARCHAR NOT NULL     
);

INSERT INTO cities (image_url, city) VALUES (
    'https://vod-progressive.akamaized.net/exp=1598212531~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4010%2F14%2F370050313%2F1533901655.mp4~hmac=7e3e4c0b1830c178075f9877228a56351c87228eb5b41c34bac921d12cec5999/vimeo-prod-skyfire-std-us/01/4010/14/370050313/1533901655.mp4?filename=Venice+-+28489.mp4',
    'venice'
);

