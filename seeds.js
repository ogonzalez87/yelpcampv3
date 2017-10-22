var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name:"Cloud's Rest", 
        image:"https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg",
        description: "  blah blah blah"
    },
    {
        name:"Desert Mesat", 
        image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description: "  blah blah blah"
    },
    {
        name:"Canyon Floor", 
        image:"https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg",
        description: "  blah blah blah"
    }
];

function seedDB() {
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Removed campgrounds!");
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added a campground!");
                        Comment.create({
                            text:"This place is greate, but I wish there was internet",
                            author: "Hommer"
                        }, function (err,comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                                
                            } 
                        });
                    }
                });
            }); 
        }
    });
 
}
module.exports = seedDB;
