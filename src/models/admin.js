import mongoose from'mongoose';
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type:String,
        required: true
    },

    profilePic: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: String,
        default: Date.now
    }

});

export default mongoose.model('Admin', adminSchema);

