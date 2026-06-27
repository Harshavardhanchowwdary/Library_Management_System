const {body,validationResult} = require("express-validator");

const validationRules = () =>{
    return [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ];
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); 
  }
  return res.status(400).json({ errors: errors.array() });
};

module.exports = {validate,validationRules}