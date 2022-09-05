const fs = require("fs");

const main = (fileData) => {
    const dataJson = JSON.parse(fileData);
    const rules = dataJson.rules;
    const [noms, ...data] = dataJson.data;

    let joueurs = {};

    for(let [key, value] of Object.entries(noms)){ // Object.entries transforme un objet en tableau
        joueurs[key] = {
            nom : value,
            score : 0
        };
    }

    for(let elem of data){
        for(let [keys, valeur] of Object.entries(elem)){
            joueurs[keys].score += rules[valeur-1];
        }
    }
    return joueurs;
};

fs.readFile("exercice2_data.txt", "utf-8", (error, fileData) =>{
    
    if(error) throw error;

    const joueurs = main(fileData);

    yellow = new Joueur(joueurs, "yellow");
    console.log(yellow.getClassement());

});

class Joueur{

    constructor(resultat, couleur){
        this.resultat = resultat;
        this.couleur = couleur;
    }

    getNom(){
        return this.resultat[this.couleur].nom;
    }

    getPoint(){
        return this.resultat[this.couleur].score;
    }

    getClassement(){
        const scoreCouleur = this.resultat[this.couleur].score;
        let classement = 1;

        for(let key in this.resultat){
            if( scoreCouleur < this.resultat[key].score){
                classement++;
            }
        }
        return classement;
    }

    resolveClassement(){
        for(let [key, value] of Object.entries(this.resultat)){
            
        }
    }
}
