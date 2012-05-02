start();
module("Function");

test("Function.prototype.method should be function", function() {
    strictEqual(typeof Function.prototype.method, "function");
});
