const sqlite = require("sqlite3");

class Database {
    constructor() {
        this.db = new sqlite.Database("./restaurant.db", (error) => {
            if (error) console.error(error.message);
            console.log("Connected to user database");
        });
        this.initDatabase();
    }

    initDatabase() {
        this.db.run(
            "CREATE TABLE IF NOT EXISTS 'product' (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(256), price INTEGER, type VARCHAR(256), subtype VARCHAR(256))",
            (error) => {
                if (error) console.log(error);
            }
        );
        this.db.run(
            "CREATE TABLE IF NOT EXISTS 'table' (id INTEGER PRIMARY KEY AUTOINCREMENT,  prix INTEGER)",
            (error) => {
                if (error) console.log(error);
            }
        );
        this.db.run(
            "CREATE TABLE IF NOT EXISTS 'table_product' (id INTEGER PRIMARY KEY AUTOINCREMENT, table_id INTEGER, product_id INTEGER)",
            (error) => {
                if (error) console.log(error);
            }
        );
    }

    run(query, params = []) {
        const context = this;
        return new Promise((resolve, reject) => {
            context.db.run(query, params, (error) => {
                if (error) reject(error.message);
                resolve();
            });
        });
    }

    all(query, params = []) {
        const context = this;
        return new Promise((resolve, reject) => {
            context.db.all(query, params, (error, rows) => {
                if (error) reject(error.message);
                resolve(rows);
            });
        });
    }

    get(query, params = []) {
        const context = this;
        return new Promise((resolve, reject) => {
            context.db.get(query, params, (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }
}

module.exports = new Database();
