var express     =   require("express"),
    router      =   express.Router(),
    mongoose    =   require("mongoose"),
    seedDB      =   require("../seeds");
    
//seedDB();

// Mongoose connection
var dburl = process.env.DATABASEURL || "mongodb://localhost/yelpcamp";
mongoose.connect(dburl, {useMongoClient: true});

router.get("/", function(req, res) {
    res.render("landing");
});

module.exports = router;
