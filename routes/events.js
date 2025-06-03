const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');
const { validateEvent, validateEventId, validateUpdateEvent } = require('../middleware/eventValidator');
const handleValidationErrors = require('../middleware/validateResult');




router.get('/', eventsController.getAll);

router.get('/:id', validateEventId, handleValidationErrors, eventsController.getSingle);

router.post('/', validateEvent, handleValidationErrors, eventsController.createEvent);

router.put('/:id', validateEventId, validateUpdateEvent, handleValidationErrors, eventsController.updateEvent);

router.delete('/:id', validateEventId, handleValidationErrors, eventsController.deleteEvent);

module.exports = router; 