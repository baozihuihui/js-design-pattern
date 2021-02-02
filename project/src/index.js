// 创建 状态 原型约束
function State() {}

State.prototype.handleButtonClick = function () {
  throw new Error(`子类 必须实现 handleButtonClick 函数`);
};

// 创建 开灯状态
function LigthOnState(light) {
  this.state = "开灯";
  this.light = light;
}

// 创建 关灯 状态
function LightOffState(light) {
  this.state = "关灯";
  this.light = light;
}

function LightStrongState(light) {
  this.state = "强光灯";
  this.light = light;
}

LigthOnState.prototype = new State();
LightOffState.prototype = new State();
LightStrongState.prototype = new State();

LigthOnState.prototype.handleButtonClick = function () {
  console.log("已开强光灯！");
  this.light.setState(this.light.strongState);
};

LightStrongState.prototype.handleButtonClick = function () {
  console.log("已关灯");
  this.light.setState(this.light.offState);
};

LightOffState.prototype.handleButtonClick = function () {
  console.log("已开灯！");
  this.light.setState(this.light.onState);
};

function Light() {
  this.onState = new LigthOnState(this);
  this.strongState = new LightStrongState(this);
  this.offState = new LightOffState(this);
  this.currentState = null;
  console.log("构建 light");
}

Light.prototype.setState = function (state) {
  this.currentState = state;
};

Light.prototype.connect = function (btn) {
  const _self = this;
  this.currentState = this.offState;
  btn.click = function () {
    _self.currentState.handleButtonClick();
  };
  console.log(
    `light 与 btn 已建立关系，当前 light 状态为 ${this.currentState.state}`
  );
};

function Button() {
  console.log("构建 btn");
}

Button.prototype.click = function () {
  throw new Error("click 必须被实现！");
};

const light = new Light();
const btn = new Button();

light.connect(btn);

btn.click(); // 开灯
btn.click(); // 强光灯
btn.click(); // 关灯
