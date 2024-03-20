const authController = {
  renderLogin(req, res) {
    res.render('login');
  },

  renderSignup(req, res) {
    res.render('signup');
  },
};

module.exports = authController;
