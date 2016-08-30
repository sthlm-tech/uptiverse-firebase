/*
	This bot is a time reporting bot
*/

var Discord = require("discord.js");

// Get the auth token
var AuthDetails = require("./auth.json");

var bot = new Discord.Client();

//when the bot is ready
bot.on("ready", () => {

	sendMessageToAll("Ready to Serve")
});

//when the bot disconnects
bot.on("disconnected", () => {
	//alert the console
	console.log("Disconnected!");

	//exit node.js with an error
	process.exit(1);
});

//when the bot receives a message
bot.on("message", msg => {
	//if message begins with "ping"
	if (msg.content.startsWith("time")) {
		//send a message to the channel the ping message was sent in.
		bot.sendMessage(msg, "You reported time");

		//alert the console
		console.log("replied " + msg.author.username);
	}
});

bot.loginWithToken(AuthDetails.token);

var sendMessageToAll = function (message){

    var users = bot.users

    	console.log(`Ready to begin! Serving ${users.length} users`);

    	for (i = 0; i < bot.users.length; i++) {

    		var user = users[i]

    		if(user.name.startsWith("Petteri")){

    			console.log(`Sending message ${message} to ` + user.name)
    			sendMessage(user, message);
    		}
    	}
}

var sendMessage = function (user, message){

    bot.sendMessage(user, message)
}

exports.sendMessageToAll = sendMessageToAll
exports.sendMessage = sendMessage
