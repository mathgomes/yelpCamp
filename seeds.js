var mongoose    =   require("mongoose"),
    Campground  =   require("./models/campground"),
    Comment     =   require("./models/comment");
    


function addCampgrounds() {
    
    var data = [
        { name: "test1" },
        { name: "test2" },
        { name: "test3" },
        { name: "test4" },
    ]
    data.forEach(function(seed) {
        Campground.create(seed, function(err, createdCamp) {
            if(err) {
                console.log("err creating " + err);
            }
            else {
                console.log("added camp"); 
                Comment.create(
                {
                    text: "THIS IS COMMENT HURRR",
                    author: {
                        username: "user",
                    }
                },                
                function(err, comment) {
                    if(err) console.log(err);
                    else {
                        createdCamp.comments.push(comment);
                        createdCamp.save();
                        console.log("created new comment");
                    }
                });
            }
        });
    });
}

function eraseDB() {
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("removed campgrounds");
            addCampgrounds();
        }
    });
}
function seedDB() {
    eraseDB();
}

module.exports = seedDB;