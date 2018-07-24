const express = require('express');
const app = express();
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

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);


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
                        req.session.LoggedIn = true;
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


app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
