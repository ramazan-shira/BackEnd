const User = require("../model/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { image, name, email, phone, password, role } = req.body;
    const user = new User({ image, name, email, phone, password, role });
    await user.save();
    return res.status(200).send({
      message: "User created successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong!",
      error: error.message || error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { image, name, email, phone, password, role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, {
      image,
      name,
      email,
      phone,
      password,
      role,
    });
    if (!user) {
      return res.send({ message: "User not found!", type: "error" });
    } else {
      return res.status(200).send({
        message: "User updated successfully!",
        user: { image, name, email, phone, password, role, _id: req.params.id },
      });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
      password: password,
    }).exec();
    if (!user) {
      return res.send({ message: "User not found!", type: "error" });
    } else {
      return res.status(200).send(user);
    }
  } catch (error) {}
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found!", type: "error" });
    } else {
      return res.status(200).send({ message: "User deleted successfully!" });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.updateProfile = async (req, res) => {
  const { image, name, email, phone, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      image,
      name,
      email,
      phone,
      password,
    });
    if (!user) {
      return res
        .status(404)
        .send({ message: "Profile not found!", type: "error" });
    } else {
      return res.status(200).send({
        message: "Profile updated successfully!",
        user: {
          image,
          name,
          email,
          phone,
          password,
          _id: req.params.id,
        },
      });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.addUser = async (req, res) => {
  try {
    const { image, name, email, phone, password, role } = req.body;
    const user = new User({ image, name, email, phone, password, role });
    if (!user) {
      return res
        .status(404)
        .send({ message: "Something went wrong!", type: "error" });
    } else {
      await user.save();
      return res.status(200).send({
        message: "User added successfully!",
        user,
      });
    }
  } catch (error) {
    res.send(error);
  }
};
