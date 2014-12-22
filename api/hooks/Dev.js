
/**
 * Dev Hook
 *
 * A place to keep any backend code that's only for development.
 *
 * @param  {App} sails
 * @return {Object}
 * @hook
 */

module.exports = function dev(sails) {
  return {

    // This function is called when the Snap backend is started up, before `config/boostrap.js`.
    initialize: function (done) {
      if (process.env.NODE_ENV==='production') return done();

      // ...

      return done();
    },


    routes: {
      before: {
        // Prevent access to viewable documentation in a production environment.
        '/dev/*': function (req, res, next) {
          if (process.env.NODE_ENV==='production') {
            return res.notFound();
          }
          return next();
        },
        /////////////////////////////////////////////////////////////////////

        // In development, a quick convenience endpoint to view all routes
        'get /dev/routes': function (req, res, next) {
          return res.ok(sails.config.routes);
        },

        // In development, a quick convenience endpoint to view your session
        'get /dev/session': function (req, res, next) {
          return res.ok(req.session);
        }
      }
    }
  };
};
