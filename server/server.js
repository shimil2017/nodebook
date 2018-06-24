const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);
//console.log(config);

const jwt = require("jsonwebtoken");
mongoose.Promise = global.Promise;

mongoose.connect(config.DATABASE);
const { User } = require("./models/user");
const { Book } = require("./models/book");
const { auth } = require("./middleware/auth");
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/auth", (req, res) => {
  jwt.verify(req.cookies.auth, config.SECRET, (err, decode) => {
    if (err) return res.status(400).send(err);
    User.findOne({ _id: decode, token: req.cookies.auth }, function(err, user) {
      if (err) return res.status(400).send(err);
      res.json({
        isAuth: true,
        id: user._id,
        email: user.email,
        name: user.name,
        lastname: user.lastname
      });
    });
  });
});

/*---------------------*/

app.get("/app/logout", auth, (req, res) => {
  // res.send(req.user);
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);

    res.sendStatus(200);
  });
});

//GET//

app.get("/api/getBook", (req, res) => {
  let id = req.query.id;

  Book.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);

    res.send(doc);
  });
});

app.get("/api/books", (req, res) => {
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;
  Book.find()
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
});

//POST //

app.post("/api/book", (req, res) => {
  const book = new Book(req.body);
  book.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      bookId: doc._id
    });
  });
});

/*------------user-------------------*/

app.post("/api/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.status(400).json({ success: false });
    res.status(200).json({
      sucess: true,
      user: doc
    });
  });
});

app.post("/api/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({ isAuth: false, message: "failed wrong emil" });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          isAuth: false,
          message: "wrong passwrod"
        });
    });

    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie("auth", user.token).json({
        isAuth: true,
        id: user._id,
        token: user.token
      });
    });
  });
});

/*------------------reviewer-----------------------*/

app.get("/api/getReviewer", (req, res) => {
  let id = req.query.id;
  console.log(id);
  User.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({ name: doc.name, lastname: doc.lastname });
  });
});

app.get("/api/users", (req, res) => {
  User.find({}, { token: 0 }, (err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(users);
  });
});

app.get("/api/user_posts", (req, res) => {
  Book.find({ ownerId: req.query.user }).exec((err, docs) => {
    if (err) return res.status(400).send(err);
    res.send(docs);
  });
});

//UPDATE//

app.post("/api/book_update", (req, res) => {
  Book.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      success: true,
      doc
    });
  });
});

//DELETE//

app.delete("/api/delete_book", (req, res) => {
  let id = req.query.id;
  Book.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);

    res.json(true);
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
