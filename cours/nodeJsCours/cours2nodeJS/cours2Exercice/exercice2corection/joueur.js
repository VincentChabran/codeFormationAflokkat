class Joueur {

  constructor(color, result) {
    this.color = color;
    this.result = result;
    this.name = result[color].name;
    this.points = result[color].points;
    this.classement = this.resolveClassement(); 
  }

  resolveClassement(){
    const pointsForColor = [];
    
    // 1er essai
    // for (let [key, value] of Object.entries(this.result)) {
    //   const tempObj = {
    //     color: key,
    //     points: value.points
    //   }
    //   pointsForColor.push(tempObj);
    // }
    // pointsForColor.sort(this.comparePoint);
    // const classement = pointsForColor.findIndex((el) => el.color == this.color) + 1;
    // return classement;

    for (let [key, value] of Object.entries(this.result)){
      pointsForColor.push({ color: key, points: value.points });
    }
    pointsForColor.sort((elA, elB) => elB.points - elA.points);
    return pointsForColor.findIndex((el) => el.color == this.color) + 1;
  }

  comparePoint(elA, elB) {
    const pointA = elA.points;
    const pointB = elB.points;
    return pointB - pointA;
  }

  getName() {
    return this.name;
  }

  getPoint(){
    return this.points;
  }

  getClassement(){
    return this.classement;
  }


}

module.exports = Joueur;