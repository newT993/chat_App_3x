import express from 'express'
import authRoute from './routes/authRoutes.js'
import meRoute from './routes/meRoute.js'
import dotenv from 'dotenv'
import connectDb from './utils/connectDb.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const PORT = process.env.PORT || 5000

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false}))
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
}))

app.use('/api/auth', authRoute)
app.use('/users', meRoute)
app.listen(PORT, ()=>{
    connectDb()
    console.log(`Listening on ${PORT} (┬┬﹏┬┬)`)
})