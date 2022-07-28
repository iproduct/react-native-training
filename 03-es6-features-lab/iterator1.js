const myIterable = (from = 0, to = 10, step = 1) => ({
    [Symbol.iterator]() {
        let i = from - step;
        return {
            next() {
                i += step;
                return {
                    value: i,
                    done: i >= to
                }
            }
        }
    }
})

for (const e of myIterable()) {
    console.log(e);
}

for (const e of myIterable(10, 100, 10)) {
    console.log(e);
} 
