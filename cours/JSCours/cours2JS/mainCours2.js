// Pop-up multiple
/*alert('bonjour');
alert('comment ça va ?');
alert('oui');
*/
// Applique a l'élèment id = title la valeur "Bonjour"
document.getElementById("title").innerHTML = "Bonjour";
// console = affiche en console 
// .warn = place une alerte , console.warn("Bonjour");
// .info(typeof()) = affiche une info sur le type
// .log Affiche simplement en console

// Crée des variables
var nom = "Uchiwa", prenom = "Sasuke", age = 26;
console.log(`Mon prénom est : ${nom} ${prenom}
Mon age est : ${age} ans`);

if (age >= 18){
    console.log(`Vous avez ${age}, Vous êtes Majeur`);
}
else{
    console.log(`Vous avez ${age}, Vous êtes Mineur`);
}
//Crée un tableau
/*var tableau = new Array;
tableau = ["bleu","vert"];
tableau[2] = "jaune";
console.info(tableau);*/

// Crée un new Object
/*var personnes = new Object;
var personnes = {prenom : "Sasuke", nom : "Uchiwa", age : 26};
console.info(personnes);*/

