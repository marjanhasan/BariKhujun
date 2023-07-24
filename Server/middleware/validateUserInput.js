const { body, validationResult } = require('express-validator');

const validateUserInput = [
    // Sanitize input fields
    body('name').trim().escape(),
    body('roles').trim().escape(),
    body('phone').trim().escape(),
    body('email').trim().normalizeEmail(),

    // Validate input fields
    body('name').notEmpty().withMessage('Name is required.'),
    body('roles').notEmpty().withMessage('Roles is required.'),
    body('phone').isMobilePhone().withMessage('Invalid phone number.'),
    body('email').isEmail().withMessage('Invalid email address.'),
];

module.exports = validateUserInput;

