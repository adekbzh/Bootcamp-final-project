const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL || "postgres:postgres:postgres@localhost:5432/join"
);
// module.exports.getDepartures = function ()

module.exports.getCity = function (city) {
    let q = `SELECT * FROM cities WHERE city ILIKE $1`;
    let params = [city];
    return db.query(q, params);
};
