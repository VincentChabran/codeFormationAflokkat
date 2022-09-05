const fs = require("fs");

const askDrink = (availableDrinks, person) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(availableDrinks.includes(person.drink)) {
        resolve(`Voici votre ${person.drink}, ${person.name}`);
      } else {
        let error = new Error(`${person.name}, votre commande est non disponible, veuillez choisir entre ${availableDrinks}`);
        error.data = person.name;
        reject(error);
      }
    }, 3000);
  });
};


const processData = (obj) => {
  const [drinks, ...people] = obj.data;
  people.forEach((p) => {
    askDrink(drinks.availableDrinks, p)
    .then((result) => console.log(result))
    .catch((error) => {
      console.log(error.message);
      let person = {
        name: error.data,
        drink: drinks.availableDrinks[0]
      }
      askDrink(drinks.availableDrinks, person).then((result) => console.log(result));
    });
  });
};

fs.readFile("exercice3_data.txt", "utf-8", (error, fileData) => {

  if(error) throw error;

  const obj = JSON.parse(fileData);
  processData(obj);

});