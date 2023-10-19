const User = require("../../model/User");
const sendMail = require("../../utils/sendMail");
const registerSchema = require("../../validation/user");
const ErrorHandler = require("../../utils/errorHandler");
const createActivationToken = require("../../utils/createActivationToken");

const registerController = async (req, res, next) => {
  try {
    // Extract and validate input data
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }

    const { username, email, password, role } = value;

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const user = {
      username: username,
      email: email,
      password: password,
      role: "User",
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:3000/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.username}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email (${user.email}) to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

module.exports = registerController;
