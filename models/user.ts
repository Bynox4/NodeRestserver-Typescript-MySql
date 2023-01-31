import { DataTypes } from 'sequelize';
import db from '../db/connection';

const User = db.define('User', {
    idUsers: {
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    
});
    // {
    //     createdAt: false,
    //     updatedAt: false,
    // });


export default User;