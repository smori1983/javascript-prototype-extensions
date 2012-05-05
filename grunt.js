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
                " */"
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
                "src/phpjs-string.js"
            ],
            dest: "dist/prototype-extensions.js"
        }
    },
    min: {
        dist: {
            src: [
                "<banner:meta.banner>",
                "dist/prototype-extensions.js"
            ],
            dest: "dist/prototype-extensions.min.js"
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

grunt.registerTask("default", "lint qunit concat min");
grunt.registerTask("test", "lint qunit");

};
