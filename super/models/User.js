const Sequelize = require("sequelize");
const db = require("../database/db.js");
const bcrypt = require('bcryptjs');
module.exports = db.sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    created: {
        type: Sequelize.DATE,
        defautValue: Sequelize.NOW
    },
}, {
    timestamps: false
});