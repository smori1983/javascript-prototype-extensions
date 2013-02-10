/* basics-date.js */

Date.method("add", function(spec) {
    var ms = Date.parse(this.toUTCString());

    if (spec.hasOwnProperty("day")) {
        ms += spec.day * 86400000;
    }
    if (spec.hasOwnProperty("hour")) {
        ms += spec.hour * 3600000;
    }
    if (spec.hasOwnProperty("minute")) {
        ms += spec.minute * 60000;
    }
    if (spec.hasOwnProperty("second")) {
        ms += spec.second * 1000;
    }

    return new Date(ms);
});

Date.method("format", function(format) {
    var ret = format;

    ret = ret.replace(/([^%]?)%Y/g, "$1" + this.getFullYear().toString());
    ret = ret.replace(/([^%]?)%y/g, "$1" + this.getFullYear().toString().slice(-2));
    ret = ret.replace(/([^%]?)%m/g, "$1" + ("0" + (this.getMonth() + 1)).slice(-2));
    ret = ret.replace(/([^%]?)%d/g, "$1" + ("0" + this.getDate()).slice(-2));
    ret = ret.replace(/([^%]?)%H/g, "$1" + ("0" + this.getHours()).slice(-2));
    ret = ret.replace(/([^%]?)%i/g, "$1" + ("0" + this.getMinutes()).slice(-2));
    ret = ret.replace(/([^%]?)%s/g, "$1" + ("0" + this.getSeconds()).slice(-2));
    ret = ret.replace(/([^%]?)%w/g, "$1" + this.getDay());

    return ret;
});
