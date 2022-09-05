const axios = require("axios");
const db = require("./db.js");

class Product {
    async fillDatabase(nomFichier) {
        const response = await axios.get(`http://localhost:3000/produits?filename=${nomFichier}`);
        await this.insertProduct(response.data);
        return response.data;
    }

    async insertProduct(liste) {
        for (let ligne of liste) {
            const value = `('${ligne.nom}', '${ligne.prix}', '${ligne.type}', '${ligne.soustype}')`;
            const query = `INSERT INTO 'product' (name, price, type, subtype) VALUES ${value}`;
            try {
                await db.run(query);
                console.log("success");
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getAll() {
        const query = "SELECT * FROM 'product'";
        try {
            const result = await db.all(query);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        const query = "SELECT * FROM 'product' WHERE id = ?";
        try {
            const result = await db.get(query, id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getByType(type) {
        const query = "SELECT * FROM 'product' WHERE type = ?";
        try {
            const result = await db.all(query, type);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getBySubtype(subtype) {
        const query = "SELECT * FROM 'product' WHERE subtype = ?";
        try {
            const result = await db.all(query, subtype);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async addProducts(idTable, idProduit) {
        const suffix = idProduit.map((el) => "(?,?)").join(",");
        const query = `INSERT INTO 'table_product' (table_id, product_id) VALUES ('${idTable}', '${idProduit}')`;
        try {
            await db.run(query);
            console.log(`Table avec id : ${idTable} ajout produit id : ${idProduit}`);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Product();
