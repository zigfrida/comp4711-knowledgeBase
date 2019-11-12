let db = require('../util/database');

function addComment(data){
    let sql = "INSERT INTO comment (userID, postID, comment) VALUES ('" + data.userID + "','" + data.postID + "','" + data.comment + "')";
    db.execute(sql);
}

async function getPostComments(id){
    return await db.execute(`
            SELECT u.userID, u.image, c.comment 
            FROM comment c 
            LEFT JOIN user u ON c.userID = u.userID 
            WHERE postID = ${id}`);
}

async function getRepliesCount(id) {
    return await db.execute(`
            SELECT COUNT(*) AS count 
            FROM comment c 
            WHERE postID =${id}`);
}

module.exports = {
    add: addComment,
    getComments: getPostComments,
    getRepliesCount: getRepliesCount,
}