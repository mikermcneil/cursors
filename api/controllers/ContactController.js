/**
 * Module dependencies
 */

var nodemailer = require('nodemailer');


/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `ContactController.sendEmail()`
   *
   * @param {String} email [the return email address]
   * @param {String} fullName [the full name of the person submitting this contact]
   */
  sendEmail: function (req, res) {

    // req.param('from');
    RoomService.sendEmail({
      fullName: req.param('fullName'),
      email: req.param('email')
    }, function (error, info) {
      if (error){
        return res.negotiate(error);
      }

      return res.json(info);
    });

  }

};

