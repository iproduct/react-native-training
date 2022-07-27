const READER = 0;
const AUTHOR = 1;
const ADMIN = 2;

const Role = ['READER', 'AUTHOR', 'ADMIN'];

class Person {
    static nextId = 0;
    id = ++ Person.nextId;
    constructor(fName, lName, adress) {
        this.fName = fName;
        this.lName = lName;
        this.adress = adress;
    }
    toString() {
        return `ID: ${this.id}, Name: ${this.fName + ' ' + this.lName}, Address: ${this.adress}`;
    }
}

class User extends Person {
    constructor(fName, lName, adress, username, password, role = READER) {
        super(fName, lName, adress);
        this.username = username;
        this.password = password;
        this.role = role;
    }
    toString() { // overriding
        return `${super.toString()}, Username: ${this.username}, Password: ${this.password}, Role: ${Role[this.role]}`;
    }
}

const p1 = new Person('John', 'Doe', 'London');
const p2 = new Person('Jane', 'Doe', 'New York');
const u1 = new User('Ivan', 'Petrov', 'Sofia 1000', 'ivan', 'ivan123')
const u2 = new User('Hristina', 'Petrova', 'Sofia 1000', 'hrisi', 'hrisi123', ADMIN)
const u3 = new User('Georgi', 'Hristov', 'Plovdiv', 'gosho', 'gosho123', AUTHOR)
const persons = [p1, p2, u1, u2, u3];
persons.forEach(p => console.log(p.toString()))
