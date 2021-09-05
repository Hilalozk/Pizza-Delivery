const { check, validationResult } = require('express-validator');
const { notify } = require('../routes');
const httpStatus = require('http-status');


const addProductValidator = [
    check('title')
        .trim().not().isEmpty().withMessage('You need to add a title').bail().isLength({min:2}).withMessage('Minimum 2 characters required').bail(),
    check('description')
    .trim().not().isEmpty().withMessage('You need to add a description').bail().isLength({min:2}).withMessage('Minimum 2 characters required').bail(),
    (req,res,next) => {
        const errors = validationResult(req); //check-add errors to request-get list of errors if you have
    if(!errors.isEmpty()){
        return res.status(httpStatus.BAD_REQUEST).json({
            errors: errors.array()
        })
    }
    next(); // goes to the controller
    } 

];

module.exports = {
    addProductValidator
}