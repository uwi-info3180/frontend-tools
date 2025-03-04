// TypeScript example
(() => {
  const message: string = 'Hello World';
  console.log(message);

  function greet(person: string, age: number) {
    console.log(`Hello ${person}, you are ${age}!`);
  }

  greet("Brendan", 24);

  interface Point {
    x: number;
    y: number;
  }

  function printPoint(p: Point) {
      console.log(`(${p.x}, ${p.y})`);
  }

  printPoint({ x: 10, y: 20 });
})();
