const { body } = require('express-validator');

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

module.exports = {
    validateEvent
};
