export default class Pokemon {
  constructor(data) {
    this.url = data.url
    this.name = data.name
    if (data.sprites) {
      this.img = data.sprites.front_default
    }
    if (data.weight) {
      this.weight = data.weight
    }
    if (data.height) {
      this.height = data.height
    }
    if (data.stats) {
      this.stat = data.stats[0].base_stat
    }
    if (data.species) {                        //trick to satisfy sandbox schema requirements
      this.description = data.species.name
    }
  }

  //get names from pokemon api
  getNameList() {
    return `
  <button class="btn bt-sm btn-outline-dark shadow mt-2" onclick="app.controllers.pokemonController.makeCard('${this.name}')">${this.name}</button>
    `
  }

  //make card when select pokemon character
  makeCharCard() {
    return `
    <div class="mt-5">
      <div class="card">
        <img class="img-fluid" src="${this.img}" alt="">
          <div class="card-body">
             <h4 class="card-title">${this.name}</h4>
             <p class="card-text">Height: ${this.height}</p>
             <p class="card-text">Weight: ${this.weight}</p>
             <p class="card-text">Stat: ${this.stat}</p>
             <button class="btn btn-outline-primary" onclick="app.controllers.pokemonController.addToPokedex('${this.name}')">Add to Pokedex</button>
          </div>
      </div>
    </div>
    `
  }

  //create list when select char card to add to pokedex
  makePokedexList() {
    return `
  <button class="btn bt-sm btn-outline-primary shadow mt-2" onclick="app.controllers.pokemonController.makeCard('${this.name}')">${this.name}</button>
    `
  }

}
