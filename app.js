var profile = require('./profile.js');
//must pass users in command line, like so: node app.js chalkers christopherjohnson3 etc.
var users = process.argv.slice(2); 

//forEach doesn't have great support across all browsers, but does in the V8 engine.
users.forEach(profile.get);
