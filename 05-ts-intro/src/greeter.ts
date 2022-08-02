function greeter(name: string): string {
    return `Hello ${name} from TypeScript!`;
}

// document.getElementById('results')!.innerHTML = greeter('Trayan');

const elem = document.getElementById('results');
if (elem != null) {
    elem.innerHTML = greeter('Trayan');
}