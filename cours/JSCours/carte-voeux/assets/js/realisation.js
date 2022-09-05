// ********************************************* Check Validité Formulaire *********************************************
let formulaire = document.getElementById("formulaireRealisation");

let inputs = document.querySelectorAll("input[required], textarea[required]");

inputs.forEach(element => {
    element.addEventListener('focus', ()=>{
        element.classList.remove("error"); 
        if(element.parentElement.querySelector("span")){ 
            element.parentElement.removeChild(element.parentElement.querySelector("span"));
        }
    },false)

    element.addEventListener('blur', () => { validationInput(element) }, false)
});

formulaire.addEventListener('submit', (e) => {
    e.preventDefault();    
    let formValide = true;

    inputs.forEach(element => {
        if(!validationInput(element)) { 
            formValide = false 
        }
    });
    if(formValide){
        e.target.submit();
    }
},false);


function validationInput(elem) {
    if (!elem.checkValidity()) {
        elem.classList.add('error');

        if(!elem.parentElement.querySelector("span")){ 
            let span = document.createElement("span"); 
            span.innerHTML= elem.validationMessage; 
            span.style.color='red';
            elem.parentElement.appendChild(span);
        }
        return false;
    }
    else {
        return true;
    }
}

// ****************************************************************************************************************
