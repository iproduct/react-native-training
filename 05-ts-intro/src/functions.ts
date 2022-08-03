import { PointImpl } from "./interfaces.js";

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


function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] { // HOF
    return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
const results = map([new PointImpl(1, 2, 3), new PointImpl(4.5, 5, 6), new PointImpl(7, 8, 9),],
    p => p.format());

console.log(parsed)
console.log(results)

type Long = { length: number }

function longest<T extends Long>(a: T, b: T): T {
    if (a.length >= b.length) {
        return a;
    } else {
        return b;
    }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
console.log(longerArray)
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
console.log(longerString)
// Error! Numbers don't have a 'length' property
//   const notOK = longest(10, 100);


// function minimumLength<Type extends { length: number }>(
//     obj: Type,
//     minimum: number
// ): Type {
//     if (obj.length >= minimum) {
//         return obj;
//     } else {
//         return { length: minimum };
//     }
// }

function firstElement1<Type>(arr: Type[]): Type {
    return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
    return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);


function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
    return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
    arr: Type[],
    func: Func
): Type[] {
    return arr.filter(func);
}

// Callbacks
function myForEach(arr: any[], callback: (arg: any, index: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }
}

myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));

// function overloading
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    } else {
        return new Date(mOrTimestamp);
    }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3);

function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
    return x.length;
}

len(""); // OK
len([0]); // OK
// len(Math.random() > 0.5 ? "hello" : [0]);

const user = {
    id: 123,
    admin: false,
    becomeAdmin: function () {
        this.admin = true;
    },
};

class User {
    constructor(public username: string) { }
}

interface DB {
    filterUsers(filter: (this: User) => boolean): User[];
}

function getDB() {
    return ({
        users: [new User('john'), new User('jane'), new User('eliot')],
        filterUsers(filter: (this: User) => boolean): User[] {
            const results: User[] = [];
            for (const user of this.users) {
                if (filter.call(user)) {
                    results.push(user);
                }
            }
            return results;
        }
    });
}
const db = getDB();
const admins = db.filterUsers(function (this: User) {
    return this.username.startsWith('j');
});
console.log(admins)

function fail(msg: string): never {
    throw new Error(msg);
}

function fn(x: string | number) {
    if (typeof x === "string") {
        // do something
    } else if (typeof x === "number") {
        // do something else
    } else {
        x; // has type 'never'!
    }
}

// rest - spread
// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5] as const;
const angle = Math.atan2(...args);

// desructuring
function sum({ a, b, c }: { a: number; b: number; c: number }) {
    console.log(a + b + c);
}

sum({ a: 1, b: 2, c: 3 });

// functions asignability
type voidFunc = () => void;
 
const f1: voidFunc = () => {
  return true;
};
 
const f2: voidFunc = () => true;
 
const f3: voidFunc = function () {
  return true;
};

const v1 = f1();
 
const v2 = f2();
 
const v3 = f3();

console.log(v1, v2, v3);
