const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    additionalImages: [String], // Array of URLs or paths to additional images
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    saleEvent: {
      startingDate: Date,
      endingDate: Date,
      salePrice: Number,
      discountPercentage: Number,
      discountDescription: String,
    },
    storehouseManagement: Boolean,
    stockStatus: {
      type: String,
      enum: ["In stock", "Out of stock"],
      default: "In stock",
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    lowStockAlert: Number,
    inStock: Boolean,
    rating: {
      avgRating: Number,
      ratingCount: Number,
      ratingSum: Number,
      ratingBreakdown: {
        1: Number,
        2: Number,
        3: Number,
        4: Number,
        5: Number,
      },
    },

    shipping: {
      weight: Number,
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
      },
      shippingMethods: [String],
    },

    attributes: [
      {
        name: String,
        values: [String],
      },
    ],
    relatedProducts: [
      {
        relatedProduct: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        relationType: String,
      },
    ],

    seo: {
      metaTitle: String,
      metaDescription: String,
    },
    categories: [String],
    brand: String,
    productCollections: [String],
    tax: {
      type: String,
      enum: ["VAT", "Sales Tax", "None"],
      default: "None",
    },
    tags: [String],
    couponCode: String,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
