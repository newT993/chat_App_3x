import express from 'express'
import authRoute from './routes/authRoutes.js'
import meRoute from './routes/meRoute.js'
import dotenv from 'dotenv'
import connectDb from './utils/connectDb.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'

const PORT = process.env.PORT || 5000
const app = express()
const __dirname = path.resolve()

dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false}))
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173','https://chat-app-3x.onrender.com'],
    credentials: true
}))

app.use('/api/auth', authRoute)
app.use('/users', meRoute)
app.use(express.static(path.join(__dirname, '/frontend/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))  //send the single page application (SPA)
})

app.listen(PORT, ()=>{
    connectDb()
    console.log(`Listening on ${PORT} (┬┬﹏┬┬)`)
})