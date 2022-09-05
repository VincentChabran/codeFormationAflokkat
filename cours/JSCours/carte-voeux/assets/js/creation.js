
// ajoute la balise link avec id = styleOnClick a la variable
let styleModifier = document.getElementById('styleOnClick');

// ajoute un délai de transition au body   
document.body.style.transition="1.2s";

// ************************************** Add event click avec JSON *******************************************
// Création d'un fichier JSON
let rawThemes ='[{"nomTheme" : "theme1.css", "vignette" : "cta_1.jpg"}, {"nomTheme" : "theme2.css", "vignette" : "cta_2.png"}, {"nomTheme" : "theme3.css", "vignette" : "cta_3.png"}, {"nomTheme" : "theme4.css", "vignette" : "cta_4.jpg"}]';
let themes = JSON.parse(rawThemes);

// Boucle pour ajouter les imgs + event au click avec un fichier JSON
for(let i=0; i< themes.length; i++){
    let img = document.createElement("img");
    img.src= `assets/images/${themes[i].vignette}`;

    img.addEventListener("click", () => {
        // Change le theme au click
        styleModifier.href = `assets/css/${themes[i]["nomTheme"]}`;
        // Enregistre le thème dans la balise input hidden pour l'envoi à la page index
        document.getElementById("themeImage").value= `assets/css/${themes[i]["nomTheme"]}`;

    }, false);
    document.getElementById("cta").appendChild(img);
}


// ********************************************* Check Validité Formulaire *********************************************
// variable qui représente le formulaire
let contactForm = document.getElementById("form");

// add un event au formulaire qui ce déclenche au click de son bouton "submit"
contactForm.addEventListener('submit', (event)=> {
    event.preventDefault(); // On bloque l'envoi automatique du formulaire quand il submit

    // Variable Check validité formulaire
    let formValide = true;

    // Variable contenant les balises input et textarea avec un required
    let fields = document.querySelectorAll("input[required], textarea[required]");

    for(let elem of fields){
        if(!validationInput(elem)){ // Si la fonction validationInput return false
            formValide = false;
        }
        elem.addEventListener("focus", () => {
            elem.classList.remove("error"); // Enléve la class "error"
            if(elem.parentElement.querySelector("span")){ // si la balise span existe
                elem.parentElement.removeChild(elem.parentElement.querySelector("span")); // Enlève la balise span 
            }
        })
        // Ajoute l'event "blur" = quand on perd le focus de l'élément => exécute la fonction validationInput
        elem.addEventListener("blur", () => { validationInput(elem) }, false);
    }
    if(formValide){
        event.target.submit();
    }
}, false);


function validationInput(elem) {
    if (!elem.checkValidity()) {
        elem.classList.add('error');

        if(!elem.parentElement.querySelector("span")){ 
            let span = document.createElement("span"); 
            span.innerHTML= elem.validationMessage; // Écrit dans la balise span l'erreur spécifique grace à "validationMessage"
            span.style.color='red';
            elem.parentElement.appendChild(span);
        }
        return false;
    } 
    else {
        return true;
    }
}

// ************************************************ Ajout destinataire au click **************************************************

let button = document.getElementById("ajouter-destinataire");

// On crée une div et un input au click
let cpt = 1;
button.addEventListener("click", () => {
    cpt++;
    let input = document.createElement("input"); 
    input.type= "email"; 
    input.placeholder= "Mail du destinataire";
    input.required= "required";
    input.name= `destinataire${cpt}`;
    let div = document.createElement("div");
    div.appendChild(input);
    document.getElementById("lien-mail").insertBefore(div, button);
},false)

// ******************************************************************************************************************************


fetch("https://mockbin.com/request")
.then(function(res){
    if(res.ok){
        return res.json();
    }
})
.then(function(value){
    console.log(value);
})
.catch(function(err){
    // une erreur est survenue
})