// Arquivo: models/ong.js

const database = require('../config/database');
const { Sequelize } = database;

class Ong {
    constructor() {
        this.model = database.define('ongs', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nomeDaOng: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cnpj: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true 
            },
            areaDeAtuacao: {
                type: Sequelize.STRING,
                allowNull: false
            },
            telefone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            logradouro: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cidade: {
                type: Sequelize.STRING,
                allowNull: false
            },
            estado: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
    }
}

module.exports = (new Ong).model;