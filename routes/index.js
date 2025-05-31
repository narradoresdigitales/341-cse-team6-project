const router = require('express').Router()

router.get('/', (req, res) => { res.send('341CSE Team 6 Project')});

router.use('/events', require('./events'));

module.exports = router;