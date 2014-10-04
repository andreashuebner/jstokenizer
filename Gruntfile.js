module.exports = function(grunt) {

  grunt.initConfig({
    
   
    qunit: {
        all: {
          options: {
            urls: [
              "tests/testrunner.html",
            ]
          }
        }
    },
    
    uglify: {
    my_target: {
      files: {
        'jsTokenizer.min.js': ['jsTokenizer.js']
      }
    }
  },
  
  jsdoc : {
        dist : {
            src: ['jsTokenizer.js'],
            jsdoc: './node_modules/.bin/jsdoc',
            options: {
                destination: 'doc'
                
            }
        }
    }
    
    
  });

  
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  --grunt.loadNpmTasks('grunt-jsdoc');
  

  

  grunt.registerTask('default', ['qunit','uglify']);

};