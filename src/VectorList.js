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
 * Removes the vector from the VectorList.
 * @param {p5.Vector} item - vector to be removed
 */
p5.VectorList.prototype.remove = function(item) {
    var index = this.array.indexOf(item);
    if(index > -1) {
        this.splice(index, 1);
    }
    else {
        throw new Error("Vector not found in list.");
    }
};

/**
 * Splices the item out of VectorList.
 * @param {Number} index - if negative then found from the end
 */
p5.VectorList.prototype.splice = function(index, n) {
    if(index < 0 && this.array.length + index > 0) {
        this.array.splice(this.array.length + index, n);
    }
    else if(index > 0 && index < this.array.length) {
        this.array.splice(index, n);
    }
    else {
        throw new Error("Invalid index (out of bounds).");
    }
}

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


/**
 * Finds a middle vector and returns it
 * @return {p5.Vector} - the original vector
 */
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


/**
 * Returns the vector which is located most left.
 * @return {p5.Vector} - the most left vector
 */
p5.VectorList.prototype.findLeftest = function() {
    var minX = Infinity;
    var minVec = null;
    for ( var i = 0; i < this.array.length; i++ ) {
        if(this.array[i].x < minX) {
            minVec = this.array[i];
            minX = this.array[i].x;
        }
    }
    return minVec;
};


/**
 * Returns the vector which is located most right.
 * @return {p5.Vector} - the most right vector
 */
p5.VectorList.prototype.findRightest = function() {
    var maxX = -Infinity;
    var maxVec = null;
    for ( var i = 0; i < this.array.length; i++ ) {
        if(this.array[i].x > maxX) {
            maxVec = this.array[i];
            maxX = this.array[i].x;
        }
    }
    return maxVec;
};


/**
 * Returns the vector which is located most top.
 * @return {p5.Vector} - the most top vector
 */
p5.VectorList.prototype.findHighest = function() {
    var minY = Infinity;
    var minVec = null;
    for ( var i = 0; i < this.array.length; i++ ) {
        if(this.array[i].y < minY) {
            minVec = this.array[i];
            minY = this.array[i].y;
        }
    }
    return minVec;
};

/**
 * Returns the vector which is located most bottom.
 * @return {p5.Vector} - the most bottom vector
 */
p5.VectorList.prototype.findLowest = function() {
    var maxY = -Infinity;
    var maxVec = null;
    for ( var i = 0; i < this.array.length; i++ ) {
        if(this.array[i].y > maxY) {
            maxVec = this.array[i];
            maxY = this.array[i].y;
        }
    }
    return maxVec;
};

/**
 * Returns the vector which is the longest.
 * @return {p5.Vector} - the most bottom vector
 */
p5.VectorList.prototype.findLongest = function() {
    var maxLong = -Infinity;
    var maxVec = null;
    for ( var i = 0; i < this.array.length; i++ ) {
        var long = Math.sqrt(Math.pow(this.array[i].x, 2) +
                             Math.pow(this.array[i].y, 2) +
                             Math.pow(this.array[i].x, 2));
        if(long > maxLong) {
            maxVec = this.array[i];
            maxLong = long;
        }
    }
    return maxVec;
};

/**
 * Returns the vector which is the shortest.
 * @return {p5.Vector} - the most bottom vector
 */
p5.VectorList.prototype.findShortest = function() {
    var minLong = Infinity;
    var minVec = null;
    for ( var i = 0; i < this.array.length; i++ ) {
        var long = Math.sqrt(Math.pow(this.array[i].x, 2) +
                             Math.pow(this.array[i].y, 2) +
                             Math.pow(this.array[i].z, 2));
        if(long < minLong) {
            minVec = this.array[i];
            minLong = long;
        }
    }
    return minVec;
};

/**
 * Rotates all Vectors in the list by angle
 * @param {number} angle - angle which the rotation is applied (in radians)
 * @param {object|number} centerX - either object containing x and y or x coordinate of center of the rotation
 * @param {undefined|number} centerY - y coordinate of center of the rotation
 */
p5.VectorList.prototype.rotate2D = function(angle, centerX, centerY) {
    var center = {};
    if ( typeof centerX === 'object' && centerX.hasOwnProperty('x') && centerX.hasOwnProperty('y') ) {
        center.x = centerX.x;
        center.y = centerX.y;
    }
    else if ( typeof centerX === 'undefined' && typeof centerY === 'undefined' ) {
        center.x = 0;
        center.y = 0;
    }
    else {
        center.x = centerX;
        center.y = centerY;
    }

    var sinAngle = Math.sin(angle);
    var cosAngle = Math.cos(angle);

    for( var i = 0; i < this.array.length; i++ ) {
        var r = Math.sqrt(Math.pow(this.array[i].x - center.x, 2) + Math.pow(this.array[i].y - center.y, 2));
        this.array[i].x = r * cosAngle;
        this.array[i].y = r * sinAngle;
    }
};
/**
 * Rotates all Vectors in the list by angle in 3D
 * @param {number} phi - angle which the rotation is applied of XY plane (in radians)
 * @param {number} theta - angle which the rotation is applied of Z axis (in radians)
 * @param {object|number} centerX - either object containing x, y and z or x coordinate of center of the rotation
 * @param {undefined|number} centerY - y coordinate of center of the rotation
 * @param {undefined|number} centerZ - z coordinate of center of the rotation
 */
p5.VectorList.prototype.rotate = function(phi, theta, centerX, centerY, centerZ) {
    var center = {};
    if ( typeof centerX === 'object' && centerX.hasOwnProperty('x') && centerX.hasOwnProperty('y') && centerX.hasOwnProperty('z') ) {
        center.x = centerX.x;
        center.y = centerX.y;
        center.z = centerX.z;
    }
    else if ( typeof centerX === 'undefined' && typeof centerY === 'undefined' ) {
        center.x = 0;
        center.y = 0;
        center.z = 0;
    }
    else {
        center.x = centerX;
        center.y = centerY;
        center.z = centerZ;
    }

    var sinPhi = Math.sin(phi);
    var cosPhi = Math.cos(phi);
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);

    for( var i = 0; i < this.array.length; i++ ) {
        var r = Math.sqrt(Math.pow(this.array[i].x - center.x, 2) +
                            Math.pow(this.array[i].y - center.y, 2) +
                            Math.pow(this.array[i].z - center.z, 2));
        this.array[i].x = r * cosPhi * sinTheta;
        this.array[i].y = r * sinPhi * sinTheta;
        this.array[i].z = r * cosTheta;
    }
};


function add(v1, v2) {
    v1.x += v2.x;
    v1.y += v2.y;
    v1.z += v2.z;
}


}));
