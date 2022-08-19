export type IdType = number | undefined

export type Identifiable<K> = { id: K }


export type FormFieldDict<Value> = {
    [field: string]: Value
};

export type Optional<V> = V | undefined

export type Partial<V> = {
    [P in keyof V]?: V[P];
};

export type Concrete<V> = {
    [P in keyof V]-?: V[P];
};

export type Mutable<V> = {
    -readonly [P in keyof V]: V[P];
};

export type Immutable<V> = {
    readonly [P in keyof V]: V[P];
};
