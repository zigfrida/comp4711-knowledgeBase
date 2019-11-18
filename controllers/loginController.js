let db = require('../util/database');

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    let sql = "SELECT * FROM user WHERE email LIKE '" + email + "' AND password='" + password + "'";
    let found = db.execute(sql);
    found.then(([rows]) => {
        if (rows.length > 0) {
            req.session.loggedin = true;
            req.session.userID = rows[0].userID;
            res.redirect(301, '/');
        } else {
            res.redirect(301, '/signup');
        }
    }).catch((err) => {
        console.log("Something went wrong. ", err);
        res.redirect(301, '/signup');
    });
}

exports.loginSignUp = (req, res, next) => {
    let user = res.locals.user;
    let sql = "SELECT * FROM user WHERE email LIKE '" + user.email + "' AND password='" + user.password + "'";
    let found = db.execute(sql);
    found.then(([rows]) => {
        if (rows.length > 0) {
            req.session.loggedin = true;
            req.session.userID = rows[0].userID;
            res.redirect(301, '/moreDetails');
        } else {
            res.redirect(301, '/signup');
        }
    }).catch((err) => {
        console.log("Something went wrong. ", err);
        res.redirect('/signup');
    });
}

exports.loggedin = (req, res, next) => {
    if (req.session.loggedin) {
        next();
    } else {
        res.redirect(301, '/signup');
    }
}

exports.auth = (req, res, next) => {
    let userID = req.params.id;
    if (req.session.userID != userID) {
        next();
    } else {
        console.log("Cannot like own profile page");
        res.redirect(301, `/profile/${userID}`);
    }
}

exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect(301, '/signup');
}