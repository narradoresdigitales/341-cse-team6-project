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

router.get(
  '/', 
  //#swagger.tags = ['Events']
  //#swagger.summary = "Requires Authentication"
  isAuthenticated, 
  eventsController.getAll
);

router.get(
  '/:id',
  //#swagger.tags = ['Events']
  //#swagger.summary = "Requires Authentication"
  isAuthenticated,
  validateEventId,
  handleValidationErrors,
  eventsController.getSingle
);

router.post(
  '/',
  /* 
    #swagger.tags = ['Events']
    #swagger.summary = "Requires Admin"
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Event fields to use',
      required: true,
      schema: {
        title: "string",
        description: "string",
        date: "2025-05-31T10:30:00Z",
        location: "string",
        sponsor: "string",
        attendees: []
      }
    }
  */ 
  isAdmin,
  validateEvent,
  handleValidationErrors,
  eventsController.createEvent
);

router.put(
  '/:id',
  /* 
    #swagger.tags = ['Events']
    #swagger.summary = "Requires Admin"
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Event fields to update',
      required: true,
      schema: {
        title: "string",
        description: "string",
        date: "2025-05-31T10:30:00Z",
        location: "string",
        sponsor: "string",
        attendees: []
      }
    }
  */ 
  isAdmin,
  validateEventId,
  validateUpdateEvent,
  handleValidationErrors,
  eventsController.updateEvent
);

router.delete(
  '/:id',
  //#swagger.tags = ['Events']
  //#swagger.summary = "Requires Admin"
  isAdmin,
  validateEventId,
  handleValidationErrors,
  eventsController.deleteEvent
);

module.exports = router;
