var express     =   require("express"),
    router      =   express.Router(),
    mongoose    =   require("mongoose"),
    seedDB      =   require("../seeds");
    
mongoose.connect("mongodb://localhost/yelpcamp", {useMongoClient: true});
//seedDB();

router.get("/", function(req, res) {
    res.render("landing");
});


module.exports = router;
