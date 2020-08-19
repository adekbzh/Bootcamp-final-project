const express = require("express");
const app = express();
// const { api } = require("./api.js");
const db = require("./db");
const hb = require("express-handlebars");
const cookieSession = require("cookie-session");
// const bc = require("./bc");
// const { compare } = require("./bc");
// const csurf = require("csurf");
// console.log("API !!!", api);
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
    res.render("home", {
        layout: "main",
    });
});

app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/departures", (req, res) => {});

app.listen(8080, () => {
    console.log("Server is listening");
});
