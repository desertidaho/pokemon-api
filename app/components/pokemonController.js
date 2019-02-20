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

function drawCharacter() {
  let template = _pokemonService.ApiCharacter.makeCharCard()
  document.querySelector('#char-card').innerHTML = template
}

function drawFromPokedex() {
  let template = ''
  let pokemons = _pokemonService.MyPokedex
  pokemons.forEach(pokemon => {
    template += pokemon.makePokedexList()
  })
  document.querySelector('#list-pokedex').innerHTML = template
}


//public
export default class PokemonController {
  constructor() {
    _pokemonService.addSubscriber('apiPokemon', drawPokemonsAPI)
    _pokemonService.addSubscriber('apiCharacter', drawCharacter)
    _pokemonService.addSubscriber('myPokedex', drawFromPokedex)

    //Initialize Data
    _pokemonService.getPokemonData()
    _pokemonService.myPokedexData()
  }

  makeCard(name) {
    _pokemonService.makeCard(name)
  }

  addToPokedex(name) {
    _pokemonService.addToPokedex(name)
  }

  deleteCard(id) {
    _pokemonService.deleteCard(id)
  }

}