'use strict';

// Prevent inevitable timezone confusion between servers, UIs, and APIs
process.env.TZ = 'UTC';

// Get the environment name from the ENVIRONMENT_NAME environment variable if
// it has been set, otherwise use 'local'
var environmentName = process.env.ENVIRONMENT_NAME || 'local';

// Load in our app class
var ThingsTodoApp = require('./src/thingsTodo');

// Create an instance of our app
var thingsTodoApp = new ThingsTodoApp({

    env: environmentName,

    baseDir: __dirname,
    srcDir: './src',
    etcDir: './etc',

    /**
     * Additional dependencies to make available
     */
    provide: {

        /**
         * Creates an injectable instance of the XublitMongoDb module, which
         * will be bootstrapped with the configuration options specified
         * the configuration specified, dependency with the reference '$mongoDb'
         */
        $mongoDb: {
            usingConfiguration: 'mongodb',
            createInstanceOf: 'XublitMongoDb',
        },

        $restServer: {
            usingConfiguration: 'restServer',
            createInstanceOf: 'XublitRestServer',
        },

    },

});

// MongoDB
thingsTodoApp.provide('$mongoDb', {
    usingConfiguration: 'mongodb',
    createInstanceOf: 'XublitMongoDb',
});

// REST Server
thingsTodoApp.provide('$restServer', {
    usingConfiguration: 'restServer',
    createInstanceOf: 'XublitRestServer',
});

// Relational Models
thingsTodoApp.provide('$models', {
    usingConfiguration: 'models',
    createInstanceOf: 'XublitRelationalModels',
});

// Start it up!
// Bootstrap modules, emit startup events, etc.
thingsTodoApp.start();

// Log any uncaught errors in console
process.on('uncaughtException', function (err) {
    console.log(err);
});
