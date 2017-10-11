//initail input variables for node.js
var cmd = process.argv[2],
	input = process.argv[3];

switch(cmd) {
	case "movie-this":
	console.log("omdb api");
	break;
	case "spotify-this-song":
	console.log("spotify api");
	break;
	case "my-tweets":
	console.log("twitter api");
	break;
	case "do-what-it-says":
	console.log("text file call");
	default:
	console.log("you need to try a different command to get run this file");

}