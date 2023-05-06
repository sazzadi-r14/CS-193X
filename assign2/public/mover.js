/* Text to add to the move here button */
const MOVE_HERE_TEXT = "— Move here —";

export default class Mover {
  constructor() {
    //TODO
    this.activeCard = null;
    this.placeholders = [];
  }

  startMoving(card) {
    //TODO
    if (this.activeCard) {
      this.stopMoving();
    }

    this.activeCard = card;

    const columns = document.querySelectorAll("#board .column");
    columns.forEach((col) => {
      const placeholder = document.createElement("div");
      placeholder.className = "placeholder";
      placeholder.textContent = MOVE_HERE_TEXT;
      col.appendChild(placeholder);
      this.placeholders.push(placeholder);

      placeholder.addEventListener("click", () => {
        this.activeCard.elem.remove();
        col.insertBefore(this.activeCard.elem, placeholder);
        this.stopMoving();
      });
    });

    card.elem.classList.add("moving");
  }

  stopMoving() {
    //TODO
    if (!this.activeCard) {
      return;
    }

    this.activeCard.elem.classList.remove("moving");
    this.activeCard = null;

    this.placeholders.forEach((placeholder) => {
      placeholder.remove();
    });

    this.placeholders = [];
  }

  //TODO
}
