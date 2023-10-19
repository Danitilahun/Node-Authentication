const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const customerSchema = new Schema(
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
    firstName: String,
    lastName: String,
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    phoneNumber: String,
    role: {
      type: String,
      enum: ["customer", "admin", "vendor"],
      default: "customer",
    },
    paymentMethods: [
      {
        type: Schema.Types.ObjectId,
        ref: "PaymentMethod",
      },
    ],
    shippingAddresses: [
      {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
        isDefault: Boolean,
      },
    ],
    profilePicture: String,
    preferences: {
      language: String,
      currency: String,
    },
    notificationSettings: {
      orderUpdates: Boolean,
      promotions: Boolean,
      newsletters: Boolean,
    },
    accountVerification: {
      emailVerified: {
        type: Boolean,
        default: false,
      },
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  {
    timestamps: true,
  }
);

//  Hash password
customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// // jwt token
// customerSchema.methods.getJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRES,
//   });
// };

// compare password
customerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
