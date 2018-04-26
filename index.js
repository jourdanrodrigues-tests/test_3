const express = require('express');
const app = express();
const {getHotels, hotelsView} = require('./backend-app/index');

app.use('/', express.static('frontend-app'));

app.get('/api/hotels/', getHotels);
app.get('/search-hotels/', hotelsView);

app.listen(3000, function () {
  console.log('Up and running on port 3000!');
});
