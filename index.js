const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const cors = require('cors');
const morgan = require('morgan');

const {mongoUri} = require('./config/keys');

mongoose.Promise = global.Promise;

mongoose.connect(mongoUri);

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/dist/')))

require('./routes')(app);


const PORT = 5000;
app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on port`, PORT);
});
