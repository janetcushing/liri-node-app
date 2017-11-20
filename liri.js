//-------------------------------------------//
// global variables stored in a json object
//------------------------------------------//
appVariables = {
  "appRequestType": " ",
  "appRequestName": " ",
  "msg": "default"
}

//------------------------------//
// functions
//------------------------------//

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
      log.log("how many tweets " + Object.keys(tweets).length);
      log.log("info", " ");
      for (var i = 0;
        (i < Object.keys(tweets).length && i < 20); i++) {
        log.log("info", "----------------------------");
        log.log("info", tweets[i].created_at);
        log.log("info", tweets[i].text);
        log.log("info", "----------------------------");
      }
      log.log("info", " ");
    } else {
      log.log("error", "error happened: " + error);
    }
  });
}


//------------------------------------------------------------------//
// this function retrieves the song entered in on the command line
//------------------------------------------------------------------//
function getMySong() {
  if (appVariables.appRequestName == undefined) {
    getAceOfBaseSong();
  } else {
    var mySpotifyKeyObj = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
      id: mySpotifyKeyObj.keyObj.spotifyKeys.id,
      secret: mySpotifyKeyObj.keyObj.spotifyKeys.secret
    });
    spotify.search({
      type: 'track',
      query: appVariables.appRequestName
      //, limit: 20
    }, function (err, data) {
      if (err) {
        // log.log("error", 'Error occurred: ' + err);
        log.log("info", "Couldn\'t find your song, so ");
        log.log("info", "doing another search");
        getAceOfBaseSong();
      } else {
        if (data !== undefined) {
          log.log("info", " ");
          log.log("info", "-------------------------------------");
          log.log("info", "Song Name: " + data.tracks.items[0].name);
          log.log("info", "Artists: " + data.tracks.items[0].album.artists[0].name);
          log.log("info", "Album: " + data.tracks.items[0].album.name);
          log.log("info", "Preview URL: " + data.tracks.items[0].preview_url);
          log.log("info", "-------------------------------------");
          log.log("info", " ");
          return data;
        } else {
          log.log("info", "Couldn\'t find your song, so ");
          log.log("info", "doing another search");
          getAceOfBaseSong();
        }
      }
    });
  }
}

//-------------------------------------------------------------//
// this function retrieves the song "The Sign" by Ace of Base
//-------------------------------------------------------------//
function getAceOfBaseSong() {
  var songId = "0hrBpAOgrt8RXigk83LLNE";
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
      log.log("info", " ");
      log.log("info", "-------------------------------------");
      log.log("info", "Song Name: " + data.name);
      log.log("info", "Artists: " + data.album.artists[0].name);
      log.log("info", "Album: " + data.album.name);
      log.log("info", "Preview URL: " + data.preview_url);
      log.log("info", "-------------------------------------");
      log.log("info", " ");
      return data;
    })
    .catch(function (err) {
      log.log("error", 'Error occurred: ' + err);
    });
}

//------------------------------------------------------------------//
// retrieve the info for the movie entered in on the command line
//------------------------------------------------------------------//
function getMyMovie() {
  var request = require('request');
  if (appVariables.appRequestName == undefined) {
    getMrNobody();
  } else {
    var queryUrl = "http://www.omdbapi.com/?t=" + appVariables.appRequestName + "&y=&plot=short&apikey=40e9cece";
    request(queryUrl, function (error, response, body) {
      // If the request was successful...
      if (!error && response.statusCode === 200) {
        if (JSON.parse(body).Title !== undefined) {
          log.log("info", " ");
          log.log("info", "-------------------------------------");
          log.log("info", "Movie Title: " + JSON.parse(body).Title);
          log.log("info", "Year the movie came out: " + JSON.parse(body).Year);
          log.log("info", "IMDB Rating: " + JSON.parse(body).imdbRating);
          log.log("info", "Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
          log.log("info", "Country: " + JSON.parse(body).Country);
          log.log("info", "Language: " + JSON.parse(body).Language);
          log.log("info", "Plot: " + JSON.parse(body).Plot);
          log.log("info", "Actors: " + JSON.parse(body).Actors);
          log.log("info", "-------------------------------------");
          log.log("info", " ");
        } else {
          // log.log("warn", "status code: " + response.statusCode);
          log.log("warn", "The Movie was not found. ");
          log.log("info", "Here is another movie:");
          getMrNobody();
        }
      } else {
        // log.log("error", "An error was returned: ");
        // log.log("error", "status code: " + response.statusCode);
        // log.log("error", "Error: " + error);
        log.log("warn", "The Movie was not found. ");
        log.log("info", "Here is a different movie:");
        getMrNobody();
      }
    });
  }
}

//------------------------------------------------------------------//
// retrieve the info for the movie entered in on the command line
//------------------------------------------------------------------//
function getMrNobody() {
  appVariables.appRequestName = "Mr. Nobody";
  var request = require('request');
  var queryUrl = "http://www.omdbapi.com/?t=" + appVariables.appRequestName + "&y=&plot=short&apikey=40e9cece";
  request(queryUrl, function (error, response, body) {
    // If the request was successful...
    if (!error && response.statusCode === 200) {
      if (JSON.parse(body).Title !== undefined) {
        log.log("info", " ");
        log.log("info", "-------------------------------------");
        log.log("info", "Movie Title: " + JSON.parse(body).Title);
        log.log("info", "Year the movie came out: " + JSON.parse(body).Year);
        log.log("info", "IMDB Rating: " + JSON.parse(body).imdbRating);
        log.log("info", "Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        log.log("info", "Country: " + JSON.parse(body).Country);
        log.log("info", "Language: " + JSON.parse(body).Language);
        log.log("info", "Plot: " + JSON.parse(body).Plot);
        log.log("info", "Actors: " + JSON.parse(body).Actors);
        log.log("info", "-------------------------------------");
        log.log("info", " ");
      } else {
        log.log("warn", "The Movie was not found: ");
        log.log("warn", "status code: " + response.statusCode);
      }
    } else {
      log.log("error", "An error was returned: ");
      log.log("error", "status code: " + response.statusCode);
      log.log("error", "Error: " + error);
    }
  });
}

//----------------------------------------------------------------------//
// get the request from the random.txt file, and execute it
//----------------------------------------------------------------------//
function doWhatItSaysRequest() {
  var fs = require("fs");
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      log.log("error", "An error was returned: ");
      log.log("error", "Error: " + err);
      return log.log(err);
    }
    let randomRequest = data.split(",");
    appVariables.appRequestType = randomRequest[0];
    appVariables.appRequestName = randomRequest[1];
    if (appVariables.appRequestType == "my-tweets") {
      log.log("info", "my-tweets requested");
      getMyTweets();
    } else if (appVariables.appRequestType === "spotify-this-song") {
      log.log("info", "spotify requested");
      getMySong();
    } else if (appVariables.appRequestType === "movie-this") {
      log.log("info", "movie-this requested");
      getMyMovie();
    }
  });
}

//----------------------------------------------------------//
// main process
//----------------------------------------------------------//

//--------------------------------------------------------//
// create a custom timestamp format for log statements
//--------------------------------------------------------//
const SimpleFileLogger = require('simple-node-logger'),
  opts = {
    logFilePath: 'log.txt',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
  },
  log = SimpleFileLogger.createSimpleLogger(opts);


//--------------------------------------------------//
// Ask the user which search type they want to do
//--------------------------------------------------//
var inquirer = require("inquirer");
// Ask the question and prompt for an answer
inquirer.prompt([{
  type: "list",
  name: "appType",
  message: "Which search do you want to do??",
  choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
}]).then(function (type) {
  appVariables.appRequestType = type.appType;
  if (type.appType === "do-what-it-says") {
    log.log("info", "do-what-it-says requested");
    doWhatItSaysRequest();
  } else if (type.appType === "my-tweets") {
    log.log("info", "my-tweets requested");
    getMyTweets();
  } else if (type.appType === "spotify-this-song" || type.appType === "movie-this") {
    if (type.appType === "spotify-this-song") {
      appVariables.msg = "song"
    } else if (type.appType === "movie-this") {
      appVariables.msg = "movie"
    }
    inquirer.prompt([{
      type: "input",
      name: "appName",
      message: "What is the name of the " + appVariables.msg + " you want to search for???"
    }]).then(function (name) {
      appVariables.appRequestName = name.appName;
      if (appVariables.appRequestType === "spotify-this-song") {
        log.log("info", "spotify requested");
        getMySong();
      } else if (appVariables.appRequestType === "movie-this") {
        log.log("info", "movie-this requested");
        getMyMovie();
      }
    });
  }
});


//----------------------------------------------------------//
// check which task was requested and call the appropriate
// functions.  If do-what-it-says is requested, then 
// read the random.txt file to get the request
//----------------------------------------------------------//  
// if (appVariables.appRequest === "do-what-it-says") {
//   // if (process.argv[2] === "do-what-it-says") {
//   log.log("info", " ");
//   log.log("info", "do-what-it-says requested");
//   doWhatItSaysRequest();
//   log.log("info", " ");
// } else {
  // appVariables.appRequest = process.argv[2];
  // appVariables.appRequestName = process.argv[3];
  // if (appVariables.appRequest == "my-tweets") {
  //   log.log("info", " ");
  //   log.log("info", "my-tweets requested");
  //   getMyTweets();
  //   log.log("info", " ");
  // } else if (appVariables.appRequest === "spotify-this-song") {
  //   log.log("info", " ");
  //   log.log("info", "spotify requested");
  //   getMySong();
  //   log.log("info", " ");
    // } else if (appVariables.appRequest === "movie-this") {
    //   log.log("info", " ");
    //   log.log("info", "movie-this requested");
    //   getMyMovie();
    //   log.log("info", " ");
//   } else if (appVariables.appRequest !== "do-what-it-says") {
//     log.log("info", " ");
//     log.log("info", "unrecognized app requested");
//     log.log("info", " ");
//   }
// }