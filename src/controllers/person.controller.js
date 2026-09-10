import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";

export const createPerson = async (req, res) => {
  try {
    const { name, lastname } = req.body;
    
    if (!name || !lastname) {
      return res.status(400).json({ message: "Nombre y apellido son requeridos" });
    }

    const person = await PersonModel.create({ name, lastname });
    return res.status(201).json({ message: "Persona creada exitosamente", data: person });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const getAllPeople = async (req, res) => {
  try {
    const people = await PersonModel.findAll({
      include: [{
        model: UserModel,
        as: "owner",
        attributes: ["id", "email"]
      }]
    });
    return res.status(200).json({ data: people });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};