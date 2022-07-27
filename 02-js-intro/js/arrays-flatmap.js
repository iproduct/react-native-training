const arr = [1, 2, 3, 4, 5];

const result = arr.flatMap((x) => [x, x * x]);
console.log(result);

// is equivalent to
// const n = arr.length;
// const acc = new Array(n * 2);
// for (let i = 0; i < n; i++){
//   const x = arr[i];
//   acc[i * 2] = x;
//   acc[i * 2 + 1] = x * 2;
// }