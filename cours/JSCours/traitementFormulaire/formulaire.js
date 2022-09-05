// ************************************** Check Validité Formulaire *****************************************
// variable qui représente le formulaire
let contactForm = document.getElementById("form");

// Variable Check validité formulaire
let formValide = true;

// Variable contenant les balises input et textarea avec un required
let fields = document.querySelectorAll("input[required], textarea[required]");

// add un event au formulaire qui ce déclenche au click de son bouton "submit"
contactForm.addEventListener('submit', (event)=> {

    event.preventDefault();  // On bloque l'envoi automatique du formulaire quand il submit

    for(let elem of fields){
        
        if(!elem.checkValidity()){  // Si elem.checkValidity renvoie faux
            formValide = false;
            elem.placeholder = "Champ Obligatoire";   // change le placeholder
            elem.classList.add("error");   // ajoute la class error
        }

        elem.addEventListener("blur", () => {  // Ajoute l'event "blur" = quand on perd le focus de l'élément    
            if(elem.checkValidity()){
                elem.classList.remove("error");
                formValide = true;
            }
            else{
                elem.classList.add("error");
            }
        }, false);
    }

    if(formValide){
        event.target.submit();
    }
}, false);

// fields.forEach((elem) => {

    // elem.addEventListener("focus", () => {
    //     if(formValide){
    //         elem.classList.remove("error");
    //     }
    // }, false);
    
    // elem.addEventListener("blur", () => {
    //     if(!elem.checkValidity()){
    //         elem.placeholder = "Erreur";
    //         elem.classList.add("error");
    //         formValide = false;
    //     }
    //     else{
    //         elem.classList.remove("error");
    //         formValide = true;
    //     }      
    // }, false);
// });


// ************************************* Traite les infos envoyées par le formulaire *******************************************

let searchParam = new URLSearchParams(window.location.search);

if(searchParam.has("themeImage")){  // Vérifie que la valeur n'est pas null , retourne un boolean
    let theme = searchParam.get("themeImage");  // Récupère cette valeur et la stock dans la variable 
    document.getElementById("styleModifier").href = theme;  // Ajoute cette valeur a l'élément souhaiter 
}
if(searchParam.has("titre")){
    let titre = searchParam.get("titre");
    document.querySelector("#titre h1").textContent= titre;
}
if(searchParam.has("lettre")){
    let lettre = searchParam.get("lettre");
    if(lettre.length <= 170){
        document.querySelector("#message p").innerHTML= lettre;
    }
}
if(searchParam.has("nom")){
    let nom = searchParam.get("nom");
    document.querySelector("#signature p").innerHTML= nom;
}

// *****************************************************************************************************************************
