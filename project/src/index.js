function Subject() {
  this.state = "normal";
  this.observers = [];
}

Subject.prototype.getState = function () {
  return this.state;
};

Subject.prototype.setState = function (state) {
  this.state = state;
  this.notifyObservers();
};

Subject.prototype.notifyObservers = function () {
  for (let observer of this.observers) {
    observer.update.call(observer, this.state);
  }
};

Subject.prototype.attach = function (observer) {
  this.observers.push(observer);
};

function Observer(name, subject) {
  this.name = name;
  subject.attach(this);
}

Observer.prototype.update = function (state) {
  console.log(`${this.name} get info,new state is ${state}`);
};

const s = new Subject();
const o1 = new Observer("o1", s);
const o2 = new Observer("o2", s);

s.setState("happy");
