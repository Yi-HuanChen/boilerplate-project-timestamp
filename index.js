// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//convert time from path /api/
app.get("/api/:time", function (req, res) {
  const time = req.params.time;
  // res.json({ time });
  var unix = 0;
  var utc;
  //  console.log(typeof(time))
  // check ifdata is valid(data should be convert to valid date)
  if (new Date(parseInt(time)).toUTCString() == "Invalid Date") {
    res.json({ error: "Invalid Date" });
    return;
  }
  // data = milisecond
  if (time / 1 == time) {
    unix = parseInt(time);
    utc = new Date(parseInt(unix)).toUTCString();
  }

  //data  =normal date format
  else if (time / 1 != time) {
    unix = new Date(time).getTime();
    utc = new Date(unix).toUTCString();
  }
  res.json({ unix, utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
