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
//                    "a",
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
            options: {
//                assets: "path/to/assets",
                data: "src/data/*.json"
            },
            project: {
                options: {
                    layoutdir: 'layouts/',
                    layout: "default.hbs"
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
    grunt.registerTask('default', ['clean', 'uglify', 'cssmin', 'copy', 'assemble', 'prettify', 'htmlmin']);
}