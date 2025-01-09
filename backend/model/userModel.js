import { Schema, model } from "mongoose"

const UserS = new Schema({
    username: {
        type: String,
        required: [true, 'Username required'] // does it work?
    },
    password: {
        type: String,
        required: [ true, 'Password required']
    }
})
const User = model('User', UserS)
export default User