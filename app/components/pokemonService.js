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
  apiPokemon: []
}

let _subscribers = {
  apiPokemon: []
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
    return _state.apiPokemon.map(h => new Pokemon(h))
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



}