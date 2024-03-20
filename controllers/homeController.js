const { Post, User } = require('../models');

const homeController = {
  async renderHomePage(req, res) {
    try {
      // Fetch all posts and include the user who created each post
      const posts = await Post.findAll({ include: User });
      res.render('home', { posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Error fetching posts' });
    }
  }
};

module.exports = homeController;
