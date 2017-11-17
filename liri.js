//----------------------------------------------------------//
// retrieve my most recent 20 tweets from twitter or if
// there arent 20 tweets out there, retrieve them all
//----------------------------------------------------------//
function getMyTweets() {
  var myKeyObj = require("./keys.js");
  var Twitter = require('twitter');
  var client = new Twitter({
    consumer_key: myKeyObj.keyObj.twitterKeys.consumer_key,
    consumer_secret: myKeyObj.keyObj.twitterKeys.consumer_secret,
    access_token_key: myKeyObj.keyObj.twitterKeys.access_token_key,
    access_token_secret: myKeyObj.keyObj.twitterKeys.access_token_secret
  });

  var params = {
    screen_name: 'cushcushj'
  };

  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log("how many tweets " + Object.keys(tweets).length);

      for (var i = 0;
        (i < Object.keys(tweets).length && i < 20); i++) {
        console.log("----------------------------");
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
        console.log("----------------------------");
      }
    } else {
      console.log("error happened: " + error);
    }
  });
}


//------------------------------------------------------------------//
// this function retrieves the song entered in on the command line
//------------------------------------------------------------------//
function getMySong() {
  if (process.argv[3] == undefined) {
    getAceOfBaseSong();
  } else {
    var songName = process.argv[3];
    var mySpotifyKeyObj = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
      id: mySpotifyKeyObj.keyObj.spotifyKeys.id,
      secret: mySpotifyKeyObj.keyObj.spotifyKeys.secret
    });
    spotify.search({
      type: 'track',
      query: songName
      //, limit: 20
    }, function (err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        console.log("Couldn\'t find your song, so ");
        console.log("doing another search");
        getAceOfBaseSong();
      } else {
        if (data !== undefined) {
          console.log("-------------------------------------");
          console.log("Song Name: " + data.tracks.items[0].name);
          console.log("Artists: " + data.tracks.items[0].album.artists[0].name);
          console.log("Album: " + data.tracks.items[0].album.name);
          console.log("Preview URL: " + data.tracks.items[0].preview_url);
          console.log("-------------------------------------");
          return data;
        } else {
          console.log("Couldn\'t find your song, so ");
          console.log("doing another search");
          getAceOfBaseSong();
        }
      }
    });
  }
}

//-------------------------------------------------------------//
// this function retrieves the song "The Sign by Ace of Base"
//-------------------------------------------------------------//
function getAceOfBaseSong() {
  var songId = "0hrBpAOgrt8RXigk83LLNE";
  var songName = "The Sign";
  var artistName = "Ace of Base";

  var mySpotifyKeyObj = require("./keys.js");
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify({
    id: mySpotifyKeyObj.keyObj.spotifyKeys.id,
    secret: mySpotifyKeyObj.keyObj.spotifyKeys.secret
  });

  var spotifyRequest = "https://api.spotify.com/v1/tracks/" + songId;

  spotify
    .request(spotifyRequest)
    .then(function (data) {
      //  console.log(data);
      console.log("-------------------------------------");
      console.log("Song Name: " + data.name);
      console.log("Artists: " + data.album.artists[0].name);
      console.log("Album: " + data.album.name);
      console.log("Preview URL: " + data.preview_url);
      console.log("-------------------------------------");
      return data;
    })
    .catch(function (err) {
      console.error('Error occurred: ' + err);
    });
}

//------------------------------------------------------------------//
// retrieve the info for the movie entered in on the command line
//------------------------------------------------------------------//
function getMyMovie() {
  var movieName = process.argv[3];
  var request = require('request');
  if (process.argv[3] == undefined) {
    getMrNobody();
  } else {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    // console.log(queryUrl);
    request(queryUrl, function (error, response, body) {

      // If the request was successful...
      if (!error && response.statusCode === 200) {
        if (JSON.parse(body).Title !== undefined) {
          console.log("-------------------------------------");
          console.log("Movie Title: " + JSON.parse(body).Title);
          console.log("Year the movie came out: " + JSON.parse(body).Year);
          console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
          console.log("Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("Country: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);
          console.log("-------------------------------------");
        } else {
          console.log("status code: " + response.statusCode);
          console.log("The Movie was not found. ");
          console.log("Here is another movie:");
          getMrNobody();
        }
      } else {
        console.log("An error was returned: ");
        console.log("status code: " + response.statusCode);
        console.log("Error: " + error);
        console.log("Here is a different movie:");
        getMrNobody();
      }
    });
  }
}


//------------------------------------------------------------------//
// retrieve the info for the movie entered in on the command line
//------------------------------------------------------------------//
function getMrNobody() {
  var movieName = "Mr. Nobody";
  var request = require('request');
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  // console.log(queryUrl);
  request(queryUrl, function (error, response, body) {

    // If the request was successful...
    if (!error && response.statusCode === 200) {
      if (JSON.parse(body).Title !== undefined) {
        console.log("-------------------------------------");
        console.log("Movie Title: " + JSON.parse(body).Title);
        console.log("Year the movie came out: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("-------------------------------------");
      } else {
        console.log("The Movie was not found: ");
        console.log("status code: " + response.statusCode);
      }
    } else {
      console.log("An error was returned: ");
      console.log("status code: " + response.statusCode);
      console.log("Error: " + error);
    }
  });

}

//----------------------------------------------------------//
// main process
//----------------------------------------------------------//
// console.log(process.argv);
var appRequest = process.argv[2];

if (appRequest === "my-tweets") {
  console.log("my-tweets requested");
  // fetch the last 20 tweets and console log them
  getMyTweets();

} else if (appRequest === "spotify-this-song") {
  console.log("spotify requested");
  getMySong();

} else if (appRequest === "movie-this") {
  console.log("movie-this requested");
  getMyMovie();

} else {
  console.log("unrecognized app requested");
}