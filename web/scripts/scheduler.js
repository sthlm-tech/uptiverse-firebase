/*
	Schedule time report reminders
*/
var bot = require('./discordBot')

var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.second = 10;

var j = schedule.scheduleJob(rule, function(){

        console.log("Sending message");
        bot.sendMessageToAll("");
});
