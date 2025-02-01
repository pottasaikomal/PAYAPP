import mongoose from 'mongoose';
import { DB_URL } from './config.js';
mongoose.connect(DB_URL);
console.log(DB_URL)
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        minLength: 4,
        maxLength: 30,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        minLength: 6,
        required: true
    },

    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})
export const User = mongoose.model('User', UserSchema);
const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})
export const Account = mongoose.model('Account', AccountSchema);