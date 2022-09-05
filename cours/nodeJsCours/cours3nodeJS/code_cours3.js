// const affiche = (message) => {
//   console.log(message);
// }

// setTimeout(affiche, 5000, "un premier message")

// affiche("un second message");

// const data = ["toto", "titi", "tata"];

// const chargement = (index, callback) => {
//   // code logique
//   console.log("chargement de " + data[index]);
//   if (data[index] != "tata") {
//     callback(null, "success");
//   } else {
//     callback(new Error("element not found"));
//   }
// }

// chargement(2, (error, success) => {
//   if (error) console.log(error);

//   console.log(success)

// });

// const promise = new Promise((resolve, reject) => {

// })

const hugeCalcul = function (number1, number2, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = number1 * number2;
            if (result < 100) {
                resolve(result);
            } else {
                reject(new Error("Erreur de calcul"));
            }
        }, time);
    });
};

// const result = hugeCalcul(10, 20, 5000);

// console.log(result);

// hugeCalcul(10, 20, 2000)
//   .then((result) => {
//     console.log("enlever l'icone de chargement");
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error.message);
//     console.log("enlever l'icone de chargement");
//   });

// console.log("affiche l'icone de chargement");

// hugeCalcul(10, 5, 2000)
//   .then((result) => {
//     console.log(result);
//     return hugeCalcul(result, 1.5, 2000);
//   }).then((result2) => {
//     console.log(result2);
//   }).catch((error) => {
//     console.log(error.message)
//   });

// hugeCalcul(10, 5, 5000).then((result) => console.log(result));
// hugeCalcul(10, 6, 2000).then((result) => console.log(result));
// hugeCalcul(10, 9, 1000).then((result) => console.log(result));

// console.log("wait")

// Promise.all([hugeCalcul(10, 5, 5000), hugeCalcul(10, 6, 3000), hugeCalcul(10, 9, 2000)])
//   .then(([result1, result2, result3]) => {
//     console.log(result1);
//     console.log(result2);
//     console.log(result3);
//     console.log(result1 + result2 + result3);
//   }).catch((error) => console.log(error));

// Promise.all([hugeCalcul(10, 5, 5000), hugeCalcul(10, 6, 3000), hugeCalcul(10, 9, 2000)])
//   .then((result) => {
//     console.log(result);
//   }).catch((error) => console.log(error));

// const divide = (number1, number2) => {
//   return new Promise((resolve, reject) => {
//     resolve(number1 / number2);
//   })
// };

const divide = async (number1, number2) => {
    if (number2 === 0) throw new Error("number2 cannot equal to 0");
    return number1 / number2;
};

// divide(6, 0).then((result) => console.log(result)).catch((error) => console.log(error.message));

const calcul = async () => {
    try {
        const result = await divide(6, 2);
        console.log(result);
        const result2 = await Promise.all([
            hugeCalcul(10, 5, 5000),
            hugeCalcul(10, 6, 3000),
            hugeCalcul(10, 9, 2000),
        ]);
        console.log(result2);
    } catch (error) {
        console.log(error.message);
    }
};

calcul();
