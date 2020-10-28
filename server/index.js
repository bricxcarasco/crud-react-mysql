const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./config/keys');

const app = express();

const db = mysql.createPool({
    host: keys.DATABASE_HOSTNAME,
    user: keys.DATABASE_USERNAME,
    password: keys.DATABASE_PASSWORD,
    database: keys.DATABASE_NAME
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/api/submit_review', (req, res) => {
    const { movie, review } = req.body;
    const sqlInsert = `INSERT INTO movie_reviews (movie_name, movie_review) VALUES ('${movie}','${review}');`;
    db.query(sqlInsert, (err, result) => {
        if (result) {
            const sqlGetLastInserted = "SELECT * FROM movie_reviews ORDER BY id LIMIT 1";
            db.query(sqlGetLastInserted, (err, result, field) => {
                let rows = JSON.parse(JSON.stringify(result[0]));
                res.json(rows);
            });
        }
    });
});

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(3001, () => {
    console.log('Running on port 3001');
});