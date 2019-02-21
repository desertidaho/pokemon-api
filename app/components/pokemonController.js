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

function drawApiCharacter() {

  //draw card from list of pokemon characters
  let template = _pokemonService.ApiCharacter.makeCharCard()
  document.querySelector('#char-card').innerHTML = template
}

function drawPokedexList() {
  //list of my pokedex
  let template = ''
  let pokemons = _pokemonService.MyPokedex
  pokemons.forEach(pokemon => {
    template += pokemon.makePokedexList()
  })
  document.querySelector('#list-pokedex').innerHTML = template
  document.querySelector('#char-card').innerHTML = ''
}

function drawPokedexCharacter() {
  //draw card from list of my pokedex characters
  let template = _pokemonService.PokedexCharacter.fromPokedexCharCard()
  document.querySelector('#char-card').innerHTML = template
}


//public
export default class PokemonController {
  constructor() {
    _pokemonService.addSubscriber('apiPokemon', drawPokemonsAPI)
    _pokemonService.addSubscriber('apiCharacter', drawApiCharacter)
    _pokemonService.addSubscriber('myPokedex', drawPokedexList)
    _pokemonService.addSubscriber('pokedexCharacter', drawPokedexCharacter)

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

  makeCardFromPokedex(_id) {
    _pokemonService.makeCardFromPokedex(_id)
  }

  deleteCard(_id) {
    _pokemonService.deleteCard(_id)
  }

}