//initail input variables for node.js
var cmd = process.argv[2],
    input = process.argv[3],
    keys = require("./keys.js");

switch (cmd) {
    case "movie-this":

        console.log("omdb api");

        break;

    case "spotify-this-song":

        console.log("spotify api");

        break;

    case "my-tweets":
        var Twitter = require('twitter');

        var params = { q: 'node.js' };

        var client = new Twitter(keys.twitterKeys)

        client.get('search/tweets', params, function(error, tweets, response) {

        	if (error){

        		return console.log("this is an error:" + JSON.stringify(error));
        	};
            if (tweets) {
            	for (var x = 0; x < tweets.statuses.length; x++){
            	console.log(`#${x} this tweet was created on: ${tweets.statuses[x].created_at}`);
            	console.log(`#${x} tweet: ${tweets.statuses[x].text}`);
            	};
            	
            };
            // if (response) {

            // 	console.log("this is the response: " + response);
            // }

        });

        break;

    case "do-what-it-says":

        console.log("text file call");

    default:

        console.log("you need to try a different command to run this file");

}