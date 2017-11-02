var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name:   String,
    price:  {
        type:   String,
        default: "5.00"
    },
    location:   String,
    lat:        Number,
    lng:        Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        username:   String
    },
    image: {
        type:   String,
        default: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Google_Plus_Shiny_Icon.svg"
    },
    description: {
        type:   String,
        default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut" +
        "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip" + 
        "ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat." 
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ]
    
});

module.exports = mongoose.model("campgrounds", campgroundSchema);
