const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"admin",
    database:"motiongames",
})

db.connect((error) => {
    if (error) throw error;
    console.log("Conectado ao Banco de Dados!");
});

module.exports = db;