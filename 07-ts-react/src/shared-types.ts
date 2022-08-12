export type IdType = number | undefined

export type Identifiable<K> = {id: K }


export type FormFieldDict<Value> = {
    [field: string]: Value
};

export type Optional<V> = V | undefined