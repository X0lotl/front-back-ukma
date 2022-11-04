import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.static("src"))

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve('src/index.html'));
// });

app.listen(port, () => {
    console.log(`Server start on port: ${port}`)
});