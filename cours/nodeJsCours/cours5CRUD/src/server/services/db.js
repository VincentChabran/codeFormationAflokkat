const sqlite = require("sqlite3");

class Database {
    constructor() {
        this.db = new sqlite.Database("./users.db", (error) => {
            if (error) console.error(error.message);
            console.log("Connected to user database");
        });
        this.initDatabase();
    }

    initDatabase() {
        this.db.run(
            "CREATE TABLE IF NOT EXISTS 'users' (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(256), lastname VARCHAR(256), email VARCHAR(256), age INTEGER)",
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
