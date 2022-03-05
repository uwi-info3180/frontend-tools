const test = 'testing';

const testing = () => {
  const randomValue = Math.random();
  return test + randomValue;
};

testing();

class Hello {
  constructor() {
    this.myVar = 'Hello';
  }

  sayHello() {
    return this.myVar;
  }
}

const myClass = Hello();
myClass.sayHello();
