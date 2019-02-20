const express = require('express')
const router = express.Router();

router.route('/attendees')
    .get((req, res) => {    
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
        )
    })
    .post((req, res) => {

    })
    .delete((req, res) => {

    })

router.route('/wishes')
    .get((req, res) => {
        res.send('Best Wishes');
    })
    .post((req, res) => {

    })

module.exports = router;