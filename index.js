const express = require('express');
const app = express();
const s3 = require("./s3");
const config = require('./config');
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const csurf = require('csurf');
const bcrypt = require('./db/bcrypt');
const cookieSession = require("cookie-session");
const db = require("./db/db.js");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
const compression = require('compression');

app.use(compression());


if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static(__dirname + '/public'));


app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

function checkLogin(req, res, next) {
    !req.session.isLoggedIn
        ? res.redirect('/welcome')
        : next();
}

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {

    if (req.file) {
        var imageUrl = config.s3UrlStart + req.file.filename;

        db.updateUserProfilePic(req.session.userId , imageUrl ).then(()=>{
            res.json({
                imageUrl : imageUrl,
                success: true });
        });

    } else {
        res.json({ success: false });
    }

});


app.post('/registration', (req , res)=>{
    if (req.body.firstname == "" || req.body.lastname == "" || req.body.email == "" || req.body.password == "") {
        res.json({
            "success" : false,
            "message" : "Please Fill in the whole fields"
        });
    }else {
        db.checkEmail(req.body.email).then((results)=>{
            if (results.length == 0) {
                bcrypt.hashPassword(req.body.password).then((hashedPassword)=>{
                    db.createUser(req.body.firstname, req.body.lastname, req.body.email, hashedPassword).then((results)=>{
                        req.session.isLoggedIn = true;
                        console.log(results);
                        req.session.userId = results.id;
                        res.json({
                            success : true,
                            message : "User created successfully"
                        });
                    });
                }).catch(err=>{
                    console.log(err);
                });
            }else {
                req.session.loggedIn = false;
                res.json({
                    success : false,
                    message : "Duplicate Email found, Please use another email address"
                });
            }
        });
    }
});

app.post('/login' , (req , res) => {
    var userInfo;
    if (req.body.email == "" || req.body.password == "") {
        res.json({
            "success" : false,
            "message" : "Please Fill in the whole fields"
        });
    }else {
        db.checkEmail(req.body.email).then((results)=>{
            if (results.length == 0) {
                res.json({
                    "success" : false,
                    "message" : "E-Mail does not exist, Please try again"
                });
            }else {
                userInfo = results[0];
                const hashedPwd = userInfo.hashed_password;
                bcrypt.checkPassword(req.body.password,hashedPwd).then((checked)=>{
                    if (checked) {
                        req.session.isLoggedIn = true;
                        req.session.userId = userInfo.id;
                        res.json({
                            success : true,
                            message : "User Logged in successfully"
                        });
                    }else {
                        res.json({
                            success : false,
                            message : "Password does not match, Please try again"
                        });
                    }
                });
            }
        });
    }
});

app.get('/welcome', (req , res) => {
    req.session.isLoggedIn
        ? res.redirect('/')
        : res.sendFile(`${__dirname}/index.html`);
});

app.get('/user', checkLogin, (req , res) => {
    db.getUserInfoById(req.session.userId).then((results)=>{
        res.json({
            ...results
        });
    }).catch(()=>{
        res.sendStatus(500);
    });
});

app.post('/user-bio', checkLogin, (req , res)=>{
    console.log(req.body);
    // db.updateUserBio(req.session.userId, req.body.bio).then((results)=>{
    //     res.json({
    //         bio : results.bio,
    //         success : true,
    //         message : "User created successfully"
    //     });
    // }).catch(err=>{
    //     console.log(err);
    // });

});


app.get('*', checkLogin, (req, res) =>
    res.sendFile(`${__dirname}/index.html`)
);

app.listen(8080, function() {
    console.log("I'm listening.");
});
