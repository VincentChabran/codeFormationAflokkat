var nom = 'Vincent';
var age = 26;

if(age >= 18){
    alert (`Je m'appel ${nom} j'ai ${age} ans, je suis majeur.`);
    var prenomAmi,verresAmi;
    var verresMoi;
    if(verresMoi > verresAmi){
        document.write("J'ai bu + que toi ");
    }
    else{
        document.write("tu as bu + que moi");
    }
    document.write('la différence est : ' + (verresMoi - verresAmi));

    function payer(moi,amis){
        var grenadine = 3, menthe = 2;
        var totalMoi = moi * grenadine;
        var totalAmi = amis * menthe;

        document.write(`J'ai payer ${totalMoi}, tu a payer ${totalAmi}`)
    }
    payer(verresMoi,verresAmi);
}
else{
    alert (`Je m'appel ${nom} j'ai ${age} ans, je suis mineur.`);
}
