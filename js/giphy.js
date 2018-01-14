

var dogs=["rottweiler", "labrador", "pug", "golden retriever", "mastiff", "bulldog", "german shephard"];

function createButtons (){

    $("#buttons").empty();
    
	for (var i= 0; i < dogs.length; i++){
    
    $("#buttons").append("<button button-name='" + dogs[i] + "'>" + dogs[i] + "</button>");

    console.log("Current Buttons: " + dogs[i]);  // shows twice?

	}
};



createButtons ();

function createNewButton () {

    var newButtonText= $("#add-dog").val();
    
    console.log("New Button: " + newButtonText);
    
    dogs.push(newButtonText);
    
    createButtons();
    
	};

$("#buttons").on("click", "button", function(event) {

    event.preventDefault();
    
    $("#display-dogs").empty();
    

    var buttonText = $(this).attr("button-name");
    
	var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + buttonText + "&api_key=w0YZZEIB6HH1C88udHoGX5QaLw6Dn2iA&limit=12";

	$.ajax ({

		url: queryUrl,
        method: "GET"
        
	}).done(function(response) {

		console.log("Response:" + response);

		for (var i = 0; i < response.data.length; i++) {

			// first, each time we loop through, we're creating a new img tag
            var newDiv= $("<div />").addClass("divContainer");
            
            var newImg = $("<img class='giphy' />");
            
            var rating= response.data[i].rating;
            
        	var p= $("<p>").text("Ratings: " + rating);

        
            
            newImg.attr("data-state", "still")
            
                .attr("data-still", response.data[i].images.fixed_height_small_still.url)
                
                .attr("data-anim", response.data[i].images.fixed_height_small.url)
                
                .attr("src", response.data[i].images.fixed_height_small_still.url)
                
			
			newDiv.append(newImg).append(p);

            $("#display-dogs").append(newDiv);
            
		}
	});

});

$("#display-dogs").on("click", ".giphy", function(event) {
	event.preventDefault();

	var gifState = $(this).attr("data-state");
	var animUrl = $(this).attr("data-anim");
	var stillUrl = $(this).attr("data-still");

	if (gifState == "still") {
		
		$(this).attr("src", animUrl).attr("ata-state", "animate");
	} else {
		
		$(this).attr("src", stillUrl).attr("data-state", "still");
	}
});


$("#download-button").on("click", function(event){
	event.preventDefault();
	console.log("added");
	createNewButton();
});


