const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');
const {
  validateEvent,
  validateEventId,
  validateUpdateEvent,
} = require('../middleware/eventValidator');
const handleValidationErrors = require('../middleware/validateResult');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', eventsController.getAll);

router.get(
  '/:id',
  validateEventId,
  handleValidationErrors,
  eventsController.getSingle
);

router.post(
  '/',
  isAuthenticated,
  validateEvent,
  handleValidationErrors,
  eventsController.createEvent
);

router.put(
  '/:id',
  isAuthenticated,
  validateEventId,
  validateUpdateEvent,
  handleValidationErrors,
  eventsController.updateEvent
);

router.delete(
  '/:id',
  isAuthenticated,
  validateEventId,
  handleValidationErrors,
  eventsController.deleteEvent
);

module.exports = router;
