import BlogPost from '../models/blogpost.js';

const createBlogPost = async (data) => BlogPost.create(data);

const getAllBlogPosts = async () => BlogPost.find()
    .populate('author', 'username')
    .populate('category', 'name')
    .populate('subcategory', 'name');

const getBlogPostById = async (id) => BlogPost.findById(id)
    .populate('author', 'username')
    .populate('category', 'name')
    .populate('subcategory', 'name');

const updateBlogPost = async (id, data) =>
    BlogPost.findByIdAndUpdate(id, data, { new: true });

const deleteBlogPost = async (id) => BlogPost.findByIdAndDelete(id);

const searchBlogPostsByTitle = async (query) => 
    BlogPost.find({ title: { $regex: query, $options: 'i'}});

const incrementViewCount = async (id) => 
    BlogPost.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });

const likeBlogPost = async (postId, userId) => {
    return BlogPost.findByIdAndUpdate(
        postId,
        {
            $addToSet: { likes: userId},
            $pull: { dislikes: userId }
        },
        { new: true}
    );
}

const dislikeBlogPost = async (postId, userId) => {
    return BlogPost.findByIdAndUpdate(
        postId,
        {
            $addToSet: { dislikes: userId},
            $pull: { likes: userId }
        },
        { new: true }
    );
}

const reportBlogPost = async (postId, userId) => {
    return BlogPost.findByIdAndUpdate(
        postId,
        {
            $addToSet: { reports: userId }
        },
        { new: true }
    );
}

export default {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost,
    searchBlogPostsByTitle,
    incrementViewCount,
    likeBlogPost,
    dislikeBlogPost,
    reportBlogPost,
};