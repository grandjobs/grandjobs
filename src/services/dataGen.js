const Firebase = require('firebase');

let config = {
		apiKey: "AIzaSyCBqt6oDF0MEB17aCvNsno5NM4qozJUGeM",
		authDomain: "job-push-fbb6a.firebaseapp.com",
		databaseURL: "https://job-push-fbb6a.firebaseio.com",
		projectId: "job-push-fbb6a",
		storageBucket: "job-push-fbb6a.appspot.com",
		messagingSenderId: "539179420830"
	};

let app = Firebase.initializeApp(config);
const db = app.database();

var rootRef = db.ref();

rootRef.once('value', function(snapshot) {
	if (!snapshot.hasChild("USERS")) {
		console.log("here brah");
		rootRef.child.set("USERS");
	} else {
		console.log("why..");
	}
});