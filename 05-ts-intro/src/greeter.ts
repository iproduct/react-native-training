function greeter(name = 'Anonimous', date: Date = new Date()): string {
    return `Hello ${name} from TypeScript on ${date.toDateString()}!`;
}

// document.getElementById('results')!.innerHTML = greeter('Trayan', new Date('1995-12-17T03:24:00'));

const elem = document.getElementById('results');
if (elem !== null) {
    elem.innerHTML = greeter('Trayan');
}

function printId(id: number | string) {
    if (typeof id === "string") {
        console.log("Your ID is: " + id.toUpperCase());
    } else {
        console.log("Your ID is: " + ++id);
    }
}

printId(42)
printId("abcdefgh12345")
// printId({ myID: 22342 })

function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
        // Here: 'x' is 'string[]'
        console.log("Hello, " + x.join(" and "));
    } else {
        // Here: 'x' is 'string'
        console.log("Welcome lone traveler " + x);
    }
}

welcomePeople(['Dimitar', 'Ivan', 'Hristo']);
welcomePeople('John Smith');

function logValue(x: Date | string) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    } else {
        console.log(x.toUpperCase());
    }
}

logValue(new Date('1995-12-17T03:24:00'));
logValue('Trayan');

type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
  return animal.fly();
}

let x = Math.random() < 0.5 ? 10 : "hello world!";
x = 1;
console.log(x);
x = "goodbye!";
console.log(x);

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

// Both calls to 'swim' and 'fly' are now okay.
function getSmallPet() {
    return  Math.random() < 0.5 ? { swim() { return } } as Fish: { fly() { return } } as Bird
}
const pet = getSmallPet();
 
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

//   interface Shape {
//     kind: "circle" | "square";
//     radius?: number;
//     sideLength?: number;
//   }

  interface Circle {
    kind: "circle";
    radius: number;
  }
   
  interface Square {
    kind: "square";
    sideLength: number;
  }
   
  type Shape = Circle | Square;

  function getArea(shape: Shape) {
    if (shape.kind === "circle") {
      return Math.PI * shape.radius ** 2;
    } 
    return shape.sideLength ** 2;
  }