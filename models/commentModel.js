let db = require('../util/database');

function addComment(data){
    let sql = "INSERT INTO comment (userID, postID, comment) VALUES ('" + data.userID + "','" + data.postID + "','" + data.comment + "')";
    db.execute(sql);
}

function getAllComments(){
    return db.execute(`SELECT c.postID, u.userID, u.image, c.comment 
            FROM comment c
            LEFT JOIN user u ON c.userID = u.userID`);
}

module.exports = {
    add: addComment,
    getComments: getPostComments,
    getRepliesCount: getRepliesCount,
    getAll: getAllComments,
}