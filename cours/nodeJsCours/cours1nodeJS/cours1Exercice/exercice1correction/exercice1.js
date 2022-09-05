const fs = require("fs");


const testPlayer = (playerA, playerB, countPA, countPB, maxCount, faster) => {
  if (countPA === maxCount && !faster) {
    faster = playerA;
  }
  if (countPA === maxCount && countPB < maxCount) {
    console.log(`Le ${playerB} gagne`);
  }
  return faster;
}


const process = (data) => {

  const lines = data.split("\n");
  // const firstMatch = lines[0];
  // const secondMatch = lines[1];
  // const maxCount = lines[2];
  // const [,,,...reste] = lines;

  const [firstMatch, secondMatch, maxCountStr, ...reste] = lines;
  const maxCount = parseInt(maxCountStr);

  const player1 = firstMatch.split("-")[0].trim();
  const player2 = firstMatch.split("-")[1].trim();
  const player3 = secondMatch.split("-")[0].trim();
  const player4 = secondMatch.split("-")[1].trim();
  let count1 = count2 = count3 = count4 = 0;
  let faster = null;

  // console.log(reste);

  for (let coup of reste) {
    let color = coup.trim();

    if (player1 === color) {
      count1 ++;
      faster = testPlayer(player1, player2, count1, count2, maxCount, faster);
    } else if (player2 === color) {
      count2 ++;
      faster = testPlayer(player2, player1, count2, count1, maxCount, faster);
    } else if (player3 === color) {
      count3 ++;
      faster = testPlayer(player3, player4, count3, count4, maxCount, faster);
    } else if (player4 === color) {
      count4 ++;
      faster = testPlayer(player4, player3, count4, count3, maxCount, faster);
    }
  }

  console.log(`Le joueur le plus rapide est ${faster}`);

} 

fs.readFile("exercice1_data.txt", "utf-8", function(error, fileData) {

  if (error) throw error;

  process(fileData);

})