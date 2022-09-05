const axios = require("axios");
const db = require("./db.js");
const Product = require("./product.js");

class Table {
    async create() {
        const query = `INSERT INTO 'table' (prix) VALUES ('0')`;
        try {
            await db.run(query);
            console.log("success");
        } catch (error) {
            console.log(error);
        }
    }

    // calcul la recette du resto
    async getGlobalPrice() {
        const tables = await this.getAll();
        const nbTables = tables.length;
        let recetteResto = 0;
        for (let i = 1; i <= nbTables; i++) {
            const bill = await this.calculTotal(i);
            recetteResto += bill;
        }
        return recetteResto;
    }

    // Récupére tous les produit lier a cette table
    async getAllProductById(idTable) {
        const idProduits = await this.recupIdProduit(idTable);
        let produits = [];
        for (let produit of idProduits) {
            const produitComplet = await Product.getById(produit.product_id);
            produits.push(produitComplet);
        }
        return produits;
    }

    // Affiche l'addition de la table + les produits
    async getById(idTable) {
        const bill = await this.getTotalPrice(idTable);
        const products = await this.getAllProductById(idTable);

        const result = {
            bill: bill,
            products: products,
        };
        return result;
    }

    // récup l'id des produit de la table
    async recupIdProduit(idTable) {
        const query = "SELECT product_id FROM 'table_product' WHERE table_id = ?";
        try {
            const result = await db.all(query, idTable);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    // calcul le total d'une table
    async calculTotal(idTable) {
        const idProduits = await this.recupIdProduit(idTable);
        let totalPrix = 0;
        for (let obj of idProduits) {
            const query2 = `SELECT price FROM 'product' WHERE id = ${obj.product_id}`;
            const prix = await db.get(query2);
            totalPrix += prix.price;
        }
        return totalPrix;
    }
    // Update le total d'une table dans la BDD
    async getTotalPrice(idTable) {
        const totalPrix = await this.calculTotal(idTable);
        const query = `UPDATE 'table' SET prix=${totalPrix} WHERE id = ${idTable}`;
        await db.run(query);
        return totalPrix;
    }

    // Affiche toute les tables
    async getAll() {
        const query = "SELECT * FROM 'table'";
        try {
            const result = await db.all(query);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    // récupére les donner dans la table table_product
    async getAllTableProduct() {
        const query = "SELECT * FROM 'table_product'";
        try {
            const result = await db.all(query);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    // Update la table 'table_product' en dure
    // async updateTableProduct() {
    //     const query = `UPDATE 'table_product' SET product_id= 7 WHERE id = 2`;
    //     await db.run(query);
    // }
}

module.exports = new Table();
