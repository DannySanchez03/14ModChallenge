// Imports
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all Posts and JOIN with user data and comment data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) =>post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route set up to find single blog post and render blogPost page
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      // Join user data and comment data with blog post data
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);

    res.render("comment", {post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
    // res.redirect("/login");
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["username"] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard/new', withAuth,(req, res)=> {
  res.render('newpost', { logged_in: req.session.logged_in})
})

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

router.get("/newpost", withAuth, (req, res) => {
  res.render("newpost");
});

router.get("/edit-post/:id", async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id);
      const post = postData.get({ plain: true });
      res.render("edit-post", {
          post,
          logged_in: req.session.logged_in,
      });
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;