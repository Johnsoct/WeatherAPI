//Problem: We need a simple way to look at a user's badge count and JavaScript points.
//Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
var https = require('https');

//Print out message
function printMessage(username, badgeCount, points){
  var message = username + ' has ' + badgeCount + ' total badge(s) and ' + points + ' points in JavaScript';
  console.log(message);
}

//Print out error messages
function printError(e){
  console.error(e.message);
};
   
function get(username) {
  //connect to the API(http://teamtreehouse.com/username.json)
  var request = https.get('https://teamtreehouse.com/' + username + '.json', function(response) {
    var body = '';
    
    //Read the data
    response.on('data', function(chunk){
      body += chunk;
    });
    
    //Parse the data
    response.on('end', function(){
      if (response.statusCode === 200) {
      
        try {
          var profile = JSON.parse(body);
          //Print the data
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          printError(error);
        }
        
      } else {
        //Status Code Error
        printError({message: 'There was an error getting the profile for ' + username + '. (' + response.statusMessage + ')'});
      }
    });
  });
  
  //error
  request.on('error', printError);
}

//Export function 'get' through the module (this .js file) via exports
module.exports.get = get;