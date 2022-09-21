let initialNumber = 1;

export const getSuggestion = () => {
    const promise = new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            initialNumber += 1;
            resolve(initialNumber);
        }, 500);
    });
    return promise;
}

export const getAnotherSuggestion = () => {
    const promise = new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            initialNumber += 1;
            resolve(initialNumber);
        }, 1500);
    });
    return promise;
}

