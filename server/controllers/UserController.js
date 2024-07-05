import {
  getAllUsers,
  RegisterUser,
  SignInUser,
} from "../services/UserServices.js";

export const createUser = RegisterUser;

export const loginUser = SignInUser;

export const getUsers = getAllUsers;
