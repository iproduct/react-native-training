
export const incrementAsyncService = (value: number, amount: number): Promise<number> => {
    const promise = new Promise<number>((resolve,reject) =>{
        setTimeout(() => {
            const result = value + amount;
            console.log(`In incrementAsyncService: ${result}`)
            resolve(result);
        }, 2000);
    });
    return promise;
}
