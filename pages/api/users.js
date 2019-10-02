import jwt from "jsonwebtoken";
import User from "../../models/User";

export default async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token!");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const users = await User.find({ _id: { $ne: userId } }).sort({
      role: "asc"
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(403).send("Please login again!");
  }
};
