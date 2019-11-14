let postModel = require("../models/postModel");

exports.newPost = (req, res, next) => {
    let userID = req.session.userID;
    let subject = req.body.subject;
    let detail = req.body.detail;
    let topic = req.body.topic;
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    let postObject = {
        userID: userID,
        subject: subject,
        detail: detail,
        topic: topic,
        date: date,
    }

    postModel.add(postObject);  
    res.redirect(301, '/');
}
