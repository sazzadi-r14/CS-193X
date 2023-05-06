import Card from "./card.js";
import Mover from "./mover.js";

export default class App {
  constructor() {
    //TODO
    this.mover = new Mover();
    this.columns = {
      todo: document.querySelector("#todo"),
      doing: document.querySelector("#doing"),
      done: document.querySelector("#done"),
    };
    this.form = document.querySelector("#addCard");
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(this.form);
      const title = formData.get("title");
      const color = formData.get("color") || "white";
      this.addCard("todo", title, color);
      this.form.reset();
    });
  }

  addCard(col, title, color) {
    //TODO
    const card = new Card(title, color);
    card.addToCol(this.columns[col], this.mover);
    return card;
  }

  //TODO
}
