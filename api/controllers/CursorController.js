/**
 * CursorController
 *
 * @description :: Server-side logic for managing cursors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function (req,res) {

    // This is an existing user-- instead of creating, look up her cursor.
    if (req.session.me) {
      Cursor.findOne({
        id: req.session.me
      }).exec(function (err, cursor) {
        if (err) return res.negotiate(err);
        if (!cursor) return res.notFound();
        return res.json(cursor);
      });
      return;
    }

    // Otherwise this is a new user-- we'll create a cursor for her.
    Cursor.create(req.allParams(), function (err, newCursor) {
      if (err) return res.negotiate(err);

      // Publish an event letting everyone who cares that a new cursor was created.
      // (but don't publish it to ourselves- that's why we pass in `req`)
      Cursor.publishCreate(newCursor, req);

      // Then save her cursor id in her session
      req.session.me = newCursor.id;

      // Session is automatically persisted when we respond (just like in Express)
      return res.json(newCursor);
    });

  },



};
