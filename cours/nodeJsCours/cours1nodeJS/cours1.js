// console.log("Hello World");
// const fs = require("fs");
// const cowsay = require("cowsay");
// const texte = require("./utils");


// fs.writeFile('monfichier.txt', texte, (err) => {
//     if (err) {
//         console.log(err);
//     }
//     else{
//         console.log('The file has been saved!');
//     }
// });

// console.log(cowsay.say({
//     text : "I'm a moooodule",
//     e : "oO",
//     T : "U "
// }));

// ***************************************************************************************************************

// const debut = "Mon password est ";
// const fin = "toto";
// const result = `${debut}${fin}`;

// console.log(debut.charAt(4)); 
// console.log(debut.toLocaleLowerCase());
// console.log(debut.toLocaleUpperCase());
// console.log(debut.trim()); // supprime les espaces de la chaine avant et après
// console.log(debut.trimStart().trimEnd()); // supprime les espaces de la chaine avant "trimStart()" et après "trimEnd()"

// const love = "I love Node.js";

// console.log(love.indexOf("Node.js")); // renvoi l'index du premier caractere de la chaine 
// console.log(love.indexOf("?")); // renvoi -1 car pas dans la chaine

// const codePostal = "62650 Hucqueliers";
// const isCodePostal = codePostal.match(/[0-9]{5}/); // regex recherhe dans le string un numero entre 0 et 9 , 5fois

// console.log(isCodePostal);

// const pi = "3.1425342";
// const pi2 = parseFloat(pi).toFixed(2); // toFixed affiche après la virgule 
// console.log(pi2);

// console.log(Math.floor(pi)); // arrondi inferrieur
// console.log(Math.ceil(pi)); // arrondi sup

// const f1 = (str1, str2) => Math.max(parseInt(str1), parseInt(str2))**2 ;

// const f2 = function(str1, str2){
//     const num1 = parseInt(str1);
//     const num2 = parseInt(str2);
//     const maxNum = Math.max(num1, num2);
//     const result = maxNum**2;
//     return result
// }

const semaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

// for of = element
// for(let jour of semaine){
//     console.log(jour);
// }

// // for in = index
// for(let i in semaine){
//     console.log(i);
// }

// const display = (jour) => console.log(jour);
// semaine.forEach(display);

// semaine.forEach((elem) => console.log(elem));


const iSemaine = ["l", "m", "m", "j", "v", "s", "d"];
const iSemaineStr = "lmmjvsd";

// from crée un tableau de charactere , la fonction met le char en Upper Case
// const result = Array.from(iSemaineStr, (el) => el.toLocaleUpperCase);

// concat ajoute le string iSemaineStr à semaine
// const result = semaine.concat(iSemaineStr);


// const result = [...iSemaine,...iSemaineStr]; // transform en tableau un str avec les ... + concat si besoin
// console.log(result);


// const result = semaine.join(" - "); // crée un str avec le tableau semaine en separent par un -
// console.log(result);


// const triAlpha = (a, b) => a.localeCompare(b);
// const result = semaine.sort(triAlpha);


// const result = semaine.map((el) => {
//     const r = `${el[0].toUpperCase()}${el.substring(1)}`;
//     return r;
// });

// console.log(result);


// const result = semaine.filter((el) => !el.startsWith("d")); // n'affiche pas les element qui commence par "d"

// const result2 = semaine.includes("dimanche"); // retourne un Boolean , si le mot et dans le tableau return true sinon false
// const result3 = result.includes("dimanche");
// console.log(result);


// const jourTravaille = (el) => !el.startsWith("d");
// const result1 = semaine.some(jourTravaille);
// const result2 = semaine.every(jourTravaille);


// const [premier, deuxieme, ...reste] = semaine; // crée 3 varaible en déstructurant un tableau
// console.log(premier);
// console.log(deuxieme);
// console.log(reste);

// const [,,...reste] = semaine; // crée 3 varaible en déstructurant un tableau ne récupere pas les 2 premier element

console.log(semaine.slice(2,3)); // affiche les element au indice indiquer 2eme param est exclue

