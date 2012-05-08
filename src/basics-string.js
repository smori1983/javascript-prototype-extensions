/* basics-string.js */

String.method("escapeBase64", function() {
    var list = {
        "+": "%28",
        "/": "%2F",
        "=": "%3D"
    };

    return function() {
        return this.replace(/[\+\/=]/g, function(matched) {
            return list[matched];
        });
    };
}());

String.method("escapeHTML", function() {
    var list = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&#039;"
    };

    return function() {
        return this.replace(/[<>&"']/g, function(matched) {
            return list[matched];
        });
    };
}());

String.method("format", function() {
    var s = function(arg, format) {
        var ret, len;

        if (typeof arg === "string" || typeof arg === "number" || typeof arg === "boolean") {
            if (format.length > 2) {
                len = parseInt(format.slice(1, -1), 10);
                if (arg.length < len) {
                    arg = " ".repeat(len - arg.length) + arg;
                }
            }
            ret = arg;
        } else {
            ret = "";
        }

        return ret;
    };

    var d = function(arg, format) {
        var ret, fill, len;

        if (typeof arg === "number" || (typeof arg === "string" && arg.match(/^\d/))) {
            ret = parseInt(arg, 10).toString();
            if (format.length > 2) {
                fill = format.slice(1, 2) === "0" ? "0" : " ";
                len  = parseInt(format.slice(1, -1), 10);
                if (ret.length < len) {
                    ret = fill.repeat(len - ret.length) + ret;
                }
            }
        } else {
            ret = "";
        }

        return ret;
    };

    return function() {
        var i, next, ret = "",
            args = Array.prototype.slice.apply(arguments),
            regex = /%%|%\d*s|%\d*d/g,
            leaves = this.split(regex),
            escapes = this.match(regex);

        for (i = 0; i < leaves.length; i++) {
            ret += leaves[i];
            if (i < leaves.length - 1) {
                if (escapes[i] === "%%") {
                    ret += "%";
                } else if (escapes[i].slice(-1) === "s") {
                    ret += s(args.shift(), escapes[i]);
                } else if (escapes[i].slice(-1) === "d") {
                    ret += d(args.shift(), escapes[i]);
                }
            }
        }

        return ret;
    };
}());

String.method("isNumeric", function() {
    return this.match(/^[\+\-]?\d+(?:\.\d+)?/) !== null;
});

String.method("lowerFirst", function() {
    return this.slice(0, 1).toLocaleLowerCase() + this.slice(1);
});

String.method("pad", function(len, word) {
    var ret = this;

    if (typeof len === "number" && len > 0 && typeof word === "string" && word.length > 0) {
        ret = ret.padLeft(ret.length + Math.floor((len - ret.length) / 2), word);
        ret = ret.padRight(len, word);
    }

    return ret;
});

String.method("padLeft", function(len, word) {
    var pad, ret = this;

    if (typeof len === "number" && len > 0 && typeof word === "string" && word.length > 0) {
        pad = word.repeat(Math.ceil(len - this.length) / word.length).slice(0, len - this.length);
        ret = pad + this;
    }

    return ret;
});

String.method("padRight", function(len, word) {
    var pad, ret = this;

    if (typeof len === "number" && len > 0 && typeof word === "string" && word.length > 0) {
        pad = word.repeat(Math.ceil(len - this.length) / word.length).slice(0, len - this.length);
        ret = this + pad;
    }

    return ret;
});

String.method("regexQuote", function() {
    return this.replace(/[\^\$\.\?\*\+\-\\\/\:\=\!\,\(\)\[\]\{\}]/g, function(matched) {
        return "\\" + matched;
    });
});

String.method("repeat", function(count) {
    var i, ret = "";

    if (typeof count === "number") {
        for (i = 0; i < count; i++) {
            ret += this;
        }
    }

    return ret;
});

String.method("reverse", function() {
    return this.split("").reverse().join("");
});

// JavaScript 1.8.1
String.method("trim", function() {
    return this.replace(/^\s+|\s+$/g, "");
});

// JavaScript 1.8.1
String.method("trimLeft", function() {
    return this.replace(/^\s+/, "");
});

// JavaScript 1.8.1
String.method("trimRight", function() {
    return this.replace(/\s+$/, "");
});

String.method("unescapeHTML", function() {
    var list = {
        "&lt;":   "<",
        "&gt;":   ">",
        "&amp;":  "&",
        "&quot;": '"',
        "&#039;": "'"
    };

    return function() {
        return this.replace(/&lt;|&gt;|&amp;|&quot;|&#039;/g, function(matched) {
            return list[matched];
        });
    };
}());

String.method("upperFirst", function() {
    return this.slice(0, 1).toLocaleUpperCase() + this.slice(1);
});

String.method("upperWords", function() {
    return this.replace(/\S+/g, function(matched) {
        return matched.upperFirst();
    });
});
