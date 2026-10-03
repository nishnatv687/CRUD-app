import bcryptjs from "bcryptjs"
import userModel from "../models/user.model.js"
import { createAccessToken,createRefreshToken, readRefreshToken } from "../utils/auth.utils.js"


export async function register(req,res){

    const{email,name,password,role} = req.body

    const userAlreadyExists = await userModel.findOne({email})

    if(userAlreadyExists){
        return res.status(409).json({
            message:"User already exists with this email",
            errors:[
                {
                    field:"email",
                    message:"user already exists with this email"
                }
            ]
        })
    }

    const user = await userModel.create({
        email,
        name,
        passwordHash: await bcryptjs.hash(password,12),
        role
    })

    res.status(200).json({
        message:"created successfully",
        data:{
            user:{
                email:user.email,
                name:user.name,
                id:user._id,
                role:user.role
            }
        }
    })    
}

export async function login(req,res){
    const {email,password} = req.body

    const user = await userModel.findOne({email})
    
    if(!user){
        return res.status(401).json({
            message:"Invalid Email and password"
        })
    }

    const validPassword = await bcryptjs.compare(password,user.passwordHash)
    
    if(!validPassword){
        return res.status(401).json({
            message:"Invalid email and password"
        })
    }

    const accessToken = createAccessToken({
        userId:user._id,
        role:user.role
    })
    
    const refreshToken = createRefreshToken({
        userId:user._id,
        role:user.role
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true
    })

    await userModel.findByIdAndUpdate(user._id,{
    refreshToken
    });

    res.status(200).json({
        message:"User logged in successfully",
        data:{
            user:{
                id:user._id,
                email:user.email,
                role:user.role
            },
            accessToken
        }
    })

}

export async function refresh(req,res){

    const refreshToken = req.cookies.refreshToken

    if(!refreshToken){
        return res.status(401).json({
            message:"Refresh Token is Required"
        })
    }

    const decoded = readRefreshToken(refreshToken)

    const {userId,role} = decoded

    const user = await userModel.findById(userId)

    if(!user){
        return res.status(401).json({
            message:"user not found"
        })
    }

     if (refreshToken !== user.refreshToken) {
    return res.status(401).json({
        message: "Invalid refresh token"
    });
}

    const accessToken = createAccessToken({
       userId,role
    })

    const newRefreshToken = createRefreshToken({
      userId,role
    })

    await userModel.findByIdAndUpdate(user._id, {
    refreshToken: newRefreshToken
    }); 

    res.cookie("refreshToken",newRefreshToken,{
        httpOnly:true
    })

    res.status(200).json({
        message:"token rotated successfully",
        data:{
            user:{
                name:user.name,
                emai:user.email,
                role:user.role,
            },
            accessToken
        }
    })

}

export async function getMe(req,res){
    const {userId} = req.user

    const user = await userModel.findById(userId)

    if(!user){
        return res.status(401).json({
            message:"User not found"
        })
    }

    res.status(200).json({
        message:"User fetched successfully",
        data:{
            user:{
                email:user.email,
                name:user.name,
                role:user.role
            }
        }
    })
}

export async function logout(req, res) {
    const { userId } = req.user

    const user = await userModel.findByIdAndUpdate(
        userId,
        { refreshToken: null }
    )

    if (!user) {
        return res.status(400).json({
            message: "User not found"
        })
    }

    res.clearCookie("refreshToken")

    res.status(200).json({
        message: "User logout successfully"
    })
}