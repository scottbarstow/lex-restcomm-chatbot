# Lex Restcomm Chatbot

This is a project I built for TADHack Mini Orlando 2017.

It uses the RestComm Connect platform to bridge a phone number to a configured Amazon Lex Chatbot

## What This App Does
This app is a very simple bridge from the PSTN and SMS world to Amazon Lex. When properly configured, the app will receive SMS messages from RestComm, forward them to a Lex chatbot, process the response from Lex and send it back to the original sender, creating a chat interface from SMS.

## Setting Everything Up
The setup for this application takes a bit of prep.

What You'll Need:
- A machine running the latest node (I'm running 6.6 at this time)
- Amazon AWS API Security Credentials
- A working RestComm instance that has the Visual Designer installed and running with a working Phone Number
- A working Lex Chatbot (I will not cover how to set up the bot in this README but will do so in a linked video on my YouTube channel)

### Installing Node and prereqs
Before you get started, you need to install the latest Node on your machine.
Then...
```
$ git clone git@github.com:scottbarstow/lex-restcomm-chatbot.git
$ cd lex-restcomm-chatbot
$ npm install -g nodemon
$ npm install
$ cp config/index.js.example config/index.js

# note that nodemon is not required but makes it nice to not have to restart the app all the time
# Edit the config values to fit your setup, then

$ HOST=0.0.0.0 PORT=3000 nodemon npm start

# You should see
[nodemon] 1.11.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node ./bin/www npm start`
# If that all works, Ctl-C to break out of the app and continue setup
```

### Setting up RestComm
The setup for RestComm for this app is dead simple. Login to your RestComm Dashboard and go to the number you want to test with. Click on the number, go to the 'SMS Request' section of the page, select Url, and paste in the url to your app. It will look like http://yourhost:port/sms.

## Testing The App
From your phone, text the number you've configured in RestComm. You should see the inbound SMS arrive in the NodeJS console and attempt to forward to your configured Lex bot. If it doesn't, review the NodeJS console for any errors and adjust. 

Generally the problem will be with your configuration, as the app itself is pretty basic.
