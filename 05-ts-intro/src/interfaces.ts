// type Point = {
//     x: number;
//     y: number;
//     z?: number
// };
export interface Point {
    x: number;
    y: number;
    z?: number;
    format(): string;
}

export class PointImpl implements Point{
    constructor(
        public x: number,
        public y: number,
        public z: number = 0) {}
    format(): string {
        return `[${this.x}, ${this.y}, ${this.z}]`;
    }
}

interface PointDict {
    [key: string]: number
}

// Exactly the same as the earlier example
function printCoord(pt: Point) {
    for (const key in pt) {
        console.log(`The coordinate's ${key} value is ${(pt as unknown as PointDict)[key]}`);
    }
}

printCoord(new PointImpl(100, 100, 42));

type StringOrBoolean = string[] | boolean
type AnyArray = any[]

type ResulType = StringOrBoolean & AnyArray

const myarr: ResulType = ['{a: 1}']

console.log(myarr)
interface Counter {
    counter: 0 | 1
}
const obj: Counter = { counter: 1 };
obj.counter = 0;

const req = { url: "https://example.com", method: "GET" } //as const;
handleRequest(req.url, req.method as "GET");

function handleRequest(url: string, method: "GET" | "POST") {
    return console.log(url + method);
}
