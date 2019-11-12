let db = require('../util/database');

async function newUser(data){
    let sql = `
        INSERT INTO user (fname, lname, email, password)
        VALUES ('${data.fname}','${data.lname}','${data.email}','${data.password}')
        `;
    await db.execute(sql);
}

async function getUser(id){
    return await db.execute(`
        SELECT * 
        FROM user
        WHERE userID =${id}`);
}

function updateUserInfo(data){
    let sql = `
        UPDATE user
        SET image ='${data.image}',
            description = '${data.about}',
            country = '${data.country}',
            birthday = STR_TO_DATE('${data.birth}', '%Y-%m-%d')
        WHERE userID ='${data.userID}'
        `;
    db.execute(sql);
}

async function updateLike(id, value){
    let sql = `
        UPDATE user
        SET like ='${value}'
        WHERE userID ='${data.userID}'
        `;
    await db.execute(sql);
}

module.exports = {
    getUser: getUser,
    addUser: newUser,
    update: updateUserInfo,
    like: updateLike,
}