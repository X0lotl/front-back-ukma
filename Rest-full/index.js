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

client.connect()
  .then(() => console.log("Connected successfully"))
  .then(() => client.query("SELECT * FROM people *"))
  .then(results => console.table(results.rows))
  .catch(e => console.log(e.stack))
  .finally(() => console.log("Start listening pg"));

app.get('/', (req, res) => {
  res.send("1");
});

app.get('/people', (req, res) => {
  const query = req.query;
  const keys = Object.keys(query);

  let stringToPG = `Select * FROM people`;

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
  client.query(stringToPG, (err, result) => {
    if (err) {
      throw err;
    }

    res.status(200).json(result.rows);
  });
});


app.post('/person', jsonParser, (req, res) => {
  const {firstname, secondname, passport_number, room_number, paid_for_this_year} = req.body;

  client.query(`INSERT INTO people (firstname, secondname, passport_number, room_number, paid_for_this_year) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [firstname, secondname, passport_number, room_number, paid_for_this_year], (err, result) => {
    if (err) throw err;
    res.status(201).send(`User added with ID: ${result.rows[0].id}`);
  });
});

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});