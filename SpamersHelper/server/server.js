const express = require('express');

const app = express();
const port = 3000;

app.use(express.static("src"));

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve('src/index.html'));
// });

app.get('/sendMail', (req, res) => {
    const id = parseInt(req.query.id);
    console.log(id);
    res.send("13");
});

app.listen(port, () => {
    console.log(`Server start on port: ${port}`)
});

