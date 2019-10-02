import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDb();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1) Check if user exists with provided email
    const user = await User.findOne({ email }).select("+password");
    // 2) If not, return an error
    if (!user) {
      res.status(404).send("No user found with that email!");
    }
    // 3) Check to see if provided passsword matches the one in the DB
    const passwordsMatch = await bcrypt.compare(password, user.password);
    // 4) If so, generate a token
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
      });
      // 5) Send the token to the client
      res.status(200).json(token);
    } else {
      res.status(401).send("Passwords do not match!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in user!");
  }
};
