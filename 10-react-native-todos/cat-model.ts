export class Cat {
    static nextId = 0;
    id = ++Cat.nextId;
    constructor(
        public name: string,
        public pictureUrl = 'https://reactnative.dev/docs/assets/p_cat2.png',
    ) { }
}