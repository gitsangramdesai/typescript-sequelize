import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../utils/database'

interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
export interface UserInput extends Optional<UserAttributes, 'id'> { }


export class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number
    public firstName!: string
    public lastName!: string
    public email!: string
    public password!: string

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false        
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})




