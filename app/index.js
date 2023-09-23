const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const { stringify } = require('querystring');
const responseTime = require('response-time')

const app = express();

// Measure the time of response
app.use(responseTime((req, res, time) => {
  console.log(`${req.method} ${req.url} Request finished in: ${time.toFixed(5)} ms`);
}))

app.use(morgan('combined'));

app.get('/', (req, res) => {
  var content = fs.readFileSync(__dirname + '/index.html');

  content = content.toString().replace('###REPLACE_PLATFORM_NAME###', process.env.AZSVC);

  res.send(content);
});

var listener = app.listen(process.env.PORT || 8080, function() {
  console.log('listening on port ' + listener.address().port);
  console.log('running on ' + process.env.AZSVC);
});