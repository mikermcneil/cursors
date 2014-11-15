/**
 * MouseController
 *
 * @description :: Server-side logic for managing mice
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	pressLeftButton: function (req, res) {
    Mouse.find()
    .populate('fingers')
    .exec(function (err, mouses) {
      if (err){
        return res.negotiate(err);
      }

      // console.log(mouses[0]);
      // console.log(mouses[0].numButtons);
      // console.log(mouses[0].fingers);
      // console.log(mouses[0].fingers[0]);
      // console.log(mouses[0].fingers[0].bitesNails);

      return res.json(mouses);
    });
  }
};

