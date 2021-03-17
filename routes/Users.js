const express = require("express");
const router = express.Router();
const User = require("../models/User");
const controllers = require("../Controllers/user.controller");

// @DESC: ADD A NEW USER TO THE DATABASE
// @Method: POST
// @PATH: http://localhost:5000/api/users/add_user
// @DATA : User data (name,email,age)

router.post("/add_user", controllers.adduser);

// @DESC: RETURN ALL USERS
// @Method: GET
// @PATH: http://localhost:5000/api/users

router.get("/", controllers.getusers);

// @DESC: REMOVE A USER BY ID
// @Method: DELETE
// @PATH: http://localhost:5000/api/users/delete_user/:id
// Params : id

router.delete("/delete_user/:id", controllers.deleteuserbyid);

// @Desc: EDIT A USER BY ID
// @Method: PUT
// PATH: http://localhost:5000/api/users/edit_user/:id
// Params : id
// DATA: req.body

router.put("/edit_user/:id", controllers.edituserbyid);

module.exports = router;
