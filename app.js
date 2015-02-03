var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');
var weather = require('weather');



// Show splash screen while waiting for data
var splashWindow = new UI.Window();

// Text element to inform user
var text = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  text:'MET EIREANN WEATHER\nCreated by Denis Finnegan',
  font:'GOTHIC_28_BOLD',
  color:'black',
  textOverflow:'wrap',
  textAlign:'center',
  backgroundColor:'white'
});

// Add to splashWindow and show
splashWindow.add(text);
splashWindow.show();

// Make request to meteireann
ajax(
  {
    url:'https://www.kimonolabs.com/api/3ztvp5fm?apikey=oftHjksU734B1VrSPIQtYwBcIeJ6H1yc',
    type:'json'
  },
  function(data) {
    console.log("Successfully fetched weather data!");
    console.log(JSON.stringify(data));
    
    // Create an array of Menu items
    var menu = new UI.Menu({
      sections: [{
        title: 'MET Eireann Forecast',
        items: [{
          // 0
          title: 'Today',
          subtitle: data.results.Weather[0].Today
          //icon: 'images/item_icon.png'
        }, {
          // 1
          title: 'Tomorrow',
          subtitle: data.results.Weather[0].Tomorrow
        }, {
          // 2
          title: 'Outlook',
          subtitle: data.results.Weather[0].Outlook
        }, {
          // 3
          title: 'Dublin',
          subtitle: 'Dublin Area Weather'
        }, {
          // 4
          title: 'Ulster',
          subtitle: 'Ulster Area Weather'
        }, {
          // 5
          title: 'Munster',
          subtitle: 'Munster Area Weather'
        }, {
          // 6
          title: 'Leinster',
          subtitle: 'Leinster Area Weather'
        }, {
          // 7
          title: 'Connacht',
          subtitle: 'Connacht Area Weather'
        }]
      }]
    });
        
    // Show the Menu, hide the splash
    menu.show();
    splashWindow.hide();
    
    
    menu.on('select', function(e) {
      console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
      console.log('The item is titled "' + e.item.title + '"');
      
      // Create a Card with title and subtitle
      var card = new UI.Card({
        title:'Irish Weather',
        body:'MET Eireann Weather Forecast',
        subtitle:'Fetching...',
        scrollable: true
        });
        
      // Display the Card
      card.show();
      
      if (e.itemIndex === 0){
        card.subtitle('Todays Weather:');
        card.body(data.results.Weather[0].Today);
      } else if (e.itemIndex === 1) {
        card.subtitle('Tomorrows Weather:');
        card.body(data.results.Weather[0].Tomorrow);
      } else if (e.itemIndex === 2) {
        card.subtitle('3 Day Outlook:');
        card.body(data.results.Weather[0].Outlook);
      } else if (e.itemIndex === 3) {
        card.subtitle('Dublin Weather:');
        weather.getWeather('https://www.kimonolabs.com/api/bs0ohccq?apikey=oftHjksU734B1VrSPIQtYwBcIeJ6H1yc', returnedWeather);
        card.body();
      } else if (e.itemIndex === 4) {
        card.subtitle('Ulster Weather:');
        weather.getWeather('https://www.kimonolabs.com/api/4g6cf6qu?apikey=oftHjksU734B1VrSPIQtYwBcIeJ6H1yc', returnedWeather);
        card.body();
      } else if (e.itemIndex === 5) {
        card.subtitle('Munster Weather:');
        weather.getWeather('https://www.kimonolabs.com/api/ch4tbsmm?apikey=oftHjksU734B1VrSPIQtYwBcIeJ6H1yc', returnedWeather);
        card.body();
      } else if (e.itemIndex === 6) {
        card.subtitle('Leinster Weather:');
        weather.getWeather('https://www.kimonolabs.com/api/29x73m4u?apikey=oftHjksU734B1VrSPIQtYwBcIeJ6H1yc', returnedWeather);
        card.body();
      } else if (e.itemIndex === 7) {
        card.subtitle('Connacht Weather:');
        weather.getWeather('https://www.kimonolabs.com/api/8ksre5nk?apikey=oftHjksU734B1VrSPIQtYwBcIeJ6H1yc', returnedWeather);
        card.body();
      }
      function returnedWeather(i_weatherText){
        card.body(i_weatherText);
        }   
    });
    
  
    
    
  },
  function(error) {
    console.log('Download failed: ' + error);
  }
);



