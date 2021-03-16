const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @DESC: ADD A NEW USER TO THE DATABASE
// @Method: POST
// @PATH: http://localhost:5000/api/users/add_user
// @DATA : User data (name,email,age)

router.post("/add_user", async (req, res) => {
  try {
    const newuser = req.body;
    if (!newuser.email) {
      res.status(400).send({ msg: "Email is required" });
      return;
    }
    if (!newuser.name) {
      res.status(400).send({ msg: "Name is required" });
      return;
    }
    const adduser = new User({ ...newuser });
    const response = await adduser.save();

    res
      .status(200)
      .send({ msg: "The user has been added successfully", response });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Cannot add User", Error: error });
  }
});

// @DESC: RETURN ALL USERS
// @Method: GET
// @PATH: http://localhost:5000/api/users

router.get("/", async (req, res) => {
  try {
    const response = await User.find();
    if (response.length === 0) {
      res.status(400).send({ msg: "Cannot find Users" });
      return;
    }
    res.status(200).send({ msg: "Here is all the users", Response: response });
  } catch (error) {
    res.status(400).send({ Error: error });
  }
});

// @DESC: REMOVE A USER BY ID
// @Method: POST
// @PATH: http://localhost:5000/api/users/delete_user/:id
// Params : id

router.post("/delete_user/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await User.findByIdAndRemove({ _id });
    if (!response) {
      res.status(400).send({ msg: "User not found!!" });
      return;
    }
    res.status(200).send({
      msg: "The user has been deleted successfully",
      Response: response,
    });
  } catch (error) {
    res.status(400).send({ msg: "Cannot delete User", error });
  }
});

// @Desc: EDIT A USER BY ID
// @Method: PUT
// PATH: http://localhost:5000/api/users/edit_user/:id
// Params : id
// DATA: req.body

router.put("/edit_user/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const modification = req.body;

    const response = await User.findOneAndUpdate(
      { _id },
      { $set: { ...modification } },
      { useFindAndModify: false }
    );

    res
      .status(200)
      .send({ msg: "The user has been edited successfully", response });
  } catch (error) {
    res.status(400).send({ msg: "Cannot edit user!!", error });
  }
});

module.exports = router;
