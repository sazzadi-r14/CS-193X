class Department {
  constructor(name, code) {
    this.name = name;
    this.code = code;
    this.students = [];
  }

  toString() {
    return `${this.name}`;
  }

  declare(student) {
    if (student.dept === this.name) {
      return;
    } else if (student.dept) {
      throw new Error("Ah! No, you can't declare under two departments!");
    } else {
      student.dept = this.name;
      this.students.push(student);
    }
  }

  graduate() {
    const alum = [];
    this.students.forEach((student) => {
      if (student.canGraduate()) {
        student.isAlum = true;
        alum.push(student);
      }
    });
    this.students = this.students.filter((student) => !student.isAlum);
    return alum;
  }
}

export default Department;
