const pokemonContainer = document.getElementById("pokemonContainer");
const pokemonMap = new Map(); // +

document.querySelector("#search").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const searchPokemon = document.querySelector("#search").value.toLowerCase();
    pokemonContainer.innerHTML = "";
    listPokemon(searchPokemon);
    document.getElementById("search").value = "";
  }
});

function pokemonCard(pokemon) {
  const type = pokemon.types[0].type.name;
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id;

  document.querySelector("#pokemonContainer").innerHTML += `
    <div class="pokemon ${type}">
      <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}" />
      </div>
      <div class="info">
        <h3 class="name">${name}</h3>
        <span class="type">Type: <span>${type}</span></span>
      </div>
    </div>
  `;
  pokemonMap.set(id, true); //ajoute pokemon a map
}

let i = 1;
let limit = 30;

const listPokemon = function (pokemonName) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((res) => res.json())
    .then((data) => {
      if (!pokemonMap.has(data.id)) {
        //verifie si pokemon est deja charger
        pokemonCard(data);
      }
    });
};

setInterval(() => {
  if (i <= limit && i <= 150) {
    listPokemon(`${i}`);
    i++;
  }
}, 20);

document.querySelector("#next").addEventListener("click", function () {
  let nextLimit = limit + 15;
  if (nextLimit <= 150) {
    for (let i = limit + 1; i <= nextLimit; i++) {
      if (i <= 150) {
        listPokemon(`${i}`);
      }
    }
    limit = nextLimit; //maj limite
  }
});

document.querySelector(".home").addEventListener("click", function () {
  pokemonContainer.innerHTML = "";
  i = 1;
  limit = 30;
  pokemonMap.clear(); //effacer map pour rechargement pokemon
});
