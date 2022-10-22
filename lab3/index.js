const express = require("express");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Main page LOL)");
});


app.listen(port, () => {
    console.log(`Server start on port ${port}`);
});