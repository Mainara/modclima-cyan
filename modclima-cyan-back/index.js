const express = require('express');
const app = express();

const body_parser = require('body-parser');
const cors = require('cors');

const millRouter = require('./routers/millRouter');
const harvestRouter = require('./routers/harvestRouter');
const farmRouter = require('./routers/farmRouter');
const fieldRouter = require('./routers/fieldRouter');
const homeRouter = require('./routers/homeRouter');

app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.get('/', (req, res) => {
  res.send('Running server...');
});

app.use('/mills', millRouter);
app.use('/harvests', harvestRouter);
app.use('/farms', farmRouter);
app.use('/fields', fieldRouter);
app.use('/filter', homeRouter);

const PORT = 8080;

app.listen(PORT, () => {
    console.log('CORS-enabled web server listening on port ' + PORT);
});
