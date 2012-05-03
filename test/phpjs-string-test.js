start(); // without this, phantomjs-1.5.0 may be timed out.
module("String");

test("base64Decode", function() {
    strictEqual("YWJjMTIz".base64Decode(), "abc123", "abc123");
    strictEqual("5ryi5a2X".base64Decode(), "漢字", "漢字");
    strictEqual("44Gy44KJ44GM44Gq".base64Decode(), "ひらがな", "ひらがな");
    strictEqual("44Kr44K/44Kr44OK".base64Decode(), "カタカナ", "カタカナ");
    strictEqual("7722776A7722776F".base64Decode(), "ｶﾀｶﾅ", "ｶﾀｶﾅ");
});

test("base64Encode", function() {
    strictEqual("abc123".base64Encode(), "YWJjMTIz", "abc123");
    strictEqual("漢字".base64Encode(), "5ryi5a2X", "漢字");
    strictEqual("ひらがな".base64Encode(), "44Gy44KJ44GM44Gq", "ひらがな");
    strictEqual("カタカナ".base64Encode(), "44Kr44K/44Kr44OK", "カタカナ");
    strictEqual("ｶﾀｶﾅ".base64Encode(), "7722776A7722776F", "ｶﾀｶﾅ");
});
