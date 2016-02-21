


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
 AWS.config.loadFromPath('./config.json');


var sqs = new AWS.SQS();
var queueUrl = "your queue URL";

var publishParams = { 
  QueueUrl: queueUrl,
  MessageBody: 'HELLLLLO'
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.post('/publishQueue', function(req, res, next) {
	console.log(next,"next");
	console.log(req.body.email);
	var objectSend={
		QueueUrl: queueUrl,
		 MessageBody: req.body.email
	}
	sqs.sendMessage(objectSend, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
	
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



