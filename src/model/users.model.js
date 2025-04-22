import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 },
    userId: { type: String, required: true, unique: true, trim: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
