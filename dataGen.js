const Firebase = require('firebase');
var DomParser = require('dom-parser');
var parser = new DomParser();

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
var busRef = rootRef.child('BUSES');

//fetch('https://randomuser.me/api?results=10&inc=login,cell')
//	.then(r => r.json())
//	.then(u => {
//		var users = u.results;
		
//		for (let i = 0; i < users.length; i++) {
//				userRef.push().set({ username: users[i]['login']['username'] });
//		}
//});

fetch('https://openmobilitydata-data.s3-us-west-1.amazonaws.com/public/feeds/the-rapid/380/20190104/original/routes.txt')
	.then(results => results.text())
	.then(textBody => {
		var lines = textBody.split(/\n/);
		
		for (let i = 1; i < lines.length - 1; i++) {
			let line = lines[i].split(",");

			console.log('Token trimmed: ' + line[2].substring(1, line[2].length - 1));
			
			var trimmedToken = line[2].substring(1, line[2].length - 1);
			
			busRef.child(parseInt(trimmedToken)).set({ Description: line[3].substring(1,(line[3].length - 1)), Stops: "NULL" });
		}
});

var routeList = [];

fetch('https://connect.ridetherapid.org/InfoPoint/Minimal')
	.then(results => results.text())
	.then(textBody => {
		var routeListDom = parser.parseFromString(textBody);
		var routeEntries = routeListDom.getElementsByClassName('routeNameListEntry');
		
		for (let i = 0; i < routeEntries.length; i++) {
			let routeName = routeEntries[i].getAttribute("routeID");
			
			routeList.push(routeName);
		}
		
		fetch('https://openmobilitydata-data.s3-us-west-1.amazonaws.com/public/feeds/the-rapid/380/20190104/original/stops.txt')
			.then(results => results.text())
			.then(textBody => {
				var lines = textBody.split(/\n/);
		
				for (let i = 0; i < routeList.length; i++) {
					fetch('https://connect.ridetherapid.org/InfoPoint/Minimal/Stops/ForRoute?routeId=' + routeList[i])
						.then(results => results.text())
						.then(textBody => {
							var stopListDom = parser.parseFromString(textBody);
							var stopEntries = stopListDom.getElementsByClassName('stopNameListEntry');

							var matches = 0;
							
							var routeRef = busRef.child(routeList[i])
							var stopsRef = routeRef.child('Stops');
							
							for (let k = 0; k < stopEntries.length; k = k + 2) {
								var stop_id = stopEntries[k].getAttribute("stopid");
								
								for (let j = 1; j < lines.length - 1; j++) {
									let line = lines[j].split(",");
								
									if (line[1] == stop_id) {
										stopsRef.child(stop_id).set({ Latitude: line[4], Longitude: line[5], Description: line[2]});
										
										//matches++;
										j = lines.length - 1;
									}
								}
							}
							
							//console.log('Matches for the 50: ' + matches);
						});
				}
		});
});



