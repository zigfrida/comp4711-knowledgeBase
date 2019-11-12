const express = require('express');
const router = express.Router();
const homeController = require("../controllers/homeController");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const loginController = require("../controllers/loginController");


router.get('/', homeController.getHomePage);

router.get('/profile/:id', userController.getUser);

router.get('/login', function (req, res) {
    res.render('login', {
        pageTitle: 'Login',
        signupCSS: true,
    });
});

router.get('/signup', function (req, res) {
    res.render('signup', {
        pageTitle: 'Signup',
        signupCSS: true,
        loginNAV: true,
    });
});

router.get('/moreDetails', function (req, res) {
    res.render('moreDetails', {
        pageTitle: 'Complete Registration',
        signupCSS: true,
    });
});

router.post('/search', homeController.getSearch);
router.post('/searchTopic', homeController.getSearchTopic);
router.post('/newPost', postController.newPost);
router.post('/newComment', commentController.newComment);

router.post('/signup', userController.signup, loginController.loginSignUp);
router.post('/login', loginController.login);
router.post('/moreDetails', userController.moreDetail);

router.get('/logout', loginController.logout);

module.exports = router;