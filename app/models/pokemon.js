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
  }

  getNameList() {
    return `
  <button class="btn bt-sm btn-outline-dark shadow mt-2" onclick="app.controllers.pokemonController.makeCard('${this.name}')">${this.name}</button>
    `
  }

  makeCharCard() {
    return `
    <div class="col-5">
      <div class="card">
        <img class="img-fluid" src="${this.img}" alt="">
          <div class="card-body">
             <h4 class="card-title">${this.name}</h4>
             <p class="card-text">Height: ${this.height}</p>
             <p class="card-text">Weight: ${this.weight}</p>
             <p class="card-text">Stat: ${this.stat}</p>
             <a href="#!" class="btn btn-primary">Go somewhere</a>
          </div>
      </div>
    </div>
 
    `
  }

}
