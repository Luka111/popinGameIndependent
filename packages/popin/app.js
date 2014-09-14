 
/*
 * Defining the Package
 */

var Module = require("meanio").Module;

var Popin = new Module("Popin");

var sass = require('node-sass'),
  express = require('express');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */

Popin.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Popin.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Popin.menus.add({
      title: "popin example page",
      link: "popin example page",
      roles: ["authenticated"],
      menu: "main"
    });

    app.use('/popin', express.static(__dirname + '/public'));

    /*
    app.use(
      sass.middleware({
        src: __dirname + '/public/assets/css',
        dest: __dirname + '/public',
        debug: true,
        outputStyle: 'compressed'
      })
    );
    */

    sass.renderFile({
      file: __dirname + '/public/assets/css/main.scss',
      outFile : __dirname + '/public/assets/css/main.css',
      success:function(){console.log('o jea');},
      error:function(){console.log('oops',arguments);}
    });

    Popin.aggregateAsset('css','main.css');

    /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Popin.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Popin.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settigns
    Popin.settings(function (err, settings) {
      //you now have the settings object
    });
    */

    return Popin;
});
