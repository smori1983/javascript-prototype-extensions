module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
    pkg: "<json:package.json>",
    meta: {
        banner: "/*!\n" +
                " * <%= pkg.name %> v<%= pkg.version %>\n" +
                " *\n" +
                " * Copyright (c) <%= grunt.template.today('yyyy') %> smori <smori1983@gmail.com>\n" +
                " * Dual licensed under the MIT or GPL-2.0 licenses.\n" +
                " *\n" +
                " * Includes php.js\n" +
                " * http://phpjs.org/\n" +
                " * Copyright (c) 2011 Kevin van Zonneveld\n" +
                " * Dual licensed under the MIT or GPL-2.0 licenses.\n" +
                " */",
        name: "<%= grunt.utils._.rtrim(pkg.name, '.js') %>"
    },
    lint: {
        all: ["grunt.js", "src/*.js", "test/*.js"]
    },
    qunit: {
        files: ["test/*.html"]
    },
    concat: {
        dist: {
            src: [
                "<banner:meta.banner>",
                "src/basics-function.js",
                "src/basics-string.js",
                "src/basics-date.js",
                "src/phpjs-string.js"
            ],
            dest: "dist/<%= meta.name %>-<%= pkg.version %>.js"
        }
    },
    min: {
        dist: {
            src: [
                "<banner:meta.banner>",
                "<config:concat.dist.dest>"
            ],
            dest: "dist/<%= meta.name %>-<%= pkg.version %>.min.js"
        }
    },
    jshint: {
        options: {
            browser: true,
            curly: true,
            eqeqeq: true,
            forin: true
        }
    },
    watch: {
        files: [
            "src/*.js",
            "test/*.js"
        ],
        tasks: "lint qunit"
    }
});

grunt.registerTask("preconcat", "preContat", function() {
    var fs    = require("fs"),
        path  = require("path"),
        dir   = path.resolve("dist"),
        count = 0;

    fs.readdirSync(dir).forEach(function(file) {
        if (/\.js$/.test(file)) {
            fs.unlinkSync(path.resolve(dir, file));
            count++;
        }
    });

    grunt.log.writeln("Removed file count: " + count);
});

grunt.registerTask("default", "lint qunit preconcat concat min");
grunt.registerTask("test", "lint qunit");

}; //grunt.initConfig
