const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');

require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.static("src"));

let jsonParser = bodyParser.json();

const client = new pg.Client({
    user: 'SpamersHelper',
    host: 'localhost',
    database: 'SpamersHelper',
    password: process.env.PGPASSWORD,
    port: 5432
});

client.connect()
  .then(() => console.log("Connected successfully"))
  .then(() => client.query("SELECT * FROM emails *"))
  .then(results => console.table(results.rows))
  .catch(e => console.log(e.stack))
  .finally(() => console.log("Start listening pg"));

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve('src/index.html'));
// });

app.listen(port, () => {
    console.log(`Server start on port: ${port}`)
});

function buildWhereStringToPG(query) {
    const keys = Object.keys(query);

    let stringToPG = ``;
    if (keys.length !== 0) {
        stringToPG += ` WHERE (`

        for (let key of keys) {
            stringToPG += ` ${key} = '${query[key]}'`;

            if (key !== keys[keys.length - 1]) {
                stringToPG += ' AND';
            }
        }

        stringToPG += ` )`;
    }
    return stringToPG;
}

app.get('/emails', (req, res) => {
    const query = req.query;

    let stringToPG = `Select * FROM emails`;

    stringToPG += buildWhereStringToPG(query);

    client.query(stringToPG, (err, result) => {
        if (err) {
            throw err;
        }

        res.status(200).json(result.rows);
    });
});

app.post('/emails', jsonParser, (req, res) => {
    const query = req.query;

    const dataToUpdate = req.body;
    const keysToUpdate = Object.keys(dataToUpdate);

    let stringToPG = `UPDATE emails SET`;

    for (let keyToUpdate of keysToUpdate) {
        stringToPG += ` ${keyToUpdate} = '${dataToUpdate[keyToUpdate]}'`;

        if (keyToUpdate !== keysToUpdate[keysToUpdate.length - 1]) {
            stringToPG += ', ';
        }
    }

    stringToPG += buildWhereStringToPG(query);

    client.query(stringToPG, (err, result) => {
        if (err) {
            throw err;
        }

        res.status(200).send(`All people modified`);
    });
});

app.delete('/email', (req, res) => {
    const query = req.query;
    let stringToPG = `DELETE FROM emails`;

    stringToPG += buildWhereStringToPG(query);

    client.query(stringToPG, (err, result) => {
        if (err) {
            throw err;
        }

        res.status(200).send(`All users deleted`);
    })
});

app.post('/email', jsonParser, (req, res) => {
    const {firstname, secondname, email} = req.body;

    client.query(`INSERT INTO emails (firstname, secondname, email) VALUES ($1, $2, $3) RETURNING *`, [firstname, secondname, email], (err, result) => {
        if (err) throw err;
        res.status(201).json({
            "id": result.rows[0].id
        });
    });
});