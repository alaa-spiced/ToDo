const express = require('express');
const app = express();
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
                        res.json({
                            success : true,
                            message : "User created successfully"
                        });
                        // req.session.userId = results.id;
                        // req.session.firstname = req.body.firstname;
                        // req.session.lastname = req.body.lastname;
                        // req.session.email = req.body.email;
                        // req.session.hashedPassword = hashedPassword;
                        // req.session.loggedIn = true;
                        // req.session.signed = false;
                        // res.redirect('/profile');
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
                        res.json({
                            success : true,
                            message : "User Logged in successfully"
                        });
                        // req.session.userId = userInfo.id;
                        // req.session.firstname = userInfo.firstname;
                        // req.session.lastname = userInfo.lastname;
                        // req.session.email = req.body.email;
                        // req.session.hashedPassword = hashedPwd;
                        // req.session.loggedIn = true;
                        // db.getSignature(userInfo.id).then((sigResult)=>{
                        //     if (sigResult.length != 0) {
                        //         req.session.signed = true;
                        //         res.redirect('/signed');
                        //     }else {
                        //         req.session.signed = false;
                        //         res.redirect('/sign');
                        //     }
                        // });
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


// app.get('/', (req , res)=> {
//     if (req.session.isLoggedIn) {
//         res.redirect('/logo');
//     }else {
//         res.redirect('/welcome');
//     }
//
// });

app.get("/welcome", function(req, res) {
    if (req.session.isLoggedIn) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
app.get("/", function(req, res) {
    if (!req.session.isLoggedIn) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});


app.get('*', function(req, res) {
    if (!req.session.isLoggedIn) {
        res.redirect('/welcome');
    }else {
        res.sendFile(__dirname + '/index.html');
    }

});

app.listen(8080, function() {
    console.log("I'm listening.");
});
