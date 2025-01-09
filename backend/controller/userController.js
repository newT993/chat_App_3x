export const getMe = async(req, res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(error.code).json({message: error.message})
        console.error("Error in getMe", error.message)
    }
}