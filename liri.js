require("dotenv").config();

var fs = require("fs");

var axios = require("axios");

var moment = require('moment');

var keys = require("./keys.js");

// // Spotify code

var spotify = new Spotify(keys.spotify);

function Spotify() {};
 
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

var a = process.argv[2];

var searchTerm = process.argv.splice(3, process.argv.length - 1);

// // If spotify-this-song command is used, executes the following which will display artist, song name, preview link, and album

if (a === "spotify-this-song") {
spotify
.search({ type: 'track', query: searchTerm })
.then(function(response) {
    console.log("--------------------------------------------------------")
    console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
    console.log("Track Title: " + response.tracks.items[0].name);
    console.log("Preview URL: " + response.tracks.items[0].preview_url);
    console.log("Album: " + response.tracks.items[0].album.name);
    console.log("--------------------------------------------------------")
})
.catch(function(err) {
    console.log(err);
});
};

// Bands in Town Code
var artist = searchTerm.join('');

var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

// // If "concert-this" command is used, Bandsintown API returns the artists next concert
if (a === "concert-this"){
    axios.get(queryUrl).then(
        function(response){
            for(i = 0; i < response.data.length; i++){
            console.log("Venue: " + response.data[i].venue.name)
            console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region)
            console.log("Date: " + moment(response.data[i].datetime).format("L"))
            console.log("--------------------------------------------------------")
        }}
    ).catch(function(err) {
        console.log(err);
   })
};

// OMDB Code
var movie = searchTerm

var movieQueryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

if (a === "movie-this"){
    axios.get(movieQueryURL).then(
        function(response){
            console.log("--------------------------------------------------------")
            console.log("Title: " + response.data.Title)
            console.log("Year Released: " + response.data.Year)
            console.log("IMDB Rating: " + response.data.imdbRating)
            console.log("Country Produced: " + response.data.Country)
            console.log("Language: " + response.data.Language)
            console.log("Plot: " + response.data.Plot)
            console.log("Actors: " + response.data.Actors)
            console.log("--------------------------------------------------------")
        }
    )
};


// Do What It Says Code
if (a === "do-what-it-says"){
fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
        return console.log(error);
      }
    var dataArr = data.split(",");
    if (dataArr[0] === "spotify-this-song"){
    var randomSearchTerm = dataArr[1];
    spotify
    .search({ type: 'track', query: randomSearchTerm })
    .then(function(response) {
        console.log("--------------------------------------------------------")
        console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
        console.log("Track Title: " + response.tracks.items[0].name);
        console.log("Preview URL: " + response.tracks.items[0].preview_url);
        console.log("Album: " + response.tracks.items[0].album.name);
        console.log("--------------------------------------------------------")
    })
    .catch(function(err) {
        console.log(err);
    })}
  })
  };



 