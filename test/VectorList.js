var p5 = require('../src/VectorList');
var Chai = require('chai');
var expect = Chai.expect;
var assert = Chai.assert;

describe('p5.VectorList', function() {
    var vl;
    beforeEach(function() {
        vl = new p5.VectorList();
    });
    it('should add vectors with constructor as separated arguments', function() {
        vl = new p5.VectorList({x: 5, y: 0}, {x: -1, y: -3});
        assert.lengthOf(vl.array, 2);
    });
    it('should add vectors with constructor as array', function() {
        vl = new p5.VectorList([{x: 5, y: 0}, {x: -1, y: -3}]);
        assert.lengthOf(vl.array, 2);
    });
    it('should add(vector), get(index), getAll()', function() {
        var vector1 = {x: 0, y: 5};
        var vector2 = {x: -3, y: 2};
        vl.add(vector1);
        assert.equal(vl.get(0), vector1);
        vl.add(vector2);
        assert.lengthOf(vl.getAll(), 2);
    });
    it('should add multiple vectors at once as separated arguments', function() {
        var vector1 = {x: 1, y: 9};
        var vector2 = {x: -3, y: 7};
        var vector3 = {x: 8, y: -5};

        vl.add(vector1, vector2, vector3);
        assert.lengthOf(vl.array, 3);
    });
    it('should add multiple vectors at once as array', function() {
        var vector1 = {x: 1, y: 9};
        var vector2 = {x: -3, y: 7};
        var vector3 = {x: 8, y: -5};

        vl.add([vector1, vector2, vector3]);
        assert.lengthOf(vl.array, 3);
    });
    it('should add, remove and splice the vectors from list', function() {
        var vector1 = {x: 3, y: -1};
        var vector2 = {x: 1, y: 2};
        var vector3 = {x: 2, y: -3};

        vl.add(vector1, vector2, vector3);
        assert.lengthOf(vl.array, 3);
        vl.remove(vector3);
        assert.lengthOf(vl.array, 2);
        vl.splice(-1, 1);
        assert.lengthOf(vl.array, 1);     
    })
    it('should chain add vectors', function() {
        var position = {x: 4, y: 5};
        var velocity = {x: 2, y: 1};
        var acceleration = {x: 1, y: -1};
        vl.add(position, velocity, acceleration);
        vl.chainAdd();
        assert.equal(vl.array[0].x, 6);
        assert.equal(vl.array[0].y, 6);

        assert.equal(vl.array[1].x, 3);
        assert.equal(vl.array[1].y, 0);

        assert.equal(vl.array[2].x, 1);
        assert.equal(vl.array[2].y, -1);
    });
    it('should take the average of vectors', function() {
        var v1 = {x: 2, y: 4};
        var v2 = {x: 4, y: 2};
        vl.add(v1, v2);
        var average = vl.average();
        assert.equal(average.x, 3);
        assert.equal(average.y, 3);
    });
    it('should take geometric mean', function() {
        var v1 = {x: 2, y: 3};
        var v2 = {x: -1, y: 2};
        vl.add(v1, v2);
        var mean = vl.geometricMean();
        assert.closeTo(mean.x, 1.4142, 0.001);
        assert.closeTo(mean.y, 2.4494, 0.001);
        assert.equal(mean.z, 0);
    });
    it('should find a middle', function() {
        var v1 = {x: 2, y: 3};
        var v2 = {x: -1, y: 2};
        var v3 = {x: 2, y: 4};
        var v4 = {x: 4, y: 2};
        vl.add(v1, v2, v3, v4);
        var mid = vl.findMiddle();
        assert.deepEqual(mid, v1);
    });
    it('should find a leftest point', function() {
        var v1 = {x: 2, y: 3};
        var v2 = {x: -1, y: 2};
        var v3 = {x: 2, y: 4};
        var v4 = {x: 4, y: 2};
        vl.add(v1, v2, v3, v4);
        var l = vl.findLeftest();
        assert.equal(l.x, v2.x);
        assert.equal(l.y, v2.y);
    });
    it('should find a rightest point', function() {
        var v1 = {x: 2, y: 3};
        var v2 = {x: -1, y: 2};
        var v3 = {x: 2, y: 4};
        var v4 = {x: 4, y: 2};
        vl.add(v1, v2, v3, v4);
        var r = vl.findRightest();
        assert.equal(r.x, v4.x);
        assert.equal(r.y, v4.y);
    });
    it('should find a highest point', function() {
        var v1 = {x: 2, y: 3};
        var v2 = {x: -1, y: 2};
        var v3 = {x: 2, y: 4};
        var v4 = {x: 4, y: 2};
        vl.add(v1, v2, v3, v4);
        var t = vl.findHighest();
        assert.equal(t.x, v2.x);
        assert.equal(t.y, v2.y);
    });
    it('should find a lowest point', function() {
        var v1 = {x: 2, y: 3};
        var v2 = {x: -1, y: 2};
        var v3 = {x: 2, y: 4};
        var v4 = {x: 4, y: 2};
        vl.add(v1, v2, v3, v4);
        var l = vl.findLowest();
        assert.equal(l.x, v3.x);
        assert.equal(l.y, v3.y);
    });
    it('should find a longest point', function() {
        var v1 = {x: 2, y: 3};
        var v2 = {x: -1, y: 2};
        var v3 = {x: 2, y: 4};
        var v4 = {x: 7, y: 2};
        vl.add(v1, v2, v3, v4);
        var l = vl.findLongest();
        assert.equal(l.x, v4.x);
        assert.equal(l.y, v4.y);
    });
    it('should find a shortest point', function() {
        var v1 = {x: 2, y: 3};
        var v2 = {x: -1, y: 2};
        var v3 = {x: 2, y: 4};
        var v4 = {x: 7, y: 2};
        vl.add(v1, v2, v3, v4);
        var l = vl.findShortest();
        assert.equal(l.x, v2.x);
        assert.equal(l.y, v2.y);
    });
    it('should rotate in 2D when given center vector', function() {
        var v1 = {x: 2, y: 3};
        var v2 = {x: -1, y: 2};
        vl.add(v1, v2);
        vl.rotate2D(Math.PI/3, {x: 3, y: 3});
        assert.closeTo(v1.x, 0.5, 0.001);
        assert.closeTo(v1.y, 0.8660, 0.001);
        assert.closeTo(v2.x, 2.06155, 0.001);
        assert.closeTo(v2.y, 3.5707, 0.001);
    });
    it('should rotate in 2D when given centerX and centerY', function() {
        var v1 = {x: 2, y: 3};
        var v2 = {x: -1, y: 2};
        vl.add(v1, v2);
        vl.rotate2D(Math.PI/3, 3, 3);
        assert.closeTo(v1.x, 0.5, 0.001);
        assert.closeTo(v1.y, 0.8660, 0.001);
        assert.closeTo(v2.x, 2.06155, 0.001);
        assert.closeTo(v2.y, 3.5707, 0.001);
    });
    it('should rotate in 2D when given no center', function() {
        var v1 = {x: 2, y: 3};
        var v2 = {x: -1, y: 2};
        vl.add(v1, v2);
        vl.rotate2D(Math.PI/3);
        assert.closeTo(v1.x, 1.8027, 0.001);
        assert.closeTo(v1.y, 3.1224, 0.001);
        assert.closeTo(v2.x, 1.1180, 0.001);
        assert.closeTo(v2.y, 1.9364, 0.001);
    });
    it('should rotate in 3D when given center vector', function() {
        var v1 = {x: 2, y: 3, z: 1};
        var v2 = {x: -1, y: 2, z: 4};
        vl.add(v1, v2);
        vl.rotate(Math.PI/3, Math.PI/4, {x: 2, y: 2, z: 1});
        assert.closeTo(v1.x, 0.3535, 0.001);
        assert.closeTo(v1.y, 0.6123, 0.001);
        assert.closeTo(v1.z, 0.7071, 0.001);
        assert.closeTo(v2.x, 1.5, 0.001);
        assert.closeTo(v2.y, 2.5980, 0.001);
        assert.closeTo(v2.z, 3, 0.001);
    });
    it('should rotate in 3D when given centerX, centerY and centerZ', function() {
        var v1 = {x: 2, y: 3, z: 1};
        var v2 = {x: -1, y: 2, z: 4};
        vl.add(v1, v2);
        vl.rotate(Math.PI/3, Math.PI/4, 2, 2, 1);
        assert.closeTo(v1.x, 0.3535, 0.001);
        assert.closeTo(v1.y, 0.6123, 0.001);
        assert.closeTo(v1.z, 0.7071, 0.001);
        assert.closeTo(v2.x, 1.5, 0.001);
        assert.closeTo(v2.y, 2.5980, 0.001);
        assert.closeTo(v2.z, 3, 0.001);
    });
    it('should rotate in 3D when given no center', function() {
        var v1 = {x: 2, y: 3, z: 1};
        var v2 = {x: -1, y: 2, z: 4};
        vl.add(v1, v2);
        vl.rotate(Math.PI/3, Math.PI/4);
        assert.closeTo(v1.x, 1.3228, 0.001);
        assert.closeTo(v1.y, 2.2912, 0.001);
        assert.closeTo(v1.z, 2.6457, 0.001);
        assert.closeTo(v2.x, 1.6201, 0.001);
        assert.closeTo(v2.y, 2.8062, 0.001);
        assert.closeTo(v2.z, 3.2403, 0.001);
    });
});