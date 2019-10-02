import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import Cart from "../../models/Cart";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(403).send("Missing one or more fields!");
    }
    // Validat user data  name, email, password
    if (!isLength(name, { min: 3, max: 20 })) {
      return res
        .status(422)
        .send("Name must be between 3 and 20 characters long!");
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .send("Password must be a minimum of 6 characters long!");
    } else if (!isEmail(email)) {
      return res.status(422).send("Please provide a valid email!");
    }
    // 1) Check to see if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email: ${email}.`);
    }
    // 2) If not, hash their password
    const hash = await bcrypt.hash(password, 10);
    // 3) Create new user
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();
    // 4) Create cart for new user
    const cart = await new Cart({ user: newUser._id }).save();
    // 5) Create token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    // 6) Send back token
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up new user. Please try again later!");
  }
};
