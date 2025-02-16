const mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../utils/passwordHash");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { versionKey: false, timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); 
  this.password = await hashPassword(this.password);
  next();
});


UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await comparePassword(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
