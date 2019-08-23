var express = require('express');
var app = express();


app.post('/produtos', function (req, res) {
  res.send('Got a POST request');
});

app.put('/produtos', function (req, res) {
  res.send('Got a PUT request at /produto');
});

app.get('/produtos', function (req, res) {
  res.send('Eh os guris!');
});

app.delete('/produtos', function (req, res) {
  res.send('Got a DELETE request at /produto');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
