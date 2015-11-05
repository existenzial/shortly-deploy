var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });



//NOTES------------------ 
//1 define schemas & include in new models
//2 go into code & any place where were retrieving with knex or  .get we need to change to be mongoose..
//3 change env variable (port) to be mongo specific

var LinksSchema = new Schema({
  {url: String},
  {hasTimestamps: true},
  {defaults: {visits: 0} },



  });

mongoose.model('Link', LinksSchema);

















module.exports = Link;