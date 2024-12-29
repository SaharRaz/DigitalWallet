import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        balance: { type: Number, required: true, default: 0 },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // References users
    },
    { timestamps: true }
);

const Group = mongoose.model('Group', groupSchema);

export default Group;
