/*
EEEEEEEEEEEEEE      XX       XX     OOOOOOOOOOOOOO        1111
EEEEEEEEEEEEEE       XX     XX      OOOOOOOOOOOOOO       11111
EEE                   XX   XX       OOO        OOO      11  11
EEE                    XX XX        OOO        OOO          11
EEEEEEEEE               XXX         OOO        OOO          11
EEEEEEEEE               XXX         OOO        OOO          11
EEE                    XX XX        OOO        OOO          11
EEE                   XX   XX       OOO        OOO          11
EEEEEEEEEEEEEE       XX     XX      OOOOOOOOOOOOOO     1111111111111
EEEEEEEEEEEEEE      XX       XX     OOOOOOOOOOOOOO     1111111111111
*/

// *************** Switch case réécrie en if/else *******************


let mySwitch = "AFRIQUE"


function testSwitch(){
    if(mySwitch === "AFRIQUE" || mySwitch === "OCEANIE"){
        return "continent sud";
    }
    else if (mySwitch === "AMERIQUE" || mySwitch === "ASIE"){
        return "continent nord/sud";
    }
    else if (mySwitch === "EUROPE"){
        return "continent nord";
    }
    else{
        return "error";
    }
}

//console.log(testSwitch());  //Décommenter pour test la fonction


/*
EEEEEEEEEEEEEE      XX       XX     OOOOOOOOOOOOOO     222222222222222
EEEEEEEEEEEEEE       XX     XX      OOOOOOOOOOOOOO     22222   2222222 
EEE                   XX   XX       OOO        OOO     222       2222
EEE                    XX XX        OOO        OOO              2222
EEEEEEEEE               XXX         OOO        OOO            2222
EEEEEEEEE               XXX         OOO        OOO          2222
EEE                    XX XX        OOO        OOO       2222
EEE                   XX   XX       OOO        OOO     2222
EEEEEEEEEEEEEE       XX     XX      OOOOOOOOOOOOOO     22222222222222
EEEEEEEEEEEEEE      XX       XX     OOOOOOOOOOOOOO     22222222222222
*/

// ************************** Fibonacci *************************** 


// tableau de départ représentant F0 et F1
var resultatFibonacci =[0,1];

//  Fonction classique
function fibonacci(n){
    if(n<2){
        return resultatFibonacci[n];
    }

    for(var i=2; i<=n; i++){
        resultatFibonacci[i] = resultatFibonacci[i-1] + resultatFibonacci[i-2];
    }

    return resultatFibonacci[n];
}

// console.log(fibonacci(7));  //Décommenter pour test la fonction


// Fonction récursive
function rFibonacci(n){
    if( n < 2){
        return resultatFibonacci[n];
    }
    else{
        return rFibonacci(n-1)+rFibonacci(n-2);
    }
}

//console.log(rFibonacci(10));  //Décommenter pour test la fonction


/*
EEEEEEEEEEEEEE      XX       XX     OOOOOOOOOOOOOO       333333333333333
EEEEEEEEEEEEEE       XX     XX      OOOOOOOOOOOOOO       333333333333333
EEE                   XX   XX       OOO        OOO                333333
EEE                    XX XX        OOO        OOO                333333
EEEEEEEEE               XXX         OOO        OOO            3333333333
EEEEEEEEE               XXX         OOO        OOO            3333333333 
EEE                    XX XX        OOO        OOO                333333
EEE                   XX   XX       OOO        OOO                333333
EEEEEEEEEEEEEE       XX     XX      OOOOOOOOOOOOOO       333333333333333
EEEEEEEEEEEEEE      XX       XX     OOOOOOOOOOOOOO       333333333333333
*/

// ***************************  Replace ***************************** 

var nom = "Sasuke";

function myReplaceA(w,w2){
    for(let lettre of w){
        if(lettre == w2){
            return true;
        }
    }
    return false;
}

//console.log(myReplaceA(nom,"s"));  //Décommenter pour test la fonction


/* ********************************************************************

Je vous propose différentes manières de faire la fonction myReplaceB
myReplaceB1 avec la boucle sur les lettres
myReplaceB2 avec la boucle sur les indices
myReplaceOptimiser utilise une structure ternaire 

***********************************************************************/


function myReplaceB1(w,w1,w2){
    if(myReplaceA(w,w1)){
        let newWord = "";
        for(let lettre of w){
            if(lettre == w1){
                newWord += w2;    
            }
            else{
                newWord += lettre;
            }
        }
    return newWord;
    }
    else{
        return `${w1} n'est pas dans ${w} remplacement impossible`;
    }
}

//console.log(myReplaceB1(nom,"a","t"));   //Décommenter pour test la fonction


function myReplaceB2(w,w1,w2){
    if(myReplaceA(w,w1)){
        let newWord = "";
        for(let i=0; i < w.length ; i++){
            if(w[i] == w1){
                newWord += w2;
            }
            else{
                newWord += w[i];
            }
        }
        return newWord;
    }
    else{
        return `${w1} n'est pas dans ${w} remplacement impossible`; 
    }
}

//console.log(myReplaceB2(nom,"s","t"));   //Décommenter pour test la fonction


function myReplaceOptimiser(w,w1,w2){
    if(myReplaceA(w,w1)){
        let newWord = "";
        for(let lettre of w){
            newWord += lettre == w1 ? w2 : lettre;
        }
        return newWord;
    }
    else{
        return `${w1} n'est pas dans ${w} remplacement impossible`; 
    }
}

//console.log(myReplaceOptimiser(nom,'a','t'));   //Décommenter pour test la fonction


/*
FFFFFFFFFFFFFFFFFFFF      IIIIIIIIIIIIIIIIII        NNNN         NNN
FFFFFFFFFFFFFFFFFFFF      IIIIIIIIIIIIIIIIII        NNNNN        NNN
FFFFF                            III                NNNNNN       NNN
FFFFF                            III                NNN NNN      NNN 
FFFFFFFFFFF                      III                NNN  NNN     NNN 
FFFFFFFFFFF                      III                NNN   NNN    NNN
FFFFF                            III                NNN    NNN   NNN 
FFFFF                            III                NNN     NNN  NNN
FFFFF                     IIIIIIIIIIIIIIIII         NNN      NNN NNN 
FFFFF                     IIIIIIIIIIIIIIIII         NNN       NNNNNN
*/

