'use strict';

// The Package is past automatically as first parameter
module.exports = function(Popin, app, auth, database) {

    app.get('/popin/example/anyone', function (req,res,next) {
      res.send('Anyone can access this');
    });

    app.get('/popin/example/auth',auth.requiresLogin, function (req,res,next) {
      res.send('Only authenticated users can access this');
    });

    app.get('/popin/example/admin',auth.requiresAdmin, function (req,res,next) {
      res.send('Only users with Admin role can access this');
    });    

    app.get('/popin/example/render', function (req,res,next) {
      Popin.render('index', {package:'popin'}, function (err, html) {
        //Rendering a view from the Package server/views
        res.send(html);
      })
    })
};