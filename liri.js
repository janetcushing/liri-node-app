//twitter
var Twitter = require('twitter');

var client = new Twitter({
 consumer_key: '',
 consumer_secret: '',
 access_token_key: '',
 access_token_secret: ''
});

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
 if (!error) {
   console.log(tweets);
 }
});



// spotify
// search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
 id: <your spotify client id>,
 secret: <your spotify client secret>
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
 if (err) {
   return console.log('Error occurred: ' + err);
 }

console.log(data); 
});


// imdb

var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});


// send request to: http://www.omdbapi.com/?apikey=[yourkey]&

// api key:  ab4f91c6