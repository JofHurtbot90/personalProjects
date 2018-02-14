const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 7000;
const collectionRouter = require('./routes/collectionRoutes');
const authRouter = require('./routes/authRoutes');
const profileRoute = require('./routes/profile');
const path = require('path');

mongoose.connect('mongodb://localhost/collection')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/collections', collectionRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRoute);
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () =>{
  console.log(`[+] Starting Server on port ${PORT}`);
});
