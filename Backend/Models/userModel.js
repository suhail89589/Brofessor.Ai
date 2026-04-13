import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true },
);

// -----------------------------
// HASH PASSWORD BEFORE SAVE
// -----------------------------
userSchema.pre("save", async function () {
  // If password isn't modified, just exit the function
  if (!this.isModified("password")) {
    return; 
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    // NO next() CALL HERE. 
    // Mongoose knows we are done because the async function finishes.
  } catch (error) {
    // If you want to throw an error to the controller:
    throw error; 
  }
});
// -----------------------------
// COMPARE PASSWORD
// -----------------------------
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// -----------------------------
// SIGN JWT TOKEN
// -----------------------------
userSchema.methods.getSignedToken = function () {
  // Note: This remains synchronous as jwt.sign returns a string instantly
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export default mongoose.model("User", userSchema);
