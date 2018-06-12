'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    'string-replace': {
      version: {
        files: {
          'dist/': 'dist/**',
        },
        options: {
          replacements: [{
            pattern: /{{ VERSION }}/g,
            replacement: '<%= pkg.version %>'
          }]
        }
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        sourceMap: true
      },
      dist: {
        dest: 'dist/jsoneditor.js',
        src: [
          // License & version info, start the containing closure
          'src/intro.js',

          // Simple inheritance
          'src/class.js',
          // IE9 polyfills
          'src/ie9.js',
          // Utils like extend, each, and trigger
          'src/utilities.js',

          // The main JSONEditor class
          'src/core.js',

          // JSON Schema validator
          'src/validator.js',

          // All the editors
          'src/editor.js',
          'src/editors/null.js',
          'src/editors/string.js',
          'src/editors/hidden.js',
          'src/editors/number.js',
          'src/editors/integer.js',
          'src/editors/rating.js',
          'src/editors/object.js',
          'src/editors/array.js',
          'src/editors/table.js',
          'src/editors/multiple.js',
          'src/editors/enum.js',
          'src/editors/select.js',
          'src/editors/selectize.js',
          'src/editors/multiselect.js',
          'src/editors/base64.js',
          'src/editors/upload.js',
          'src/editors/checkbox.js',
          'src/editors/array/selectize.js',

          // All the themes and iconlibs
          'src/theme.js',
          'src/themes/*.js',
          'src/iconlib.js',
          'src/iconlibs/*.js',

          // The JS templating engines
          'src/templates/*.js',

          // Set the defaults
          'src/defaults.js',

          // Wrapper for $.fn style initialization
          'src/jquery.js',

          // End the closure
          'src/outro.js'
        ],
      }
    },
    uglify: {
      dist: {
        src: 'dist/jsoneditor.js',
        dest: 'dist/jsoneditor.min.js'
      },
      options: {
        preserveComments: 'some',
        sourceMap: true
      }
    },
    watch: {
      scripts: {
        files: ["src/**/*.js"],
        tasks: ["concat"]
      }
    },
    jshint: {
      options: {
        browser: true,
        indent: 2,
        devel:true,
        nonbsp: true,
        nonew: true,
        immed: true,
        latedef: true
      },
      beforeconcat: [
        'src/class.js',
        'src/ie9.js',

        // Utils like extend, each, and trigger
        'src/utilities.js',

        // The main JSONEditor class
        'src/core.js',

        // JSON Schema validator
        'src/validator.js',

        // All the editors
        'src/editor.js',
        'src/editors/*.js',

        // All the themes and iconlibs
        'src/theme.js',
        'src/themes/*.js',
        'src/iconlib.js',
        'src/iconlibs/*.js',

        // The JS templating engines
        'src/templates/*.js',

        // Set the defaults
        'src/defaults.js',

        // Wrapper for $.fn style initialization
        'src/jquery.js'
      ],
      afterconcat: {
        options: {
          undef: true
        },
        files: {
          src: ['dist/jsoneditor.js']
        }
      }
    },
    connect: {
        default: {
            options: {
                port: 9000,
                hostname: '0.0.0.0',
                debug: true,
                keepalive: true
            }
        },
        testing: {
            options: {
                port: 9001,
                hostname: '0.0.0.0',
                debug: true,
                keepalive: true
            }
        }
    },
    run: {
        options: {
            // Task-specific options
        },
        mocha: {
            cmd: 'mocha',
            args: [
                'tests/selenium/*.js',
                '--reporter=nyan'
            ]
        }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-string-replace')
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-run');

  // Serve files
  grunt.registerTask('serve', 'connect:default');
  grunt.registerTask('serve-test', 'connect:testing');

  // Run mocha tests
  grunt.registerTask('test', ['run:mocha']);

    // Default task.
  grunt.registerTask('default', ['jshint:beforeconcat','concat','jshint:afterconcat','uglify']);
  
  grunt.registerTask('rawbuild', ['concat','uglify']);
  
};
