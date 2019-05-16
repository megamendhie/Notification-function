const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.pushNotification = functions.database.ref('/messages/{pushId}').onCreate((change, context) =>{
	console.log('push notification event triggered');
	
	var valueObject = change.after.val();
	
	const payload = {
		notification: {
			title: 'App Name',
			body: "New message",
			sound: "default"
		},
		data: {
			title: valueObject.title,
			message: valueObject.message
		}
	};
	
	const options = {
		priority: "high",
		timeToLive: 60*60*24
	};
	
	return admin.messaging().sendToTopic("reminder", payload, options)
	.then((result) =>{
		
	}).catch((error) => {
		
	});
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
