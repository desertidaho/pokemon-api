import Pokemon from "../models/pokemon.js";
//Private

//provide controlls to GET/POST/PUT/DELETE
let _pokemonAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

let _sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Brett/heroes'
})


let _state = {
  apiPokemon: [],
  apiCharacter: {},
  myPokedex: []
}

let _subscribers = {
  apiPokemon: [],
  apiCharacter: [],
  myPokedex: []
}

function setState(prop, data) {
  _state[prop] = data
  _subscribers[prop].forEach(fn => fn())
}

//public
export default class PokemonService {

  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get ApiPokemon() {
    return _state.apiPokemon.map(p => new Pokemon(p))
  }

  get ApiCharacter() {
    return _state.apiCharacter
  }

  get MyPokedex() {
    return _state.myPokedex
  }


  //GET DATA
  getPokemonData() {
    _pokemonAPI.get()
      .then(res => {
        let data = res.data.results.map(d => new Pokemon(d))
        setState('apiPokemon', data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  makeCard(name) {
    _pokemonAPI.get(name)
      .then(res => {
        let data = new Pokemon(res.data)
        setState('apiCharacter', data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  addToPokedex(name) {
    //find pokemon
    let pokemon = _state.apiCharacter //because object, not array

    ///SEND DATA TO SERVER
    //first parameter is appended on baseURL, second parameter is data to send
    _sandbox.post('', pokemon)
      .then(res => {
        this.myPokedexData()
      })
      .catch(err => {
        console.log(err)
      })
  }

  myPokedexData() {
    _sandbox.get()
      .then(res => {
        let data = res.data.data.map(p => new Pokemon(p))
        setState('myPokedex', data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  deleteCard(id) {
    _sandbox.delete(id)
      .then(res => {
        console.log(res.data)
        this.myPokedexData()
      })
      .catch(err => {
        console.error(err)
      })
  }

}