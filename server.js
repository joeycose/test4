var mongoose = require('mongoose');
var express = require('express');

const app = express();

app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/home.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html");
});

app.post("/register", (req, res) => {
    const result = register(req.body);
    if(result) {
        res.send("Registration Successful");
    }
});

app.get("/signIn", (req, res) => {
    res.sendFile(__dirname + "/signIn.html");
});

app.post("/signIn", (req, res) => {
    const result = signIn(req.body);
    if(result) {
        res.send(`Welcome ${result.email}! <a href='/'>Go Home</a>`);
    } else {
        res.send("Incorrect username or password");
    }
});

app.get("*", (req, res) => {
    res.send("Not Found");
});