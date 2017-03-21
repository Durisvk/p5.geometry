if(typeof p5 === 'undefined') {
    var p5 = {};
}

/**
 * Represents a structure that will hold the p5.Vector array.
 * @param {...p5.Vector} v - the objects containing x and y properties.
 */
p5.VectorList = function() {
    this.array = [];
    var args = [].slice.call(arguments);
    var array = [];

    if(args.length === 1 && args[0] instanceof Array) {
        array = args[0];
    }
    else {
        array = args;
    }

    for( var i = 0; i < array.length; i++ ) {
        if( array[i].hasOwnProperty('x') && array[i].hasOwnProperty('y') ) {
            if( !array[i].hasOwnProperty('z') ) {
                array[i].z = 0;
            }
            this.array.push(array[i]);
        }
        else {
            throw new Error('Invalid vector added to VectorList (should contain x and y properties).');
        }
    }
};

/**
 * Adds a vectors to the VectorList.
 * @param {...p5.Vector} v - the object containing x and y properties.
 */
p5.VectorList.prototype.add = function() {
    var args = [].slice.call(arguments);
    var array = [];
    if(args.length === 0) {
        throw new Error('No argument provided.');
    }
    else if(args.length === 1 && args[0] instanceof Array) {
        array = args[0];
    }
    else {
        array = args;
    }

    for( var i = 0; i < array.length; i++ ) {
        if( array[i].hasOwnProperty('x') && array[i].hasOwnProperty('y') ) {
            if( !array[i].hasOwnProperty('z') ) {
                array[i].z = 0;
            }
            this.array.push(array[i]);
        }
        else {
            throw new Error('Invalid vector added to VectorList (should contain x and y properties).');
        }
    }

};

/**
 * Gets the vector from VectorList starting from beginning at index if index is negative
 * it starts from the end of VectorList.
 * @param {number} index - Specifies the index, if negative, starting form the end of array
 * @return {p5.Vector}
 */
p5.VectorList.prototype.get = function(index) {
    if(index < 0 && this.array.length + index >= 0) {
        return this.array[this.array.length + index];
    }
    else if(index >= 0 && index < this.array.length) {
        return this.array[index];
    }
    else {
        throw new Error('Invalid index provided (out of bounds).');
    }
};

/**
 * Gets all of the vectors in vector list.
 * @return {p5.Vector[]}
 */
p5.VectorList.prototype.getAll = function() {
    return this.array;
};

p5.VectorList.prototype.chainAdd = function() {
    for ( var i = 0; i < this.array.length - 1; i++ ) {
        add(this.array[i], this.array[i + 1]);
    }
}


function add(v1, v2) {
    v1.x += v2.x;
    v1.y += v2.y;
    v1.z += v2.z;
}


module.exports = p5;