const { body, param } = require('express-validator');

const validateEvent = [
    body('title')
        .isString().withMessage('Title must be a string')
        .trim()
        .notEmpty().withMessage('Title is required'),
    
    body('description')
        .isString().withMessage('Description must be a string')
        .trim()
        .notEmpty().withMessage('Description is required'),

    body('date')
        .isISO8601().withMessage('Valid ISO date is required'),

    body('location')
        .isString().withMessage('Location must be a string')
        .trim()
        .notEmpty().withMessage('Location is required'),

    body('organizer')
        .isString().withMessage('Organizer must be a string')
        .trim()
        .notEmpty().withMessage('Organizer is required'),

    body('attendees')
        .optional()
        .isArray().withMessage('Attendees must be an array'),

    body('attendees.*')
        .optional()
        .isString().withMessage('Each attendee must be a string'),
];

const validateEventId = [
    param('id')
        .isString().withMessage('Event ID must be a string')
        .notEmpty().withMessage('Event ID is required'),
];

const validateUpdateEvent = [
    body('title')
        .optional()
        .isString().withMessage('Title must be a string')
        .trim()
        .notEmpty().withMessage('Title cannot be empty'),

    body('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .trim()
        .notEmpty().withMessage('Description cannot be empty'),

    body('date')
        .optional()
        .isISO8601().withMessage('Date must be a valid ISO 8601 string'),

    body('location')
        .optional()
        .isString().withMessage('Location must be a string')
        .trim()
        .notEmpty().withMessage('Location cannot be empty'),

    body('organizer')
        .optional()
        .isString().withMessage('Organizer must be a string')
        .trim()
        .notEmpty().withMessage('Organizer cannot be empty'),

    body('attendees')
        .optional()
        .isArray().withMessage('Attendees must be an array'),

    body('attendees.*')
        .optional()
        .isString().withMessage('Each attendee must be a string'),
];







module.exports = {
    validateEvent,
    validateEventId,
    validateUpdateEvent
};
