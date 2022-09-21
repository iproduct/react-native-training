import { Todo, TodoStatus } from "./todo.model";

export type IdType = number

export type Identifiable<K> = { id: K }


export type FormFieldDict<Value> = {
  [field: string]: Value
};

export type Optional<V> = V | undefined

export interface TodoListener {
  (todo: Todo): void;
}

export type FilterType = TodoStatus | undefined;

export interface FilterChangeListener {
  (filter: FilterType): void;
}
