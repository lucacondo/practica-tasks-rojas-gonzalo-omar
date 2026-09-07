import { PersonModel } from "./person.model.js";
import { UserModel } from "./user.model.js";
import { TaskModel } from "./task.model.js";
import { RoleModel } from "./role.model.js";
import { UserRoleModel } from "./user_role.model.js";

// relacion entre la persona y su usuario:
PersonModel.hasOne(UserModel, {foreignKey: "person_id", as: "owner"});

UserModel.belongsTo(PersonModel, { foreignKey: "person_id", as: "person"});

// relación entre usuario y su tarea:
UserModel.hasMany(TaskModel, { foreignKey: "user_id", as: "user" });

TaskModel.belongsTo(UserModel, { foreignKey: "user_id", as: "tasks"});

// relación entre usuario y rol:
UserModel.belongsToMany(RoleModel, {
    through: UserRoleModel,
    foreignKey: "user_id",
    as: "roles"
});

RoleModel.belongsToMany(UserModel, {
    through: UserRoleModel,
    foreignKey: "role_id",
    as: "users"
});
