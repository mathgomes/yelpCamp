var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");
    
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("/login");
    }
}

middlewareObj.checkCampOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, camp) {
            if(err || !camp) {
                req.flash("error", "Campground not found!");
                res.redirect("back");
            } else {
                if(camp.author["id"].equals(req.user.id)) {
                    next();
                } else {
                    req.flash("error", "You dont have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You have to be logged in to do that!");
        res.redirect("/login");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, camp) {
            if(err || !camp) {
                req.flash("error", "Campground not found!");
                res.redirect("back");
            } else {
                Comment.findById(req.params.comment_id, function(err, comment) {
                    if(err || !comment) {
                        req.flash("error", "Comment not found!");
                        res.redirect("back");
                    } else {
                        if(comment.author["id"].equals(req.user.id)) {
                            next();
                        } else {
                            req.flash("error", "You dont have permission to do that");
                            res.redirect("/campgrounds/" + req.params.id);
                        }
                    }
                });
            }
        });
    } else {
        req.flash("error", "You have to be logged in to do that!");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;