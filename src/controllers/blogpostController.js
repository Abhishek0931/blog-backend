import blogPostService from '../services/blogpostService.js';

class BlogPostController {
    async create(req, res) {
        try {
            const blogData = {
                ...req.body,
                author: req.user.id, // assuming authenticate middleware sets req.user
                coverImage: req.file ? req.file.path : undefined
            }
            const blogPost = await blogPostService.createBlogPost(blogData);
            res.status(201).json(blogPost);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const posts = await blogPostService.getAllBlogPosts();
            res.json(posts);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getById(req, res) {
        try {
            const post = await blogPostService.getBlogPostAndIncrementView(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            res.json(post);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async update(req, res) {
        try {
            const post = await blogPostService.updateBlogPost(req.params.id, req.body);
            if (!post) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            res.json(post);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async delete(req, res) {
        try {
            const post = await blogPostService.deleteBlogPost(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            res.json({ message: 'Blog post deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async search(req, res) {
        try {
            const { q } = req.query;
            if (!q) {
                return res.status(400).json({ message: 'Query is required'});
            }
            const results = await blogPostService.searchBlogPosts(q);
            res.json(results);
        }
        catch (err) {
            res.status(500).json({ message: err.message});
        }
    }

    async like(req,res) {
        try{
            const post = await blogPostService.likeBlogPost(req.params.id, req.user.id);
            if (!post) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            res.json({
                message: 'Blog Liked',
                likes: post.likes.length,
                dislikes: post.dislikes.length,
                likedByUser: post.likes.includes(req.user.id)
            });
        }
        catch (err) {
            res.status(500).json({ message: err.message});
        }
    }

    async dislike (req, res) {
        try {
            const post = await blogPostService.dislikeBlogPost(req.params.id,req.user.id);
            if (!post) {
                return res.status(404).json({ message: 'Blog Post not found' });
            }
            res.json({
                message: 'Blog Disliked',
                likes: post.likes.length,
                dislikes: post.dislikes.length,
                likedByUser: post.likes.includes(req.user.id)
            });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async report(req, res) {
        try {
            const post = await blogPostService.reportBlogPost(req.params.id, req.user.id);
            if(!post) {
                return res.status(404).json({ message: 'Blog Post not found' });
            }
            res.json({ message: 'Blog Reported', reports: post.reports.length });
        }
        catch (err) {
            res.status(500).json({ message: err.message});
        }
    }

}

const blogpostController = new BlogPostController();
export default blogpostController;