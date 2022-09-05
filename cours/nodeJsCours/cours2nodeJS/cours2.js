// let somme = (nb1, ...reste) => {
//     let result = nb1;
//     for(let nb of reste){
//         result += nb;
//     }
//     return result;
// }
// console.log(somme(2,4, 6));

// **********************************************************************************************************
// boucle qui additionne un resultat 

// const entryData = [1, 3, 17, -2, 4];

// let result = 0;
// entryData.forEach((el) => {
//     result += el
// });
// console.log(result);


// const sommeReduce = (previous, current) => {
//     return previous + current;
// }
// console.log(entryData.reduce(sommeReduce));


// console.log(entryData.reduce((prev , curr) => prev + curr));


// *************************************************************************************************************
// Objet

const jour ={
    nom : "lundi",
    initiale : "l",
    index : 0,
    demain : "mardi"
}

// console.log(jour.nom);
// console.log(jour["nom"]);


// const {initiale, demain="N/A", hier="dimanche", ...reste} = jour; // crée des variable avec les attributs d'un objet
// console.log(hier);
// console.log(reste);


//                      reslutat, objet1, objet2
// const jour2 = Object.assign({},   jour, {hier: "dimanche"}); // fusionne 2 objet

// Object.entries(jour).forEach(el => { // entries crée un tableau avec les attribut d'un objet 
//     console.log(el[0]);
//     console.log(el[1]);
// });


// Object.keys crée un tableau avec les clefs d'un objet
// Object.keys(jour).forEach(el => console.log(el));
// console.log(Object.keys(jour));



// const jourStr = JSON.stringify(jour); // crée un JSON en str a partir d'un objet
// const jour2 = JSON.parse(jourStr); // crée un JSON a partir d'un str
