const { body, param } = require('express-validator');
const { ObjectId } = require('mongodb');
const getDb = require('./db');

const validateEvent = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),

  body('description')
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),

  body('date').isISO8601().withMessage('Valid ISO date is required'),

  body('location')
    .isString()
    .withMessage('Location must be a string')
    .trim()
    .notEmpty()
    .withMessage('Location is required'),

  body('sponsor')
    .custom(async (value) => {
      // Check if it's a valid ObjectId
      if (!ObjectId.isValid(value)) {
        throw new Error('Sponsor must be a valid MongoDB ObjectId.');
      }

      const db = await getDb(); // getDb should return a connected MongoDB database instance
      const sponsor = await db
        .collection('sponsors')
        .findOne({ _id: new ObjectId(String(value)) });

      if (!sponsor) {
        throw new Error('Sponsor must exist within the sponsors collection.');
      }

      return true;
    })
    .trim()
    .notEmpty()
    .withMessage('Sponsor is required'),

  body('attendees')
    .optional()
    .isArray()
    .withMessage('Attendees must be an array'),

  body('attendees.*')
    .optional()
    .isString()
    .withMessage('Each attendee must be a string'),
];

const validateEventId = [
  param('id')
    .isString()
    .withMessage('Event ID must be a string')
    .notEmpty()
    .withMessage('Event ID is required'),
];

const validateUpdateEvent = [
  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty'),

  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 string'),

  body('location')
    .optional()
    .isString()
    .withMessage('Location must be a string')
    .trim()
    .notEmpty()
    .withMessage('Location cannot be empty'),

  body('sponsor')
    .optional()
    .isString()
    .withMessage('Sponsor must be a string')
    .trim()
    .notEmpty()
    .withMessage('Sponsor cannot be empty'),

  body('attendees')
    .optional()
    .isArray()
    .withMessage('Attendees must be an array'),

  body('attendees.*')
    .optional()
    .isString()
    .withMessage('Each attendee must be a string'),
];

module.exports = {
  validateEvent,
  validateEventId,
  validateUpdateEvent,
};
