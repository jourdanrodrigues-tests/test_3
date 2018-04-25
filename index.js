let express = require('express');
let app = express();

app.use('/', express.static('frontend-app'));

app.listen(3000, function () {
  console.log('Up and running on port 3000!');
});
