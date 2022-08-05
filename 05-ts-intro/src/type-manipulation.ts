import { Post } from "./posts";

function f() {
    return { x: 10, y: 3 };
}

type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

type P = MyReturnType<typeof f>;


// conditional typing
interface IdLabel {
    id: number /* some fields */;
}
interface NameLabel {
    name: string /* other fields */;
}

// function createLabel(id: number): IdLabel;
// function createLabel(name: string): NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel {
//   throw "unimplemented";
// }

type NameOrId<T extends number | string> = T extends number
    ? IdLabel
    : NameLabel;

function createLabel<T extends number | string>(nameOrId: T): NameOrId<T> {
    throw "unimplemented";
}

const a = createLabel("typescript");

const b = createLabel(2.8);

const c = createLabel(Math.random() ? "hello" : 42);

// extends constraint
// type MessageOf<T extends { message: unknown }> = T["message"];
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Sms {
    message: string;
}

type SmsMessageContents = MessageOf<Sms>;

interface Email {
    message: string[];
}

type EmailMessageContents = MessageOf<Email>;

type DateMessageContents = MessageOf<Date>;


// array
type Flatten<T> = T extends any[] ? T[number] : T;

// Extracts out the element type.
type Str = Flatten<string[]>;

// Leaves the type alone.
type Num = Flatten<number>;
type PostArrType = Flatten<Post[]>;
type PostType = Flatten<Post>;


// infer

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
    ? Return
    : never;

type Num2 = GetReturnType<() => number>;

type Str2 = GetReturnType<(x: string) => string>;

type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;

type NoFunction = GetReturnType<{ a: boolean, b: boolean }>;


// distributive conditional types
type ToArray<T> = T extends any ? T[] : never;

type StrArrOrNumArr = ToArray<string | number | Post>;

type ToArray2<T> = [T] extends [any] ? T[] : never;

type StrArrOrNumArr2 = ToArray2<string | number | Post>;

// mapped types
type ValidationOptions<T> = {
    [P in keyof T as `valid${Capitalize<string & P>}`]: boolean;
};

type PostValidationOptions = ValidationOptions<Post>

// template literal types

const person = makeWatchedObject({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26,
    active: true
  });
   
  // makeWatchedObject has added `on` to the anonymous Object
   
  person.on("firstNameChanged", (newValue: string) => {
    console.log(`firstName was changed to ${newValue}!`);
  });
  person.on("lastNameChanged", (newValue: string) => {
    console.log(`firstName was changed to ${newValue}!`);
  });
  person.on("ageChanged", (newValue: number) => {
    console.log(`firstName was changed to ${newValue}!`);
  });
  person.on("activeChanged", (newValue: boolean) => {
    console.log(`firstName was changed to ${newValue}!`);
  });


  type PropEventSource<Type> = {
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void ): void;
};
 
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;