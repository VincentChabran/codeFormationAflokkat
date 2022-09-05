// const affiche = (message) => {
//     console.log(message);
// }

// setTimeout(affiche, 5000, "Un premier message");

// affiche("Un second message");

const data = ["toto", "titi", "tata"];

const chargement = (element, callback) => {
    // Code logique
    console.log("chargement de " + element);
    if (element == "tata") {
        callback(true);
    } else {
        callback(false);
    }
};

const hugeCalcul = (number1, number2, time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = number1 * number2;
            if (result > 100) {
                resolve(result);
            } else {
                reject(new Error("Erreur de calcul"));
            }
        }, time);
    });
};

// const result = hugeCalcul(10, 20, 5000);
// console.log(result);

hugeCalcul(10, 20, 2000)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error.message);
    });

const divide = async (num1, num2) => {
    if (num2 === 0) throw new Error("num2 cannot equal to 0");
    return num1 / num2;
};

divide(6, 2)
    .then((result) => console.log(result))
    .catch((error) => console.log(error.message));
