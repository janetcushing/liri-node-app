# liri-node-app
This is a siri-like application - a language interpretation and recognition interface.  

This application is activated through the command line.  It will write out to the command line, and also will write to a log file at ./log.txt.  You need node.js and some npm files loaded onto your computer in order to run this application.  Please see instructions below for running the app.


To activate the application :


Download the application code from https://github.com/janetcushing/liri-node-app


In the terminal window, navigate to the directory where you have downloaded the liri-node-app code.


Type on the command line:

node -v    (this will confirm that you have node installed on your computer.  It will show the version of node that you have.)

npm -v     (this will confirm that you have npm installed on your computer.  It will show the version of npm that you have.)

npm install    (this will install all the node package manager (npm) files that you need to run this app)

node liri.js   ( this will kick off the liri application)



The application will give you 4 options on the command line.  Use the up and down arrow keys to select the option that you want:  

my-tweets - will display the most recent 20 of my tweets (twitter account cushcushj)

spotify-this-song - you enter the song name and the app will return information about that song from the spotify api

movie-this - you enter a movie title and the application will return information about that movie from the omdb api

do-what-it-says - this option will display the option which is hard coded into the ./random.txt file.
