// ******************************************************* From ************************************************
// La méthode Array.from() permet de créer un nouveau tableau à partir d'un objet itérable ou semblable à un tableau.

// let iSemaine = "lmmjvsd";
// const semaine = Array.from(iSemaine);
// const semaine2 = Array.from(iSemaine.toLocaleUpperCase());
// console.log(semaine);

// ******************************************************* Spreed Operator **************************************

// Déstructure le tableau en variable distinct
// let semaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
// const [lundi, mardi, ...resteSemaine] = semaine;
// console.log(resteSemaine, mardi, lundi);

// Déstucture le string en variable distinct
// let iSemaine = "lmmjvsd";
// const [lundi, ...tab] = iSemaine;
// console.log(lundi);

// ***************************************************** Join ***********************************************************

// a méthode join() crée et renvoie une nouvelle chaîne de caractères en concaténant tous les éléments d'un tableau
// (ou d'un objet semblable à un tableau). La concaténation utilise la virgule ou une autre chaîne, fournie en argument, comme séparateur.

// let semaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
// const semaineStr = semaine.join(","); // lundi,mardi,mercredi,jeudi,vendredi,samedi,dimanche
// console.log(semaineStr);

// ******************************************************* Map *******************************************************

// La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
// return chaque élément + passe en majuscule

// let semaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
// const jourTravail = semaine.map((el) => el.toLocaleUpperCase());
// console.log(jourTravail);

// **************************************************** Reduce *********************************************************

// La méthode reduce() applique une fonction qui est un « accumulateur » et qui traite chaque valeur d'une liste
// (de la gauche vers la droite) afin de la réduire à une seule valeur.
// Previous = resultat du tour précédant , jour = chaque jours de la semaine, la fonction retourne chaque initiale si jour est different de NULL

// let semaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
// const getInitiales = (previous, jour) => {
//     return jour ? `${previous}${jour[0]}` : previous;
// };
// const initiales = semaine.reduce(getInitiales, "");
// console.log(initiales);

// const nombres = [1, 2, 3, 4];
// const initialValue = 0; // champs pas obligatoire
// const somme = nombres.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue); //additionne chaque valeur du tab nombres
// console.log(somme); // somme = 10

// ********************************************************** Filter ****************************************************

// filter() crée et retourne un nouveau tableau contenant tous les éléments qui remplissent une condition déterminée par la fonction callback.

// let semaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
// const jourTravailler = semaine.filter((el) => el[0] != "d");
// const jourTravailler2 = semaine.filter((el) => !el.startsWith("d"));
// console.log(jourTravailler, jourTravailler2);

// const words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];
// const result = words.filter((word) => word.length > 6);
// console.log(result);

// *********************************************************** Includes ******************************************************

// includes() permet de déterminer si un tableau contient une valeur et renvoie true si c'est le cas, false sinon.

// const array1 = [1, 2, 3];
// console.log(array1.includes(2)); // expected output: true

// const pets = ["cat", "dog", "bat"];
// console.log(pets.includes("cat")); // expected output: true
// console.log(pets.includes("spider")); // expected output: false

// ****************************************************** Some , Every *******************************************************
// some() teste si au moins un élément du tableau passe le test implémenté par la fonction fournie. Elle renvoie un booléen indiquant le résultat du test.
// every() permet de tester si tous les éléments d'un tableau vérifient une condition donnée par une fonction en argument. Cette méthode renvoie un booléen pour le résultat du test.

// let semaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

// const isJourtravail = (jour) => {
//     return !jour.startsWith("d"); // return si un jour ne commence pas par "d"
// };
// console.log(semaine.some(isJourtravail));
// console.log(semaine.every((el) => el.endsWith("i")));

// ********************************************************* Slice ****************************************************************
// slice() renvoie un objet tableau, contenant une copie du Tb ou  d'une portion du tableau d'origine
// la portion est définie par un indice de début et un indice de fin (exclus). Le tableau original ne sera pas modifié.

// const animals = ["ant", "bison", "camel", "duck", "elephant"];

// console.log(animals.slice(2)); // expected output: Array ["camel", "duck", "elephant"]
// console.log(animals.slice(2, 4)); // expected output: Array ["camel", "duck"]
// console.log(animals.slice(1, 5)); // expected output: Array ["bison", "camel", "duck", "elephant"]
// console.log(animals.slice(-2)); // expected output: Array ["duck", "elephant"]
// console.log(animals.slice(2, -1)); // expected output: Array ["camel", "duck"]
// console.log(animals.slice()); // expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

// *********************************************************** Splice *****************************************************************
// splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments à même le tableau.On peut ainsi vider ou remplacer une partie d'un tableau.
// splice(debut de la modif, Nombre d'élement a suprimer, OPTIONNEL élement a inséré)

// const months = ["Jan", "March", "April", "June"];

// months.splice(1, 0, "Feb"); // inserts at index 1
// console.log(months); // expected output: Array ["Jan", "Feb", "March", "April", "June"]

// months.splice(4, 1, "May"); // replaces 1 element at index 4
// console.log(months); // expected output: Array ["Jan", "Feb", "March", "April", "May"]

// ****************************************************** Find , FindIndex ***********************************************************
// find() renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument. Sinon, la valeur undefined est renvoyée.
// findIndex() renvoie l'indice du premier élément du tableau qui satisfait une condition donnée par une fonction. Si la fonction renvoie faux pour tous les éléments du tableau, le résultat vaut -1.

// const array1 = [5, 12, 8, 130, 44];
// const found = array1.find((element) => element > 10);
// console.log(found); // found = 12

// let semaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
// const lundi = semaine.find((el) => el === "lundi");
// const lundiIndex = semaine.findIndex((el) => el === "lundi");
// console.log(`La variable lundi : "${lundi}" , lundiIndex : "${lundiIndex}"`);

// ***************************************************** Pop, Push **************************************************************
// pop() supprime le dernier élément d'un tableau et retourne cet élément. Cette méthode modifie la longueur du tableau.
// push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.

// const plants = ["broccoli", "cauliflower", "cabbage", "kale", "tomato"];

// console.log(plants.pop()); //expected output: "tomato"
// console.log(plants); //expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]
// const kale = plants.pop(); // Supprime "kale" du tableau et le stock dans une variable
// console.log(plants); // expected output: Array ["broccoli", "cauliflower", "cabbage"]

// plants.push("test"); // add "test" au tab
// console.log(plants); //  expected output: Array ["broccoli", "cauliflower", "cabbage", "test"]
