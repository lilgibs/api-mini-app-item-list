const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/auth");

const userData = [
  {
    id: 1,
    name: "User Keren",
    username: "user",
    password: "user",
  },
  {
    id: 2,
    name: "Admin Keren",
    username: "admin",
    password: "admin",
  },
];

router.get("/users", verifyToken, (req, res) => {
  const userId = req.user.id
  console.log(userId)
  try {
    const getUserData = userData.find(user => user.id === userId)
    console.log(getUserData)
    res.status(200).send({
      data: {
        id: getUserData.id,
        name: getUserData.name
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error!", error });
    console.log(error)
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    const user = userData.find(user => user.username === username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (password !== user.password) {
      return res.status(401).json({ auth: false, accessToken: null, reason: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id, name: user.name }, "supersecret", {
      expiresIn: '1h', // expires in 1 hour
    });

    res.status(200).send({
      auth: true,
      data: {
        id: user.id,
        name: user.name,
      },
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error!" });
  }

});


module.exports = router;
