let db = require('../util/database');

function addConversation(data){
    let sql = "INSERT INTO conversation (userID, partnerID, topic) VALUES ('" + data.userID + "','" + data.partnerID + "','" + data.topic + "')";
    db.execute(sql);
}

function getLatestConversation() {
    return db.execute(`SELECT COUNT(*) as count
            FROM conversation`)
}

function addMessage(data) {
    let sql = "INSERT INTO message (userID, conversationID, message, date) VALUES ('" + data.userID + "','" + data.conversationID + "','" + data.message + "' ,'" + data.date + "')";
    db.execute(sql);
}

function getAllConversations(id){
    return db.execute(`SELECT c.conversationID, u.image, c.topic, u.fname, u.lname, us.image, us.fname, us.lname, MAX(date) as date
            FROM conversation c
            LEFT JOIN user u ON c.partnerID = u.userID
            LEFT JOIN user us ON c.userID = us.userID
            LEFT JOIN message m ON c.conversationID = m.conversationID
            WHERE c.userID = '${id}' OR c.partnerID = '${id}'
            GROUP BY c.conversationID
            ORDER BY date DESC
        `);
}

function getAllMessages(conversationID) {
    return db.execute(`
        SELECT m.messageID, m.message, m.date, c.conversationID, u.userID, u.image
        FROM message m
        LEFT JOIN conversation c ON m.conversationID = c.conversationID
        LEFT JOIN user u ON m.userID = u.userID
        WHERE c.conversationID = '${conversationID}'
        ORDER BY m.date DESC
    `);
}

function getConversationCount(id){
    return db.execute(`
            SELECT COUNT(conversationID) as count
            FROM conversation
            WHERE userID =${id}
            OR partnerID =${id}    
            `)
}

module.exports = {
    addconvo: addConversation,
    getconversations: getAllConversations,
    getmessage: getAllMessages,
    addmessage: addMessage,
    getlatest: getLatestConversation,
    getCount: getConversationCount,
}