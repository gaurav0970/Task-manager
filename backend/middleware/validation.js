const { body, validationResult } = require('express-validator');

const validateTask = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .trim()
    .isLength({ max: 100 })
    .withMessage('Title must be less than 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Invalid status value'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateTask;