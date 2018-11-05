const express = require('express');
const app = express();
const server = require('http').Server(app);

let domain;
if (process.env.NODE_ENV == "production") {
    domain = 'https://alaa-todo.herokuapp.com:*';
} else {
    domain = 'localhost:8080';
}

const s3 = require("./s3");
const config = require('./config');
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const bcrypt = require('./db/bcrypt');
const db = require("./db/db.js");

app.use(cookieSession({
    secret: 'nobody knows this secret but me',
    maxAge: 1000 * 60 * 60 * 24 * 7 * 6
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

const compression = require('compression');

app.use(compression());

app.use(express.static(__dirname + '/public'));

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

app.post('/registration', async (req , res)=>{
    console.log(req.body);
    const results = await db.checkEmail(req.body.email);
    if (results.length == 0) {
        const hashedPassword = await bcrypt.hashPassword(req.body.password);
        const user = await db.createUser(req.body.firstname, req.body.lastname, req.body.email, hashedPassword);
        req.session.isLoggedIn = true;
        req.session.userId = user.id;
        res.json({
            success : true,
            message : "User created successfully"
        });
    }else {
        req.session.loggedIn = false;
        res.json({
            success : false,
            message : "Duplicate Email found, Please use another email address"
        });
    }
});

app.post('/login' , async (req , res) => {
    var userInfo;
    const results = await db.checkEmail(req.body.email);
    if (results.length == 0) {
        res.json({
            "success" : false,
            "message" : "E-Mail does not exist, Please try again"
        });
    }else {
        userInfo = results[0];
        const hashedPwd = userInfo.hashed_password;
        const checked = await bcrypt.checkPassword(req.body.password,hashedPwd);
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
    }
});

app.get('/user', checkLogin, async (req , res) => {
    const results = await db.getUserInfoById(req.session.userId);
    res.json({
        ...results
    });

});

app.post("/create-project", checkLogin, async (req, res) => {
    const project = await db.createProject(
        req.session.userId,
        req.body.title,
        req.body.description
    );
    req.session.createdProjectInfo = project;
    res.json({
        ...project
    });

});

let projectsTasksArray = [];
app.get("/user-projects", async (req, res) => {
    let projects = [];
    const projectsArray = await db.getUserProjects(req.session.userId);
    projects = projectsArray;
    for (let i = 0; i < projectsArray.length; i++) {
        const results = await db.getUserProjectTasks(projectsArray[i].id);
        projects[i].tasks = results;
        projectsTasksArray.push(projects[i]);
    }

    let projectsTasks = [];
    for (var i = 0; i < projectsTasksArray.length; i++) {
        projectsTasks.push(projectsTasksArray[i]);
    }
    projectsTasksArray = [];
    console.log(projectsTasks);
    res.json({
        projectsTasks
    });
});

app.post('/get-project-tasks', async ( req , res )=>{
    const projectTasks = await db.getUserProjectTasks(req.body.projectId);
    res.json({
        projectTasks
    });
});

app.post('/update-project', async ( req , res )=>{
    console.log('user project info ', req.body);
    const updatedProject = await db.updateUserProject(req.session.userId, req.body.projectId, req.body.title || req.body.projectTitle, req.body.description || req.body.projectDescription);
    res.json({
        updatedProject
    });
});

app.post('/delete-project', async ( req , res )=>{
    console.log('delete Project ', req.body);
    await db.deleteProjectTasks(req.body.projectId);

    const deletedProject = await db.deleteUserProject(req.session.userId, req.body.projectId);
    res.json({
        deletedProject
    });
});

var hashedPassword;
app.post("/update-user-info", (req, res) => {
    console.log("update user info ", req.body);
    if (req.body.password) {
        bcrypt.hashPassword(req.body.password).then(results => {
            console.log("results ",results);
            hashedPassword = results;

        }).then(()=>{
            db.updateUserInfo(
                req.body.firstname || req.body.userInfo.first_name,
                req.body.lastname || req.body.userInfo.last_name,
                req.body.gender || req.body.userInfo.gender,
                req.body.phonenumber || req.body.userInfo.phone_number,
                req.body.email || req.body.userInfo.email,
                hashedPassword || req.body.userInfo.hashed_password,
                req.session.userId
            ).then(results => {
                console.log("After Updating User Info ",results);
                res.json({
                    ...results
                });
            });
        });
    }else {
        db.updateUserInfo(
            req.body.firstname || req.body.userInfo.first_name,
            req.body.lastname || req.body.userInfo.last_name,
            req.body.gender || req.body.userInfo.gender,
            req.body.phonenumber || req.body.userInfo.phone_number,
            req.body.email || req.body.userInfo.email,
            req.body.userInfo.hashed_password,
            req.session.userId
        ).then(results => {
            console.log("After Updating User Info ",results);
            res.json({
                ...results
            });
        });
    }

});

app.post('/user-bio', checkLogin, (req , res)=>{
    console.log("Here is the bio ", req.body.bioText);
    console.log(req.session.userId);
    db.updateUserBio(req.session.userId, req.body.bioText).then((results)=>{
        res.json({
            bioText : results.bio,
            success : true,
            message : "User created successfully"
        });
    }).catch(err=>{
        console.log(err);
    });

});

app.get('/logout', checkLogin, (req, res) =>{
    req.session.isLoggedIn = false;
    req.session.userId = null;
    res.sendFile(`${__dirname}/index.html`);

});

app.get('/welcome', (req , res) => {
    req.session.isLoggedIn
        ? res.redirect('/')
        : res.sendFile(`${__dirname}/index.html`);
});


app.get('*', checkLogin, (req, res) =>
    res.sendFile(`${__dirname}/index.html`)
);

server.listen((process.env.PORT || 8080), function() {
    console.log("I'm listening.");
});
