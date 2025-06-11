import blogPostRepo from '../Repository/blogpostRepo.js';

class BlogPostService {
    async createBlogPost(data) {
        return blogPostRepo.createBlogPost(data);
    }

    async getAllBlogPosts() {
        return blogPostRepo.getAllBlogPosts();
    }

    async getBlogPostById(id) {
        return blogPostRepo.getBlogPostById(id);
    }

    async updateBlogPost(id, data) {
        return blogPostRepo.updateBlogPost(id, data);
    }

    async deleteBlogPost(id) {
        return blogPostRepo.deleteBlogPost(id);
    }

    async searchBlogPosts(query) {
        return blogPostRepo.searchBlogPostsByTitle(query);
    }

    async getBlogPostAndIncrementView(id) {
        return blogPostRepo.incrementViewCount(id);
    }

    async likeBlogPost(postId, userId){
        return blogPostRepo.likeBlogPost(postId, userId);
    }

    async dislikeBlogPost(postId, userId) {
        return blogPostRepo.dislikeBlogPost(postId, userId);
    }

    async reportBlogPost(postId, userId) {
        return blogPostRepo.reportBlogPost(postId, userId);
    }
}

export default new BlogPostService();