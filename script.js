$(document).ready(function(){

function searchDictionaryAndGiphy(headword) {

    // querying m-w [and eventually giphy] api's for the user input headwear, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + headword + "?key=edeb60ac-21d3-4109-93d4-16ae042e92ec";
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // printing the entire object to console
      console.log(response);

      // constructing HTML containing the headword entry
      var id = $("<h1>").text(response.id);
      console.log(response)

      // Empty the contents of the headword-entry-div, append the content
      $("#headword-entry-div").empty();
      $("#headword-entry-div").append(headword, id);
    });
  }

  // event handler for user clicking the search button/pressing enter key
  $("#search-headword").on("click", function(event) {
    // Preventing the button from trying to submit the form (aka reload/refresh the page)
    event.preventDefault();
    // Storing the headword
    var inputHeadword = $("#headword-input").val().trim();

    // Running the searchDictionaryAndGiphy function(passing in the inputHeadword as an argument)
    searchDictionaryAndGiphy(inputHeadword);
  });


})