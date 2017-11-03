var express     =   require("express"),
    router      =   express.Router(),
    Campground  =   require("../models/campground"),
    middleware  =   require("../middleware"),
    geocoder    =   require('geocoder');

//Show campgrounds route
router.get("/", function(req, res) {
    var queryObj = {}
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        queryObj.name = regex;
    }
    Campground.find(queryObj, function(err, campgrounds) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/campgrounds", {campgrounds: campgrounds});
        }
    });
});

// Campground POST
router.post("/", middleware.isLoggedIn, function(req, res) {
    req.body.camp.description = req.sanitize(req.body.camp.description);
    if(req.body.camp.image == "") {
        delete req.body.camp.image;
    }
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    req.body.camp.author = author;
    geocoder.geocode(req.body.camp.location, function(err, data) {
        if(err) return console.log(err);
        req.body.camp.lat = data.results[0].geometry.location.lat;
        req.body.camp.lng = data.results[0].geometry.location.lng;
        req.body.camp.location = data.results[0].formatted_address;
        
        Campground.create(req.body.camp, function(err, campground) {
            if(err)  {
                console.log(err);
            }
            else {
                console.log(campground);
                res.redirect("/campgrounds");
            }
        });
        
    });

});

// New campground page
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/newcamp");
});

// Show campground/:id page
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
        if(err || !campground)  {
            req.flash("error", "Campground not found!");
            res.redirect("back");
        }
        else {
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

//EDIT CAMPGROUND
router.get("/:id/edit", middleware.checkCampOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        // error handled on middlware
        res.render("campgrounds/edit", {campground: campground});
    });
});

//UPDATE CAMPGROUND
router.put("/:id", middleware.checkCampOwnership, function(req, res) {
    geocoder.geocode(req.body.camp.location, function (err, data) {
        if(err) return console.log(err);
        req.body.camp.lat = data.results[0].geometry.location.lat;
        req.body.camp.lng = data.results[0].geometry.location.lng;
        req.body.camp.location = data.results[0].formatted_address;
        Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCamp) {
            res.redirect("/campgrounds/" + req.params.id);
        });
    });
});
// DELETE CAMPGROUND
router.delete("/:id", middleware.checkCampOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        res.redirect("/campgrounds");
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;