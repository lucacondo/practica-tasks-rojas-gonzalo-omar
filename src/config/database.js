import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('tasks_users_db', 'root', '', {
    'host': 'localhost',
    'dialect': 'mysql'
});

export const startDB = async () => {
    try {
    await sequelize.authenticate();

    await sequelize.sync();
    console.log('La base de datos se ha iniciado correctamente.');
    } catch (error) {
        console.error('Error al iniciar la base de datos:', error);
    }
};

