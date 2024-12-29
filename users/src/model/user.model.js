import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, index: true }, // Indexed field
        balance: { type: Number, required: true, default: 0 },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const User = mongoose.model('User', userSchema);

export default User;
