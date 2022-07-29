const LIMIT = 10;

const asyncIterable = {
    [Symbol.asyncIterator]() {
        let i = 0;
        return {
            next() {
                const done = i >= LIMIT;
                const value = done ? undefined : i++;
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1000, {value, done})
                });
            },
            return() {
                // thismethod is called if the consumer calles 'break' or 'return' early in the loop
                console.log('Interrupted prematurely');
                return {done: true};
            }
        }
    }
};

(async () => {
    try {
        for await (const num of asyncIterable) {
            console.log(num);
            if(num === 3) break;
        }
    } catch (err) {
        console.log('Catched ERROR: ', err);
    }
})();   // IIFE