

export const createTask = async (req, res) => {
  try {


    return res.status(201).json({ message: "Tarea creada exitosamente" });

  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};

export const getAllTasks = async (req, res) => {
  try {
    return res.status(201).json({ message: "Tareas obtenidas exitosamente" });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};

export const getTaskById = async (req, res) => {
  try {
    return res.status(201).json({ message: "Tarea obtenida exitosamente" });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};

export const updateTask = async (req, res) => {
  try {
    return res.status(201).json({ message: "Tarea actualizada exitosamente" });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};

export const deleteTask = async (req, res) => {
  try {
    return res.status(201).json({ message: "Tarea eliminada exitosamente" });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error interno en el servidor" });
  }};
