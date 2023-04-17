import userDAO from '../Dao/user/user.js';

const userService = {
  getUserByEmail: async (email) => {
    return await userDAO.getUserByEmail(email);
  },
  createUser: async (first_name, last_name, age, email, password, role) => {
    return await userDAO.createUser(first_name, last_name, age, email, password, role);
  },
};
export default userService;















// import { userModel } from "../Dao/models/user.js";

// const getUserByEmail = async (email) => {
//   return await userModel.findOne({ email });
// };

// const createUser = async (first_name, last_name, age, email, password, role) => {
//   const user = new userModel({
//     first_name,
//     last_name,
//     age,
//     email,
//     password,
//     role,
//   });
//   return await user.save();
// };

// export const userService= { getUserByEmail, createUser };