/**
* Finger.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {


    bitesNails: {
      type: 'boolean'
    },

    mouse: {
      model: 'Mouse'
    },

    previousMousesTouched: {
      collection: 'Mouse'
    },

    nextLikelyMouseToTouch: {
      model: 'Mouse'
    }
  }
};




// {
//   bitesNails: true,
//   mouse: {

//   },
//   previousMousesTouched: [{

//   }, {

//   }],
//   nextLikelyMouseToTouch: {

//   }
// }
