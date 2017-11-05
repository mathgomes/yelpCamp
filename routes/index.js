var express     =   require("express"),
    router      =   express.Router(),
    mongoose    =   require("mongoose"),
    seedDB      =   require("../seeds");
    
//seedDB();

// Mongoose connection
// mongoose.connect("mongodb://localhost/yelpcamp", {useMongoClient: true});
mongoose.connect("mongodb://math:math@ds149335.mlab.com:49335/yelpcamp", {useMongoClient: true});
router.get("/", function(req, res) {
    res.render("landing");
});

module.exports = router;
