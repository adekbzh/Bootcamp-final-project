DROP TABLE IF EXISTS cities;

CREATE TABLE cities(
    id SERIAL PRIMARY KEY,
    image_url VARCHAR NOT NULL,
    city VARCHAR NOT NULL     
);

INSERT INTO cities (image_url, city) VALUES (
    'https://pixabay.com/videos/download/video-28489_medium.mp4',
    'venice'
);

INSERT INTO cities (image_url, city) VALUES (
    'https://youtu.be/3qlYPwvWwsI',
    'rennes'
);

