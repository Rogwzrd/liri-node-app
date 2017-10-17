//import node packages for node.js
var fs = require("fs");

var spotifyApi = require('node-spotify-api');

var Twitter = require('twitter');

var request = require("request");

var keys = require("./keys.js");

var cmd = process.argv[2],
    input = process.argv;


//default state for wheter or not the do-what-it-says command has been invoked
var doWhatState = false;


function liriSwitch(userCommand, userInput) {

    switch (userCommand){

        //if the user inputs the movie command
        case "movie-this":

            //define the empty query array
            var query = [];

            //itterate through the user input arguments
            for (var i = 3; i < input.length; i++) {

                var word = input[i];

                //add each argument to the empty query array
                query.push(word);
            }

            //turn the array into a concatenated query
            query = query.join("+");

            //call the omdb api request
            request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {

                if (error) {
                    console.log(error);
                }

                //if the call is successful get all them data and log them
                if (!error && response.statusCode === 200) {
                    console.log(`*********************OMDB**************************`)
                    console.log("Title: " + JSON.parse(body).Title);
                    console.log("Year of release: " + JSON.parse(body).Year);
                    console.log("IMDB rating: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1]["Value"]);
                    console.log("Country of Origin: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                    console.log(`**************************************************`)
                }
            });

            break;

        case "spotify-this-song":

            var spotify = new spotifyApi(keys.spotifyKeys);

            var query = [];

            console.log(query)
            console.log(userInput)
            //if the user types in a argument for spotify-this-song
            if (typeof userInput === "object") {

                //itterate through all arguments beyond the user command
                for (var i = 3; i < userInput.length; i++) {

                    var word = userInput[i];

                    //add each argument to an array
                    query.push(word);
                }

                //squash the array into a string with +'s between each item
                query = query.join("+");
            }
            //if there is no user input and you have not run the do-what-it-says feature
            else if (!process.argv[4] && doWhatState === false) {
                console.log("doWhatState in the no input space is" + doWhatState);
                query = "the+sign+ace+of+base";
                console.log("no user input")
            }
            //if the user runs do-what-it says
            else {
                //make the query equal to content of the random.txt file
                query = userInput;
            console.log(query)
            }

            //run the api request with the new query
            spotify.request("https://api.spotify.com/v1/search?q=" + query + "&type=track", function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                //if the call is successful get all them data and log them
                if (data) {
                    artistArray = [];
                    console.log(`*******************SPOTIFY*************************`)
                    for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
                        let artist = (data.tracks.items[0].artists[i].name);
                        artistArray.push(artist);
                    }
                    console.log("Artist(s): " + artistArray);
                    console.log("Song title: " + data.tracks.items[0].name);
                    console.log("Preview: " + data.tracks.items[0].preview_url);
                    console.log("Album title: " + data.tracks.items[0].album.name);
                    console.log(`**************************************************`)
                }
            });

            break;\

            //the user inputs the my-tweets command
        case "my-tweets":

            var params = {q: "mikeD_Developer", count: 20};

            var client = new Twitter(keys.twitterKeys)

            //request my one shitty tweet... i'll make more I promise
            client.get('search/tweets', params, function (error, tweets, response) {

                if (error) {
                    return console.log("this is an error:" + JSON.stringify(error));
                }

                //if the call is successful get all them data and log them
                if (tweets) {
                    console.log(`*********************TWITTER*************************`)
                    for (var x = 0; x < tweets.statuses.length; x++) {
                        console.log(`#${x + 1} this tweet was created on: ${tweets.statuses[x].created_at}`);
                        console.log(`#${x + 1} tweet: ${tweets.statuses[x].text}`);
                    }
                   console.log(`**************************************************`)
                }

            });

            break;

            //the user inputs the do-what-it-says command
        case "do-what-it-says":

            var fs = require("fs");

            //confirm that you have engaged the do-what-it-says command
            doWhatState = true;

            //read the random.txt file
            fs.readFile("random.txt", "utf8", function (err, data) {

                if (err) {
                    return err;
                }

                //if there are no errors
                if (data) {

                    //split the file into individual arguments
                    var info = data.split(',');

                    //run the liriSwitch function in two argument sections pulled from the random.txt file
                    for (var i = 0; i < info.length; i += 2) {

                        //reformat the arguments and run the liriSwitch function
                        liriSwitch(info[i], info[i + 1].replace(/"/g, ""));
                    }
                }
            });

            break;

            //if the user inputs commands that are not defined
        default:

            console.log("you need to try a different command to run this file");
    }
}

liriSwitch(cmd,input);