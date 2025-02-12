let pokemones = [];
const URL_API = "https://pokeapi.co/api/v2";

function obtenerPokemones() {
    // 1. Hacer una petición al servidor con un método asíncrono con axios
    axios.get(`${URL_API}/pokemon`).then(response => {

                                    // console.log("Respuesta desde pokemonapi", response);

                                    // 2. Guardar la respuesta en la variable pokemones
                                    pokemones = response.data.results;

                                    // 3. Pintar los pokemones en el HTML
                                    pintarPokemones(pokemones);

                                   })
                                   .catch(error => {
                                        console.error(error);
                                        console.error("Error al obtener los pokemones");
                                   })
}

obtenerPokemones();

function pintarPokemones(arrayPokemones) {
    // 1. Seleccionar el contenedor de los pokemones
    const pokemonListHTML = document.getElementById("poke");

    // 2. Borrar el contenido del contenedor


    // console.log("pintarpokemos", arrayPokemones);
    
    // 3. Recorrer el array de pokemones con un forEach
    arrayPokemones.forEach(pokemon => {
        // 4. Crear un elemento HTML por cada pokemon

        const ID = extraerPokemonID(pokemon.url);
        
        // pokemonListHTML.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
        //                                 ${pokemon.name}
                                        
        //                                 <a href="/pages/detail.html?pokemon=${ID}" 
        //                                     class="btn btn-primary btn-sm">
        //                                         Ver
        //                                 </a>
        //                             </li>`

        const listItem = document.createElement("li");

        listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        listItem.innerText = pokemon.name;

        const aHTML =  document.createElement("a"); //  <a></a>


        aHTML.classList.add("btn", "btn-primary", "btn-sm"); //  <a class="btn btn-primary btn-sm"></a>

        aHTML.innerText = "Ver"; //  <a class="btn btn-primary btn-sm">Ver</a>

        aHTML.href = `/pages/detail.html?pokemon=${ID}`;

        // !Importante se puede setear el atributo href de la siguiente manera y se puede user para setear cualquier atributo
        // aHTML.setAttribute("href", `/pages/detail.html?pokemon=${ID}`);

        aHTML.style.backgroundColor = "red";

        aHTML.style.color = "white";

        aHTML.style.borderBottomStyle = "solid";

        // css: background-color
        listItem.appendChild(aHTML);

        // console.dir(aHTML)

        // console.dir(listItem)

        pokemonListHTML.appendChild(listItem);


    })
}


function extraerPokemonID(url) {
    // // const url = pokemon.url;

    // const urlSplit = url.split("/"); // ["https:", "", "pokeapi.co", "api", "v2", "pokemon", "1", ""]

    // const pokemonID = urlSplit.at(-2); // "1"
    const pokemonID = url.split("/").at(-2);

    return pokemonID;
}

















function crearCardPokemon() {
    
}
