// ADD_USER CONTROLLER
exports.adduser = async (req, res) => {
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
};

// GET_USERS
exports.getusers = async (req, res) => {
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
};

// DELETE_USER BY ID

exports.deleteuserbyid = async (req, res) => {
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
};

// EDIT_USER BY ID

exports.edituserbyid = async (req, res) => {
  try {
    const _id = req.params.id;
    const modification = req.body;

    const response = await User.updateOne(
      { _id },
      { $set: { ...modification } },
      { useFindAndModify: false }
    );
    response.nModified
      ? res
          .status(200)
          .send({ msg: "The user has been edited successfully", response })
      : res.send({ msg: "Nothing updated!!" });
  } catch (error) {
    res.status(400).send({ msg: "There is no user!!", error });
  }
};
