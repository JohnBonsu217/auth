const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());

//  testing the server
app.listen(5000, () => {
  console.log("server started!");
});

//  secret token here
const JWT_SECRET = "jgiu6534eszs4REDRY2RTI899)yrxh";

//  connecting to database
const mongoURL =
  "mongodb+srv://mrshabel:Brain1000@cluster0.nczvjn5.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => console.log(error));

require("./userDetails");
const User = mongoose.model("UserDetails");

// user registration api down here
app.post("/register", async (req, res) => {
  const { name, username, email, phoneNumber, password } = req.body;

  //  encrpting password
  const securedPassword = await bcrypt.hash(password, 7);

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(401).json({ error: "User already exists" });
    }

    await User.create({
      name,
      username,
      email,
      phoneNumber,
      password: securedPassword,
    });
    res.send({
      status: "ok",
    });
  } catch (error) {
    res.status(500).json({
      error: "coudn't create user",
    });
  }
});

//  user login api
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid)
    return res.status(401).json({ error: "invalid password" });

  const token = jwt.sign({}, JWT_SECRET);
  res.status(200).json({ data: token });

  //   if (passwordValid) {
  //     const token = jwt.sign({}, JWT_SECRET);
  //     if (res.status(201)) {
  //       return res.json({ status: "ok", data: token });
  //     } else {
  //       return res.json({ error: "error" });
  //     }
  //   }
  //   res.status(401).json({ message: "Invalid Password" });
});

//  fetching user data
app.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    if (!user) {
      return res.status(401).json({ error: "invalid password" });
    }
    const { email } = User;
    User.findOne({ email }).then((data) => {
      res.status(200).send({ data: data });
    });
  } catch (error) {
    res.status(401).send({ error: "no user" });
  }
});
