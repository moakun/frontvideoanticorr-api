const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import Routes
const authRoute = require('./Routes/Auth');

const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
require('./prod');

//Route MiddleWares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/api/user', authRoute);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, (err) => {
  if (err) console.log(err);
  else console.log('mongdb is connected');
});

/*app.get('/videoOne', (req, res) => {
  res.sendFile('Assets/PartOne.mp4', { root: __dirname });
});

app.get('/videoTwo', (req, res) => {
  res.sendFile('Assets/PartTwo.mp4', { root: __dirname });
});*/

app.listen(3000, () => console.log('server up and running'));
