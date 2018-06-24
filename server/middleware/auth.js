let { User } = require("./../models/user");

//console.log(User);
let auth = (req, res, next) => {
  let token = req.cookies.auth;
  User.findbyToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        err: true
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
