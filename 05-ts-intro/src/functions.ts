type PrinterFunc = {
    (a: string): void;
    description: string;
}

interface PrinterFunc2 {
    (a: string): void;
    description: string;
}

function greeter(fn: PrinterFunc) { // HOF
    fn(`Hello, World - ${fn.description}`);
}
function goodbyer(fn: PrinterFunc) { // HOF
    fn(`Goodbye. Have a nice day! - ${fn.description}`);
}

function printToConsole(s: string) {
    console.log(s);
}
printToConsole.description = 'Prints data to console'

function printToHtml(s: string) {
    const elem = document.getElementById('results');
    if (elem !== null) {
        elem.innerHTML += s + '<br>';
    }
}
printToHtml.description = "Prints data to innerHTML of 'results' <div>"

greeter(printToConsole);
greeter(printToHtml);
goodbyer(printToConsole);
goodbyer(printToHtml);

class SomeObject {
    constructor(public name: string) { }
}

class SomeOtherObject {
    constructor(public name: string) { }
}

type SomeConstructor<T> = {
    new(s: string): T;
};
// type SomeOtherConstructor = {
//     new(s: string): SomeOtherObject;
// };

function factory(ctor: SomeConstructor<SomeObject | SomeOtherObject>) { //HOF
    return new ctor("hello");
}

console.log(factory(SomeObject));
console.log(factory(SomeOtherObject));

function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

console.log(firstElement(['abc', 'def'])!.toUpperCase())
console.log(firstElement([42, 123])!.toExponential())
console.log(firstElement([]))


function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

console.log(parsed)