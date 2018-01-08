/**
 * http://gruntjs.com/configuring-tasks
 */
module.exports = function (grunt) {

    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            files: ['public/js/includes/**/*.js'],
            options: {
                separator: ';'
            },
            dist: {
                src: ['<%= concat.files %>'],
                dest: 'public/js/main.js'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'public/js/includes**/*.js',
                'public/js/libs/**/*.js'
            ]
        },
        uglify: {
          dist: {
            files: {
              'public/js/main.js': [
                'public/js/main.js'
              ]
            }
          }
        },
        sass: {
            files: ['public/scss/**/*.scss'],
            dist: {
                options: {
                    sourcemap: 'file'
                },
                files: {
                    'public/css/main.css': 'public/scss/main.scss'
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: ['ie >= 10', 'last 4 versions', '> 1%']}) // add vendor prefixes
                ]
            },
            dist: {
                src: 'public/css/**/*.css'
            }
        },
        cssnano: {
            options: {},
            dist: {
                files: {
                    'public/css/main.css' : 'public/css/main.css'
                }
            }
        },
        watch: {
            sass: {
                files: ['<%= sass.files %>'],
                tasks: ['dist-css']
            },
            js: {
                files: ['<%= concat.files %>'],
                tasks: ['dist-js']
            }
        }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-cssnano');

    // register tasks
    grunt.registerTask('dist-css', ['sass:dist', 'cssnano:dist', 'postcss:dist']);
    grunt.registerTask('dist-js', [/*'jshint:all',*/ 'concat:dist', 'uglify']);
    
    grunt.registerTask('default', ['watch', 'dist-css', 'dist-js']);
};
