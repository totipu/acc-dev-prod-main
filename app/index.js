const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const { stringify } = require('querystring');

const app = express();
app.use(morgan('combined'));

app.get('/', (req, res) => {
  var content = fs.readFileSync(__dirname + '/index.html');
  
  content = content.toString().replace('###REPLACE_PLATFORM_NAME###', process.env.AZSVC);

  res.send(content);
});

var listener = app.listen(process.env.PORT || 80, function() {
 console.log('listening on port ' + listener.address().port);
 console.log('running on ' + process.env.AZSVC);
});