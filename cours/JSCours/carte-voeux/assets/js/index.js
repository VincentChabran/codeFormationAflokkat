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

// Add la class "is_animating" sur le coeur au click
document.getElementById("heart").addEventListener('click', () => {
    document.getElementById("heart").classList.add("is_animating");
})
