
let searchParam = new URLSearchParams(window.location.search);

let formulaire = document.getElementById("formulaire");
let valideFormulaire = true;
let resteScript = false;

let inputs = document.querySelectorAll("input[required]");


formulaire.addEventListener("submit", (e) =>{
    e.preventDefault();

    for(let input of inputs){

        if(!input.checkValidity()){
            input.classList.add("error");
            valideFormulaire = false;
        }

        input.addEventListener("blur", () => {
            if(input.checkValidity()){
                input.classList.remove('error');
                valideFormulaire = true;
            }
            else{
                input.classList.add("error");
                valideFormulaire = false;
            }
        },false)
    }

    if(valideFormulaire){
        e.target.submit();
    }
    
},false);


if(searchParam.has("joueur1")){
    var nomJoueur1 = searchParam.get("joueur1");
}
else{
    var nomJoueur1 = "joueur 1";
}
if(searchParam.has("joueur2")){
    var nomJoueur2 = searchParam.get("joueur2");
}
else{
    var nomJoueur2 = "joueur 2";
}



if(nomJoueur1 != "joueur 1" && nomJoueur2 != "joueur 2"){
    resteScript = true;
    document.querySelector(".jeu").style.filter= "blur(0px)";
    document.querySelector(".formulaire").style.visibility= "hidden";
}


// if(initialTx == 5 && initialTy == 4){
//     console.log('E');
// }
// else if(initialTx == 31 && initialTy == 17){
//     console.log("N");
// }