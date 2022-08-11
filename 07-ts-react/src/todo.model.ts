export enum TodoStatus {
    Active, Completed, Canceled
}

export class Todo {
    static nextId = 0;
    id = ++Todo.nextId;
    constructor(
        public text: string,
        public status = TodoStatus.Active,
    ) {}
}