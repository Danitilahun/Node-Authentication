const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    accountVerification: {
      emailVerified: {
        type: Boolean,
        default: false,
      },
    },
    role: {
      type: String,
      enum: ["customer", "admin", "vendor"],
      default: "customer",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

//  Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
