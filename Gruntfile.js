module.exports = function (grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /**
         * Before generating any new files,
         * remove files from the previous build
         */
        clean: {
            tests: ['build/', 'site/']
        },

        /**
         * Beautify generated HTML to make diffs easier
         */
        prettify: {
            options: {
                indent: 4,
                condense: true,
                indent_inner_html: true,
                unformatted: [
                    "p",
                    "pre"
                ]
            },
            files: {
                cwd: 'build/',
                expand: true,
                src: ['*.html'],
                ext: '.html',
                dest: 'build/'
            }
        },

        /**
         * Minify javascript to reduce file size
         */
        uglify: {
            my_target: {
                files: [
                    {
                        expand: true,
                        cwd: 'js',
                        src: '**/*.js',
                        dest: 'site/js'
                    }
                ]
            }
        },

        /**
         * Minify CSS to reduce file size
         */
        cssmin: {
            minify: {
                expand: true,
                cwd: 'css',
                src: '**/*.css',
                dest: 'site/css'
            }
        },

        /**
         * Minify HTML to reduce file size
         */
        htmlmin: {
            main: {
                options: {
                    removeComments: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build',
                        src: '*.html',
                        dest: 'site'
                    }
                ]
            }
        },

        /**
         * Copy resources to site directory
         */
        copy: {
            main: {
                expand: true,
                src: ['images/*', 'res/*', 'font-awesome-4.0.3/**'],
                dest: 'site'
            }
        },

// WHAT ARE ASSETS?
        assemble: {
            dev: {
                options: {
                    layoutdir: 'layouts/',
                    layout: "default.hbs",
                    data: "src/data/dev/data.json"
                },
                files: [
                    {
                        expand: true,
                        src: 'src/pages/**/*.hbs',
                        dest: 'build/',
                        flatten: true
                    }
                ]
            },
            prd: {
                options: {
                    layoutdir: 'layouts/',
                    layout: "default.hbs",
                    data: "src/data/prd/data.json"
                },
                files: [
                    {
                        expand: true,
                        src: 'src/pages/**/*.hbs',
                        dest: 'build/',
                        flatten: true
                    }
                ]

            }
        }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('assemble');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'uglify', 'cssmin', 'copy', 'assemble:dev', 'prettify', 'htmlmin']);
    grunt.registerTask('prd', ['clean', 'uglify', 'cssmin', 'copy', 'assemble:prd', 'prettify', 'htmlmin']);
}