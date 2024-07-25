const request = require('request');

const TelegramBot = require('node-telegram-bot-api');

const token = '6272378443:AAEb4fn_Fzuj6rEdniZ3n1V6SLJoFrgmnog';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', function(mg){
request('http://www.omdbapi.com/?t='+mg.text+'&apikey=f0034abd', function (error, response, body) {
  if(JSON.parse(body).Response=="True"){
    bot.sendMessage(mg.chat.id, "Title "+JSON.parse(body).Title)
    bot.sendMessage(mg.chat.id, "Release Date "+JSON.parse(body).Released)
    bot.sendMessage(mg.chat.id, "Actors "+JSON.parse(body).Actors)
    bot.sendMessage(mg.chat.id, "Rating "+JSON.parse(body).Ratings[0].Value)
  }
  else{
      bot.sendMessage(mg.chat.id, "Please Enter a Valid Movie Name!!")
  }
});
})
