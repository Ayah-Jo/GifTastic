$( document ).ready(function() {
    // An array of actions, new actions will be pushed into this array;
    let topics = ["Japan", "England", "China", "Maldives", "India", "Italy", "Germany", "Spain", "Russia", "USA","Cuba", "France", "Canada"];
    // Creating Functions & Methods
    // Function that displays all gif buttons
    function displayGifButtons(){
        $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
        for (let i = 0; i < topics.length; i++){
            let gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary");
            gifButton.attr("data-name", topics[i]);
            gifButton.text(topics[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new action button
    function addNewButton(){
        $("#addGif").on("click", function(){
        let action = $("#action-input").val().trim();
        if (action == ""){
          return false; // added so user cannot add a blank button
        }
        topics.push(action);
    
        displayGifButtons();
        return false;
        });
    }
    // Function to remove last action button
    function removeLastButton(){
        $("removeGif").on("click", function(){
        topics.pop(action);
        displayGifButtons();
        return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs(){
        let action = $(this).attr("data-name");
        let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL); // displays the constructed url
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); // console test to make sure something returns
            $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
            let results = response.data; //shows results of gifs
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (let i=0; i<results.length; i++){
    
                let gifDiv = $("<div>"); //div for the gifs to go inside
                gifDiv.addClass("gifDiv");
                // pulling rating of gif
                let gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                // pulling gif
                let gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); // displays list of topics already created
    addNewButton();
    removeLastButton();
    // Document Event Listeners
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function(){
        let state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });