import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: false }, 
    email: { type: String, required: true },
    image: { type: String ,required: false },
    provider: { type: String, required: true },
});


const User = models.User || model('User', UserSchema)

export default User