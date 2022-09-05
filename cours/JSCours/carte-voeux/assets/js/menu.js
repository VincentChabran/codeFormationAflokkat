/*
      ****  NNNN   NNN      AAAAAA     VVV       VVV ****
   ****     NNNNN  NNN     AAA  AAA     VVV     VVV     **** 
****        NNN NN NNN    AAAAAAAAAA     VVV   VVV         ****
   ****     NNN  NNNNN   AAA      AAA     VVV VVV       **** 
      ****  NNN   NNNN  AAA        AAA     VVVVV     ****
*/

// Crée une variable elementMenuNav qui va contenir une balise <nav></nav>
// let elementMenuNav = document.createElement("nav");

/*
      ****     /// NNNN   NNN      AAAAAA     VVV       VVV ****
   ****       ///  NNNNN  NNN     AAA  AAA     VVV     VVV     **** 
****         ///   NNN NN NNN    AAAAAAAAAA     VVV   VVV         ****
   ****     ///    NNN  NNNNN   AAA      AAA     VVV VVV       **** 
      **** ///     NNN   NNNN  AAA        AAA     VVVVV     ****
*/

/*
      ****  UUU   UUU   LL       ****
   ****     UUU   UUU   LL          **** 
****        UUU   UUU   LL             ****
   ****     UUU   UUU   LL          **** 
      ****  UUUUUUUUU   LLLLLLL  ****
*/

// Crée une variable qui va contenir notre balise <ul></ul>
var elementMenuNavUl = document.createElement("ul");
// Crée un id "menu"
elementMenuNavUl.id = "menu";

/*
      ****     /// UUU   UUU   LL       ****
   ****       ///  UUU   UUU   LL          **** 
****         ///   UUU   UUU   LL             ****
   ****     ///    UUU   UUU   LL          **** 
      **** ///     UUUUUUUUU   LLLLLLL  ****
*/

/*
      ****  LL       IIIIII   ****
   ****     LL         II        **** 
****        LL         II           ****
   ****     LL         II        **** 
      ****  LLLLLLL  IIIIII   ****
*/

// Crée des variables qui vont contenir nos balise <li></li>
var elementMenuNavUlLi1 = document.createElement("li");
var elementMenuNavUlLi2 = document.createElement("li");

/*
      ****      /// LL       IIIIII   ****
   ****        ///  LL         II        **** 
****          ///   LL         II           ****
   ****      ///    LL         II        **** 
      ****  ///     LLLLLLL  IIIIII   ****
*/

/*
      ****       AAAAAA          HHH   HHH  RRRRRRRRR    EEEEEEEE   FFFFFFFFF                 """" """"   ****
   ****         AAA  AAA         HHH   HHH  RRR   RRR    EEE        FFF          ==========   """" """"      **** 
****           AAAAAAAAAA        HHHHHHHHH  RRRRRRRRR    EEEEE      FFFFFF                                      ****
   ****       AAA      AAA       HHH   HHH  RRR    RRR   EEE        FFF          ==========                  **** 
      ****   AAA        AAA      HHH   HHH  RRR     RRR  EEEEEEEE   FFF                                   ****
*/

// Crée une variable qui va contenir une balise <a href=""></a>  
var elementMenuNavUlLi1A = document.createElement("a"); 

// insere dans href => "/creation.html"   ==>  elementMenuNavUlLi1A contiendra <a href="/creation.html"></a>
elementMenuNavUlLi1A.href = "creation.html";
 
// créé une class => "lienmenu"           ==>  elementMenuNavUlLi1A contiendra <a href="/creation.html" class="lienmenu"></a>
elementMenuNavUlLi1A.className = "lienmenu";

// Crée une variable qui va contenir du texte "Je créé ma carte de voeux"
var texteMenuNavUlLi1A = document.createTextNode("Je créé ma carte de voeux");
// Ajoute le texte à elementMenuNavUlLi1A ==>  elementMenuNavUlLi1A contiendra <a href="/creation.html" class="lienmenu">Je créé ma carte de voeux</a>
elementMenuNavUlLi1A.appendChild(texteMenuNavUlLi1A);


// frère même procéder qu'au-dessus pour la deuxiéme balise <a href=""></a>
var elementMenuNavUlLi2A = document.createElement("a");
elementMenuNavUlLi2A.href = "realisation.html";
elementMenuNavUlLi2A.className = "lienmenu";
var texteMenuNavUlLi2A = document.createTextNode("Réalisation");
elementMenuNavUlLi2A.appendChild(texteMenuNavUlLi2A);

/*
      ****     ///   AAAAAA     ****
   ****       ///   AAA  AAA       **** 
****         ///   AAAAAAAAAA         ****
   ****     ///   AAA      AAA     **** 
      **** ///   AAA        AAA ****
*/

// Ajoute le contenue des var elementMenuNavUlLi1 et Li2 à la var elementMenuNavUl
elementMenuNavUl.append(elementMenuNavUlLi1,elementMenuNavUlLi2);
// Ajoute le contenue des var elementMenuNavUlLi1A et A2 à nos var elementMenuNavUlLi1 et Li2
elementMenuNavUlLi1.appendChild(elementMenuNavUlLi1A);
elementMenuNavUlLi2.appendChild(elementMenuNavUlLi2A);

// Crée une variable qui contient la balise avec l'id = menuNav
let selectionMenu = document.getElementById("menuNav");
selectionMenu.appendChild(elementMenuNavUl);

