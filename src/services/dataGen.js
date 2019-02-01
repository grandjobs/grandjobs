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

//rootRef.once('value', function(snapshot) {
//	if (!snapshot.hasChild("USERS")) {
//		console.log("here brah");
//		rootRef.child.set("USERS");
//	} else {
//		console.log("why..");
//	}
//});

var userRef = rootRef.child("USERS");
//userRef.push().set({ username: "jokes" });

fetch('https://randomuser.me/api?results=10&inc=login,cell')
	.then(r => r.json())
	.then(u => {
		var users = u.results;
		
		for (let i = 0; i < users.length; i++) {
				userRef.push().set({ username: users[i]['login']['username'] });
		}
		//console.log(users.length);
		//console.log(users[0]);
		//console.log(users[0]['login']['username']);
		//console.log(users);
});
