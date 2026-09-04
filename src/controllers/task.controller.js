import { TaskModel } from "../models/task.model.js";
import { json, Op, where } from "sequelize";

export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    if(!title || !description){
      return res.status(400).json({ message:"Es requerido un título y descripción" })
    };

    if(title.trim() == "" || description.trim() == ""){
      return res.status(400).json({ message: "Los campos no deben estar vacío"})
    };

    if(typeof !title == "string" || typeof !description == "string"){
      return res.status(400).json({ message: "Los datos deben ser de tipo texto"})
    };

    if(title.length < 100 || description.length < 100){
      return res.status(400).json({ message: "No debe ser más de 100 caracteres"})
    };

    if(isComplete == undefined && typeof isComplete !== "boolean"){
      return res.status(400).json({ message: "Este campo debe ser válido y booleano"})
    };

    const existTask = await TaskModel.findOne({ where : { title, id: { [ Op.ne] : id } }});

    if(existTask){
      return res.status(400).json({ message: "Ya existe un título con este nombre"})
    };

    const task = await TaskModel.create({ title, description, isComplete });

    return res.status(201).json({ message: "Tarea creada exitosamente" });

  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};



export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll();
    return res.status(200).json({ message: "Tareas obtenidas exitosamente", data: tasks });
  
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await TaskModel.findByPk(id);

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

    const { title, description, isComplete } = req.body;
    
        if(!title || !description){
      return res.status(400).json({ message:"Es requerido un título y descripción" })
    };

    if(title.trim() == "" || title.trim() == ""){
      return res.status(400).json({ message: "Los campos no deben estar vacío"})
    };

    if(typeof !title == "string" || typeof !description == "string"){
      return res.status(400).json({ message: "Los datos deben ser de tipo texto"})
    };

    if(title.length < 100 || description.length < 100){
      return res.status(400).json({ message: "No debe ser más de 100 caracteres"})
    };

    if(isComplete == undefined && typeof isComplete !== "boolean"){
      return res.status(400).json({ message: "Este campo debe ser válido y booleano"})
    };

    const existTask = await TaskModel.findOne({ where : {title} });

    if(existTask){
      return res.status(400).json({ message: "Ya existe un título con este nombre"})
    };

    const taskUpdated = await TaskModel.update({ title, description, isComplete }, { where: { id } });

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
