const express = require('express');
const router = express.Router();
const homeController = require("../controllers/homeController");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const loginController = require("../controllers/loginController");
const messageController = require("../controllers/messageController");


router.get('/', loginController.loggedin, homeController.getHomePage);

router.get('/profile/:id', userController.getUser);

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

router.get('/newMessage/:id', messageController.newMessage)
router.post('/newConversation/', messageController.newConversation)
router.get('/conversations', messageController.getConversations)
router.get('/conversations/:conversationID', messageController.getMessages)
router.post('/sendNewMessage', messageController.conversationMessage)
router.get('/editProfile', function (req, res) {
    res.render('editProfile', {
        pageTitle: 'Edit Profile',
        signupCSS: true,
    });
});

router.post('/search', loginController.loggedin,  homeController.getSearch);
router.post('/searchTopic', loginController.loggedin, homeController.getSearchTopic);
router.post('/newPost', loginController.loggedin, postController.newPost);
router.post('/newComment', loginController.loggedin, commentController.newComment);
router.post('/signup', userController.signup, loginController.loginSignUp);
router.post('/login', loginController.login);
router.post('/moreDetails', loginController.loggedin, userController.moreDetail);
router.post('/editProfile', loginController.loggedin, userController.updateProfile)

router.post('/logout', loginController.logout);

router.post('/like/:id', loginController.auth, userController.like);

module.exports = router;