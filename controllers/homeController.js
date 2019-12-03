let db = require('../util/database');
let dateFormat = require('dateformat');
let userModel = require('../models/userModel');
let postModel = require("../models/postModel");
let commentModel = require("../models/commentModel");

exports.getHomePage = (req, res, next) => {
    let pageNumber = req.params.num;
    if (pageNumber == undefined || pageNumber == "") {
        pageNumber = 0;
    }
    pageNumber = pageNumber * 5;

    let id = req.session.userID;

    let user = userModel.getUser(id);
    user.then(([data]) => {
        let userData = JSON.parse(JSON.stringify(data));
        userData[0].birthday = dateFormat(userData[0].birthday, "dd mmm yyyy");
        let postQuery = postModel.getPosts(pageNumber);
        postQuery.then((rows) => {
            let posts = JSON.parse(JSON.stringify(rows));
            let commentQuery = commentModel.getAll();
            commentQuery.then(([comments]) => {
                commentsData = JSON.parse(JSON.stringify(comments));
                let postCount = postModel.getPostCount(id);
                postCount.then(([count]) => {
                    countData = JSON.parse(JSON.stringify(count));
                    res.render('home', {
                        pageTitle: "Home Page",
                        user: userData[0],
                        post: posts[0],
                        comments: commentsData,
                        postCount: countData[0].count,
                    });
                });
            });
        });
    });
}

exports.getSearch = (req, res, next) => {
    let pattern = req.body.search;
    let id = req.session.userID;

    let user = userModel.getUser(id);
    user.then(([data]) => {
        let userData = JSON.parse(JSON.stringify(data));
        let postQuery = postModel.getSearch(pattern);
        postQuery.then((rows) => {
            let posts = JSON.parse(JSON.stringify(rows));
            let commentQuery = commentModel.getAll();
            commentQuery.then(([comments]) => {
                commentsData = JSON.parse(JSON.stringify(comments));
                let postCount = postModel.getPostCount(id);
                postCount.then(([count]) => {
                    countData = JSON.parse(JSON.stringify(count));
                    res.render('home', {
                        pageTitle: "Home Page",
                        search: true,
                        user: userData[0],
                        post: posts[0],
                        comments: commentsData,
                        postCount: countData[0].count,
                    });
                });
            });
        });
    });
}

exports.getSearchTopic = (req, res, next) => {
    let topic = req.body.topic;
    let id = req.session.userID;

    let user = userModel.getUser(id);
    user.then(([data]) => {
        let userData = JSON.parse(JSON.stringify(data));
        let postQuery = postModel.getByTopic(topic);
        postQuery.then((rows) => {
            let posts = JSON.parse(JSON.stringify(rows));
            let commentQuery = commentModel.getAll();
            commentQuery.then(([comments]) => {
                commentsData = JSON.parse(JSON.stringify(comments));
                let postCount = postModel.getPostCount(id);
                postCount.then(([count]) => {
                    countData = JSON.parse(JSON.stringify(count));
                    res.render('home', {
                        pageTitle: "Home Page",
                        search: true,
                        user: userData[0],
                        post: posts[0],
                        comments: commentsData,
                        postCount: countData[0].count,
                    });
                });
            });
        });
    });
}