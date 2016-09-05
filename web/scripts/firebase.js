// Initialize Firebase

var firebase = require('firebase')

// Get the auth token
var AuthDetails = require("./auth.json");
 
var config = {
    apiKey: AuthDetails.firebase_apiKey,
    authDomain: AuthDetails.firebase_authDomain,
    databaseURL: AuthDetails.firebase_databaseURL,
    storageBucket: AuthDetails.firebase_storageBucket
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
  var newReportKey = firebase.database().ref().child('reports').push().key;

  var updates = {};
	  updates['/reports/' + newReportKey] = postData;

  // Add the new user
	console.log("Adding time report" + discordid + " " + date + " " + hours + " " + code);

  return firebase.database().ref().update(updates);
}

function addNewCode(codeId, description) {

	// A post entry.
  var postData = {
    codeId: codeId,
    description: description
  };

  // Get a key for a new user.
  var newCodeKey = firebase.database().ref().child('codes').push().key;

  var updates = {};
	  updates['/codes/' + newCodeKey] = postData;

  // Add the new code
	console.log("Adding new code" + codeId + " " + description);

  return firebase.database().ref().update(updates);
}

function setDefaultCode(codeId, discordid) {

	// A post entry.
  var postData = {
    codeId: codeId,
    discordid: discordid
  };

  // Get a key for a new user.
  var newCodeKey = firebase.database().ref().child('settings').push().key;

  var updates = {};
	  updates['/settings/' + newCodeKey] = postData;

  // Add the new code
	console.log("Adding new setting" + codeId + " " + discordid);

  return firebase.database().ref().update(updates);
}

function checkIfUserExists(discordid){	

	firebase.database().ref('users/').orderByChild("discordid").equalTo(discordid).once("value").then(function (snapshot) {
		console.log(discordid + " exists " + snapshot.exists());
	       	return snapshot.exists();
		    });
}

exports.addNewUser = addNewUser;
exports.addTime = addTime;
exports.addNewCode = addNewCode;
exports.setDefaultCode = setDefaultCode;

