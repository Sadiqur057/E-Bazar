const jwt = require("jsonwebtoken");
const jwt_secret = process.env.TOKEN_SECRET;

const generateToken = (user) => {
  return jwt.sign(
    { id: user?._id, email: user?.email, role: user?.role },
    jwt_secret,
    {
      expiresIn: "3d",
    }
  );
};

module.exports = { generateToken };
