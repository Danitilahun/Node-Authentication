const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
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
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
