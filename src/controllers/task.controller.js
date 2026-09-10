import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";
import { Op } from "sequelize";

export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, user_id } = req.body;

    if(!title || !description || !user_id){
      return res.status(400).json({ message:"Es requerido un título, descripción y el user_id" })
    };

    if(title.trim() == "" || description.trim() == ""){
      return res.status(400).json({ message: "Los campos no deben estar vacío"})
    };

    if(typeof title !== "string" || typeof description !== "string"){
      return res.status(400).json({ message: "Los datos deben ser de tipo texto"})
    };

    if(title.length > 100 || description.length > 100){
      return res.status(400).json({ message: "La descripción o título no debe ser más de 100 caracteres"})
    };

    if(isComplete !== undefined && typeof isComplete !== "boolean"){
      return res.status(400).json({ message: "Este campo debe ser válido y booleano" })
    };

    const userExists = await UserModel.findByPk(user_id);
    if (!userExists) {
      return res.status(404).json({ message: "No se puede crear la tarea: el usuario indicado no existe" });
    }

    const existTask = await TaskModel.findOne({ where : { title } });

    if(existTask){
      return res.status(400).json({ message: "Ya existe un título con este nombre"})
    };

    await TaskModel.create({ title, description, isComplete, user_id });

    return res.status(201).json({ message: "Tarea creada exitosamente" });

  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};



export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll({
      include:[{
        model: UserModel,
        as: "user",
        attributes: ["id", "name", "email"],
      }],
    });
    return res.status(200).json({ message: "Tareas obtenidas exitosamente", data: tasks });
  
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};



export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await TaskModel.findByPk(id, {
      include: [{
        model: UserModel,
        as: "user",
        attributes: ["id", "name", "email"],
      }],
    });

    if(!task){
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    return res.status(200).json({ message: "Tarea obtenida exitosamente", data: task });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};



export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await TaskModel.findByPk(id);

    if(!task){
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    const { title, description, isComplete, user_id } = req.body;
    
    if(!title || !description || !user_id){
      return res.status(400).json({ message:"Es requerido un título, descripción y usuario" })
    };

    if(title.trim() == "" || description.trim() == "" || user_id.toString().trim() == ""){
      return res.status(400).json({ message: "Los campos no deben estar vacío"})
    };

    if(typeof title !== "string" || typeof description !== "string"){
      return res.status(400).json({ message: "Los datos deben ser de tipo texto"})
    };

    if(title.length > 100 || description.length > 100){
      return res.status(400).json({ message: "La descripción o título no debe ser más de 100 caracteres"})
    };

    if(isComplete !== undefined && typeof isComplete !== "boolean"){
      return res.status(400).json({ message: "Este campo debe ser válido y booleano" })
    };

    const userExists = await UserModel.findByPk(user_id);
    if (!userExists) {
      return res.status(404).json({ message: "El usuario indicado no existe" });
    };

    const existTask = await TaskModel.findOne({ where : { title, id: { [Op.ne]: id } } });
    if(existTask){
      return res.status(400).json({ message: "Ya existe un título con este nombre" })
    };

    await TaskModel.update({ title, description, isComplete, user_id }, { where: { id } });

    return res.status(200).json({ message: "Tarea actualizada exitosamente" });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};



export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await TaskModel.findByPk(id);

    if(!task){
      return res.status(400).json({ message: "Tarea no encontrada" });
    }

    await task.destroy();

    return res.status(200).json({ message: "Tarea eliminada exitosamente" });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};
