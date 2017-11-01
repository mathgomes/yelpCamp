var express     =   require("express"),
    router      =   express.Router({mergeParams: true}),
    Campground  =   require("../models/campground"),
    Comment     =   require("../models/comment"),
    middleware  =   require("../middleware");


router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err || !campground)  {
            req.flash("error", "Campground not found!");
            res.redirect("back");
        }
        else {
            res.render("comments/newcomment", {campground: campground});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    req.body.comment.text = req.sanitize(req.body.comment.text);
    Campground.findById(req.params.id, function(err, campground) {
        if(err || !campground)  {
            req.flash("error", "Campground not found!");
            res.redirect("back");
        } else {
            Comment.create(req.body.comment, function(err, createdComment) {
                if(err) console.log(err);
                else {
                    var author = {
                        id: req.user._id,
                        username: req.user.username
                    }
                    createdComment.author = author;
                    createdComment.save();
                    campground.comments.push(createdComment);
                    campground.save();
                    req.flash("success", "Comment successfully created");
                    res.redirect("/campgrounds/" + campground["_id"]);
                }
            });
        }
    });
});

// EDIT COMMENT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        res.render("comments/edit", {campground_id : req.params.id, comment: comment});
    });
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        res.redirect("/campgrounds/" + req.params.id);
    });
});

// DELETE COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        req.flash("success", "Comment deleted");
        res.redirect("/campgrounds/" + req.params.id);
    });
});


module.exports = router;