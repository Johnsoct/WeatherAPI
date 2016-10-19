//Create a command line application to accept a zip code and print out the weather 
/*AVAILABLE API REQUESTS
Current conditions
Minute-by-minute forecasts out to one hour
Hour-by-hour and day-by-day forecasts out to seven days
Hour-by-hour and day-by-day observations going back decades

a 'Forecast Request' returns the current forecast for the next week in JSON format.

a 'Time Machine Request' returns the observed or forecast weather conditions for a date in the past or future in the same JSON format.

*/

var request = require('request');
var param = process.argv[2];
var APIKey = 8a9dcd721c2c33b5f8d8a55d1ad70fde;

function printError(e){
	console.error(e.message);
}

function getWeather(cordinates) {
	//connect to the forecast.io API
	var options = 'https://api.darksky.net/forecast/' + APIKey + '/' + cordinates;
	var request = https.get(options, function(response) {
		var body = '';

		response.on('data', function(data) {
			body += data;
		});

		//parsing JSON data
		response.on('end', function () {
			if (response.statusCode === 200) { //means 'OK'
				try {

					var weather = JSON.parse(body);
					console.log("Timezone: " + weather.timezone + "\n Current Weather: " + weather.currently + "\n Daily Weather: " + weather.daily);

				} catch(error) {
					printError(error);
				}
			} else {
				printError({message: 'There was an error getting the weather for ' + cordinates + '. (' + response.statusMessage + ')'});
			}
		});
	};

	request.on('error', printError);
}

module.exports.get = getWeather;