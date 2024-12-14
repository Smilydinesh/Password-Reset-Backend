const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,  
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],  
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10); 
      this.password = await bcrypt.hash(this.password, salt);  
    }
    next();  
  } catch (error) {
    next(error);  
  }
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);  
};

const User = mongoose.model("User", userSchema);

module.exports = User;
