//REQUIREMENTS

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/spacePost"),
    Comment = require("./models/spaceComment"),
    User = require("./models/user");
// seedDB = require("./seeds");




// SETTING OTHER STUFF

mongoose.connect("mongodb://localhost:27017/alexDB", { useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


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

// const landingDev = require('./routes/dev/landingDev');


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
// app.use('/dev', landingDev);





app.get('*', function(req, res) {
    res.status(404).send('what???');
});

// SERVER

app.listen(4000, function() {
    console.log("server started on port 4000");
});