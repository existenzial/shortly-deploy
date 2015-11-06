module.exports = function(grunt) {

  // All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'// To separate by ;
      },
      dist: {
          src: ['public/client/**/*.js'],
          dest: 'js/build/production.js',
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: { 
     options: {
       banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
     },
     dist: {
       files: {
         'public/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
       }
     }
    },

    jshint: {
      files: [
       'Gruntfile.js',
       'app/**/*.js',
       'public/**/*.js',
       'lib/**/*.js',
       './*.js',
       'spec/**/*.js'
      ],
      options: {
       force: 'true',
       jshintrc: '.jshintrc',
       ignores: [
         'public/lib/**/*.js',
         'public/dist/**/*.js'
       ]
     }
    },

    cssmin: {
        // Add filespec list here
        options: {
          keepSpecialComments: 0
          },
         dist: {
           files: {
             'public/dist/style.min.css': 'public/style.css'
           }
         }

    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      command: 'git push azure master',
       options: {
         stdout: true,
         stderr: true,
         failOnError: true   
        }
      }
    },
  });

  //Where we tell Grunt we plan to use this plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');




  // Where we tell Grunt what to do when we type 'grunt' into the terminal
  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'jshint',
    'mochaTest'
  ]);

  //xTODO 
  grunt.registerTask('build', [
    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
       grunt.task.run([ 'shell:prodServer' ]);

      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
      // add your production server task here
      'test',
      'build',
      'upload'
  ]);
//suppose to watch out for jshint fails and abort grunt build process. 
//most likely ned to build an if condition to check if jsHint fails then run the bottom code. 
  // grunt.fail.fatal("Most likely jshint failed to load up"); 

};
