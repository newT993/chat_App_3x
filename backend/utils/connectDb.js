import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:'chat_app_2x',
        })
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error connecting to MongoDB', error.message)
    }
}

export default connectDb;