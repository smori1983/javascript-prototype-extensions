# javascript-prototype-extensions.js

Extends JavaScript standard global objects.

JavaScript の標準グローバルオブジェクトを拡張します。


## CAUTION

ライブラリなど他のコードを併用する場合、それらのコードが同名のメソッド定義をしていれば、メソッドの衝突が起こります。

このパッケージに含まれるメソッドは、同名のメソッドが存在しない場合に限りメソッドを定義するようになっています。したがって、既に定義されたメソッドの動作が、このパッケージに含まれる同名のメソッドの動作と異なる場合は、注意が必要です。


## ABOUT

主として、文字列に対する操作のバリエーションを増やすために作りました。

PHP の関数から多くのヒントを得ています。

[phpjs.org](http://phpjs.org) という PHP の関数を JavaScript に移植するプロジェクトがあり、一部その成果物を利用しています。


## DEFINITIONS LIST


### 1. basics

#### `Function.method(name, func)`

All methods defined in this package use this method.

    Function.prototype.method = function(name, func) {
        this.prototype[name] = func;
        return this;
    };

#### `String.escapeBase64()`

for URL query.

- `+ => %28`
- `/ => %2F`
- `= => %3D`

#### `String.escapeHTML()`

- `< => &lt;`
- `> => &gt;`
- `& => &amp;`
- `" => &quot;`
- `' => &#039;`

#### `String.format(...)`

formatted output.

- `%s`
- `%#s`
- `%d`
- `%#d`
- `%0#d`
- `%%`

examples:

    "%s and %s".format("A", "B")    // "A and B"
    "[%2s][%2s]".format("A", "ABC") // "[ A][ABC]"
    "%d %d".format(10, 10.25)       // "10 10"
    "[%2d][%2d].format(1, 100)      // "[ 1][100]"
    "%02d %02d".format(1, 100)      // "01 100"

#### `String.lowerFirst()`

    "ABC".lowerFirst()" // "aBC"

#### `String.pad(len, word)`

#### `String.padLeft()`

#### `String.padRight()`

#### `String.repeat()`

#### `String.reverse()`

#### `String.trim()`
javascript 1.8.1 compatible.

#### `String.trimLeft()`
javascript 1.8.1 compatible.

#### `String.trimRight()`
javascript 1.8.1 compatible.

#### `String.upperFirst()`

#### `String.upperWords()`

### 2. imports from php.js

#### `String.base64Decode()`

#### `String.base64Encode()`


## LICENSE

MIT or GPL-2.0

