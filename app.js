
var gifSearchButton = $("#makeGifs");
var queryURL;
var gifZone = $("#gifZone");
var gifButtons = $(".gifButtons");
var topics = ["dogs","cats","laughing"]

function getGifs() {
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(info) {
        console.log(info);
        for (i=0; i<10; i++) {
            var imgDiv = $("<div>").addClass("col l3 s6");
            var gifImg = $("<img>");
            gifImg.attr("src", info.data[i].images.fixed_width.url);
            gifImg.attr("still", info.data[i].images.fixed_width_still.url);
            gifImg.attr("move", info.data[i].images.fixed_width.url);
            gifImg.click(function() {
                var still = gifImg.attr("still");
                var move = gifImg.attr("move");
                if (gifImg.attr("src") == still) {
                    gifImg.attr("src", move);
                    console.log("still")
                } else {
                    console.log("Move")
                    gifImg.attr("src", still);
                    
                };
            });
            gifZone.append(imgDiv);
            imgDiv.append(gifImg);
        };
    });
};

function makeButtons() {
    topics.forEach(function(elem) {
        var buttons =  $("<button>").addClass("btn btn-small smallwhitebutton").text(elem);
         buttons.attr("data", elem.trim());
 //create click function for that button
        buttons.click(function() {
         gifZone.empty();
         var searchItem = $(this).attr("data");
         queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchItem + "&api_key=UQlAY3AHnV7hwkRT2LuYZ3yzeoCA9smT";
         getGifs();
        });
        gifButtons.append(buttons);
     });
};

gifSearchButton.click(function(event) {
    var gifSearch = $("#gifSearch").val();
    topics.push(gifSearch)
//create button in gifButtons
makeButtons();
});

makeButtons();