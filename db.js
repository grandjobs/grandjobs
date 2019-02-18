import Firebase from 'firebase';
	
let config = {
	apiKey: "AIzaSyCBqt6oDF0MEB17aCvNsno5NM4qozJUGeM",
	authDomain: "job-push-fbb6a.firebaseapp.com",
	databaseURL: "https://job-push-fbb6a.firebaseio.com",
	projectId: "job-push-fbb6a",
	storageBucket: "job-push-fbb6a.appspot.com",
	messagingSenderId: "539179420830"
};

export const firebase = Firebase.initializeApp(config);