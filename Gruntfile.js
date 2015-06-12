module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      options: {
        style: 'expanded'
      },
      build: {
        files: [
          {
            expand: true,
            src: ['app/sass/*.scss'],
            dest: 'app/public/styles/',
            ext: '.css',
            flatten: true,
          }
        ]
      }
    },
    // jade: {
      // options: {
        // pretty: true,
      // },
      // build: {
        // files: [
          // {
            // cwd: 'app/views',
            // src: ['*.jade'],
            // dest: 'app/public/html',
            // ext: '.html',
            // flatten: true,
          // }
        // ]
      // }
    // },
    wiredep: {
      build: {
        cwd: 'app',
        src: [
          'app/views/*.jade',
          'app/index.jade',
          'app/sass/*.scss'
        ]
      }
    },
    nodemon: {
      dev: {
        cwd: 'server',
        script: 'server/app.js',
      }
    },
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['app/sass/*.scss'],
        tasks: ['wiredep', 'sass']
      },
      wiredep: {
        files: ['app/views/*.jade', 'app/index.jade'],
        tasks: ['wiredep']
      }
    },
  });
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('build', ['wiredep', 'sass']);
  grunt.registerTask('c-build', ['build', 'watch']);
};
