let postModel = require("../models/postModel");
let dateFormat = require('dateformat');

exports.newPost = (req, res, next) => {
    let userID = 3;
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
