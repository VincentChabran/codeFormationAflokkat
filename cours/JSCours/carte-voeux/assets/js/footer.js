/**
 * Fonction pour ajouter des propriétés à une balise <a href=""></a>
 * @param {*} nomVar - Nom de la variable que l'on souhaite modifier
 * @param {String} pHref - href que l'on souhaite ajouter
 * @param {String} pClass - class que l'on souhaite ajouter
 * @param {String} pTarget - target que l'on souhaite ajouter
 * @param {String} pRel - rel que l'on souhaite ajouter
 * @param {String} pAriaLabel - aria-label que l'on souhaite ajouter
 * ==> Note, pour skip un param renseignez simplement "" 
 */
function baliseA(nomVar,pHref,pClass,pTarget,pRel,pAriaLabel){
    if(pHref != ""){
        nomVar.href = pHref;
    }
    if(pClass != ""){
        nomVar.className = pClass;
    }
    if(pTarget != ""){
        nomVar.target = pTarget;
    }
    if(pRel != ""){
        nomVar.rel = pRel;
    }
    if(pAriaLabel != ""){
        nomVar.ariaLabel = pAriaLabel;
    }
}

/**
 * Fonction pour ajouter des propriétés à une balise <img src="" alt="">
 * @param {*} nomVar - Nom de la variable que l'on souhaite modifier
 * @param {String} pClassName - class que l'on souhaite ajouter
 * @param {String} pSrc - src que l'on souhaite ajouter
 * @param {String} pAlt - alt que l'on souhaite ajouter
 */
function baliseImg(nomVar,pClassName,pSrc,pAlt){
    nomVar.className = pClassName;
    nomVar.src = pSrc;
    nomVar.alt = pAlt;
}


// Crée la Balise <footer></footer>
let elementFooter = document.createElement("footer");

// *******************************************************************************

// Crée Balise <div></div> 
let elementFooterDiv = document.createElement("div");
elementFooterDiv.id = "liens";

// Crée la première Balise <a href=""></a> mail
let elementFooterDivA1 = document.createElement("a");
baliseA(elementFooterDivA1,"mailto:?subject=Générateur de cartes de voeux&body=Bonjour, j'ai trouvé un joli et très simple générateur de carte de voeux, je me suis dis que ça pouvait t'intéresser 🙂 https://nouvelan.fr - C'est un projet étudiant d'Aflokkat, Ajaccio","","_blank","nofollow noreferer noopener","partager par mail");
// Crée la première Balise <img src="" alt="">
let elementFooterDivA1Img = document.createElement("img");
baliseImg(elementFooterDivA1Img,"icon","assets/icones/email128x128.png",'e-mail');

// Crée la deuxième Balise <a href=""></a> facebook
let elementFooterDivA2 =document.createElement("a");
baliseA(elementFooterDivA2,"https://facebook.com/sharer.php?u=https://nouvelan.fr","","_blank","nofollow noreferer noopener","partager sur facebook");
// Crée la deuxième Balise <img src="" alt="">
let elementFooterDivA2Img = document.createElement("img");
baliseImg(elementFooterDivA2Img,"icon","assets/icones/facebook128x128.png",'facebook');

// Crée la troisième balise <a href=""></a> twitter
let elementFooterDivA3 = document.createElement("a");
baliseA(elementFooterDivA3,"https://twitter.com/intent/tweet?url=https://nouvelan.fr&text=joli%20et%20très%20simple%20générateur%20de%20carte%20de%20voeux,%20projet%20étudiant%20Aflokkat,%20Ajaccio","","_blank","nofollow noreferer noopener","partager sur twitter");
// Crée la troisième Balise <img src="" alt="">
let elementFooterDivA3Img = document.createElement("img");
baliseImg(elementFooterDivA3Img,"icon","assets/icones/twitter128x128.png",'twitter');

// Ajoute successivement les balises "enfant" au balise "parent"
elementFooter.appendChild(elementFooterDiv);
elementFooterDiv.append(elementFooterDivA1,elementFooterDivA2,elementFooterDivA3);
elementFooterDivA1.appendChild(elementFooterDivA1Img);
elementFooterDivA2.appendChild(elementFooterDivA2Img);
elementFooterDivA3.appendChild(elementFooterDivA3Img);

// ****************************************************************************

// Crée la Balise <nav></nav>
let elementFooterNav = document.createElement("nav");

// Crée une Balise <ul></ul>
let elementFooterNavUl = document.createElement("ul");
elementFooterNavUl.id = 'navigation-footer';

// Crée 3 Balises <li></li>
let elementFooterNavUlLi1 = document.createElement("li");
let elementFooterNavUlLi2 = document.createElement("li");
let elementFooterNavUlLi3 = document.createElement("li");

// Crée la Première balise <a href=""></a> 
let elementFooterNavUlLi1A = document.createElement("a");
baliseA(elementFooterNavUlLi1A,"index.html","lienmenu","","nofollow","");
elementFooterNavUlLi1A.appendChild(document.createTextNode("Mentions légales"));


// Crée la Deuxième balise <a href=""></a>
let elementFooterNavUlLi2A = document.createElement("a");
baliseA(elementFooterNavUlLi2A,"creation.html","lienmenu","",'author',"");
elementFooterNavUlLi2A.appendChild(document.createTextNode("Application créé par les étudiants d'"));
// Crée une Balise <i></i>
let elementFooterNavUlLi2AI = document.createElement("i");
elementFooterNavUlLi2AI.appendChild(document.createTextNode("Aflokkat"));
// Ajoute la Balise <i></i> à la balise <a href=""></a>
elementFooterNavUlLi2A.appendChild(elementFooterNavUlLi2AI);


// Crée la Troisième balise <a href=""></a>
let elementFooterNavUlLi3A = document.createElement("a");
baliseA(elementFooterNavUlLi3A,"https://corailfactory.eu","lienmenu","_blank",'author',"");
elementFooterNavUlLi3A.appendChild(document.createTextNode("Application hébergée par"));
// Crée une Balise <i></i>
let elementFooterNavUlLi3AI = document.createElement("i");
elementFooterNavUlLi3AI.appendChild(document.createTextNode("Corail Factory"));
// Ajoute la Balise <i></i> à la balise <a href=""></a>
elementFooterNavUlLi3A.appendChild(elementFooterNavUlLi3AI);


// Ajoute successivement les balises "enfant" au balise "parent"
elementFooter.appendChild(elementFooterNav);
elementFooterNav.appendChild(elementFooterNavUl);
elementFooterNavUl.append(elementFooterNavUlLi1,elementFooterNavUlLi2,elementFooterNavUlLi3);
elementFooterNavUlLi1.appendChild(elementFooterNavUlLi1A);
elementFooterNavUlLi2.appendChild(elementFooterNavUlLi2A);
elementFooterNavUlLi3.appendChild(elementFooterNavUlLi3A);

// ****************************************************************************

document.body.appendChild(elementFooter);