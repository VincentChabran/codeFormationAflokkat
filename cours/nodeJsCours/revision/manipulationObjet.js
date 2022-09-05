// ******************************************************** Destructuring ***************************************************

// const jour = {
//     nom: "lundi",
//     initial: "l",
//     index: 0,
// };

// const { nom: appelation } = jour;
// console.log(appelation);
// const { nom, index = false, fauxIndex = false, ...resteJour } = jour;
// console.log(nom);
// console.log(index);
// console.log(fauxIndex);
// console.log(resteJour);

// ******************************************************** Assign ***************************************************
// Object.assign(cible, ...sources) return L'objet cible, éventuellement modifié avec les propriéters de l'objet source

// const jour = {
//     nom: "lundi",
//     initial: "l",
//     index: 0,
// };
// let jour2 = Object.assign({}, jour, { travail: true }); // jour2 = { nom: 'lundi', initial: 'l', index: 0, travail: true }
// Object.assign(jour2, { type: "semaine" }, { soustype: "jour" });
// console.log(jour2);

// **************************************************** Entries **************************************************
// Object.entries() renvoie un tableau des propriétés propres énumérables d'un objet dont la clé est une chaîne de caractères,
// sous la forme de paires [clé, valeur], dans le même ordre qu'une boucle for...in

//[ [ 'a', 'somestring' ], [ 'b', 42 ] ]
// const object1 = {
//     a: "somestring",
//     b: 42,
// };
// const objTab = Object.entries(object1); // on peut aussi stocker dans une variable
// for (const [key, value] of Object.entries(object1)) {
//     console.log(`${key}: ${value}`);
// }

// ***************************************************** Keys *****************************************************
// Object.keys() renvoie un tableau contenant les noms des propriétés propres à un objet et qui sont énumérables.

// const object1 = {
//     a: "somestring",
//     b: 42,
//     c: false,
// };
// const keysObject1 = Object.keys(object1); // [ 'a', 'b', 'c' ]
// for (let keys of keysObject1) {
//     console.log(object1[keys]);
// }

// ******************************************************** Values ******************************************************
// Object.values() renvoie un tableau contenant les valeurs des propriétés propres énumérables d'un objet

// const object1 = {
//     a: "somestring",
//     b: 42,
//     c: false,
// };
// const valuesObject1 = Object.values(object1); // [ 'somestring', 42, false ]
// console.log(valuesObject1);
