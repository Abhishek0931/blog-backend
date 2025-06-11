import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
    coverImage: { type: String }, // Optional: for image uploads
    views: { type: Number, default: 0},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('BlogPost', blogPostSchema);