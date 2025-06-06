const { body, param } = require('express-validator');

const validateSponsorId = [
    param('id')
        .isString().withMessage('Sponsor ID must be a string')
        .notEmpty().withMessage('Sponsor ID is required'),
];

const validateSponsor = [
    body('name')
        .isString().withMessage('Name must be a string')
        .trim()
        .notEmpty().withMessage('Name is required'),
    body('email')
        .isString().withMessage('Email must be a string')
        .trim()
        .isEmail().withMessage('Email must be a valid email')
        .notEmpty().withMessage('Email is required'),
    body('phone')
        .isString().withMessage('Phone must be a string')
        .trim()
        .isMobilePhone().withMessage('Phone must be a valid phone number')
        .notEmpty().withMessage('Phone is required'),
    body('website')
        .isString().withMessage('Website must be a string')
        .trim()
        .isURL().withMessage('Website must be a URL')
        .notEmpty().withMessage('Website is required'),
    body('supplierID')
        .isString().withMessage('Supplier ID must be a string')
        .trim()
        .notEmpty().withMessage('Supplier ID is required'),
]

module.exports = { validateSponsorId, validateSponsor }