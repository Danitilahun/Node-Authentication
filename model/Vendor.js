const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
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
  companyName: String,
  businessType: String,
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  phoneNumber: String,
  website: String,
  companyLogo: String,
  role: {
    type: String,
    enum: ["vendor", "admin", "customer"],
    default: "vendor",
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  accountVerification: {
    emailVerified: Boolean,
    phoneVerified: Boolean,
  },
  paymentInformation: {
    stripeAccountID: String,
    bankAccount: {
      bankName: String,
      bankCode: String,
      accountNumber: String,
      accountHolderName: String,
    },
    paypalID: String,
    upiID: String,
    description: String,
  },
  vatNumber: String,
  otherInfo: String,
  content: String,
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
