const fs = require("fs");
const Joueur = require("./joueur");


const process = (obj) => {

  const { rules, data } = obj;
  const [names, ...parties] = data;

  const result = {};

  for (let [key, value] of Object.entries(names)) {
    result[key] = {
      name: value,
      points: 0
    };
  }

  parties.forEach(partie => {
    for (let [color, position] of Object.entries(partie)) {
      result[color].points += rules[position - 1];
    }
  });

  // 2eme essai
  // for(let partie of parties) {
  //   for(let [color, position] of Object.entries(partie)) {
  //     result[color].points += rules[position -1 ];
  //   }
  // }

  // 1er essai
  // for (let partie of parties) {
  //   const positionColors = Object.entries(partie);
  //   for (let el of positionColors) {
  //     let color = el[0];
  //     let position = el[1];
  //     let point = rules[position - 1];
  //     result[color].points += point;
  //   }
  // }

  const couleur = "yellow";
  const joueur = new Joueur(couleur, result);

  console.log(`Le joueur avec la couleur ${couleur} est ${joueur.getName()}, a ${joueur.getPoint()} point
  et a pour classement la place n°${joueur.getClassement()}`)
};


fs.readFile("exercice2_data.txt", "utf-8", function (error, fileData) {

  if (error) throw error;

  const obj = JSON.parse(fileData);
  process(obj);

});