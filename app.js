var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

//mongoose.Promise = global.Promise;    
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});      
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create(
//     {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//         description: "This is a huge granite hill, no bathrooms. No water. Beautifull granite."
//     }
//     ,function(err,campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("New created campground");
//             console.log(campground);
//         }
//     });


app.get("/", function(req, res){
    res.render("landing");
});

//IDNEX - Show all campgrounds
app.get("/campgrounds", function(req, res){
  //Get campgrounds from db
  Campground.find({},function(err,allCampgrounds){
      if(err){
          console.log(err);
      }else{
        res.render("index",{campgrounds:allCampgrounds});
          
      }
  });
});

//CREATE - Add new campbrounds to DB
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description:desc}
    //Create a new campground and save to db
    Campground.create(newCampground,function(err,newlyCreate){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//NEW - Show form to create campgrounds
app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

//SHOWS - Shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with the provided id
    
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
            console.log(err);
        } else{
            //render show template with that campground
            res.render("show",{campground: foundCampground});
        }
    });

    
});


//For C9 Use This!!!!
 app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
 });

//app.listen(3000 , function(){
//    console.log("The YelpCamp Server Has Started!");
// });


//If mongo stops working:
//killall mongod ; cd ; ./mongod --repair ; cd data ; rm -rf mongod.lock ; cd ; ./mongod