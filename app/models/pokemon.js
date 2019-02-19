export default class Pokemon {
  constructor(data) {
    this.url = data.url
    this.name = data.name
  }


  getNameList() {
    return `
  <button class="btn bt-sm btn-outline-dark shadow mt-2" onclick="app.controllers.pokemonController.makeCard('${this.name}')">${this.name}</button>
    `
  }

}
