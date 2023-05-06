/* The text to use when description is empty */
const NO_DESCRIPTION_TEXT = "(No description)";

export default class Card {
  constructor(title, color) {
    //TODO
    this.title = title;
    this.color = color;
    this.description = NO_DESCRIPTION_TEXT;

    this.elem = document.querySelector(".template.card").cloneNode(true);
    this.elem.classList.remove("template");
    this.elem.querySelector(".title").textContent = this.title;
    this.elem.style.backgroundColor = this.color;
    this.elem.querySelector(".description").textContent = this.description;


    this.elem.querySelector(".edit").addEventListener("click", () => {
      this.elem.querySelector(".description").classList.add("hidden");
      this.elem.querySelector(".editDescription").classList.remove("hidden");
      this.elem.querySelector(".editDescription").value = this.description;
    });

    this.elem.querySelector(".editDescription").addEventListener("blur", () => {
      this.setDescription(this.elem.querySelector(".editDescription").value);
    });

    
    this.elem.querySelector(".delete").addEventListener("click", () => {
      this.elem.remove();
    });
  }

  addToCol(colElem, mover) {
    //TODO
    colElem.appendChild(this.elem);
    this.mover = mover;

    this.elem.querySelector(".startMove").addEventListener("click", () => {
      mover.startMoving(this);
    });
  }

  setDescription(text) {
    //TODO
    this.description = text;
    this.elem.querySelector(".description").textContent = this.description;
    this.elem.querySelector(".description").classList.remove("hidden");
    this.elem.querySelector(".editDescription").classList.add("hidden");
  }

  //TODO
}
