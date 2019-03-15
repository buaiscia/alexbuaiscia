//REQUIREMENTS

const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    spacePost = require("./models/spacePost"),
    Comment = require("./models/spaceComment"),
    devPost = require("./models/devPost"),
    devComment = require("./models/devComment"),
    User = require("./models/user"),
    compression = require('compression'),
    helmet = require('helmet');
app.locals.moment = require('moment');

// seedDB = require("./seeds");




// SETTING OTHER STUFF

var url = process.env.DATABASEURL || "mongodb://localhost:27017/alexDB"
mongoose.connect(url, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(compression());
app.use(helmet());

app.use(flash());
// seedDB();



// SETTING ROUTES

const indexRoute = require("./routes/index");

// WRITING ROUTE

// const publishedRoute = require('./routes/writing/published'),
//     blogWritingRoute = require('./routes/writing/writingblog');

// SPACE ROUTE

const spaceBlogRoute = require('./routes/space/spaceblog');
const spaceCommentRoute = require('./routes/space/comments');


// DEV ROUTE

const devlifeRoute = require('./routes/dev/devlife');
const devblogRoute = require('./routes/dev/devblog');
const devCommentRoute = require('./routes/dev/devcomments');


// PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "Sahaja yoga is supporting this",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success")
    next();
});


// USING ROUTES

app.use('/', indexRoute);
// app.use('/pubblicazioni', publishedRoute);
// app.use('/scritturablog', blogWritingRoute);
app.use('/spaceblog', spaceBlogRoute);
app.use('/spaceBlog/:id/comments', spaceCommentRoute);
app.use('/devlife', devlifeRoute);
app.use('/devblog', devblogRoute);
app.use('/devblog/:id/devcomment', devCommentRoute);


app.get('*', function(req, res) {
    res.status(404).send('what are you doing here???');
});

// SERVER

app.listen(process.env.PORT || 5000, function() {
    console.log("server started on port 5000");
});

// app.listen(process.env.PORT, process.event.IP);