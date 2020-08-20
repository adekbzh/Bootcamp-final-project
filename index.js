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

// app.use(csurf());

/* app.use(function (req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
}); */

//////////// JOIN  APP \\\\\\\\\\\\

app.get("/", (req, res) => {
    res.redirect("/departures");
});

app.get("/departures", (req, res) => {
    res.render("home", {
        layout: "main",
    });
});

app.post("/departures", (req, res) => {
    // get the user inputs
    // change them into a ICAO Code || change the json files names ||
    // then readFile to get the arrays?
    //console.log("REQ.BODY", req.body);
    var dep1 = req.body.dep1.toLowerCase();
    var dep2 = req.body.dep2.toLowerCase();
    var dep3 = req.body.dep3.toLowerCase();
    var dep4 = req.body.dep4.toLowerCase();
    var dep5 = req.body.dep5.toLowerCase();

    const d1 = require(`./public/data/${dep1}.json`);
    const d2 = require(`./public/data/${dep2}.json`);

    if (req.body.dep3 || req.body.dep4 || req.body.dep5) {
        const d3 = require(`./public/data/${dep3}.json`);
        const d4 = require(`./public/data/${dep4}.json`);
        const d5 = require(`./public/data/${dep5}.json`);
    }

    let destinations1 = [];
    let destinations2 = [];

    for (let i = 0; i < d1.length; i++) {
        destinations1.push(d1[i].name);
    }

    for (let i = 0; i < d2.length; i++) {
        destinations2.push(d2[i].name);
    }

    // console.log("destinations from dep1", destinations1);
    // console.log("destinations from dep2", destinations2);
    // console.log("DATA FROM coresponding JSON", d1);
});

/* app.get("/departures", (req, res) => {}); */

app.listen(8080, () => {
    console.log("Server is listening");
});
