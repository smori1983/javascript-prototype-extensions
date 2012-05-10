start(); // without this, phantomjs-1.5.0 may be timed out.
module("String");

test("compare", function() {
    ok("a".compare("a") === 0);
    ok("a".compare("b") < 0);
    ok("b".compare("a") > 0);

    ok("a".compare(null) === 0);
    ok("a".compare(true) === 0);
    ok("a".compare([]) === 0);
    ok("a".compare({}) === 0);
});

test("escapeBase64", function() {
    strictEqual("a+9/ZQ==".escapeBase64(), "a%289%2FZQ%3D%3D");
});

test("escapeHTML", function() {
    strictEqual("< > & \" '".escapeHTML(), "&lt; &gt; &amp; &quot; &#039;");
});

test("format", function() {
    strictEqual("%%s%%d".format("A", 10), "%s%d", '"%%s%%d".format("A", 10) === "%s%d"');
    strictEqual("%%%%%s".format("A"), "%%A", '"%%%%%s".format("A") === "%%A"');
    strictEqual("%s and %s".format("A", "B"), "A and B", '"%s and %s".format("A", "B") === "A and B"');
    strictEqual("[%2s][%2s]".format("A", "ABC"), "[ A][ABC]", '"[%2s][%2s]".format("A", "ABC") === "[ A][ABC]"');
    strictEqual("%d %d".format(10, 10.2), "10 10", '"%d %d".format(10, 10.2) === "10 10"');
    strictEqual("[%2d][%2d]".format(1, 100), "[ 1][100]", '"[%2d][%2d]".format(1, 100) === "[ 1][100]"');
    strictEqual("%02d %02d".format(1, 100), "01 100", '"%02d %02d".format(1, 100) === "01 100"');
});

test("isNumeric", function() {
    strictEqual("0.1".isNumeric(),      true, '"123".isNumeric() === true');
    strictEqual("+0.1".isNumeric(),     true, '"123".isNumeric() === true');
    strictEqual("-0.1".isNumeric(),     true, '"123".isNumeric() === true');
    strictEqual("123".isNumeric(),      true, '"123".isNumeric() === true');
    strictEqual("+123".isNumeric(),     true, '"+123".isNumeric() === true');
    strictEqual("-123".isNumeric(),     true, '"-123".isNumeric() === true');
    strictEqual("123kg".isNumeric(),    true, '"123kg".isNumeric() === true');
    strictEqual("+123kg".isNumeric(),   true, '"123kg".isNumeric() === true');
    strictEqual("-123kg".isNumeric(),   true, '"123kg".isNumeric() === true');
    strictEqual("123.4".isNumeric(),    true, '"123.4".isNumeric() === true');
    strictEqual("+123.4".isNumeric(),   true, '"+123.4".isNumeric() === true');
    strictEqual("-123.4".isNumeric(),   true, '"-123.4".isNumeric() === true');
    strictEqual("123.4kg".isNumeric(),  true, '"123.4kg".isNumeric() === true');
    strictEqual("+123.4kg".isNumeric(), true, '"+123.4kg".isNumeric() === true');
    strictEqual("-123.4kg".isNumeric(), true, '"-123.4kg".isNumeric() === true');

    notStrictEqual("p14".isNumeric(),   true, '"123".isNumeric() === true');
    notStrictEqual(".5".isNumeric(),    true, '"123".isNumeric() === true');
});

test("lowerFirst", function() {
    strictEqual("".lowerFirst(), "", '"".lowerFirst() === ""');
    strictEqual("ABC".lowerFirst(), "aBC");
});

test("pad", function() {
    strictEqual("a".pad(3, "+"), "+a+");
    strictEqual("a".pad(4, "+"), "+a++");
    strictEqual("a".pad(6, "+-"), "+-a+-+");
});

test("padLeft", function() {
    strictEqual("a".padLeft(1, "+"), "a");
    strictEqual("a".padLeft(3, "+"), "++a");
    strictEqual("a".padLeft(4, "+-"), "+-+a");
});

test("padRight", function() {
    strictEqual("a".padRight(1, "+"), "a");
    strictEqual("a".padRight(3, "+"), "a++");
    strictEqual("a".padRight(4, "+-"), "a+-+");
});

test("regexQuote", function() {
    strictEqual("^$.?*+-\\/:=!,()[]{}".regexQuote(), "\\^\\$\\.\\?\\*\\+\\-\\\\\\/\\:\\=\\!\\,\\(\\)\\[\\]\\{\\}");
});

test("repeat", function() {
    strictEqual("a".repeat(3), "aaa");
    strictEqual("abc".repeat(2), "abcabc");
});

test("reverse", function() {
    strictEqual("abc".reverse(), "cba");
});

test("trim", function() {
    strictEqual(" a\t\r\n".trim(), "a", '" a\\t\\r\\n".trim() === "a"');
    strictEqual("　あ　".trim(), "あ", '"　あ　".trim() === "あ"');
});

test("trimLeft", function() {
    strictEqual(" a ".trimLeft(), "a ");
});

test("trimRight", function() {
    strictEqual(" a ".trimRight(), " a");
});

test("unescapeHTML", function() {
    strictEqual("&lt; &gt; &amp; &quot; &#039;".unescapeHTML(), "< > & \" '");
});

test("upperFirst", function() {
    strictEqual("".upperFirst(), "", '"".upperFirst() === ""');
    strictEqual("abc".upperFirst(), "Abc", '"abc".upperFirst() === "Abc"');
});

test("upperWords", function() {
    strictEqual("".upperWords(), "", '"".upperWords() === ""');
    strictEqual("hello, world!".upperWords(), "Hello, World!", '"hello, world!".upperWords() === "Hello, World!"');
    strictEqual("a\t\nb".upperWords(), "A\t\nB", '"a\\t\\nb".upperWords() === "A\\t\\nB"');
});
