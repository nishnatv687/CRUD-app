import {Router} from "express"
import { createProduct, getProducts,getProductById,updateProduct,deleteProduct } from "../controllers/product.controllers.js"
import { productValidator,productIdValidator } from "../validators/product.validator.js"


import multer from "multer"
import { authenticate } from "../middlewares/authneticate.js"

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        files:5,
        fileSize:1*1024*1024
    }
})

const router =Router()

router.post("/",authenticate,(req,res,next)=>{
    if(req.user.role!=="seller"){
        return res.status(403).json({
            message:"Only seller can create product"
        })
    }
    next()
},upload.array("images"), (req,res,next)=>{
    req.body?.price && (req.body.price = JSON.parse(req.body.price))
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes)),
    next()
},productValidator,createProduct)

router.get("/",getProducts)

router.get("/:productId",productIdValidator,getProductById)

router.put("/:productId",authenticate,productIdValidator,
    (req, res, next) => {
        if (req.user.role !== "seller") {
            return res.status(403).json({
                message: "only seller can update product"
            })
        }

        next()
    },
    upload.array("images"),
    (req, res, next) => {
        req.body?.price &&
            (req.body.price = JSON.parse(req.body.price))

        req.body?.sizes &&
            (req.body.sizes = JSON.parse(req.body.sizes))

        next()
    },
    productValidator,
    updateProduct
)

router.delete("/:productId",productIdValidator,authenticate,(req,res,next)=>{
    if(req.user.role!=="seller"){
        return res.status(403).json({
            message:"only seller can delete prodduct"
        })
    }
    next()
},deleteProduct)

export default router