// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    empName() {
        return this.name;
    }
    empId() {
        return this.id;
    }
    empEmail() {
        return this.email;
    }
    empRole() {
        return "Employee";
    }
}
module.exports = Employee;