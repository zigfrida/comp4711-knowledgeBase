let db = require('../util/database');

function addPost(data) {
    let sql = "INSERT INTO post (userID, subject, detail, topic, date) VALUES ('" + data.userID + "','" + data.subject +  "','" + data.detail + "','" + data.topic + "','" + data.date + "')";
    db.execute(sql);
}

async function getLatestPosts(pageNumber) {
    return await db.execute(
        `SELECT p.userID, p.postID, u.image, p.subject, p.detail, p.topic, p.date
        FROM post p 
        LEFT JOIN user u ON p.userID = u.userID
        ORDER BY p.date DESC
        LIMIT ${pageNumber}, 5`);
}

async function getSearchPosts(pattern){
    return await db.execute(`
        SELECT p.postID, u.image, p.subject, p.detail, p.topic, p.date
        FROM post p
        LEFT JOIN user u ON p.userID = u.userID
        WHERE p.subject LIKE '%${pattern}%'
        ORDER BY p.date DESC
    `);
}

async function getSearchTopicPosts(pattern) {
    return await db.execute(`
        SELECT p.postID, u.image, p.subject, p.detail, p.topic, p.date
        FROM post p
        LEFT JOIN user u ON p.userID = u.userID
        WHERE p.topic ='${pattern}'
        ORDER BY p.date DESC
    `);
}

async function getPostsByUser(id){
    return await db.execute(`
        SELECT p.postID, u.image, p.subject, p.detail, p.topic, p.date
        FROM post p
        LEFT JOIN user u ON p.userID = u.userID
        WHERE p.userID ='${id}'
        ORDER BY p.date DESC
    `);
}

async function getPostCount(id) {
    return await db.execute(`
            SELECT COUNT(*) AS count 
            FROM post p 
            WHERE userID =${id}`);
}

module.exports = {
    add: addPost,
    getPosts: getLatestPosts,
    getSearch: getSearchPosts,
    getByTopic: getSearchTopicPosts,
    getUserPosts: getPostsByUser,
    getPostCount: getPostCount,
}