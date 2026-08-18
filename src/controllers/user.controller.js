import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if(!name) {
      return res.status(400).json({ message: "El user no debe ser vacío" })
    }

    const user = await UserModel.create( {name, email, password} );

    return res.status(201).json({ message: "Usuario creado exitosamente" });
  }catch (error) {x
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};

  export const getAllUsers = async (req, res) => {
  try {
    return res.status(201).json({ message: "Usuarios obtenidos exitosamente" });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};

  export const getUserById = async (req, res) => {
  try {
    return res.status(201).json({ message: "Usuario obtenido exitosamente" });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};

  export const updateUser = async (req, res) => {
  try {
    return res.status(201).json({ message: "Usuario actualizado exitosamente" });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};

  export const deleteUser = async (req, res) => {
  try {
    return res.status(201).json({ message: "Usuario eliminado exitosamente" });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};