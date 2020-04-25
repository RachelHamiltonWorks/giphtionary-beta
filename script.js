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
    var searchedWord = $('<h4>').text(responseMW[0].hwi.hw);
    console.log(responseMW[0].hwi.hw);
    
    // How do you pronounce the word
    var sayWord = $('<h6>').text(responseMW[0].hwi.prs[0].mw);
    console.log(responseMW[0].hwi.prs[0].mw);

    // This grabs the first letter of the searched word
    console.log("search word ",responseMW[0].meta.id)
    var firstLetter  = responseMW[0].meta.id.slice(0, 1);
    console.log("letter ",firstLetter)
    // Audio recording of the word
    var verbalWord = $('<audio controls>');
    var src  =  $('<source>').attr("src", "https://media.merriam-webster.com/soundc11/"+ firstLetter + "/" + responseMW[0].hwi.prs[0].sound.audio + ".wav");
    verbalWord.append(src)
    console.log(responseMW[0].hwi.prs[0].sound.audio);
    
    // First definition of the word
    var wordDefinition1 = $('<h5>').text("1." + responseMW[0].shortdef[0]);
    console.log(responseMW[0].shortdef[0]);
    
    // Second definition of the word
    var wordDefinition2 = $('<h5>').text("2." + responseMW[0].shortdef[1]);
    console.log(responseMW[0].shortdef[1]);

    $(".headword-entry").empty();
    $(".headword-entry").append(searchedWord, sayWord, verbalWord, wordDefinition1, wordDefinition2)
    })








    // var spanishURL = "https://www.dictionaryapi.com/api/v3/references/spanish/json/" + headword + "?key=39c727f0-8f59-4896-8532-707dfb1b035d";

    // $.ajax({
    //   url: spanishURL,
    //   method: "GET"
    // }).then(function(responseSpanish) {

    // // printing the entire object to console
    //   console.log("Spanish Response", responseSpanish);
    // // variable for searched word
    // var searchedSpanishWord = $('.test').text(responseSpanish[0].shortdef[0]);
    // console.log("Spanish Word", searchedSpanishWord);
    
    // // How do you pronounce the word
    // var sayWord = $('<h6>').text(responseSpanish[0].hwi.prs[0].mw);
    // console.log(responseSpanish[0].hwi.prs[0].mw);

    // // This grabs the first letter of the searched word
    // console.log("search word ",responseSpanish[0].meta.id)
    // var firstLetter  = responseSpanish[0].meta.id.slice(0, 1);
    // console.log("letter ",firstLetter)
    // // Audio recording of the word
    // var verbalWord = $('<audio controls>');
    // var src  =  $('<source>').attr("src", "https://media.merriam-webster.com/soundc11/"+ firstLetter + "/" + responseSpanish[0].hwi.prs[0].sound.audio + ".wav");
    // verbalWord.append(src)
    // console.log(responseSpanish[0].hwi.prs[0].sound.audio);
    
    // // First definition of the word
    // var wordDefinition1 = $('<h5>').text("1." + responseSpanish[0].shortdef[0]);
    // console.log(responseSpanish[0].shortdef[0]);
    
    // // Second definition of the word
    // var wordDefinition2 = $('<h5>').text("2." + responseSpanish[0].shortdef[1]);
    // console.log(responseSpanish[0].shortdef[1]);

    // $(".headword-entry").empty();
    // $(".headword-entry").append(searchedSpanishWord, sayWord, verbalWord, wordDefinition1, wordDefinition2)
    // })




    // querying giphy api for the user input headword - needs edits to pull exactly the number of gifs wanted (all gifs?)
    var giphyURL = "http://api.giphy.com/v1/gifs/search?q=" + headword + "&api_key=hWQiEMajiXFk4g6MjVMs6vw3DMs9MesS&limit&limit=36";
    
    $.ajax({
      url: giphyURL,
      method: "GET"

      
    }).then(function(response) {
   // printing the entire object to console
      console.log(response);

      var giphyOne = response.data[0].images.original.url;

      // var giphyTwo = response.data[1].images.original.url;

      $('#firstGiph').attr("src", giphyOne).css({"width": "200px", "height": "200px"});
      // $('#secondGiph').attr("src", giphyTwo).css({"width": "200px", "height": "200px"});

    for(var i =0; i < 36; i++){
      var giphyURL = response.data[i].images.original.url;
      var img = $('<img>').attr("src", giphyURL).css({"width": "200px", "height": "200px"});

      console.log(giphyURL)

      // add image to div
      
      $('#giphySearchResults').append(img)

    }

  

    });
  };
  
  
  $("#search").on('keypress',function(e) {
    
    console.log(e.which);
    if(e.which == 13) {
        e.preventDefault();
        console.log('You pressed enter!');
        var inputNavHeadword = $("#search").val().trim();
        console.log(inputNavHeadword);
        searchDictionaryAndGiphy(inputNavHeadword);
        $("#giphySearchResults").empty();
    }
    
  });


  // event handler for user clicking the search button/pressing enter key

  $("#mainSearchButton").on("click", function(event) {
    // Preventing the button from trying to submit the form (aka reload/refresh the page)
    event.preventDefault();
    // Storing the headword
    var inputHeadword = $("#mainSearch").val().trim();


    $("#originalSearch").fadeOut(1000, function(){
            
    });
    $("#def-Display").fadeIn(1000, function(){
      
    // });
    // $("#spanishCard").fadeIn(1000, function(){
      
    });
    $("#barDisplay").fadeIn(1000, function(){
        
    });
    $("#footDisplay").fadeIn(1000, function(){
    })

    // Running the searchDictionaryAndGiphy function(passing in the inputHeadword as an argument)
    searchDictionaryAndGiphy(inputHeadword);
    
  });

 


});



