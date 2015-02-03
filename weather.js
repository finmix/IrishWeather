/* This module makes AJAX requests*/
var ajax = require('ajax');

var getWeather = {
  
  getWeather: function(varURL, dwCallBackFunction){

  // Make request to meteireann
  ajax(
    {
      url: varURL,//'https://www.kimonolabs.com/api/bs0ohccq?apikey=oftHjksU734B1VrSPIQtYwBcIeJ6H1yc',
      type:'json'
    },  
    // on success parsing JSON string and passing it to callback function
    function(data) {
      console.log("Successfully fetched weather data!");
      console.log(JSON.stringify(data));
      console.log(data.results.Weather[0].Today + " -> " + data.results.Weather[0].Tonight + " -> " + data.results.Weather[0].Tomorrow);
      //
      dwCallBackFunction(data.results.Weather[0].Today + " -> " + data.results.Weather[0].Tonight + " -> " + data.results.Weather[0].Tomorrow);
      },
    // on error passing error message to callback function
      function(error) {
      dwCallBackFunction('weather failed: ' + error);
      }
  );
}
};
this.exports = getWeather;
