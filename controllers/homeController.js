let db = require('../util/database');
let dateFormat = require('dateformat');
let userModel = require('../models/userModel');
let postModel = require("../models/postModel");
let commentModel = require("../models/commentModel");

exports.getHomePage = async (req, res, next) => {
    let pageNumber = req.query.page;
    if (pageNumber == undefined || pageNumber == "") {
        pageNumber = 0;
    }
    pageNumber = pageNumber * 5;

    let id = req.session.userID;

    let user = userModel.getUser(id);
    user.then(async function ([data]) {
        let userData = await JSON.parse(JSON.stringify(data));
        userData[0].birthday = dateFormat(userData[0].birthday, "dd mmm yyyy");

        let query = postModel.getPosts(pageNumber);
        query.then(async function (rows) {
            let posts = await JSON.parse(JSON.stringify(rows));
            posts[0].forEach(async function (post) {
                post.date = dateFormat(post.date, "dd mmm yyyy");

                let query1 = commentModel.getComments(post.postID);
                query1.then(async function (rows1) {
                    post.comments = await JSON.parse(JSON.stringify(rows1[0]));
                }).catch((err) => {
                    console.log(err);
                });

                let query2 = commentModel.getRepliesCount(post.postID);
                query2.then(async function (rows2) {
                    post.replies = await rows2[0][0].count;
                }).catch((err) => {
                    console.log(err);
                });
            });
            res.render('home', {
                pageTitle: "Home Page",
                user: userData[0],
                post: posts[0],
            });
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
}

exports.getSearch = async (req, res, next) => {
    let pattern = req.body.search;

    let id = req.session.userID;

    let user = userModel.getUser(id);
    user.then(async function ([data]) {
        let userData = await JSON.parse(JSON.stringify(data));

        let query = postModel.getSearch(pattern);
        query.then(async function(rows) {
            let posts = await JSON.parse(JSON.stringify(rows));
            posts[0].forEach(async function (post) {
                post.date = dateFormat(post.date, "dd mmm yyyy");
                let query1 = commentModel.getComments(post.postID);
                query1.then(async function (rows1) {
                    post.comments = await JSON.parse(JSON.stringify(rows1[0]));
                }).catch((err) => {
                    console.log(err);
                });
                let query2 = commentModel.getRepliesCount(post.postID);
                query2.then(async function (rows2) {
                    let num = await (rows2[0][0].count);
                    if(num == undefined){
                        post.replies = 0;
                    } else {
                        post.replies = num;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            });
            res.render('home', {
                pageTitle: "Home Page",
                search: true,
                user: userData[0],
                post: posts[0],
            });
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
}

exports.getSearchTopic = async (req, res, next) => {
    let topic = req.body.topic;

    let id = req.session.userID;

    let user = userModel.getUser(id);
    user.then(async function ([data]) {
        let userData = await JSON.parse(JSON.stringify(data));

        let query = postModel.getByTopic(topic);
        query.then(async function (rows) {
            let posts = await JSON.parse(JSON.stringify(rows));
            posts[0].forEach(async function (post) {
                post.date = dateFormat(post.date, "dd mmm yyyy");
                let query1 = commentModel.getComments(post.postID);
                query1.then(async function (rows1) {
                    post.comments = await JSON.parse(JSON.stringify(rows1[0]));
                }).catch((err) => {
                    console.log(err);
                });
                let query2 = commentModel.getRepliesCount(post.postID);
                query2.then(async function (rows2) {
                    let num = await (rows2[0][0].count);
                    if (num == undefined) {
                        post.replies = 0;
                    } else {
                        post.replies = num;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            });
            res.render('home', {
                pageTitle: "Home Page",
                search: true,
                user: userData[0],
                post: posts[0],
            });
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
}