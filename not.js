const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
const TelegramBot = require('node-telegram-bot-api');

const token = '6272378443:AAEb4fn_Fzuj6rEdniZ3n1V6SLJoFrgmnog';
const bot = new TelegramBot(token, {polling: true});


var serviceAccount = require("./key.json");
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

const request=require('request');
bot.on('message',function(movie){
    bot.onText(/\/start/, (msg) => {

        bot.sendMessage(msg.chat.id, "Welcome here you can explore about movies to check your history text #history");
            
        });


    request('http://www.omdbapi.com/?t='+movie.text+'&apikey=bbb07702',function(error,response,body){
        console.log(JSON.parse(body).Response);
        let details=JSON.parse(body)
        if(JSON.parse(body).Response=='True'){
            let c=details.Title;
            let d=details.Year;
            let e=details.Writer;
            db.collection('schema').add({
                title:c,
                year:d,
                writer:e,
                userID:movie.from.id
            })
            bot.sendMessage(movie.chat.id,"title : "+c+"\n"+"year "+d+"\n"+"writer :"+e);
            }
            
    });
    if(movie.text == "#history"){
        bot.sendMessage(movie.chat.id,"Your Search History");
        db.collection('schema').where('userID', '==', movie.from.id).get().then((docs)=>{
                  docs.forEach((doc) => {
                       
                        bot.sendMessage(movie.chat.id,"title : " +doc.data().title+ "\n" +"year : "+ doc.data().year+"\n"+"writer : "+doc.data().writer)
                      });
                })
    }
})









// bot.on('message', function(mg){

//   const msg = mg.text;

//   const newMsg = msg.split(" ")

//   if(newMsg[0]=='INSERT'){

//     //Insert the data to database with key
//     db.collection('hey').add({
//       key:newMsg[1],
//       dataValue:newMsg[2],
//       userID:mg.from.id

//   }).then(()=>{
//     bot.sendMessage(mg.chat.id, newMsg[1] + " stored sucessfully ")
//   })

//   }
//   else if(newMsg[0]=='GET'){
//     //Get the data to database with key
//     db.collection('hey').where('userID', '==', mg.from.id).get().then((docs)=>{
//       docs.forEach((doc) => {
//             bot.sendMessage(mg.chat.id, doc.data().key + " " + doc.data().dataValue)
//           });
//     })
//   }
//   else{
//     bot.sendMessage(mg.chat.id, "Please make sure you keeping GET or INSERT in your message to insert the data or GET the data")
//   }
 
// })