import express from 'express';
import bodyParser from 'body-parser';
import SourceMapSupport from 'source-map-support';
import path from 'path';
import logger from 'morgan';
import mongoose from 'mongoose';

import shelterRoutes from './routes/shelter.server.route';
import favouriteRoutes from './routes/favourite.server.route';

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://chris:password@ds145380.mlab.com:45380/shelter-posts', {
  useMongoClient: true,
});

SourceMapSupport.install();

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.static('uploads'));
app.use(express.static(path.join(__dirname, 'static')));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api/shelter',shelterRoutes);
app.use('/api/favourite',favouriteRoutes);


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

//catch 404
app.use((req,res) => {
  res.end('Page Not Found');
})

app.listen(8080,() => {
  console.log('App Server Listening at 8080');
})
