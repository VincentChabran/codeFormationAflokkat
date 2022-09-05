for(let i=1; i < 10; i++){
   
    let monPokedex = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(response =>{
        response.json().then(dataRecuperee =>{
            
            console.log(dataRecuperee);

            let maCartePokemon = document.createElement("div");
            let nomClass = dataRecuperee.types[0].type.name == "bug" ? dataRecuperee.types[1].type.name : dataRecuperee.types[0].type.name;
            maCartePokemon.classList.add(nomClass);
            maCartePokemon.classList.add("divCarte");
            
            let maPhotoDePokemon = document.createElement("img");
            maPhotoDePokemon.src = dataRecuperee.sprites.front_default;
                        
            let monNomDePokemon = document.createElement("h6");
            monNomDePokemon.innerHTML = dataRecuperee.name;
            
            maCartePokemon.appendChild(monNomDePokemon);
            maCartePokemon.appendChild(maPhotoDePokemon);
            
            document.getElementById("containerPokemon").appendChild(maCartePokemon);

            let monPokemon = {
                "name" : dataRecuperee.name,
                "id" : dataRecuperee.id
            }

            localStorage.setItem(`pokemon${i}`, monPokemon);
        });
    });
}