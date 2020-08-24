const express = require("express");
const app = express();
// const { api } = require("./api.js");
const fs = require("fs");
const db = require("./db");
const hb = require("express-handlebars");
const cookieSession = require("cookie-session");
// const bc = require("./bc");
// const { compare } = require("./bc");
// const csurf = require("csurf");
// console.log("API !!!", api);

// const madrid = require("./public/data/LEMD.json");
// console.log("DATA FROM JSON", madrid);

app.use(express.static("public"));

app.engine("handlebars", hb());
app.set("view engine", "handlebars");

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(express.urlencoded({ extended: false }));

//////////// JOIN  APP \\\\\\\\\\\\
app.get("/", (req, res) => {
    res.redirect("/departures");
});

app.get("/departures", (req, res) => {
    res.render("home", {
        layout: "main",
    });
});

app.get("/login", (req, res) => {
    res.render("login", {
        layout: "main",
    });
});

app.post("/departures", (req, res) => {
    var allDestinations = [];

    for (var i = 0; i < 5; i++) {
        if (req.body["dep" + i]) {
            allDestinations.push(
                require(`./public/data/${req.body[
                    "dep" + i
                ].toLowerCase()}.json`).map((d) => d.name)
            );
        }
    }

    function intersection(deps) {
        return deps[0].filter((name) => {
            return deps.every((dep) => dep.includes(name));
        });
    }

    let matchingDestinations = Array.from(
        new Set(intersection(allDestinations))
    ).sort();

    res.render("destinations", {
        layout: "main",
        matchingDestinations,
    });
    // console.log(intersection(allDestinations));
    console.log(matchingDestinations);
    // console.log(intersection(allDestinations));
    // res.send(destinations);
});

app.get("/destinations", (req, res) => {
    res.render("destinations", {
        layout: "main",
    });
});

app.get("/destinations/:city", (req, res) => {
    let city = req.params.city;
    db.getCity(city).then((results) => {
        city_pic = results.rows[0].image_url;
        city_name = results.rows[0].city;
        console.log("city_pic", city_pic);
        // console.log("image url", results.rows[0].image_url);
        res.render("city", {
            layout: "main",
            city_pic,
            city_name,
        });
    });
});

app.get("/invitation", (req, res) => {
    res.render("invitation", {
        layout: "main",
    });
});

app.listen(8080, () => {
    console.log("Server is listening");
});
////////////  FIRST SHOT \\\\\\\\\\\\

//const dep = require(`./public/data/${dep1}.json`);
/* 
    //console.log("REQ.BODY", req.body);
    var dep1 = req.body.dep1.toLowerCase();
    var dep2 = req.body.dep2.toLowerCase();
    var dep3 = req.body.dep3.toLowerCase();
    var dep4 = req.body.dep4.toLowerCase();
    var dep5 = req.body.dep5.toLowerCase(); */

/* const d1 = require(`./public/data/${dep1}.json`);
    const d2 = require(`./public/data/${dep2}.json`);

    let destinations1 = [];
    let destinations2 = [];

    function getDestinationsNames(destinationsArray, destinations) {
        for (let i = 0; i < destinations.length; i++) {
            destinationsArray.push(destinations[i].name);
        }
    }

    getDestinationsNames(destinations1, d1);
    getDestinationsNames(destinations2, d2); */

// console.log("destinations 3", destinations3);

////////// FIRST COMPARE FUNCTION \\\\\\\\\\

/* function compareTwo(dest1, dest2) {
        // console.log("destinations1", dest1);
        const matchingDestinations = [];
        dest1.forEach((elem1) =>
            dest2.forEach((elem2) => {
                if (elem1 === elem2) {
                    matchingDestinations.push(elem1);
                }
            })
        );
        console.log("Comparing 2 first arrays", matchingDestinations);
    } */

// console.log("destinations from dep1", destinations1);
// console.log("destinations from dep2", destinations2);
// console.log("DATA FROM coresponding JSON", d1);

////////////  END OF FIRST SHOT \\\\\\\\\\\\
