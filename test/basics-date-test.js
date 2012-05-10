start(); // without this, phantomjs-1.5.0 may be timed out.
module("Date");

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

    // 2011-02-28 (non-leap year)
    date  = new Date(2011, 1, 28);
    added = date.add({ day: 1 });
    strictEqual(added.format("%Y-%m-%d"), "2011-03-01");

    // 2012-02-28 (leap year)
    date  = new Date(2012, 1, 28);
    added = date.add({ day: 1 });
    strictEqual(added.format("%Y-%m-%d"), "2012-02-29");
});

test("format", function() {
    // 2012-05-06 01:02:03 (Sun)
    var date = new Date(2012, 4, 6, 1, 2, 3, 0);

    strictEqual(date.format("%Y-%m-%d %H:%i:%s"), "2012-05-06 01:02:03");
    strictEqual(date.format("%y-%m-%d %H:%i:%s"), "12-05-06 01:02:03");
});
