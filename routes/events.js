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
const { isAuthenticated, isAdmin } = require('../middleware/authenticate');

router.get('/', isAuthenticated, eventsController.getAll);

router.get(
  '/:id',
  isAuthenticated,
  validateEventId,
  handleValidationErrors,
  eventsController.getSingle
);

router.post(
  '/',
  isAdmin,
  validateEvent,
  handleValidationErrors,
  eventsController.createEvent
);

router.put(
  '/:id',
  isAdmin,
  validateEventId,
  validateUpdateEvent,
  handleValidationErrors,
  eventsController.updateEvent
);

router.delete(
  '/:id',
  isAdmin,
  validateEventId,
  handleValidationErrors,
  eventsController.deleteEvent
);

module.exports = router;
