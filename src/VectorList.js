(function(root, factory) {
    try {
        if (typeof define === 'function' && define.amd)
            define('p5.play', ['p5'], function(p5) { (factory(p5)); });
        else if (typeof exports === 'object')
            factory(require('../p5'));
        else
            factory(root.p5);
    } catch(e) {
        var p5 = {};
        factory(p5);
        if (typeof exports === 'object') {
            module.exports = p5;
        }
    }
}(this, function(p5) {

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

/**
 * Adds a vectors to each other like chain.
 * vector[ i ].add( vector[ i + 1 ] )
 * @example
 * var position = new p5.Vector();
 * var velocity = new p5.Vector();
 * var acceleration = new p5.Vector();
 * var list = new p5.VectorList(position, velocity, acceleration);
 * function draw() {
 *  list.chainAdd();
 * }
 */
p5.VectorList.prototype.chainAdd = function() {
    for ( var i = 0; i < this.array.length - 1; i++ ) {
        add(this.array[i], this.array[i + 1]);
    }
}

/**
 * Returns the average position of vectors
 * @return {p5.Vector} 
 */
p5.VectorList.prototype.average = function() {
    var v = {
        x: this.array.reduce(
        function(sum, item) {
            return sum + item.x;
        }, 0)/this.array.length,
        y: this.array.reduce(
            function(sum, item) {
                return sum + item.y;
            }, 0)/this.array.length,
        z: this.array.reduce(
            function(sum, item) {
                return sum + item.z;
            }, 0
        )/this.array.length,
    };
    if(typeof p5.Vector !== 'undefined') {
        return new p5.Vector(v.x, v.y, v.z);
    }
    else {
        return v;
    }
};

/**
 * Calculates the geometric mean of vectors
 * @return {p5.Vector} - new p5.Vector
 */
p5.VectorList.prototype.geometricMean = function() {
    var v = {
        x: Math.pow(this.array.reduce(
            function(mul, item) {
                return mul*Math.abs(item.x);
            }, 1), 1/this.array.length),
        y: Math.pow(this.array.reduce(
            function(mul, item) {
                return mul*Math.abs(item.y);
            }, 1), 1/this.array.length),
        z: Math.pow(this.array.reduce(
            function(mul, item) {
                return Math.abs(mul*item.z);
            }, 1), 1/this.array.length)
    };
    if(typeof p5.Vector !== 'undefined') {
        return new p5.Vector(v.x, v.y, v.z);
    }
    else {
        return v;
    }
};

p5.VectorList.prototype.findMiddle = function() {
    var avg = this.average();
    var minVec = null;
    var minDist = Infinity;
    for ( var i = 0; i < this.array.length; i++ ) {
        var d = Math.sqrt(Math.pow(avg.x - this.array[i].x, 2) +
                Math.pow(avg.y - this.array[i].y, 2) +
                Math.pow(avg.z - this.array[i].z, 2));
        if( d < minDist ) {
            minDist = d;
            minVec = this.array[i];
        }
    }
    return minVec;
};

function add(v1, v2) {
    v1.x += v2.x;
    v1.y += v2.y;
    v1.z += v2.z;
}


}));
