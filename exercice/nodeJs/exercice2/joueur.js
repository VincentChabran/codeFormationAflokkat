class Joueur {
    constructor(result, couleur) {
        this.result = result;
        this.couleur = couleur;
        this.nom = result[couleur].nom;
        this.score = result[couleur].score;
        this.classement = this.setClassement();
    }

    getName() {
        return this.nom;
    }

    getScore() {
        return this.score;
    }

    getClassement() {
        return this.classement;
    }

    setClassement() {
        let pointsForColor = [];

        // Push un objet attribut color = key et score = value.score
        for (let [key, value] of Object.entries(this.result)) {
            pointsForColor.push({ color: key, score: value.score });
        }

        pointsForColor.sort((elA, elB) => elB.score - elA.score);

        return pointsForColor.findIndex((el) => el.color == this.couleur) + 1;
    }

    setClassement2() {
        let position = 1;

        for (let attribut in this.result) {
            if (this.result[this.couleur].score < this.result[attribut].score) {
                position++;
            }
        }

        return position;
    }
}

module.exports = Joueur;
