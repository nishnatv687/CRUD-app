import {body,param,validationResult } from "express-validator"

export const productValidator=[
    body("title")
        .exists().withMessage("title is required").bail()
        .trim()
        .isString().withMessage("title must  be string").bail()
        .isLength({min:2,max:100}).withMessage("title length must be between 2 to 100"),
    body("description")
        .exists().withMessage("description is required").bail()
        .isString().withMessage("descripiton must be in string").bail()
        .trim()
        .isLength({min:20,max:500}).withMessage("description length must be between 20 to 500"),
    body("price.amount")
        .exists().withMessage("price amount is required").bail()
        .isFloat({min:0}).withMessage("Price amount must be in float").bail(),    
    body("price.currency")
        .exists().withMessage("currency is required").bail()
        .isString().withMessage("Currency must be a string").bail()
        .isIn(["INR","USD"]).withMessage("currency either ne inr or usd"),  
    body("sizes")
        .exists().withMessage("Sizes are required").bail()
        .isArray().withMessage("sizes must be an array of object"), 
    body("sizes.*.size")
        .exists().withMessage("Size must be present in every entry in sizes array").bail()
        .trim()
        .isIn(["XS","S","M","L","XL","XXL"]).withMessage("size can be one of these XS.S.M.L.XL.XXL"), 
    body("sizes.*.stock")
        .exists().withMessage("stock must be present on the every entry of the sizes array").bail()
        .isInt({min:0}).withMessage("Stock must be an integer value").bail(),   
    (req,res,next)=>{
        const errors =validationResult(req)
        
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Inavlid request",
                errors: errors.array()
            })
        }
        next()
    }                    
]

export const productIdValidator=[
    param("productId")
        .isMongoId()
        .withMessage("Invalid product ID"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid request",
                errors: errors.array()
            });
        }

        next();
    }
]