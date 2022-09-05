// Sélectionne mes imgs et les mélange                                                                                                                                                                                                                                                                                                                                                                                                                                                          by : Vin's
let rawImages = document.querySelectorAll("img");
let oldImages = _.shuffle(rawImages);

// Enregistre et cast un fichier JSON 
let rawGalerieImage ='[{"source" : "carteNaruto"},{"source" : "carteMewtwo"},{"source" : "carteNaruto"},{"source" : "carteMewtwo"},{"source" : "carteRoi"},{"source" : "carteRoi"}, {"source" : "carteDracaufeu"}, {"source" : "carteDracaufeu"},{"source" : "cartePikachu"},{"source" : "cartePikachu"},{"source" : "carteItachi"},{"source" : "carteItachi"},{"source" : "carteSasuke"},{"source" : "carteSasuke"}]';
let galerie = JSON.parse(rawGalerieImage);


// Crée un Tableau d'objet contenant chaque balise + un attribut visible = false 
let images = [];
for (const baliseImg of oldImages) {
    let myCurrentObject = {
        "maBaliseImage" : baliseImg,
        "visible" : false
    }
    images.push(myCurrentObject);
}

// stock les balises input dans des variables 
let inputChoix1 = document.getElementById("choix1");
let inputChoix2 = document.getElementById("choix2");

// variable compteur de click et compteur de coups
let cptClick = 0;
let cptCoups= 0;

// Boucle pour add un event click sur chaque img
for(let i=0; i< images.length; i++){
    images[i].maBaliseImage.addEventListener("click", function myFonction(){
        // Si le cpt de click est inférieur à 2
        if(cptClick < 2){
            // Si l'attribut "visible" de l'image = false
            if(images[i].visible == false){
                cptClick++;

                // après click passe l'attribut visible à true
                images[i].visible = true;

                // change la src de l'image
                images[i].maBaliseImage.src = `images/${galerie[i].source}.jpg`;
                
                // enregistre la valeur de l'input avec la source de la galerie
                if(inputChoix1.value == ""){
                    inputChoix1.value= galerie[i].source;
                }
                else{
                    inputChoix2.value= galerie[i].source;
                }

                // Si les 2 valeurs de input sont rempli
                if(!inputChoix1.value == "" && !inputChoix2.value == ""){

                    // test égalité des cartes
                    if(inputChoix1.value == inputChoix2.value){
                        inputChoix1.value = "";
                        inputChoix2.value = "";

                        cptClick = 0;
                        cptCoups++;

                        document.getElementById("resultat").textContent= `Nombre de Coups : ${cptCoups}`;
                    }
                    else{
                        // intervalle avant de retourner les cartes
                        setTimeout( ()=>{
                            let test = document.querySelectorAll(`img[src="images/${inputChoix1.value}.jpg"], img[src="images/${inputChoix2.value}.jpg"]`)
                            
                            for(const elem of images){
                                if(elem.maBaliseImage == test[0] || elem.maBaliseImage == test[1]){
                                    elem.visible = false;
                                    elem.maBaliseImage.src = "images/carteBack.jpg";
                                }
                            }

                            inputChoix1.value = "";
                            inputChoix2.value = "";
                            
                            cptClick = 0;
                            cptCoups++;

                            document.getElementById("resultat").textContent= `Nombre de Coups : ${cptCoups}`;
                        },1000);
                    }
                }
            }
        }
    }, false)
}

