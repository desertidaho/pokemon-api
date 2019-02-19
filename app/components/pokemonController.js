import PokemonService from "./pokemonService.js";
//Private

let _pokemonService = new PokemonService()

function drawPokemonsAPI() {
  //list of characters
  let template = ''
  let pokemons = _pokemonService.ApiPokemon
  pokemons.forEach(pokemon => {
    template += pokemon.getNameList()
  })
  document.querySelector('#list-pokemons').innerHTML = template
}


//public
export default class PokemonController {
  constructor() {
    _pokemonService.addSubscriber('apiPokemon', drawPokemonsAPI)

    //Initialize Data
    _pokemonService.getPokemonData()

  }


}