const { TestScheduler } = require("jest");
const Employee = require("./lib/Employee");

test("Tests employee object as instance", () => {
    const e = new Employee();
    expect(typeOf(e)).toBe("object");

});

// Test for ID
test("Allows user to set ID with a Constructor argument", () => {
    const value = 100;
    const e = new Employee("Foo", value);
    expect(e.id).toBe(value);
  
});

test("Allows users to set e-mail address", () => {
    const testValue = "test@test.com";
    const e = new Employee("Foo", 1, testValue);
    expect(e.email).toBe(testValue);

})


