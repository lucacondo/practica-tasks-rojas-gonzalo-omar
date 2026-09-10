import { RoleModel } from "../models/role.model.js";
import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";
import { Op } from "sequelize";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, person_id } = req.body;

    //Validación de un dato nulo
    if(!name || !email || !password || !person_id ) {
      return res.status(400).json({ message: "Todos los campos son requeridos" })
    }

    //Validación de tipo de dato
    if(typeof name !== "string" 
      || typeof email !== "string" 
      || typeof password !== "string"
      || typeof person_id !== "number") {
      return res.status(400).json({ message: "Todos los campos deben ser de tipo string" });
    }

    //Valicación de un dato vacio
    if(name.trim() === "" 
    || email.trim() === "" 
    || password.trim() === ""
    || person_id.toString().trim() === "") {
      return res.status(400).json({ message: "Ningún campo puede estar vacío" });
    }

    //Validación de la longitud de los campos
    if(name.length > 100) {
      return res.status(400).json({ message: "El nombre debe tener menos de 100 caracteres" });
    }

    if(email.length > 100) {
      return res.status(400).json({ message: "El email debe tener menos de 100 caracteres" });
    }

    if(password.length > 100) {
      return res.status(400).json({ message: "La contraseña debe tener menos de 100 caracteres" });
    }

    //Validación de la existencia del email
    const existingUser = await UserModel.findOne({ where: { email } });
    if(existingUser) {
      return res.status(400).json({ message: "El email ya está en uso" });
    }

    //Creación del usario en la base de datos
    await UserModel.create( {name, email, password, person_id} );

    return res.status(201).json({ message: "Usuario creado exitosamente" });

  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};



  export const getAllUsers = async (req, res) => {
  try {

    const users = await UserModel.findAll({
      include: [{
        model: TaskModel,
        as: "tasks",
        attributes: ["id", "title", "description", "isComplete"]
      },
      {
        model: RoleModel,
        as: "roles",
        attributes: ["id", "role_name"],
        through: { attributes: [] } 
      }],
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({ message: "Usuarios obtenidos exitosamente", data: users });

  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};



  export const getUserById = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await UserModel.findByPk(id, {
      include: [{
        model: TaskModel,
        as: "tasks",
        attributes: ["id", "title", "description", "isComplete"]
      }],
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ message: "Usuario obtenido exitosamente", data: user });

  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};



  export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    //Se busca en la base de datos el id y es guardado en una constante
    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const { name, email, password, person_id } = req.body;

    //Validación de un dato nulo
    if(!name || !email || !password || !person_id) {
      return res.status(400).json({ message: "Todos los campos son requeridos" })
    }

    //Validación de tipo de dato
    if(typeof name !== "string" 
      || typeof email !== "string" 
      || typeof password !== "string"
      || typeof person_id !== "number") {
      return res.status(400).json({ message: "Todos los campos deben ser de tipo string" });
    }

    //Valicación de un dato vacio
    if(name.trim() === "" 
    || email.trim() === "" 
    || password.trim() === ""
    || person_id.toString().trim() === "") {
      return res.status(400).json({ message: "Ningún campo puede estar vacío" });
    }

    //Validación de la longitud de los campos
    if(name.length > 100) {
      return res.status(400).json({ message: "El nombre debe tener menos de 100 caracteres" });
    }

    if(email.length > 100) {
      return res.status(400).json({ message: "El email debe tener menos de 100 caracteres" });
    }

    if(password.length > 100) {
      return res.status(400).json({ message: "La contraseña debe tener menos de 100 caracteres" });
    }

    //Validación de la existencia del email
    const existingUser = await UserModel.findOne({ where: { email, id: { [Op.ne]: id } } });
    if(existingUser) {
      return res.status(400).json({ message: "El email ya está en uso" });
    }

    //Actualización del usuario en la base de datos
    await UserModel.update({ name, email, password, person_id }, { where: { id } });

    return res.status(200).json({ message: "Usuario actualizado exitosamente" });

  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};



  export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.destroy();

    return res.status(200).json({ message: "Usuario eliminado exitosamente" });

  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });

  }};