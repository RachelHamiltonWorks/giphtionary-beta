$(document).ready(function(){

//SEARCH M-W AND DICTIONARY FUNCTION  - MAIN APP FUNCTION, MAKES BOTH API REQUESTS
function searchDictionaryAndGiphy(headword) {

    // M-W API FUNCTION (first callback within top level searchDictionaryAndGiphy function)
    var queryURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + headword + "?key=edeb60ac-21d3-4109-93d4-16ae042e92ec";
    
    $.ajax({
      url: queryURL,
      method: "GET"

    }).then(function(responseMW) {
    // printing the entire object to console
      console.log(responseMW);
    // variable for searched word
    var searchedWord = $('<h4>').text(responseMW[0].hwi.hw);
    console.log(responseMW[0].hwi.hw);
    
    // pronunciation
    var pronunciation = $('<h6>').text(responseMW[0].hwi.prs[0].mw);
    console.log(responseMW[0].hwi.prs[0].mw);

    // This grabs the first letter of the searched word in order to access audio file
    console.log("search word ",responseMW[0].meta.id)
    var firstLetter  = responseMW[0].meta.id.slice(0, 1);
    console.log("letter ",firstLetter)
    // Audio recording of the word
    var audioPronunciation = $('<audio controls>');
    var src  =  $('<source>').attr("src", "https://media.merriam-webster.com/soundc11/"+ firstLetter + "/" + responseMW[0].hwi.prs[0].sound.audio + ".wav");
    audioPronunciation.append(src)
    console.log(responseMW[0].hwi.prs[0].sound.audio);
    
    // First shortdef of the word
    var wordDefinition1 = $('<h5>').text("1." + responseMW[0].shortdef[0]);
    console.log(responseMW[0].shortdef[0]);
    
    // Second shortdef of the word
    var wordDefinition2 = $('<h5>').text("2." + responseMW[0].shortdef[1]);
    console.log(responseMW[0].shortdef[1]);
    // if wordDefinition2 == undefined,$(".headword-entry").empty(); - add id tag to second def?


    //APPEND M-W RESPONSE VALUES TO CARD 
    $(".headword-entry").empty();
    $(".headword-entry").append(searchedWord, pronunciation, audioPronunciation, wordDefinition1, wordDefinition2)
    })

    //GIPHY API FUNCTION (second callback within top level searchDictionaryAndGiphy function)
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + headword + "&api_key=hWQiEMajiXFk4g6MjVMs6vw3DMs9MesS&limit&limit=36";
    
    $.ajax({
      url: giphyURL,
      method: "GET"

    }).then(function(response) {
   // printing the entire object to console
      console.log(response);

      var cardGif = response.data[0].images.original.url;

      $('#cardGif').attr("src", cardGif)
      // .css({"width": "200px", "height": "200px"});

    for(var i =0; i < 36; i++){
      var giphyURL = response.data[i].images.original.url;
      var img = $('<img>').attr("src", giphyURL).css({"width": "200px", "height": "200px"});
      console.log("This is the giphyURL variable being logged out")

   // APPEND ALL GIFS TO DIV
      $('#giphySearchResults').append(img)
     }
   });
  };
  //end of searchGiphyandDictionary function definition
  
  //adding onclick function to homepage search button, CALLS main search function, triggers element fades
  $("#mainSearchButton").on("click", function(event) {
    // Preventing the button from trying to submit the form (aka reload/refresh the page)
    event.preventDefault();
    // Storing the headword
    var inputHeadword = $("#mainSearch").val().trim();


    $("#originalSearch").fadeOut(1000, function(){
            
    });
    $("#def-Display").fadeIn(1000, function(){
      
    });
    $("#barDisplay").fadeIn(1000, function(){
        
    });
    $("#footDisplay").fadeIn(1000, function(){
    })

    $("#footDisplay2").fadeIn(1000, function(){
    })

 //adding search on "enter" functionality to navbar search field
  $("#navBarSearch").on('keypress',function(e) {
    
   console.log(e.which);
   if(e.which == 13) {
      e.preventDefault();
      console.log('Enter was pressed to search');
      var inputNavHeadword = $("#navBarSearch").val().trim();
      console.log(inputNavHeadword);
      searchDictionaryAndGiphy(inputNavHeadword);
      //clear previous gif search results from div
      $("#giphySearchResults").empty();
      } 
    });

    //CALLING the searchDictionaryAndGiphy function(passing in the inputHeadword as an argument)
    searchDictionaryAndGiphy(inputHeadword);
    
  });
});










 






