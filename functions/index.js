const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require('./account-key');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })

const db = admin.firestore();
const attendeesRef = db.collection('guests');
const wishesRef = db.collection('wishes')

exports.attendees = functions.https.onRequest((req, res) => {
	if (req.method === "GET") {
        let attendees = [];

        attendeesRef.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                attendees.push(doc.data());
            })
            res.send(attendees);
			return attendees;
        })
        .catch((err) => {
          console.log('Error getting documents', err);
        });
	} else if (req.method === "POST") {
        let newAttendee = {
            name: req.body.name,
            email: req.body.email,
            type: req.body.type
        };

        attendeesRef.add(newAttendee)
		.then((ref) => {
            res.json({
                id: ref.id,
                message: "Attendee successfully added"
            });
			return newAttendee;
        })
		.catch((err) => {
          console.log('Error adding an attendee', err);
        });
	} else if (req.method === "DELETE") {
        attendeesRef.doc(req.body.id).delete();
        res.send('Attendee successfully removed');
	} else {
		res.status(404).send('Not Found');
	}

});

exports.wishes = functions.https.onRequest((req, res) => {
	if (req.method === "GET") {
        let wishes = [];

        wishesRef.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                wishes.push(doc.data());
            })
            res.send(wishes);
			return wishes;
        })
        .catch((err) => {
			console.log('Error getting wishes', err);
        });
	} else if (req.method === "POST") {
        let newWish = {
            name: req.body.name,
            wish: req.body.wish
        };

        wishesRef.add(newWish)
		.then((ref) => {
            res.json({
                id: ref.id,
                message: "Wish successfully added"
            });
			return newWish;
        })
		.catch((err) => {
			console.log('Error adding a wish', err);
        });
	} else {
		res.status(404).send('Not Found');
	}
})

