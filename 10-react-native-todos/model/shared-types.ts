import { FilterType } from "../TodoApp";
import { Todo } from "./todo.model";

export type IdType = number | undefined

export type Identifiable<K> = {id: K }


export type FormFieldDict<Value> = {
    [field: string]: Value
};

export type Optional<V> = V | undefined

export interface TodoListener {
    (todo: Todo): void;
  }
  
  export interface FilterChangeListener {
    (filter: FilterType): void;
  }
  