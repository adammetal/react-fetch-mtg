const express = require("express");
const cards = require('./src/cards');
const names = require('./src/names');

const app = express();

app.use('/api/names', names);
app.use('/api/cards', cards);

app.listen(8080);
