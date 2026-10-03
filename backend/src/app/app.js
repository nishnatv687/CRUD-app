import express from "express"
import cookieParser from "cookie-parser"
import { connectDB } from "../config/db.js"
import productRoutes from "../routes/product.routes.js"
import authRoutes from "../routes/auth.routes.js"

await connectDB()
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)


export default app