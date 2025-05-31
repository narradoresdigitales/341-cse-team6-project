const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/events');

router.get('/', eventsController.getAll);

router.get('/:id', eventsController.getSingle);

router.post('/', eventsController.createEvent);

//router.put('/:id', eventsController.updateEvent);

//router.delete('/:id', eventsController.deleteEvent);

module.exports = router;