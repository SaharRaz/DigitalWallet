import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true }, // Removed redundant index: true
        balance: { type: Number, required: true, default: 0 },
        userId: {
            type: String,
            required: true,
            trim: true,
            unique: true // Unique index applied here
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Ensure indexes are properly created
userSchema.index({ userId: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

export default User;