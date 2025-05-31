const router = require('express').Router()

router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    //#swagger.tags=['341CSE Team 6 Project']
    res.send('341CSE Team 6 Project');
});

router.use('/events', require('./events'));

module.exports = router;