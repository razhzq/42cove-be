require('dotenv').config()
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres', // Replace 'mysql' with your actual database dialect (e.g., 'postgres' or 'sqlite')
    logging: false
  })

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

