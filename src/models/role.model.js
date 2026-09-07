import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const RoleModel = sequelize.define('Role', {
    role_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
});
