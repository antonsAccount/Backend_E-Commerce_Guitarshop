const Users = require("../schemas/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// login user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check that i have both field email and password
    if (!email || !password) {
      return res.status(400).json({ msg: "please fill all fields" });
    }
    //check if the email is correct
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "incorrect email" });
    }
    //check the password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "incorrect password" });
    }
    const token = createToken(user._id);
    return res.status(200).json({ msg: "success", email, token });
  } catch (error) {
    res.status(400).json({ msg: `an error occurred ${error}` });
  }
};

const updateUser = async (req, res) => {
  const _id = req.params.id;
  const { email, oldPassword, newPassword } = req.body;
  console.log(req.body);
  try {
    //when updating in the Frontend, send a request to /login/:id and either with email and old password or new password and old password.
    //Case: New Email
    if (email) {
      console.log("email tree");
      //get the user from the db
      const user = await Users.findOne({ _id });
      //check whether the pw is correct (make it mandatory for updates)
      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match) {
        return res.status(400).json({ msg: "incorrect old password" });
      }
      console.log("after match");
      //check whether the new email is already in use
      const exists = await Users.findOne({ email });
      if (exists) {
        return res.status(400).json({
          msg: "Please enter an email that is not associated with an account yet",
        });
      }
      console.log("after exists");

      //check whether the new email is valid
      if (!validator.isEmail(email)) {
        return res.status(400).json({ msg: "email is not valid" });
      }
      console.log("after email validator");
      // const res = Users.findByIdAndUpdate(user_id, {});

      return res.status(200).json({ msg: "user successfully updated" });
      //Case: New Password
    } else if (newPassword) {
      console.log("newPassword tree");
      //get the user from the db
      const user = await Users.findOne({ _id });
      //check whether the pw is correct (make it mandatory for updates)
      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match) {
        return res.status(400).json({ msg: "incorrect old password" });
      }
      console.log("after match");

      //encrypt new pw and check whether the password is different from the old one
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
      //
      const samePassword = await bcrypt.compare(oldPassword, newPassword);
      if (samePassword) {
        res.status(400).json({
          msg: "you cannot change the password to the same password you already selected",
        });
      }
      console.log("after same Password");

      // const res = Users.findByIdAndUpdate(user_id, {});

      return res.status(200).json({ msg: "user successfully updated" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ msg: "An error has occurred while updating the user", error });
  }
};

module.exports = { login, updateUser };
