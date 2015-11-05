module.exports = function(grunt) {

  // All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
          src: [
              'server.js',
              'server-config.js',
              'app/**/*.js', // All JS in the libs folder
              'public/**/*.js',
              'lib/*.js',
              'views/*.ejs'

              // 'someDir/global.js',  // This specific file

          ],
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
      build: {
          src: 'js/build/production.js',
          dest: 'js/build/production.min.js'
      }
    //not sure if necessary (original code)
      // files: [
        


        
      // ],
      // options: {

      // }
    },

    jshint: {
      files: [
        // Add filespec list here
        '/**/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js',
          'node_modules/**/*.js',
          'test/**/*.js'
        ]
      }
    },

    cssmin: {
        // Add filespec list here
      css:{
        src: 'public/style.css',
        dest: 'views/concat.min.css'
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
    'mochaTest'
  ]);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
      // add your production server task here
  ]);
//suppose to watch out for jshint fails and abort grunt build process. 
//most likely ned to build an if condition to check if jsHint fails then run the bottom code. 
  // grunt.fail.fatal("Most likely jshint failed to load up"); 

};
