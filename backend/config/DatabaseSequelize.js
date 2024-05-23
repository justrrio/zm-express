import { Sequelize } from "sequelize";

const db = new Sequelize("zm_express", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

export default db;