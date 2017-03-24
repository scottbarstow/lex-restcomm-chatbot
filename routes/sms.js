var express = require('express');
var router = express.Router();
var sendToLex = require('../lib/lex');
var sendSms = require('../lib/restcomm');

router.post('/', function(req, res, next) {
    var messageBody = req.body.Body;
    var from = req.body.From;
    var to = req.body.To;
    console.log("got message from RestComm: " + messageBody + " " + from + " " + to);
    sendToLex(from, messageBody, function(err,lexData){
        console.log("success to lex: " + lexData.message);
        sendSms(to, from, lexData.message, function(err, sms){
            if(err){
                console.log(err, err.stack);
            }
        });

    })
});

router.get('/', function(req, res, next) {
  res.send("These are not the droids you're looking for");
});

module.exports = router;
