if ("geolocation" in navigator) {
  $('.js-geolocation').show(); 
} else {
  $('.js-geolocation').hide();
}

/* Where in the world are you? */
$('.js-geolocation').on('click', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
});


$(document).ready(function() {  
  //loadWeather('Perth',''); //@params location, woeid
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
});

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function(weather) {
		
		html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
		
		html += '<ul class="weather_list"><li>'+weather.city+', '+weather.region+'</li>';
		html += '<li>'+weather.currently+'</li>';
		html += '<li>'+weather.tempAlt+'&deg;F</li>';		
		//html += '<li>'+weather.code+'</li>';
		//html += '<li>'+weather.tomorrow.forecast+'</li>';
		html += '<li>MIN:'+weather.low+'&deg;' + weather.units.temp+'</li>';	
		html += '<li>MAX:'+weather.high+'&deg;' + weather.units.temp+'</li></ul>';
		
		html += '<ul class="weather_forecast">';		
		html += '<li>Tomorrow:' + weather.tomorrow.forecast+','+weather.tomorrow.low+'&deg;,'+weather.tomorrow.high+'&deg;'+'</li></ul>';
		//html += '<li>Test</li></ul>';
		
		
		
		      
		$("#weather").html(html);
		
		if(weather.code > 27 && weather.temp > 30) {
			$('body').addClass("sunny");
		}
		else if(weather.code < 12){
			//$('body').addClass("rainy");
			alert("Rainy");
		}
		
    },
    error: function(error) {
		$("#weather").html('<p>'+error+'</p>');
    }
  });
}