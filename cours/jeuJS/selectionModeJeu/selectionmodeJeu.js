// variable contenant les bouttons dans la classe mode de jeu 
let boutons = document.querySelectorAll(".modeJeu button");

// variable contenant la div avec la class divInput
let divInput = document.getElementById("divInput");

// crée la balise input pour le joueur 2 
let inputJoueur2 = document.createElement("input"); inputJoueur2.id="inputJoueur2"; inputJoueur2.type="text"; inputJoueur2.name="joueur2"; inputJoueur2.placeholder="Nom Joueur2"; inputJoueur2.required="required";

// variable contenant l'input hidden
let inputHidden = document.getElementById("modeJeu");

boutons.forEach(element => {
    element.addEventListener("click", () => {
        boutons.forEach(elem => {elem.classList.remove("boutonActif")});
        element.classList.add("boutonActif");
        inputHidden.value= element.id;

        if(document.getElementById("inputJoueur2")){
            divInput.removeChild(inputJoueur2);
        }
        if(element.id == "morpionPvp"){
            divInput.appendChild(inputJoueur2);
        }
    })
});

// *********************************** check validité Formulaire **************************************
let formulaire = document.getElementById("formulaire");

let valide = true;

let inputs = document.querySelectorAll("input[required]");

formulaire.addEventListener("submit", (e) =>  {
    e.preventDefault();

    for(let elem of inputs){

        if(!elem.checkValidity()){
            valide = false;
            elem.classList.add("error");
        }

        elem.addEventListener("blur", () =>{
            if(elem.checkValidity()){
                elem.classList.remove("error");
                valide = true;
            }
            else{
                elem.classList.add("error");
            }
        },false)
    }
    if(valide){
        e.target.submit();
    }
},false);
