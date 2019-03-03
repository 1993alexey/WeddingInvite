const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((req, res) => {
//  res.send("Hello from Firebase!");
// });

exports.attendees = functions.https.onRequest((req, res) => {
	if (req.method === "GET") {
		res.send(
			[
                {
                    nameFirst: 'Yuan-Ting',
                    nameLast: 'Lu',
                },
                {
                    nameFirst: 'Alex',
                    nameLast: 'Shnyrov',
                }
            ]
		);
	} else if (req.method === "POST") {
		res.send("New attendee added");
	} else if (req.method === "DELETE") {
		res.send("Addendee deleted");
	} else {
		res.status(404).send('Not Found');
	}

});

exports.wishes = functions.https.onRequest((req, res) => {
	if (req.method === "GET") {
		res.send("Got all wishes");
	} else if (req.method === "POST") {
		res.send("New wish added");
	} else {
		res.status(404).send('Not Found');
	}
})

