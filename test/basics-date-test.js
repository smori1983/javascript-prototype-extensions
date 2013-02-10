start(); // without this, phantomjs-1.5.0 may be timed out.
module("Date");

test("format - %Y", function() {
    strictEqual(new Date(2013, 1, 2).format("%Y"), "2013");
});

test("format - %y", function() {
    strictEqual(new Date(2013, 1, 2).format("%y"), "13");
    strictEqual(new Date(1999, 1, 2).format("%y"), "99");
});

test("format - %m", function() {
    strictEqual(new Date(2013, 0, 1).format("%m"), "01");
    strictEqual(new Date(2013, 11, 1).format("%m"), "12");
});

test("format - %d", function() {
    strictEqual(new Date(2013, 1, 1).format("%d"), "01");
    strictEqual(new Date(2013, 1, 20).format("%d"), "20");
});

test("format - %H", function() {
    strictEqual(new Date(2013, 0, 1, 2, 23, 34).format("%H"), "02");
    strictEqual(new Date(2013, 0, 1, 12, 23, 34).format("%H"), "12");
});

test("format - %i", function() {
    strictEqual(new Date(2013, 10, 1, 12, 1, 22).format("%i"), "01");
    strictEqual(new Date(2013, 10, 1, 12, 31, 22).format("%i"), "31");
});

test("format - %s", function() {
    strictEqual(new Date(2013, 10, 1, 12, 11, 1).format("%s"), "01");
    strictEqual(new Date(2013, 10, 1, 12, 11, 22).format("%s"), "22");
});

test("format - %w", function() {
    // Sunday
    strictEqual(new Date(2013, 1, 10).format("%w"), "0");
    // Saturday
    strictEqual(new Date(2013, 1, 9).format("%w"), "6");
});

test("add", function() {
    var date, added;

    // 2012-05-31 00:00:00
    date  = new Date(2012, 4, 31, 0, 0, 0, 0);
    added = date.add({
        day: 1,
        hour: -1,
        minute: 10,
        second: 20
    });
    strictEqual(added.format("%Y-%m-%d %H:%i:%s"), "2012-05-31 23:10:20");
});

test("add - leap year", function() {
    var date  = new Date(2012, 1, 28);
    var added = date.add({ day: 1 });

    strictEqual(added.format("%Y-%m-%d"), "2012-02-29");
});

test("add - non leap year", function() {
    var date  = new Date(2011, 1, 28);
    var added = date.add({ day: 1 });

    strictEqual(added.format("%Y-%m-%d"), "2011-03-01");
});



