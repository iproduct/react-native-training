// 'use strict'
var o = {
    name: 'My Object',
    log: function(message){
        console.log(this.name);
        var internal = function() {
            console.log(message + ": '" + this.name + "'")
        }
        internal();
    }
}

o.log('Test message');