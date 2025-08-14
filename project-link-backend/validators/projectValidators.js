const { body } = require('express-validator');

exports.validateProject = [
  body('title').notEmpty().withMessage('Title is required'),
  body('client').notEmpty().withMessage('Client ID is required'),
  body('status').optional().isIn(['pending', 'in-progress', 'completed']),
];