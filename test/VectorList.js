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
        expect(vl.array).to.have.lengthOf(2);
    });
    it('should add vectors with constructor as array', function() {
        vl = new p5.VectorList([{x: 5, y: 0}, {x: -1, y: -3}]);
        expect(vl.array).to.have.lengthOf(2);
    });
    it('should add(vector), get(index), getAll()', function() {
        var vector1 = {x: 0, y: 5};
        var vector2 = {x: -3, y: 2};
        vl.add(vector1);
        expect(vl.get(0)).to.equal(vector1);
        vl.add(vector2);
        expect(vl.getAll()).to.have.lengthOf(2);
    });
    it('should add multiple vectors at once as separated arguments', function() {
        var vector1 = {x: 1, y: 9};
        var vector2 = {x: -3, y: 7};
        var vector3 = {x: 8, y: -5};

        vl.add(vector1, vector2, vector3);
        expect(vl.array).to.have.lengthOf(3);
    });
    it('should add multiple vectors at once as array', function() {
        var vector1 = {x: 1, y: 9};
        var vector2 = {x: -3, y: 7};
        var vector3 = {x: 8, y: -5};

        vl.add([vector1, vector2, vector3]);
        expect(vl.array).to.have.lengthOf(3);
    });
    it('should chain add vectors', function() {
        var position = {x: 4, y: 5};
        var velocity = {x: 2, y: 1};
        var acceleration = {x: 1, y: -1};
        vl.add(position, velocity, acceleration);
        vl.chainAdd();
        expect(vl.array[0].x).to.equal(6);
        expect(vl.array[0].y).to.equal(6);

        expect(vl.array[1].x).to.equal(3);
        expect(vl.array[1].y).to.equal(0);

        expect(vl.array[2].x).to.equal(1);
        expect(vl.array[2].y).to.equal(-1);
    });
    it('should take the average of vectors', function() {
        var v1 = {x: 2, y: 4};
        var v2 = {x: 4, y: 2};
        vl.add(v1, v2);
        var average = vl.average();
        expect(average.x).to.equal(3);
        expect(average.y).to.equal(3);
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
});