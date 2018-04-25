const express = require('express');
const app = express();
const {getHotels, hotelsView} = require('./backend-app/retrieveData');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/', express.static('frontend-app'));

app.get('/api/hotels/', getHotels);
app.get('/search-hotels/', hotelsView);

app.listen(3000, function () {
  console.log('Up and running on port 3000!');
});
