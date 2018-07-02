const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const cors = require('cors');
const morgan = require('morgan');

const { mongoUri } = require('./config/keys');

mongoose.Promise = global.Promise;
console.log(mongoUri)
mongoose.connect(mongoUri);

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(__dirname + './dist/bundle.jsÏ'))

require('./routes')(app);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
