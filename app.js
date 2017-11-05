var expressSanitizer    =   require("express-sanitizer"),
    methodOverride      =   require('method-override'),
    localStrategy       =   require("passport-local"),
    bodyParser  =   require("body-parser"),
    passport    =   require("passport"),
    express     =   require("express"),
    User        =   require("./models/user"),
    flash       =   require("connect-flash"),
    app         =   express();

// Requiring routes
var campgroundRouter    =   require("./routes/campgrounds"),
    userRouter          =   require("./routes/users"),
    commentRouter       =   require("./routes/comments"),
    indexRouter         =   require("./routes");


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

//Passport config
app.use(require("express-session")( {
    secret: "Cool math",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.moment = require("moment");
    return next();
});


app.use("/", indexRouter);
app.use(userRouter);
app.use("/campgrounds/:id/comments", commentRouter);
app.use("/campgrounds", campgroundRouter);

var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function() {
    console.log("listening on port " + process.env.PORT);
});