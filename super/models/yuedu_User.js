const Sequelize = require("sequelize");
const db = require("../database/yuedu_db.js");
// const bcrypt = require('bcryptjs');
module.exports = db.sequelize.define("yuedu_members", {
    u_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    u_openid: {
        type: Sequelize.STRING,
    },
    u_name: {
        type: Sequelize.STRING,
    },
    u_face: {
        type: Sequelize.STRING,
    },
    u_random: {
        type: Sequelize.INTEGER,
    },
    u_integer: {
        type: Sequelize.INTEGER,

    },

    u_remainder: {
        type: Sequelize.INTEGER,

    },
    u_regtime: {
        type: Sequelize.DATE,
        defautValue: Sequelize.NOW
    }

}, {
    timestamps: false
});