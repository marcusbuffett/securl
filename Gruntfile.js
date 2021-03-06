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
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer-core')({
            browsers: ['last 2 versions']
          })
        ]
      },
      build: {
        src: 'app/public/styles/*.css'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['app/sass/*.scss'],
        tasks: ['wiredep', 'sass', 'postcss']
      },
      // wiredep: {
        // files: ['app/views/*.jade', 'app/index.jade'],
        // tasks: ['wiredep']
      // }
    },
  });
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('build', ['sass', 'postcss']);
  grunt.registerTask('c-build', ['build', 'watch']);
};
