start(); // without this, phantomjs-1.5.0 may be timed out.
module("Function");

test("Function.prototype.method should be function", function() {
    strictEqual(typeof Function.prototype.method, "function");
});
