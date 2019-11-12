let commentModel = require("../models/commentModel");

exports.newComment = (req, res, next) => {
    let userID = 1;
    let postID = req.body.postID;
    let comment = req.body.new_comment;

    let commentObject = {
        userID: userID,
        postID: postID,
        comment: comment,
    }

    commentModel.add(commentObject);
    res.redirect(301, '/');
}