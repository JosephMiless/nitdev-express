import { DataTypes, Model } from "sequelize";
import {sequelize} from "../config/sequelize.js"


export class Account extends Model { } 



Account.init({
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    bankName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    accountType: {
        type: DataTypes.ENUM('savings', 'current', 'fixed', 'domiciliary'),
        allowNull: false,
        defaultValue: 'savings'
    }
    ,balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'NGN'
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'dormant'),
        allowNull: false,
        defaultValue: 'active'
    },

}, {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts',
    timestamps: true
})

