var express     =   require("express"),
    router      =   express.Router(),
    passport    =   require("passport"),
    User        =   require("../models/user");



router.get("/register", function(req, res) {
    res.render("users/register");
});

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err)  {
            req.flash("error", err["name"] + " : " + err["message"]);
            res.redirect("/register");
        }
        else {
            passport.authenticate("local")(req, res, function() {
                req.flash("success", "Account successfully created");
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login", function(req, res) {
    res.render("users/login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
        console.log(req);
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged out successfully");
    res.redirect("/campgrounds");
});


module.exports = router;