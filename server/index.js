const express = require('express');
const mysql = require('mysql');
const keys = require('./config/keys');

const app = express();

const db = mysql.createPool({
    host: keys.DATABASE_HOSTNAME,
    user: keys.DATABASE_USERNAME,
    password: keys.DATABASE_PASSWORD,
    database: keys.DATABASE_NAME
});

app.get('/', (req, res) => {
    const sql = "INSERT INTO movie_reviews (movie_name, movie_review) VALUES ('inception', 'nice movie');";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send("Hello reviewer!");
    });
});

app.listen(3001, () => {
    console.log('Running on port 3001');
});