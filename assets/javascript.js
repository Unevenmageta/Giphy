$(document).ready(function () {


    $("#main-div").empty();





    //Creation of Search Bar
    var searchBar = $('<input id= "searchBar" />');
    $("#search-div").append(searchBar);

    //Creation of Search Button
    var searchButton = $('<button id="searchButton" />');
    searchButton.text("Add");
    $("#search-div").append(searchButton);


    
    // All the buttons
    var topics = ["Spider-man", "Hulk", "Thor", "Iron-Man", "Black Widow", "Hawkeye", "Superman", "Blue Beetle", "The Flash"];
    //creation of buttons
    for (i = 0; i < topics.length; i++) {

        $("#button-div").append($('<button  data-person="' + topics[i] + '" class = "buttonBoi" id= "but' + (i) + '"/>'));
        $('#but' + (i) + '').text(topics[i]);
        
    };
    
    
    var update;

    //additional buttons
    $("#searchButton").on("click", function () {
        update=$("#searchBar").val();
        i++;
        
        if (topics.includes(update) === true ) {

            alert("You already have this button");
            $('#but'+(i)+'').empty();
            console.log(topics);
            console.log(update);
            
        }
        else{


            update = $("#searchBar").val();
            topics.push(update);
            
            
            $("#button-div").append($('<button  data-person="' + update + '" class = "buttonBoi" id= "but' + (i) + '"/>'));
            $('#but' + (i) + '').text(update);
            
            console.log(update);
            console.log(topics);
            
        }    
        

    });



    $(document).on("click", ".gif", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        };


        if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        };


    });

    //pulling and showing the images 
    $(document).on("click", ".buttonBoi", function () {

        $("#main-div").empty();

        var character = $(this).attr("data-person");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            character + "&api_key=170G6VwKsdILJX30MGNorekqd5MGiER8&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            var data = response.data;
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                var gifyDiv = $("<div/>");

                var rating = data[i].rating;

                var p = $("<p/>").text("Rating: " + rating);

                var characterImage = $("<img>");
                characterImage.attr("src", data[i].images.fixed_height_still.url);
                characterImage.attr("class", "gif");
                characterImage.attr("data-still", data[i].images.fixed_height_still.url);
                characterImage.attr("data-animate", data[i].images.fixed_height.url);
                characterImage.attr("data-state", "still");


                gifyDiv.prepend(p);
                gifyDiv.prepend(characterImage);

                $("#main-div").prepend(gifyDiv);
            }
        },
            function (error) {
                console.error("error");



            });
    });



});