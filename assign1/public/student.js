class Student {
  constructor(sunetid, givenName, surname) {
    this.givenName = givenName;
    this.surname = surname;
    this.sunetid = sunetid;
    this.dept = null;
    this.unitsCompleted = 0;
    this.isAlum = false;
  }

  fullName() {
    return `${this.givenName} ${this.surname}`;
  }

  addUnits(units) {
    this.unitsCompleted += units;
  }

  toString() {
    return `${this.givenName} ${this.surname} (${this.sunetid})`;
  }

  canGraduate() {
    if (this.isAlum) {
      throw new Error("Ah! No, if you graduated once, you can't declare again!");
    }
    return this.dept && this.unitsCompleted >= 180;
  }
}

export default Student;
