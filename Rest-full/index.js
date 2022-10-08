
const express = require("express");
const app = express();
const port = 3000;


const { Client } = require('pg')
const client = new Client;
client.connect();

client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
    console.log(err ? err.stack : res.rows[0].message) // Hello World!
    client.end()
});

// app.post('/')

app.get('/', (req, res) => {
    res.send("1");
});

app.listen(port, () => {
    console.log(`Server start on port ${port}`);
});