'use strict';

// Prevent inevitable timezone confusion between servers, UIs, and APIs
process.env.TZ = 'UTC';

// Tell us about any uncaught errors
process.on('uncaughtException', function (err) {
    console.log(err);
});

// Load in our app class
var ThingsTodoApp = require('./src/thingsTodo');

// Create an instance of our app
var thingsTodoApp = new ThingsTodoApp({
    baseDir: __dirname,
});

// Start it up!
// Bootstrap modules, emit startup events, etc.
thingsTodoApp.start();
