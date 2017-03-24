'use strict';

var http = require ('http');
var request = require('request');
var querystring = require('querystring')
var https = require('https')
var config = require('../config')

var sendSms = function(from, to, body, callback){
    var response = {};

    var body =  querystring.stringify({
        From: from,
        To: to,
        Body: body
    });

    var options = {
        host: config.restcomm.host,
        port: 8080,
        path: '/restcomm/2012-04-24/Accounts/' + config.restcomm.accountSid + '/SMS/Messages.json',
        method: 'POST',
        auth: config.restcomm.accountSid + ':' + config.restcomm.accountSecret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(body)
        }
    }

    var req = http.request(options, function(res){
        res.on('data', function (chunk){
            console.log("chunk: " + chunk);
            response = chunk;
        });
        res.on('end', function(){
            console.log('request ended');
            callback(null, response);
        });
        res.on('error', function(err){
            console.log(err.message)
            callback(err);
        });
    })

    req.write(body);
    req.end()

}

module.exports = sendSms;