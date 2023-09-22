const { check } = require('express-validator');

exports.rules = [
    check('Name')
    .trim()
    .isAlpha().withMessage('Only alphabets are allowed in Name !!')
    .isLength({ min:1 }).withMessage('Name is required!!'),
    check('Email')
    .trim()
    .isEmail().withMessage("Please enter valid email !!")
    .isLength({ min:1 }).withMessage('Email is required!!'),
    check('Password')
    .trim()
    .isAlphanumeric().withMessage("Please use numerical and alphabets no special characters are allowed!!"),
    check('mobile_number')
    .trim()
    .isInt().withMessage('Only numerical value is allowed')
    .isLength({ min:10, max:10 }).withMessage("Please enter 10 digit mobile number and don't use +91 !!"),
];