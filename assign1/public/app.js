
//TODO: Add imports
import Student from "./student.js";
import Department from "./dept.js";
class App {
  constructor() {
    this.students = {};
    this.depts = {};

    this._handleDeclare = this._handleDeclare.bind(this);
    this._handleGraduate = this._handleGraduate.bind(this);

    const declareButton = document.querySelector("#declare-button");
    console.log(declareButton);
    declareButton.addEventListener("click", this._handleDeclare);

    const graduateButton = document.querySelector("#graduate-button");
    console.log(graduateButton);
    graduateButton.addEventListener("click", this._handleGraduate);
  }

  loadData(data) {
    this.students = {};
    this.depts = {};
    for (const student of data.students) {
      this.students[student.sunetid] = new Student(student.sunetid, student.givenName, student.surname);
    }


    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const sunetid in data.units) {
      this.students[sunetid].unitsCompleted += data.units[sunetid];
    }

    for (const dept of data.depts) {
      this.depts[dept.code] = new Department(dept.name, dept.code);
    }
  }

  declare(sunetid, deptCode) {
    const student = this.students[sunetid];
    const dept = this.depts[deptCode];

    if (!student) {
      throw new Error(`Student with SUNetID "${sunetid}" not found.`);
    }

    if (!dept) {
      throw new Error(`Department with code "${deptCode}" not found.`);
    }

    dept.declare(student);
    return student;
  }
  graduate(deptCode) {
    const dept = this.depts[deptCode];

    if (!dept) {
      throw new Error(`Department with code "${deptCode}" not found.`);
    }

    return dept.graduate();
  }
  _handleDeclare() {
    console.log("Declare button clicked!");
    const sunetidInput = document.querySelector("#sunetid-input");
    const deptCodeInput = document.querySelector("#deptcode-input");

    const sunetid = sunetidInput.value;
    const deptCode = deptCodeInput.value;

    try {
      const student = this.declare(sunetid, deptCode);
      const dept = this.depts[deptCode];

      alert(`${student.fullName()} (${sunetid}) declared ${dept.name}!`);
    } catch (error) {
      alert(error.message);
    }
  }

  _handleGraduate() {
    console.log("Graduate button clicked!");
    const deptCodeInput = document.querySelector("#deptcode-input");
    const deptCode = deptCodeInput.value;

    try {
      const graduates = this.graduate(deptCode);
      const dept = this.depts[deptCode];

      if (graduates.length > 0) {
        let graduateList = "Graduates:\n";
        for (const graduate of graduates) {
          graduateList += `${graduate.fullName()} (${graduate.sunetid})\n`;
        }
        alert(graduateList);
      } else {
        alert(`No students graduated from ${dept.name} department.`);
      }
    } catch (error) {
      alert(error.message);
    }
  }
}

export default App;
