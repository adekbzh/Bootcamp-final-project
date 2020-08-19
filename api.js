const axios = require("axios");
const fs = require("fs");
const { key } = require("./secrets");
const airportCode = [
    "LFRN",
    "LEMD",
    "LIPZ",
    "EVRA",
    "LFML",
    "LKPR",
    "EDDB",
    "EDDT",
];
airportCode.forEach((airport) => api(airport));
function api(airportCode) {
    axios({
        method: "GET",
        url: `https://aerodatabox.p.rapidapi.com/flights/airports/icao/${airportCode}/2020-08-26T12:00/2020-08-27T00:00`,
        headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
            "x-rapidapi-key": key,
            useQueryString: true,
        },
        params: {
            withLeg: "false",
            withCancelled: "false",
            withCodeshared: "false",
            withCargo: "false",
            withPrivate: "true",
            direction: "Departure",
        },
    })
        .then((response) => {
            console.log(
                response.data.departures.map(
                    (departure) => departure.movement.airport
                )
            );
            fs.writeFileSync(
                `${airportCode}.json`,
                JSON.stringify(
                    response.data.departures.map(
                        (departure) => departure.movement.airport
                    ),
                    null,
                    4
                )
            );
        })
        .catch((error) => {
            console.log(error);
        });
}
module.exports.api = api;
