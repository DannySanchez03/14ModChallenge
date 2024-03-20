const { Post, User } = require('../models');

const postController = {
  // Get a single post by ID and render the post details page
  async renderPost(req, res) {
    try {
      const postId = req.params.id;
      const post = await Post.findByPk(postId, {
        include: [{ model: User, attributes: ['username'] }]
      });
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }
      res.render('post', { post });
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'Error fetching post' });
    }
  },

  // Render the form for creating a new post
  renderNewPostForm(req, res) {
    res.render('newPost'); // Assuming you have a newpost handlebars template
  },

  // Handle the creation of a new post
  async createNewPost(req, res) {
    try {
      const { title, content } = req.body;
      const newPost = await Post.create({
        title,
        content,
        user_id: req.session.user_id // Assuming you have a user_id in the session
      });
      res.redirect('/dashboard'); // Redirect to the dashboard after creating the post
    } catch (error) {
      console.error('Error creating new post:', error);
      res.status(500).json({ error: 'Error creating new post' });
    }
  }
};

module.exports = postController;
