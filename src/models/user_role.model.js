import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const UserRoleModel = sequelize.define('User_Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    }
});

