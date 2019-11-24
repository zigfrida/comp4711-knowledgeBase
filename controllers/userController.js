let userModel = require("../models/userModel");
let postModel = require("../models/postModel");
let commentModel = require("../models/commentModel");
let dateFormat = require('dateformat');

exports.getUser = async (req, res, next) => {
    let userID = req.params.id;
 
    let user = userModel.getUser(userID);
    user.then(([data]) => {
        let userData = JSON.parse(JSON.stringify(data));
        userData[0].birthday = dateFormat(userData[0].birthday, "dd mmm yyyy");
        let query = postModel.getUserPosts(userID);
        query.then(([rows]) => {
            let postsData = JSON.parse(JSON.stringify(rows));
            let postCount = postModel.getPostCount(userData[0].userID);
            postCount.then(([num]) => {
                let postCountData = JSON.parse(JSON.stringify(num));
                userData[0].postCount = postCountData[0].count;

                let commentQuery = commentModel.getAll();
                commentQuery.then(([comments]) => {
                    commentsData = JSON.parse(JSON.stringify(comments));
    
                    res.render('profile', {
                        pageTitle: "Profile Page",
                        profileCSS: true,
                        user: userData[0],
                        post: postsData,
                        comments: commentsData,
                    });
                });
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
        lname: lname,
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
        let numLikes = userData[0].likes + 1;
        await userModel.like(userID, numLikes);
        res.redirect(301, `/profile/${userID}`);
    }).catch((err) => {
        console.log(err);
    });
}