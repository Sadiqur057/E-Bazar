const { fetchUsers } = require("../services/userService");

const getUsers = async (req, res) => {
  try {
    const users = await fetchUsers();
    res.send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(409).send({ message: error.message, success: false });
  }
};

module.exports = { getUsers };
