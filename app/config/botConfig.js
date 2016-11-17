var Slackbot = require('slackbots');

var bot = new Slackbot ({
  token: 'your token here',
  name: 'eventnotifier'
});

module.exports = bot;
