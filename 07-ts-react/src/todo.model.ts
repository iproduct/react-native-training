export enum TodoStatus {
    Active = 1, Completed, Canceled
}

export class Todo {
    static nextId = 0;
    id = ++Todo.nextId;
    constructor(
        public text: string,
        public deadline = new Date().toDateString(),
        public status = TodoStatus.Active,
    ) {}
}