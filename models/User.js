import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must provide a name!"]
    },
    email: {
      type: String,
      required: [true, "A user must provide a email!"],
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: [true, "A user must provide a password!"],
      select: false
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "root"]
    }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
