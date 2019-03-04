const express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");


// ROOT ROUTE

router.get("/", function(req, res) {
    res.render("landing");
});


// show register form
router.get("/register", function(req, res) {
    res.render("register", { page: 'register' });
});

//handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to my site " + user.username);
            res.redirect(req.session.redirectTo || '/');
        });
    });
});

//show login form
router.get("/login", function(req, res) {
    res.render("login", { page: 'login' });
});

//handling login logic


// router.post("/login", passport.authenticate("local", {

//     successRedirect: 'back',
//     successFlash: true,
//     failureRedirect: "/login",
//     failureFlash: true
// }));

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            next(err);
            return
        }
        // User does not exist
        if (!user) {
            req.flash('error', 'Invalid username or password');
            res.redirect('/login');
            return
        }
        req.logIn(user, function(err) {
            // Invalid password
            if (err) {
                req.flash('error', 'Invalid username or password');
                next(err);
                return
            }
            res.redirect(req.session.redirectTo || '/');
            return
        });
    })(req, res, next);
});



// logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});



module.exports = router;