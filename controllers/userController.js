let userModel = require("../models/userModel");
let postModel = require("../models/postModel");
let commentModel = require("../models/commentModel");
let dateFormat = require('dateformat');

exports.getUser = async (req, res, next) => {
    let userID = req.params.id;
    let user = userModel.getUser(userID);
    user.then(async function ([data]) {
        let userData = await JSON.parse(JSON.stringify(data));
        userData[0].birthday = dateFormat(userData[0].birthday, "dd mmm yyyy");

        let query = postModel.getUserPosts(userData[0].userID);
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
                    post.replies = await (rows2[0][0].count);
                }).catch((err) => {
                    console.log(err);
                });
            });
            userData[0].posts = await JSON.parse(JSON.stringify(posts[0]));
            res.render('profile', {
                profileCSS: true,
                user: userData[0],
                post: userData[0].posts,
            });
        });
    });
}

exports.signup = async function (req, res, next) {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let password = req.body.password;

    let userObject = {
        fname: fname,
        lanme: lname,
        email: email,
        password: password,
    }

    await userModel.addUser(userObject);
    res.locals.user = userObject;
    next();
}

exports.moreDetail = (req, res, next) => {
    let userID = req.session.userID;
    let image = req.body.image;
    let about = req.body.about;
    let country = req.body.country;
    let birth = req.body.date_birth;

    let updateObject = {
        userID: userID,
        image: image,
        about: about,
        country: country,
        birth: birth,
    }
    userModel.update(updateObject);
    res.redirect(301, '/');
}

exports.like = async function (req, res, next) {
    let userID = req.params.id;

    let user = userModel.getUser(userID);
    user.then(async function ([data]) {
        let userData = await JSON.parse(JSON.stringify(data));
        let numLikes = userData[0].likes;
        await userModel.like(id, numLikes);
        res.redirect(301, '/');
    }).catch((err) => {
        console.log(err);
    });
}