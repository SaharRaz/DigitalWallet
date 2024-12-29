import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
        message: { type: String, required: true },
        status: { type: String, enum: ['UNREAD', 'READ'], default: 'UNREAD' }, // Notification status
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
