//initail input variables for node.js
var cmd = process.argv[2],
    input = process.argv,
    keys = require("./keys.js");

function liriSwitch(userCommand, userInput) {
    switch (userCommand) {

        case "movie-this":
            var request = require("request");

            var query = [];

            for (var i = 3; i < userInput.length; i++) {

                var word = input[i];

                query.push(word);
            }
            query = query.join("+");


            request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {

                if (error) {
                    console.log(error);
                }

                if (!error && response.statusCode === 200) {

                    console.log("Title: " + JSON.parse(body).Title);
                    console.log("Year of release: " + JSON.parse(body).Year);
                    console.log("IMDB rating: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1]["Value"]);
                    console.log("Country of Origin: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                }
            });

            break;

        case "spotify-this-song":

            var spotifyApi = require('node-spotify-api');

            var spotify = new spotifyApi(keys.spotifyKeys);

            var query = [];

            if (typeof userInput === "object") {

                for (var i = 3; i < userInput.length; i++) {

                    var word = input[i];

                    query.push(word);

                    query = query.join(" ");
                }
            } else {

                query = userInput;
            }

            spotify.search({type: 'track', query: query, limit: 20}, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                if (data) {
                    artistArray = [];
                    for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
                        let artist = (data.tracks.items[0].artists[i].name);
                        artistArray.push(artist);
                        console.log("Artist(s): " + artistArray)
                    }
                    ;

                    console.log("Song title: " + data.tracks.items[0].name);
                    console.log("Preview: " + data.tracks.items[0].preview_url);
                    console.log("Album title: " + data.tracks.items[0].album.name);
                }
            });

            break;

        case "my-tweets":
            var Twitter = require('twitter');

            var params = {q: "mikeD_Developer", count: 20};

            var client = new Twitter(keys.twitterKeys)

            client.get('search/tweets', params, function (error, tweets, response) {

                if (error) {
                    return console.log("this is an error:" + JSON.stringify(error));
                }
                ;

                if (tweets) {
                    for (var x = 0; x < tweets.statuses.length; x++) {
                        console.log(`#${x + 1} this tweet was created on: ${tweets.statuses[x].created_at}`);
                        console.log(`#${x + 1} tweet: ${tweets.statuses[x].text}`);
                    }
                    ;
                }
                ;
            });

            break;

        case "do-what-it-says":

            var fs = require("fs");

            fs.readFile("random.txt", "utf8", function (err, data) {

                if (err) {
                    return err;
                }

                if (data) {

                    var info = data.split(',');
                    console.log(info);
                    console.log(info[1].replace(/"/g, ""))
                    liriSwitch(info[0], info[1].replace(/"/g, ""));

                }
                ;
            });

            console.log("text file call");

            break;

        default:

            console.log("you need to try a different command to run this file");

    }
}

liriSwitch(cmd,input);