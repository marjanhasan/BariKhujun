const { body, validationResult } = require('express-validator');
const validateRegisterInput = [
    // Sanitize input fields
    body('name').trim().escape(),
    body('phone').trim().escape(),
    body('email').trim().normalizeEmail(),

    // Validate input fields
    body('name').notEmpty().withMessage('Name is required.'),
    body('phone').isMobilePhone().withMessage('Invalid phone number.'),
    body('email').isEmail().withMessage('Invalid email address.'),
    body('username').notEmpty().withMessage('Username is required.'),
    body('username').isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters.'),
    body('username').isAlphanumeric().withMessage('Username must contain only letters and numbers.'),
    body('password').notEmpty().withMessage('Password is required.'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.'),
    body('password')
        .matches(/\d/)
        .withMessage('Password must contain at least one numeric character.'),
    body('password')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain at least one special character'),
];
const validateLoginInput = [
    body('email').trim().normalizeEmail().optional(),
    body('email').if(body('email').exists()).isEmail().withMessage('Invalid email address.'),
    body('password').notEmpty().withMessage('Password is required.'),
];
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Customize the errors array
        const customErrors = errors.array().map((error) => ({
            field: error.path,
            message: `Validation failed for field '${error.path}': ${error.msg}`, // Customize the error message
        }));
        return res.status(400).send({
            success: false,
            message: "Field validation failed",
            errors: customErrors,
        });
    }
    next(); // Proceed to the next middleware/route handler if validation passes
};
module.exports = {validateRegisterInput, validateLoginInput, handleValidationErrors};

