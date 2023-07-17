const Users = require("../schemas/Users");

const bcrypt = require("bcrypt");
const validator = require("validator");

// const createToken = (_id) => {
//   return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
// };

const signup = async (req, res) => {
  try {
    const { first_name, last_name, birthday, signup_date, email, password } =
      req.body;
    const exists = await Users.findOne({ email });
    if (exists) {
      // throw Error("email already in use");
      return res.status(400).json({ msg: "Email already in use" });
    }
    if (
      !email ||
      !password ||
      !first_name ||
      !last_name ||
      !birthday ||
      !signup_date
    ) {
      // throw Error("please fill all fields");
      return res.status(400).json({ msg: "please fill all fields" });
    }
    if (!validator.isEmail(email)) {
      // throw Error("email is not valid");
      return res.status(400).json({ msg: "email is not valid" });
    }
    if (!validator.isStrongPassword(password)) {
      // throw Error(
      //   "make sure to use at least 8 charachters, one uppercase,one lower case, anumber and a symbol"
      // );
      return res.status(400).json({
        msg: "make sure to use at least 8 charachters, one uppercase,one lower case, anumber and a symbol",
      });
    }
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await Users.create({
      first_name,
      last_name,
      birthday,
      signup_date,
      email,
      password: hash,
    });
    return res.status(200).json({ msg: "success", user });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

module.exports = { signup };
