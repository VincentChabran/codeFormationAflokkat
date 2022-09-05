const db = require("./db.js");

class UserService {
    async createUser(user) {
        const values = `('${user.firstname}', '${user.lastname}', '${user.mail}', '${user.age}')`;
        const query = `INSERT INTO 'users' (firstname, lastname, email, age) values ${values}`;
        try {
            await db.run(query);
            console.log("success");
        } catch (error) {
            console.log(error);
        }
    }

    async getUserById(id) {
        const query = `SELECT * FROM 'users' WHERE id=${id}`;
        try {
            const result = await db.get(query);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserService();
