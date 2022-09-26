const express = require('express'); 
const path = require("path");

const app = express();
app.use(express.urlencoded());
app.use(express.static("public"));

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "movie_online_summit"
})

connection.connect(function(error) {
    if (error) throw error;
    console.log("Connected to the database");
})

app.get("/registration", function(req, res) {
    res.sendFile(path.join(__dirname + "/../frontend", "registration.html"));
})

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../frontend", "index.html"));
})

app.post("/", (req, res) => {
    const question = {
        email: req.body.askUsEmail,
        question: req.body.question
    };

    const sqlQuery = "INSERT INTO questions (email, question) VALUES (?, ?)";
    connection.query(sqlQuery, [question.email, question.question], (error, results) => {
        if (error) throw error;
        console.log("Question submitted! ID: " + results.insertId);
        res.send(({
            "status": 200,
            "error": null,
        }))
    
    })
});


app.post("/registration", (req, res) => {
    const participant = {
        firstname: req.body.firstName,
        email: req.body.email
    };

    const sqlQuery = "INSERT INTO participants (firstname, email) VALUES (?, ?)";
    connection.query(sqlQuery, [participant.firstname,participant.email], (error, results) => {
        if (error) {
            if (error.code == "ER_DUP_ENTRY") {
                res.status(500).json({
                    "success": false,
                    "message": "This email is already registered!"
                })} else {
                    throw error
                }
        } else {
        console.log("Added! Participant ID: " + results.insertId);
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": {firstname: participant.firstname }
        }))
    }
    })
    });


app.listen(5000, function() {
    console.log("Server is running on port 5000")
})