/*
	This bot is a time reporting bot
*/

var Discord = require("discord.js");
var firebase = require("./firebase")
var scheduler = require("./scheduler")

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

    var message = msg.content;

    var messageArray = message.split(",");

    var start = messageArray[0].toLowerCase()

	//if message begins with "time"
	if (start.startsWith("time")) {
		//send a message to the channel the ping message was sent in.

                console.log("Array length : " + messageArray.length);

        	    if(messageArray.length == 2){

        	        var date = new Date().toISOString().slice(0,10);
        	        var discordId = msg.sender.username;
        	        var hours = messageArray[1];
                    var code  = "1";

                    firebase.addTime(discordId, date, hours, code);

                    bot.sendMessage(msg, "You reported time");

        	    }else{

        	        bot.sendMessage(msg, "(time, hours) to add a time report");
        	    }

		//alert the console
		console.log("replied " + msg.author.username);

	}else if(start.startsWith("user")){

        console.log("Array length : " + messageArray.length);

	    if(messageArray.length == 4){

	        var discordId = msg.sender.username;
	        var name = messageArray[1];
            var email  = messageArray[2];
            var userid = messageArray[3];

            firebase.addNewUser(userid, name, email, discordId);

	    }else{

	        bot.sendMessage(msg, "(user, username, email, usernumber) to add a user");
	    }
	}else if (start.startsWith("new code")){

                  console.log("Array length : " + messageArray.length);

          	    if(messageArray.length == 3){

          	        var codeid = messageArray[1];
                    var description  = messageArray[2];

                    firebase.addNewCode(codeid, description);

          	    }else{

          	        bot.sendMessage(msg, "(code, description) to add a code");
          	    }
	}
});

bot.loginWithToken(AuthDetails.discord_token);

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