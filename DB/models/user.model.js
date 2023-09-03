import { Schema, Types, model } from "mongoose";


const userSchema = new Schema({
    name: { type: String, require: true, trim: true, minLength: 5, maxLength: 30 },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    age: Number,
    phone: String,
    gender: { type: String, enum: ['Male', 'Female', 'Not Selected'] },
    confirmEmail: { type: Boolean, default: false },
    passwordChangedAt: Date,
    role: { type: String, enum: ['user', 'admin', 'manager'], default: "user" },
}, { timestamps: true })

const userModel = model("user", userSchema)

export default userModel;