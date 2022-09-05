// Stock les Balises button dnas la variable
let bouton = document.querySelectorAll(".jeu button");

// Variable pour les Scores + le numéro de la manche 
let jScore = 0;
let iaScore = 0;
let manche = 1;


/**
 * Random = génère un nb aléatoire
 * choixIa = selection l'id d'un bouton aléatoirement
 * @returns choixIa
 */
function tourIA(){
    let random = Math.floor(Math.random() * (2 - 0 + 1));
    let choixIa = bouton[random].id;
    return choixIa;
}


/**
 * Compare les Scores 
 * @param {int} sc1 Score Joueur
 * @param {int} sc2 Score Ia
 */
function compareScore(sc1, sc2){
    if(sc1 > sc2){
        document.querySelector("#resultat").innerHTML="Grand Gagnant Joueur"; 
    }
    else if(sc2 > sc1){
        document.querySelector("#resultat").innerHTML="Grand Gagnant IA";
    }
    else{
        console.log("Jeu égalité");
    }
}


function decompte(){
    let seconde = 3;
    let timer = setInterval(() => {
        document.getElementById("timer").innerHTML = seconde;
        seconde--;
        if(seconde < 0){
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "";
        }
    }, 1000);
}


for(let i=0; i< bouton.length; i++){
    bouton[i].addEventListener("click", () => {
        
        document.querySelector("#resultat").innerHTML="";

        let j = bouton[i].id;
        let ia = tourIA();
        
        document.getElementById("joueurChoix").innerHTML = j;
        document.getElementById("iaChoix").innerHTML = ia;

        // Cas ou joueur gagne la manche
        if(j =="Pierre" && ia =="Ciseaux" || j =="Feuille" && ia =="Pierre" || j =="Ciseaux" && ia =="Feuille"){
            document.querySelector("#joueurChoix").style.color = "#008000"; // Modifie la couleur du texte de la balise avec l'id ="joueurChoix"
            document.querySelector("#iaChoix").style.color = "#ff0000"; // Modifie la couleur du texte de la balise avec l'id ="iaChoix"
            jScore++;      
        }
        // Cas ou Ia gagne la manche
        else if(ia =="Pierre" && j =="Ciseaux" || ia =="Feuille" && j =="Pierre" || ia =="Ciseaux" && j =="Feuille"){
            document.querySelector("#iaChoix").style.color = "#008000"; // Modifie la couleur du texte de la balise avec l'id ="iaChoix"
            document.querySelector("#joueurChoix").style.color = "#ff0000"; // Modifie la couleur du texte de la balise avec l'id ="joueurChoix"
            iaScore++; 
        }
        // égalité
        else{
            document.querySelector("#joueurChoix").style.color = "#000000"; // Modifie la couleur du texte de la balise avec l'id ="joueurChoix"
            document.querySelector("#iaChoix").style.color = "#000000"; // Modifie la couleur du texte de la balise avec l'id ="iaChoix"
        }
        manche++;
        
        // Si un Score atteint 3 affiche le gagnant et réinitialise toutes les variables
        if(jScore == 3 || iaScore ==3){
            compareScore(jScore, iaScore);
            jScore = 0;
            iaScore = 0;
            manche = 1;
            document.querySelector("#joueurChoix").style.color = "#000000"; // Modifie la couleur du texte de la balise avec l'id ="joueurChoix"
            document.querySelector("#iaChoix").style.color = "#000000"; // Modifie la couleur du texte de la balise avec l'id ="iaChoix"
        }

        // Affiche dans tableau html les variables 
        document.querySelector("#manche").innerHTML = `Manche ${manche}`;
        document.querySelector("#joueurScore").innerHTML = jScore;
        document.querySelector("#iaScore").innerHTML = iaScore;

    });
}
