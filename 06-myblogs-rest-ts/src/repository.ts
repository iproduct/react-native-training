type Identifiable<K> = {id: K }

export interface Repository<K, V extends Identifiable<K>> {
    findAll(): V[];
    findById(id: K): V | undefined;
    create(entity: V): V;
    update(entity: V): V | undefined;
    deleteById(id: K): V | undefined;
    count(): number;
}

interface IdGenerator<K> {
    getNextId(): K;
}

export class NumberIdGenerator implements IdGenerator<number> {
    private nextId = 0;

    getNextId(): number {
        return ++ this.nextId;
    }
}

export class RepositoryInMemoryImpl<K, V extends Identifiable<K>> implements Repository<K, V> {
    private entities = new Map<K,V>();

    constructor(private idGenerator: IdGenerator<K>) {} // DI
    
    findAll(): V[] {
        return Array.from(this.entities.values());
    }
    findById(id: K): V | undefined {
        return this.entities.get(id);
    }
    create(entity: V): V {
        entity.id = this.idGenerator.getNextId();
        this.entities.set(entity.id, entity);
        return entity;
    }
    update(entity: V): V | undefined {
        if(!this.findById(entity.id)) {
            return undefined;
        }
        
        this.entities.set(entity.id, entity);
        return entity;
    }
    deleteById(id: K): V | undefined {
        const old = this.findById(id);
        if(old) {
            this.entities.delete(id);
        }
        return old;
    }
    count(): number {
        return this.entities.size;
    }

}