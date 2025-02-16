const authService = require("../services/authServices");

const registerUser = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res
      .status(201)
      .send({
        message: "User registered successfully",
        success: true,
        data: { name: user?.name, email: user?.email, _id: user?._id },
      });
  } catch (error) {
    return res.status(409).send({ message: error.message, success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { token, user } = await authService.login(req.body);
    res.send({
      message: "Login successful",
      token,
      data: { name: user?.name, email: user?.email, _id: user?._id },
      success: true,
    });
  } catch (error) {
    return res.status(401).send({ message: error.message, success: false });
  }
};

module.exports = { registerUser, loginUser };
