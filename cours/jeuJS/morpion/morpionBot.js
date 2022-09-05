// Contient les 2 noms des joueurs
let nomJoueur1 = "joueur 1";
let nomJoueur2 = "Bot";

// ********************************************************* Variable contenant les Balises HTML *****************************************************************

// ecrie dans les balises contenant la class "joueur1"
document.querySelectorAll(".nomJoueur1").forEach(element => element.textContent= nomJoueur1);
// ecrie dans les balises contenant la class "joueur2"
document.querySelectorAll(".nomJoueur2").forEach(element => element.textContent= nomJoueur2);

// contient la balise h1 dans laquelle on affiche quel joueur doit jouer
let afficheTour = document.getElementById("tour");
afficheTour.textContent = `tour : ${nomJoueur1}`;

// contient la div avec la class bouton reset
let divBoutonReset = document.querySelector(".divBoutonReset");

// contient toutes les balises td représentent les cases de jeu 
let rawCases = document.querySelectorAll("td");
// Crée un Tableau d'objet contenant chaque balise + un attribut vide = true 
let grille = [];
for(const elem of rawCases){
    let item = {
        "case" : elem,
        "vide" : true
    }
    grille.push(item);
}

// ****************************************************************** Variable classique **********************************************************************

// vérifie que le jeu n'est pas encore gagner 
let gagner = false;
// représente le nombre de case occuper
let nombreCasesPleine = 0;
// représente les scores
let scoreJoueur1 = 0, scoreJoueur2 = 0, scoreNul = 0;

// ****************************************************************** Event Click ******************************************************************************

for(let i=0; i< grille.length; i++){
    grille[i].case.addEventListener("click", () => {
        // si gagner est faux et nbCasesPleine
        if(!gagner){
            // vérifie que la case est vide 
            if(grille[i].vide){
                // tour du joueur1
            
                grille[i].case.classList.add("caseJoueur1");
                grille[i].case.textContent= "X";
                grille[i].vide = false;
                nombreCasesPleine++;
                verificationWin("caseJoueur1");
                
                // tour du joueur2
                setTimeout(tourBot, 1000);
                
            }
            else{
                alert("Bouffon cette case est déjà prise");
            }
        }
    },false);   
}

document.getElementById("boutonReset").addEventListener("click", resetGrille, false);

// *************************************************************** Fonction *************************************************************************

/**
 * Vérifie si un des joueurs à compléter une ligne grace au nom de sa classe
 * @param {String} classe ajouter le nom de la classe que l'on souhaite vérifier
 */

function verificationWin(classe){
    // vérifie si une ligne, une colonne ou une diagonale est gagnante, enregristre true si oui
    let conditionEntrer = rawCases[0].classList.contains(classe) && rawCases[1].classList.contains(classe) && rawCases[2].classList.contains(classe) || rawCases[3].classList.contains(classe) && rawCases[4].classList.contains(classe) && rawCases[5].classList.contains(classe) || rawCases[6].classList.contains(classe) && rawCases[7].classList.contains(classe) && rawCases[8].classList.contains(classe) ||
                          rawCases[0].classList.contains(classe) && rawCases[3].classList.contains(classe) && rawCases[6].classList.contains(classe) || rawCases[1].classList.contains(classe) && rawCases[4].classList.contains(classe) && rawCases[7].classList.contains(classe) || rawCases[2].classList.contains(classe) && rawCases[5].classList.contains(classe) && rawCases[8].classList.contains(classe) ||                 
                          rawCases[0].classList.contains(classe) && rawCases[4].classList.contains(classe) && rawCases[8].classList.contains(classe) || rawCases[2].classList.contains(classe) && rawCases[4].classList.contains(classe) && rawCases[6].classList.contains(classe);
    
    // incrémente le score du gagnant , écrie le score du gagnant dans la page HTML
    if(conditionEntrer){
        divBoutonReset.style.visibility= "visible";
        gagner = true;
        
        if(classe == "caseJoueur1"){
            afficheTour.textContent= `Gagner par ${nomJoueur1}`;
            scoreJoueur1++;
            document.getElementById("scoreJ1").textContent= scoreJoueur1;
        }
        else{
            afficheTour.textContent= `Gagner par ${nomJoueur2}`;
            scoreJoueur2++;
            document.getElementById("scoreJ2").textContent= scoreJoueur2;
        }
    }    
    // Sinon aucune combinaison gagnante
    else{
        if(nombreCasesPleine != 9){
            afficheTour.textContent= classe == "caseJoueur1" ? `tour : ${nomJoueur2}` : `tour : ${nomJoueur1}`;
        }
        else{
            afficheTour.textContent= "Match nul !";
            divBoutonReset.style.visibility= "visible";
            scoreNul++;
            document.getElementById("scoreNul").textContent= scoreNul;
        }
    }
}

/**
 * Remets toutes les cases à zéro, reset les variables à leur valeur de départ 
 */

function resetGrille(){
    for(let i= 0; i< grille.length; i++){
        grille[i].case.classList.remove("caseJoueur1", "caseBot");
        grille[i].case.textContent= i+1;
        grille[i].vide = true;
    }
    nombreCasesPleine = 0;
    gagner = false;
    divBoutonReset.style.visibility= "hidden";
}


function tourBot(){
    let flag = true;
    while(flag){
        let idRandom = Math.floor(Math.random() * 9);
        // Si la case sélectionnée par random est vide
        if(grille[idRandom].vide){
            grille[idRandom].case.classList.add("caseBot");
            grille[idRandom].case.textContent= "O";
            grille[idRandom].vide= false;
            nombreCasesPleine++;
            verificationWin("caseBot");
            flag = false;
        }
        // si toute les cases sont pleine
        if(nombreCasesPleine == 9){
            flag = false;
        }
    };
}