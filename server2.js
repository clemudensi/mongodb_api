/**
 * Created by SLEEK on 12/27/2017.
 */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const mongoose = require('mongoose');
const mongojs = require('mongojs');
const Schema = mongoose.Schema;
const ObjectID = mongodb.ObjectID;

const CONTACTS_COLLECTION = "contacts";

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
let db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    const server = app.listen(process.env.PORT || 8080, function () {
        const port = server.address().port;
        console.log("App now running on port", port);
    });
});


function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

// const contactSchema = new Schema({
//     name: String,
//     phone_number: String,
//     address: String
// });
//
// let Contact = module.exports =  mongoose.model('Contact', contactSchema);

app.get("/contacts", function(req, res) {
    db = mongojs('mongodb://udensiclem:Fritzs123@ds131687.mlab.com:31687/phonebook');

    db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post("/contacts", function(req, res) {
    let newContact = req.body;
    newContact.createDate = new Date();

    if (!(req.body.name || req.body.phone_number)) {
        handleError(res, "Invalid user input", "Must provide a name or phone number", 400);
    }

    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});
