const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get posts with ID's with associated username and comments
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findAll(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
      ],
    });
    const commentsData = await Comment.findAll({
      where: {
          post_id: req.params.id
      },
      include: [
              {
                  model: User,
                  attributes: ['username'],
              },
          ],
  });
    const posts = postData.get({ plain: true });
    const comments = commentsData.map((comments =>
      comments.get({ plain: true })
      ));

    res.render('homepage', {
      title,
      posts,
      comments,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new post with authenticated user
router.post("/", withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update an existing post with authenticated user
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedPost) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post with authenticated user
// ===== /api/posts/8
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // // Delete all comments related to the post
    // await Comment.destroy({
    //   where: { post_id: req.params.id },
    // });
    console.log("THIS IS PARAMS!!!  ",req.params)

    const deletedPost = await Post.destroy({
      where: { id: req.params.id },
    });

    if (!deletedPost) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;