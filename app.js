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
    User = require("./models/user"),
    compression = require('compression'),
    helmet = require('helmet');
app.locals.moment = require('moment');

// seedDB = require("./seeds");




// SETTING OTHER STUFF

// mongoose.connect("mongodb://localhost:27017/alexDB", { useNewUrlParser: true });
mongoose.connect("mongodb://alex:Buaiscia85@ds125372.mlab.com:25372/buaiscia", { useNewUrlParser: true });



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

const spaceBlogRoute = require('./routes/space/spaceBlog');
const spaceCommentRoute = require('./routes/space/comments');


// DEV ROUTE

const devlifeRoute = require('./routes/dev/devlife');
const devblogRoute = require('./routes/dev/devblog');


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





app.get('*', function(req, res) {
    res.status(404).send('what are you doing here???');
});

// SERVER

app.listen(4000, function() {
    console.log("server started on port 4000");
});

// app.listen(process.env.PORT, process.event.IP);