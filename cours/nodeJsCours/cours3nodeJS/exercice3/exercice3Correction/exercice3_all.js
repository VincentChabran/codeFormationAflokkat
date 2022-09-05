const fs = require("fs");

const askDrink = (availableDrinks, person) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(availableDrinks.includes(person.drink)) {
        resolve(`Voici votre ${person.drink}`);
      } else {
        reject(new Error(`Commande non disponible`));
      }
    }, 3000);
  });
};


const processData = (obj) => {
  const [drinks, ...people] = obj.data;
  
  const promises = [];
  people.forEach((p) => {
    promises.push(askDrink(drinks.availableDrinks, p));
  });

  Promise.all(promises)
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));

};

fs.readFile("exercice3_data.txt", "utf-8", (error, fileData) => {

  if(error) throw error;

  const obj = JSON.parse(fileData);
  processData(obj);

});