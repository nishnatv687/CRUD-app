import {body,validationResult} from "express-validator"

export const registerValidator=[
    body("email")
        .exists().withMessage("email is required").bail()
        .trim()
        .isEmail().withMessage("invalid email"),
    body("name")
        .exists().withMessage("name is required").bail()
        .isString().withMessage("name must be string").bail()
        .trim()
        .isLength({min:2,max:50}).withMessage("name size must be between 2 to 50"),
    body("password")
        .exists().withMessage("password is required").bail()
        .trim()
        .isString().withMessage("password must be string").bail()
        .isLength({min:6}).withMessage("password length must be gretaer than 6"),
    (req,res,next)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Invalid request",
                errors:errors.array()
            })
        }
        next()
    }            
]

export const loginValidator=[
    body("email")
    .exists().withMessage("email is required").bail()
    .trim()
    .isString().withMessage("email must be in string format"),
    body("password")
    .exists().withMessage("password is required").bail()
    .trim()
    .isString().withMessage("password must be in string format").bail()
    .isLength({min:6}).withMessage("password must contain 6 chars"),
    (req,res,next)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"invalid request",
                errors:errors.array()
            })
        }
        next()
    }
]