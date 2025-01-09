import jwt from 'jsonwebtoken'
import User from '../model/userModel.js'

const proWare = async(req, res, next)=>{
    try {
        const token = req.cookies.jwt
        if(!token) return res.status(401).json({error: 'You are not logged in , cant found jwt'})

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return res.status(401).json({error:'Invalid token'})

        const isUser = await User.findById(decoded.userId).select('-password')
        if(!isUser) return res.status(401).json({msg: 'User not found'})

        req.user = isUser
        next()
    } catch (error) {
        console.error('in protect function', error.message)
    }
}

export default proWare;