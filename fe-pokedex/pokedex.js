const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    pokeImage("images\\pokeball.gif");
    displayPokeName(null,null,null,null);
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("images\\char-sad.gif");
            let pkmnName = "No pokemon found";
            let pkmnTypes = null;
            let pkmnWeight = null;
            let pkmnHeight = null;
            displayPokeName(pkmnName,pkmnHeight,pkmnWeight,pkmnTypes);
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            let pkmnName = "No." + data.id + " " + data.name[0].toUpperCase() + data.name.slice(1);
            let pkmnTypes = data.types;
            let pkmnWeight = data.weight/10;
            let pkmnHeight = data.height/10;
            pokeImage(pokeImg);
                        
            if(pkmnTypes.length === 1){
                let types = "Type: " + pkmnTypes[0].type.name ;
                displayPokeName(pkmnName,pkmnHeight,pkmnWeight,types);
            }else{
                let types = "Types: " + pkmnTypes[0].type.name + " / " + pkmnTypes[1].type.name;
                displayPokeName(pkmnName,pkmnHeight,pkmnWeight,types);
            }
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const displayPokeName = (name,height,weight,types) => {
    const pkmnName = document.getElementById("pkmnName") ;
    const pkmnHeight = document.getElementById("pkmnHeight") ;
    const pkmnWeight = document.getElementById("pkmnWeight") ;
    const pkmnTypes = document.getElementById("pkmnTypes") ;
    pkmnName.innerHTML = name;
    if (height === null && weight === null){
        pkmnHeight.innerHTML ="";
        pkmnWeight.innerHTML = "";
        pkmnTypes.innerHTML = "";
    }else{
        pkmnHeight.innerHTML ="<br>Height: " + height + " m";
        pkmnWeight.innerHTML = "<br> Weight: "+ weight + " kg";
        pkmnTypes.innerHTML = "<br>" + types;
    }
    
}