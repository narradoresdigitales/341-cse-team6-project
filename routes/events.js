const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');
const {validateEvent} = require('../middleware/eventValidator');
const handleValidationErrors = require('../middleware/validateResult');




router.get('/', eventsController.getAll);

router.get('/:id', eventsController.getSingle);

router.post('/', validateEvent, handleValidationErrors, eventsController.createEvent);

//router.put('/:id', eventsController.updateEvent);

//router.delete('/:id', eventsController.deleteEvent);

module.exports = router;