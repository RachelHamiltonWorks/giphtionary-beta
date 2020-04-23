$(document).ready(function(){

function searchDictionaryAndGiphy(headword) {

    // querying m-w api for the user input headword
    var queryURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + headword + "?key=edeb60ac-21d3-4109-93d4-16ae042e92ec";
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(responseMW) {

    // printing the entire object to console
      console.log(responseMW);
    // variable for searched word
    var searchedWord = $('<h3>').text(responseMW[0].meta.id);
    console.log(responseMW[0].meta.id);
    
    // How do you pronounce the word
    var sayWord = $('<h5>').text(responseMW[0].hwi.prs[0].mw);
    console.log(responseMW[0].hwi.prs[0].mw);
    
    // Audio recording of the word
    var verbalWord = $('<audio>').attr("src", "https://media.merriam-webster.com/soundc11/FIRST LETTER" + responseMW[0].hwi.prs[0].sound.audio + ".wav");
    console.log(responseMW[0].hwi.prs[0].sound.audio);
    
    // First definition of the word
    var wordDefinition1 = $('<h5>').text("1--" + responseMW[0].shortdef[0]);
    console.log(responseMW[0].shortdef[0]);
    
    // Second definition of the word
    var wordDefinition2 = $('<h5>').text("2--" + responseMW[0].shortdef[1]);
    console.log(responseMW[0].shortdef[1]);

    $("#headword-entry").empty();
    $("#headword-entry").append(searchedWord, sayWord, verbalWord, wordDefinition1, wordDefinition2)
    })

    // querying giphy api for the user input headword - needs edits to pull exactly the number of gifs wanted (all gifs?)
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + headword + "&api_key=hWQiEMajiXFk4g6MjVMs6vw3DMs9MesS";
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(responseGiph) {
  
   // printing the entire object to console
      console.log(responseGiph);
  

   // adding headword to h1 
   var id = $("<div>").text(responseGiph);
    
  //  empties the contents of the headword-entry-div, appends the content 
      $("#likeCatButton").empty();
      $("#likeCatButton").append(headword, id);
    });
  };

  // event handler for user clicking the search button/pressing enter key
  $("#menu-toggle").on("click", function(event) {
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


});