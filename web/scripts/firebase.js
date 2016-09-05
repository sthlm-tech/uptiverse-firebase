// Initialize Firebase

var firebase = require('firebase')
 
var config = {
    apiKey: "AIzaSyAkjDTLPspj9jrUQEYdHUH-WtRS0gLO0cM",
    authDomain: "time-f409c.firebaseapp.com",
    databaseURL: "https://time-f409c.firebaseio.com",
    storageBucket: "time-f409c.appspot.com",
  };

firebase.initializeApp(config);

function addNewUser(uid, name, email, discordid) {

	// A post entry.
  var postData = {
    uid: uid,
    name: name,
    email: email,
    discordid: discordid
  };

  // Get a key for a new user.
  var newUserKey = firebase.database().ref().child('users').push().key;

  var updates = {};
	  updates['/users/' + newUserKey] = postData;

  // Add the new user
	console.log("Adding user" + uid + " " + name + " " + email + " " + discordid);

  return firebase.database().ref().update(updates);
}

function addTime(discordid, date, hours, code) {

	// A post entry.
  var postData = {
    discordid: discordid,
    date: date,
    hours: hours,
    code: code
  };

  // Get a key for a new user.
  var newUserKey = firebase.database().ref().child('reports').push().key;

  var updates = {};
	  updates['/reports/' + newUserKey] = postData;

  // Add the new user
	console.log("Adding time report" + discordid + " " + date + " " + hours + " " + code);

  return firebase.database().ref().update(updates);
}

function checkIfUserExists(discordid){	
	firebase.database().ref('users/').orderByChild("discordid").equalTo(discordid).once("value").then(function (snapshot) {
		console.log(discordid + " exists " + snapshot.exists());
	       	return snapshot.exists();
		    });
}

exports.addNewUser = addNewUser
exports.addTime = addTime


