
const fetchPokemon = () =>{
    let pokemon = document.getElementById("PokeName").value.toLowerCase();
    let fetchUrl = "https://pokeapi.co/api/v2/pokemon/"+pokemon;
    fetch(fetchUrl).then((ans) =>{
        if (ans.status != 200){
            console.log(ans);
            changePokeImg("./Assets/img/confusion.jpg");
            alert("Verifique haber escrito el nombre o número del pokémon correctamente; si el error persiste, puede que el servicio o la información de ese pokémon no se encuentren disponibles")
        }
        else{
            return ans.json();
        }
    }).then((data) =>{
        if (data){
            changePokeImg(data.sprites.front_default);
            setType(data.types);
            setID(data);
            setName(data);
            setStats(data);
            setMoves(data);
            setHabilidades(data);
        }
    })
};

const changePokeImg = (img) =>{
    document.getElementById("PokeImg").src = img;
}

const setType = async (types) =>{
    const sitio = document.getElementById("poketypes");
    sitio.innerHTML = '';
    for(let i = 0;i<types.length;i++){
        const response  = await fetch(types[i].type.url);
        if(response.status !=200){
            console.log(response);
            changePokeImg("./Assets/img/confusion.jpg")
        }
        else{
            const data  = await response.json();
            let type = data.names[5].name;
            let typediv = document.createElement("div");
            typediv.className = type +" typecont";
            let typep = document.createElement("p");
            typep.className = "typetext"
            let typetext = document.createTextNode(type);
            typep.appendChild(typetext);
            typediv.appendChild(typep);
            sitio.appendChild(typediv);
        }   
    }
}

const setName = (data)=>{
    let namep = document.createElement("p");
    let name = document.createTextNode(data.name);
    namep.appendChild(name);
    let sitio = document.getElementById("pokenombre");
    sitio.innerHTML = '';
    sitio.appendChild(namep);
}
const setID = (data)=>{
    let idp = document.createElement("p");
    let id = document.createTextNode("# "+data.id);
    idp.appendChild(id);
    let sitio = document.getElementById("pokenumero");
    sitio.innerHTML = '';
    sitio.appendChild(idp);
}
const setStats = (data)=>{
    //hp
    let hpp = document.createElement("p");
    let hp = document.createTextNode(data.stats[0].base_stat);
    hpp.className = "statnumber"
    hpp.appendChild(hp);
    let sitiohp = document.getElementById("pokehp");
    sitiohp.innerHTML = '';
    sitiohp.appendChild(hpp);
    let hpper = data.stats[0].base_stat/255*100;
    document.getElementById("hpbar").style.width = hpper + "%";
    document.getElementById("hpbar").style.borderRadius = "";
    if (hpper == 100){
        document.getElementById("hpbar").style.borderRadius = 8 + "px";
    }
    //attack
    let atkp = document.createElement("p");
    let atk = document.createTextNode(data.stats[1].base_stat);
    atkp.className = "statnumber"
    atkp.appendChild(atk);
    let sitioatk = document.getElementById("pokeattack");
    sitioatk.innerHTML = '';
    sitioatk.appendChild(atkp);
    let atkper = data.stats[1].base_stat/255*100;
    document.getElementById("atkbar").style.width = atkper + "%";
    //defense
    let defp = document.createElement("p");
    let def = document.createTextNode(data.stats[2].base_stat);
    defp.className = "statnumber"
    defp.appendChild(def);
    let sitiodef = document.getElementById("pokedef");
    sitiodef.innerHTML = '';
    sitiodef.appendChild(defp);
    let defper = data.stats[2].base_stat/255*100;
    document.getElementById("defbar").style.width = defper + "%";
    //special attack
    let satkp = document.createElement("p");
    let satk = document.createTextNode(data.stats[3].base_stat);
    satkp.className = "statnumber"
    satkp.appendChild(satk);
    let sitiosatk = document.getElementById("pokesattack");
    sitiosatk.innerHTML = '';
    sitiosatk.appendChild(satkp);
    let satkper = data.stats[3].base_stat/255*100;
    document.getElementById("satkbar").style.width = satkper + "%";
    //special defense
    let sdefp = document.createElement("p");
    let sdef = document.createTextNode(data.stats[4].base_stat);
    sdefp.className = "statnumber"
    sdefp.appendChild(sdef);
    let sitiosdef = document.getElementById("pokesdef");
    sitiosdef.innerHTML = '';
    sitiosdef.appendChild(sdefp);
    let sdefper = data.stats[4].base_stat/255*100;
    document.getElementById("sdefbar").style.width = sdefper + "%";
    //speed
    let speedp = document.createElement("p");
    let speed = document.createTextNode(data.stats[5].base_stat);
    speedp.className = "statnumber"
    speedp.appendChild(speed);
    let sitiospeed = document.getElementById("pokespeed");
    sitiospeed.innerHTML = '';
    sitiospeed.appendChild(speedp);
    let speedper = data.stats[5].base_stat/255*100;
    document.getElementById("speedbar").style.width = speedper + "%";
}
const setMoves = (data) =>{
    const sitiomoves = document.getElementById("pokemoves");
    sitiomoves.innerHTML = '';
    for(let i = 0;i<data.moves.length;i++){
        let movecont = document.createElement("div");
        movecont.className = "movecont";
        let movenamep = document.createElement("p");
        let movename = document.createTextNode(data.moves[i].move.name);
        let learnedatp = document.createElement("p");
        let learnedat = document.createTextNode("lvl "+data.moves[i].version_group_details[0].level_learned_at);
        movenamep.appendChild(movename);
        learnedatp.appendChild(learnedat);
        movecont.appendChild(movenamep);
        movecont.appendChild(learnedatp);
        sitiomoves.appendChild(movecont);
    }
}

const setHabilidades = (data) =>{
    let abilities = data.abilities;
    var sitio2 = document.getElementById("habilidades");
    sitio2.innerHTML = '';
    var sitio1 = document.getElementById("habilidadesOcultas");
    sitio1.innerHTML = '';
    for(let i = 0; i<abilities.length; i++){
        let abilityp = document.createElement("p");
        let ability =document.createTextNode(abilities[i].ability.name);
        abilityp.appendChild(ability);
        if(abilities[i].is_hidden){
            sitio1.appendChild(abilityp);
        }
        else{  
            sitio2.appendChild(abilityp); 
        }
    }
}

const ponerInfo = () =>{
    document.getElementById("btnMoves").className = "navButgrey"
    document.getElementById("btnInfo").className = "navBut"
    document.getElementById("MovesSection").style = "display:none;"
    document.getElementById("DataSection").style = ""
}

const ponerMoves = () =>{
    document.getElementById("btnInfo").className = "navButgrey"
    document.getElementById("btnMoves").className = "navBut"
    document.getElementById("DataSection").style = "display:none;"
    document.getElementById("MovesSection").style = ""
}

const cambiarAbout = () =>{
    if(document.getElementById("aboutsec").style.display === "none"){
        document.getElementById("aboutsec").style = "";
    }
    else{
        document.getElementById("aboutsec").style = "display:none;";
    }
}

document.getElementById("submitbtn").addEventListener("click", fetchPokemon);
document.getElementById("btnInfo").addEventListener("click",ponerInfo);
document.getElementById("btnMoves").addEventListener("click",ponerMoves);
document.getElementById("about").addEventListener("click",cambiarAbout);