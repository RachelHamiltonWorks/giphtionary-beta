$(document).ready(function(){

function searchDictionaryAndGiphy(headword) {

    // querying m-w api for the user input headword
    var queryURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + headword + "?key=edeb60ac-21d3-4109-93d4-16ae042e92ec";
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

    // printing the entire object to console
      console.log(response);

    })

    // querying giphy api for the user input headword - needs edits to pull exactly the number of gifs wanted (all gifs?)
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + headword + "&api_key=hWQiEMajiXFk4g6MjVMs6vw3DMs9MesS";
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
  
   // printing the entire object to console
      console.log(response);
  

   // adding headword to h1 
   var id = $("<h3>").text(response.id);
    
  //  empties the contents of the headword-entry-div, appends the content 
      $("#headword-entry").empty();
      $("#headword-entry").append(headword, id);
    });
  }

  // event handler for user clicking the search button/pressing enter key
  $("#search-headword").on("click", function(event) {
    // Preventing the button from trying to submit the form (aka reload/refresh the page)
    event.preventDefault();
    // Storing the headword
    var inputHeadword = $("#autocomplete-input").val().trim();

    $("#bowlDisplay").fadeOut(1000, function(){
            
    });
    $("#def-Display").fadeIn(1000, function(){
      
    });
    $("#pDefDisplay").fadeIn(1000, function(){

    });
    $("#barDisplay").fadeIn(1000, function(){
        
    });
    $("#footDisplay").fadeIn(1000, function(){
        alert("Hey");
    })

    // Running the searchDictionaryAndGiphy function(passing in the inputHeadword as an argument)
    searchDictionaryAndGiphy(inputHeadword);
  });


})