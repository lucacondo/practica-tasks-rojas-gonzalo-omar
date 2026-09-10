import { RoleModel } from "../models/role.model.js";
import { UserModel } from "../models/user.model.js";

export const createRole = async (req, res) => {
  try {
    const { role_name } = req.body;
    if (!role_name) return res.status(400).json({ message: "El nombre del rol es requerido" });

    const role = await RoleModel.create({ role_name });
    return res.status(201).json({ message: "Rol creado exitosamente", data: role });
  } catch (error) {
    return res.status(500).json({ message: "Error interno" });
  }
};


export const assignRoleToUser = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;

    const user = await UserModel.findByPk(user_id);
    const role = await RoleModel.findByPk(role_id);

    if (!user || !role) {
      return res.status(404).json({ message: "Usuario o Rol no encontrado" });
    }

    await user.addRole(role);

    return res.status(200).json({ message: "Rol asignado al usuario exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno al asignar rol" });
  }
};