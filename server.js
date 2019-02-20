const express = require('express');
const api = require('./api');
const app = express();
const port = 5000;

app.use(express.static('./public'));
app.use('/', api);

app.listen(port, () => {
    console.log(`The server is running on port: ${port}`);
})