class Persopn {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log("hello world!");
  }
}

const person = new Persopn("FattyCat");
console.log(person.name);
person.say();
