function foo(x, y) {
    console.log(x, y)
    for (arg of arguments) {
        console.log(arg)
    }
    // const arr = arguments.slice();
    // const arr = Array.prototype.slice.apply(arguments);
    // var arr = Array.prototype.slice.call(arguments);
    var arr = Array.prototype.slice.bind(arguments)();
    // var arr = Array.from(arguments);
    // var arr = [...arguments];
    // arguments[Symbol.isConcatSpreadable] = true;
    // var arr = [].concat(arguments);
    const sum = arr.reduce(function (acc, elem) { return acc + '|' + elem }, '');
    console.log('Sum = ', sum);
}

foo(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
