'use strict'

var AWS = require('aws-sdk');
var config = require('../config')


var sendToLex = function(userId, text, callback){
    var lex = new AWS.LexRuntime({accessKeyId:config.amazon.accessKeyId, 
        secretAccessKey: config.amazon.secretAccessKey,
        region: config.amazon.region
    });
    var requestParams = {
        botAlias: config.lex.botAlias,
        botName: config.lex.botName,
        userId: userId,
        inputText: text,
    }

    lex.postText(requestParams, function(err,data){
        if(err) {
            console.log(err, err.stack);
            callback(err);
        }
        else {
            console.log("Got response from Lex: " + data);
            callback(null, data);
        }
    });


}

module.exports = sendToLex;