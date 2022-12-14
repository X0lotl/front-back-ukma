const express = require("express");
const pg = require('pg');
const bodyParser = require('body-parser');

require("dotenv").config();

const app = express();
const port = 3000;

let jsonParser = bodyParser.json();

const client = new pg.Client({
    user: 'REST',
    host: 'localhost',
    database: 'REST',
    password: process.env.PGPASSWORD,
    port: 5432
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

client.connect()
    .then(() => console.log("Connected successfully"))
    .then(() => client.query("SELECT * FROM people *"))
    .then(results => console.table(results.rows))
    .catch(e => console.log(e.stack))
    .finally(() => console.log("Start listening pg"));

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

app.get('/people', (req, res) => {
    const query = req.query;

    let stringToPG = `Select * FROM people`;

    stringToPG += buildWhereStringToPG(query);

    client.query(stringToPG, (err, result) => {
        if (err) {
            throw err;
        }

        res.status(200).json(result.rows);
    });
});

app.post('/people', jsonParser, (req, res) => {
    const query = req.query;

    const dataToUpdate = req.body;
    const keysToUpdate = Object.keys(dataToUpdate);

    let stringToPG = `UPDATE people SET`;

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

app.delete('/people', (req, res) => {
    const query = req.query;
    let stringToPG = `DELETE FROM people`;

    stringToPG += buildWhereStringToPG(query);

    client.query(stringToPG, (err, result) => {
        if (err) {
            throw err;
        }

        res.status(200).send(`All users deleted`);
    })
});

app.post('/person', jsonParser, (req, res) => {
    const { firstname, secondname, passport_number, room_number, paid_for_this_year } = req.body;

    client.query(`INSERT INTO people (firstname, secondname, passport_number, room_number, paid_for_this_year) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [firstname, secondname, passport_number, room_number, paid_for_this_year], (err, result) => {
        if (err) throw err;
        res.status(201).send(`${result.rows[0].id}`);
    });
});

app.post('/person/paid', (req, res) => {
    const id = parseInt(req.query.id);

    client.query(`UPDATE people SET paid_for_this_year = true WHERE id = ${id} `, (err, result) => {
        if (err) {
            throw err;
        }

        res.status(200).send(`User paid with ID: ${id}`);
    });
});

app.post('/new_year', (req, res) => {
    client.query(`UPDATE people SET paid_for_this_year = false`, (err) => {
        if (err) {
            throw err;
        }

        res.status(200).send(`Congrats new year !!!!!! New money`);
    });
});

app.listen(port, () => {
    console.log(`Server start on port ${port}`);
});