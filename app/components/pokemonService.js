import Pokemon from "../models/pokemon.js";
//Private

//provide controlls to GET/POST/PUT/DELETE
let _pokemonAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

let _sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Brett/heroes'
})

let x = 0

let _state = {
  apiPokemon: [],
  apiCharacter: {},
  myPokedex: [],
  pokedexCharacter: {}
}

let _subscribers = {
  apiPokemon: [],
  apiCharacter: [],
  myPokedex: [],
  pokedexCharacter: []
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

  get PokedexCharacter() {
    return _state.pokedexCharacter
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
    let pokemon = _state.apiCharacter

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

  makeCardFromPokedex(_id) {
    _sandbox.get(_id)
      .then(res => {
        let data = new Pokemon(res.data.data)
        setState('pokedexCharacter', data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  deleteCard(id) {
    _sandbox.delete(id)
      .then(res => {
        this.myPokedexData()

      })
      .catch(err => {
        console.error(err)
      })
  }


  next() {
    x += 20
    _pokemonAPI.get('?offset=' + x + '&limit=20')
      .then(res => {
        let data = res.data.results.map(d => new Pokemon(d))
        setState('apiPokemon', data)
      })
      .catch(err => {
        console.error(err)
      })
    document.querySelector('#prev').disabled = false
    if (x == 960) {
      document.querySelector('#next').disabled = true
    }
  }

  previous() {
    if (x >= 20) {
      x -= 20
      _pokemonAPI.get('?offset=' + x + '&limit=20')
        .then(res => {
          let data = res.data.results.map(d => new Pokemon(d))
          setState('apiPokemon', data)
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      document.querySelector('#prev').disabled = true
    }
    if (x == 0) {
      document.querySelector('#prev').disabled = true
    }
  }

}