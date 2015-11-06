var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  index: {unique: true},
  username: String, 
  password: String
});

var User = mongoose.model('User', UserSchema);

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password), function(err, isMatch) {
    if (err){
      callback(err);
    } else {
      callback(null, isMatch);
    }
  });
};

UserSchema.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password, hash);
      next()
    });
};
// });

module.exports = User;
