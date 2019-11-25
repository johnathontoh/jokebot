//bring in slackbot
const SlackBot = require('slackbots');

//bring in axios
const axios = require('axios');

//initialise slackbot
//takes in object literal
//takes two properties
const bot = new SlackBot({
    
    //string
    //bot user oauth token from api.slack.com
    token: 'xoxb-681439565974-669381684579-UyQlAUZEecMM6CmxCJaFPcFD',

    //string
    name: 'jokebot'
});



//start handler
//something like a welcome message
//show an icon
//an object in the variable
//use of codes for slack emojis
bot.on('start', () => {
    const params = {
        //set it to a string
        //grab an icon
        icon_emoji: ':smiley:'
    }

    //takes in 3 parameters, channel, message, params object that has the emoji
    //post message to the channel
    bot.postMessageToChannel('general', 'Get ready to laugh with @jokebot!', params);
});



//error handler
//pass in the "err" object into the console
bot.on('error', (err) => console.log(err) );



//message handler
//when a message is sent to the bot, the bot will reply
//set the data type to be a message
bot.on('message', (data) => {
    //if it is not a message, u dont want any action, so just return the action
    if(data.type !== 'message'){
         return
     }
     //if it is a message, it will print it out into the console
     //remember to filter the ID for the text
     //console.log(data);

     //pass the data and its text value to a function
     handleMessage(data.text);
});



//respond to data
//the parameter "message" would be the data.text that includes the ID
function handleMessage(message){
    //check if that word is included in the string or object
    //if it is present, it will run the function below
    //the space is separate it from the string in the help function
    //without the space, the function for the joke will also run when the help function runs due to the similarity of the strings
    if(message.includes(' chucknorris')){
        chuckJoke();
    } else if(message.includes( ' yomama')){
        yoMamaJoke();
    } 
    //pick randomly from chuck norris or yo mama
    else if(message.includes(' random')){
        randomJoke();
    } else if(message.includes(' help')){
        runHelp();
    }

}



//Tell a Chuck Norris Joke
//joke API
//the api will get a type then the value which is the joke
function chuckJoke(){
    axios.get('http://api.icndb.com/jokes/random')
    //get a response
    .then(res => {
        //the object has a value property then a joke property
        const joke = res.data.value.joke;
        
        //send that joke to slack
        const params = {
            //set it to a string
            //grab that icon
            icon_emoji: ':laughing:'
        }
    
        //takes in 3 parameters, channel, message, params object that has the emoji
        //post message to the channel
        //put the joke variable into the message
        bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);

    })
}


//Tell a Yo Mama Joke
//joke API
//the api will get a type then the value which is the joke
function yoMamaJoke(){
    axios.get('http://api.yomomma.info')
    //get a response
    .then(res => {
        //the object only has a joke property
        const joke = res.data.joke;
        
        //send that joke to slack
        const params = {
            //set it to a string
            //grab that icon
            icon_emoji: ':laughing:'
        }
    
        //takes in 3 parameters, channel, message, params object that has the emoji
        //post message to the channel
        //put the joke variable into the message
        bot.postMessageToChannel('general', `Yo Mama: ${joke}`, params);

    })
}


//tell a random joke
function randomJoke(){
    //up to 2 functions, chuck joke and yo mama
    //the "+1" is to make it from a 0 to 1 --> 1 to 2
    const rand = Math.floor(Math.random() * 2) + 1;

    if(rand === 1){
        chuckJoke();
    } else if (rand === 2){
        yoMamaJoke();
    }

}


//show help text
function runHelp(){
    const params = {
        //set it to a string
        //grab that icon
        icon_emoji: ':question:'
    }

    //takes in 3 parameters, channel, message, params object that has the emoji
    //post message to the channel
    bot.postMessageToChannel('general', `Type @jokebot with either 'chucknorris', 'yomama' or 'random' to get a joke`, params);
}