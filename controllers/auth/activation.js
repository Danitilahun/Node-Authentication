const jwt = require("jsonwebtoken");
const ErrorHandler = require("../../utils/errorHandler");
const User = require("../../model/User");

const activationController = async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    const { username, email, password, role } = newUser;

    let user = await User.findOne({ email }).exec();

    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    user = await User.create({
      username,
      email,
      role,
      password,
      accountVerification: {
        emailVerified: true,
      },
    });

    res.status(201).json({
      success: true,
      message: `Your account has been successfully activated. You can now log in to your account and start exploring our platform.`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = activationController;
