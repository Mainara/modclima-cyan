const express = require('express');
const app = express();

const body_parser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.get('/', (req, res) => {
  res.send('Running server...');
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log('CORS-enabled web server listening on port ' + PORT);
});
