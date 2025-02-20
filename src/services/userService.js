const User = require("../models/User");

const fetchUsers = async () => {
  try {
    const users = await User.find();
    const usersData = users.map((user) => {
      return {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      };
    });
    return usersData;

  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = { fetchUsers };
