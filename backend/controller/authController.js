import User from "../model/userModel.js"
import genToken from "../utils/genToken.js"
import bcrypt from "bcryptjs"

export const register = async (req, res) =>{
    try {
        const { username, password } = req.body
        const hasUser = await User.findOne({ username})
        if(hasUser) return res.status(400).json({error: "User already registered"})

        const genSalt = await bcrypt.genSalt(10)
        const hashPwd = await bcrypt.hash(password, genSalt)

        const newUser = new User({username, password: hashPwd})
        if(newUser){
            genToken(newUser._id, res)
            await newUser.save()
            res.status(200).json({username: newUser.username, password: newUser.password,_id: newUser._id})
        } else {
            res.status(400).json({error: "User can't be registered"})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
        console.error("Error in registering user", error.message)
    }
}

export const login = async (req, res) =>{
    try {
        console.log(req.body)
        const { username, password} = req.body

        const hasUser = await User.findOne({username})
        if(!hasUser) return res.status(400).json({error: 'User not found'})

        const isMatch = await bcrypt.compare(password, hasUser.password)
        if(!isMatch) return res.status(400).json({error: 'Invalid password'})

        genToken(hasUser._id, res)
        res.status(200).json({_id: hasUser._id,username: hasUser.username})
    } catch (error) {
        console.error("error in login",error.message)
        res.status(500).json({error: error.message})
    }
}

export const logout = async(req, res)=>{
    try {
        res.cookie('jwt', '', {
            maxAge: 0 //expiresIn: 0
        })
        res.status(200).json({message: 'Logged out successfully'})
    } catch (error) {
        console.error("error in logout",error.message)
        res.status(500).json({error: error.message})
    }
}
