import { Router } from "express";
import { registerValidator,loginValidator } from "../validators/auth.validators.js";
import { login, register,refresh, getMe, logout } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authneticate.js";

const router = Router()

router.post("/register",registerValidator,register)

router.post("/login",loginValidator,login)

router.post("/refresh-token",refresh)

router.get("/getMe",authenticate,getMe)

router.post("/logout",authenticate,logout)

export default router