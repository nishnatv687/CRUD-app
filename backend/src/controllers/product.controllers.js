import productModel from "../models/Product.model.js";
import { uploadFile } from "../services/storage.services.js";

export async function createProduct(req,res){

    const fileUrls = []
    
    for(let i=0;i<req.files.length;i++){
        const response = await uploadFile({
            buffer:req.files[i].buffer,
            fileName:req.files[i].originalname,
        })
        console.log(response)
        fileUrls.push(response.url)
    }
    
    const product = await productModel.create({
        title:req.body.title,
        description:req.body.description,
        price:{
            amount:req.body.price.amount,
            currency:req.body.price.currency
        },
        sizes:req.body.sizes,
        images:fileUrls,
        seller:req.user.userId

    })

    res.status(200).json({
        message:"product created successfully",
        data:{
            product
        }
    })

}
export async function getProducts(req,res){

    const products = await productModel.find()

    res.status(200).json({
        message:"products fetched successfully",
        data:{
            products
        }
    })

}
export async function getProductById(req,res){

    const productId = req.params.productId
    const product  = await productModel.findById(productId)

    if(!product){
        return res.status(404).json({
            message:"product not found"
        })
    }
    
    res.status(200).json({
        message:"product fetched successfully",
        data:{
            product
        }
    })
}
export async function updateProduct(req, res) {

    const productId = req.params.productId

    if(!productId){
        return res.status(404).json({
            message:"productId is required"
        })
    }

    const updateData = {
        ...req.body
    }

    // If new images are uploaded
    if (req.files && req.files.length > 0) {

        const fileUrls = []

        for (let i = 0; i < req.files.length; i++) {

            const response = await uploadFile({
                buffer: req.files[i].buffer,
                fileName: req.files[i].originalname
            })

            fileUrls.push(response.url)
        }

        updateData.images = fileUrls
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
        productId,
        updateData,
        {
            new: true
        }
    )

    if (!updatedProduct) {
        return res.status(404).json({
            message: "Product not found"
        })
    }

    res.status(200).json({
        message: "Product updated successfully",
        data: {
            product: updatedProduct
        }
    })
}
export async function deleteProduct(req,res){

    const productId = req.params.productId
    const product = await productModel.findByIdAndDelete(productId)

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        })
    }

    res.status(200).json({
        message:"product deleted successfully",
        data:{
            product
        }
    })

}