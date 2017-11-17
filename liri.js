

// function getcredentials() {
// var myKeyObj = require("./keys.js");
// console.log("myKeyObj " + JSON.stringify(myKeyObj));
// }

function getMyTweets() {

  var myKeyObj = require("./keys.js");
  var Twitter = require('twitter');
  console.log("myKeyObj " + JSON.stringify(myKeyObj));

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
      //  console.log(JSON.stringify(tweets));
      console.log("how many tweets " + Object.keys(tweets).length);

      for (var i = 0;
        (i < Object.keys(tweets).length && i < 20); i++) {
        console.log("----------------------------");
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
        console.log("----------------------------");
        //  console.log(tweets[index].name);
      }
    } else {
      console.log("error happened: " + error);
    }
  });
}


function getMySong() {

  var mySpotifyKeyObj = require("./keys.js");
  var Spotify = require('node-spotify-api');
  // console.log("mySpotifyKeyObj " + JSON.stringify(mySpotifyKeyObj));

  var spotify = new Spotify({
    id: mySpotifyKeyObj.keyObj.spotifyKeys.id,
    secret: mySpotifyKeyObj.keyObj.spotifyKeys.secret
  });

  spotify.search({
    type: 'track',
    query: 'The Sign'
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else{
      console.log(JSON.stringify(data));
      return data;
    }

  
  });

}

//----------------//
// main process
//----------------//
console.log(process.argv);
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

} else {
  console.log("unrecognized app requested");
}