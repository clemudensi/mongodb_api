/**
 * Created by SLEEK on 12/27/2017.
 */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const router = require("./config/contact-list/router");
const routerHistory = require("./config/call-history/router");
const cors = require('cors');
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/v1', routerHistory, router);
let db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, (err, database) =>{
    if (err) {
        console.log(err);
        process.exit(1);
    }

    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    const server = app.listen(process.env.PORT || 8080,  ()=> {
        const port = server.address().port;
        console.log("App now running on port", port);
    });
});
