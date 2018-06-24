const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const config = require("./../config/config").get(process.env.NODE_ENV);

const SALT_I = 10;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    maxlength: 100
  },
  lastname: {
    type: String,
    maxlength: 100
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

/*---------------hashing password------------*/
userSchema.pre("save", function(next) {
  var user = this;

  if (user.isModified("password")) {
    console.log(user);
    bcrypt.genSalt(SALT_I, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

/*------------comparing hash password-------------*/

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMacth) {
    if (err) return cb(err);
    cb(null, isMacth);
  });
};



/*------------------token checking-------------*/

userSchema.methods.findbyToken = function(token, cb) {
  var user = this;
  //console.log(user);
  jwt.verify(token, config.SECRET, (err, decode) => {
    user.findOne({ _id: decode, token: token }, function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

/*-------------------token generation-------------- */

userSchema.methods.generateToken = function(cb) {
  let user = this;
  var token = jwt.sign(user._id.toHexString(), config.SECRET);
  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.methods.deleteToken = function(token, cb) {
  var use = this;
  user.update({ $unset: { token: 1 } }, (err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
