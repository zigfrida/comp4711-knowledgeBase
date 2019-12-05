let messageModel = require("../models/messageModel");
let userModel = require("../models/userModel")

exports.getConversations = (req, res, next) => {
    let userID = req.session.userID;
    let conversations = messageModel.getconversations(userID);
    conversations.then(([rows])=> {
        let rowData = JSON.parse(JSON.stringify(rows));
        res.render('messages', {
            user: userID,
            conversation: rowData,
            messageCSS: true,
            openConvo: false
        })
    })
}

exports.getMessages = (req, res, next) => {
    let userID = req.session.userID;
    
    let conversationID = req.params.conversationID;
    let conversations = messageModel.getconversations(userID);
    conversations.then(([rows])=> {
        let rowData = JSON.parse(JSON.stringify(rows));
        let messages = messageModel.getmessage(conversationID)
        messages.then(([mRows]) => {
            let mRowData = JSON.parse(JSON.stringify(mRows));
            res.render('messages', {
                user: userID,
                conversation: rowData,
                messages: mRowData,
                messageCSS: true, 
                conversationID: conversationID,
                openConvo: true
            });
        });
        
    });
}

exports.conversationMessage = (req, res, next) => {
    let userID = req.session.userID;
    let conversationID = req.body.conversationID;
    let message = req.body.message;
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    let messageObject = {
        userID : userID,
        conversationID : conversationID,
        message : message,
        date : date,
    }

    messageModel.addmessage(messageObject)
    res.redirect(301, '/conversations/' + conversationID)
}

exports.newMessage = (req, res, next) => {
    let userID = req.params.id;
    let user = userModel.getUser(userID);
    user.then(([rows]) => {
        res.render('newMessage', {
            user: rows[0],
            newMessageCSS: true,
        });
    })
}

exports.newConversation = (req, res, next) => {
    let userID = req.session.userID;
    let partnerID = req.body.partnerID;
    let topic = req.body.subject;
    let message = req.body.message;
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    let conversationObject = {
        userID: userID,
        partnerID: partnerID,
        topic: topic,
    };

    messageModel.addconvo(conversationObject);
    let latestConvo = messageModel.getlatest();
    
    latestConvo.then(([rows]) => {
        let rowData = JSON.parse(JSON.stringify(rows));
        let messageObject = {
            userID: userID,
            conversationID: rowData[0].count,
            message: message,
            date: date,
        };

        messageModel.addmessage(messageObject);
        res.redirect(301, '/conversations');
    });
}
