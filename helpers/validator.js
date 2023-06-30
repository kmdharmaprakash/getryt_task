const { body } = require('express-validator')

exports.validate = (method) => {
    console.log("validator")
  switch (method) {
    case 'createEmployee': {
     return [ 
        body('name', 'userName doesnt exists').exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('age').optional().isInt()
       ]   
    }
  }
}