/* phpjs-string.js */

String.method("base64Decode", function() {
    var table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    return function() {
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, tmp = [];

        do {
            h1 = table.indexOf(this.charAt(i++));
            h2 = table.indexOf(this.charAt(i++));
            h3 = table.indexOf(this.charAt(i++));
            h4 = table.indexOf(this.charAt(i++));

            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

            o1 = bits >> 16 & 0xff;
            o2 = bits >>  8 & 0xff;
            o3 = bits       & 0xff;

            if (h3 === 64) {
                tmp.push(String.fromCharCode(o1));
            } else if (h4 === 64) {
                tmp.push(String.fromCharCode(o1, o2));
            } else {
                tmp.push(String.fromCharCode(o1, o2, o3));
            }
        } while (i < this.length);

        return tmp.join('').utf8Decode();
    };
}());

String.method("base64Encode", function() {
    var table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    return function() {
        var o1, o2, o3, h1, h2, h3, h4, bits,
            encoded = "",
            tmp = [],
            i = 0,
            data = this.utf8Encode();

        do {
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);

            bits = o1 << 16 | o2 << 8 | o3;

            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >>  6 & 0x3f;
            h4 = bits       & 0x3f;

            tmp.push(table.charAt(h1) + table.charAt(h2) + table.charAt(h3) + table.charAt(h4));
        } while (i < data.length);

        encoded = tmp.join('');

        var r = data.length % 3;

        return (r ? encoded.slice(0, r - 3) : encoded) + "===".slice(r || 3);
    };
}());

String.method("utf8Decode", function() {
    var tmp = [], i = 0, c1, c2, c3;

    while (i < this.length) {
        c1 = this.charCodeAt(i);

        if (c1 < 128) {
            tmp.push(String.fromCharCode(c1));
            i += 1;
        } else if (c1 > 191 && c1 < 224) {
            c2 = this.charCodeAt(i + 1);
            tmp.push(String.fromCharCode(((c1 & 31) << 6) | (c2 & 63)));
            i += 2;
        } else {
            c2 = this.charCodeAt(i + 1);
            c3 = this.charCodeAt(i + 2);
            tmp.push(String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)));
            i += 3;
        }
    }

    return tmp.join('');
});

String.method("utf8Encode", function() {
    var encoded = "",
        start = 0,
        end = 0,
        len = this.length,
        i, c, enc;

    for (i = 0; i < len; i++) {
        c = this.charCodeAt(i);
        enc = null;

        if (c < 128) {
            end++;
        } else if (c >= 128 && c < 2048) {
            enc = String.fromCharCode((c >> 6) | 192) +
                  String.fromCharCode((c & 63) | 128);
        } else {
            enc = String.fromCharCode((c >> 12) | 224) +
                  String.fromCharCode(((c >> 6) & 63) | 128) +
                  String.fromCharCode((c & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                encoded += this.slice(start, end);
            }
            encoded += enc;
            start = end = i + 1;
        }
    }

    if (end > start) {
        encoded += this.slice(start, len);
    }

    return encoded;
});
