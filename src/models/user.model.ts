import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    profilePicture: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

// check  if model is already compiled ! if yes delete it.

if (mongoose.models && mongoose.models["users"]) {
  mongoose.deleteModel("users");
}

export const UserModel = mongoose.model("users", userSchema);
