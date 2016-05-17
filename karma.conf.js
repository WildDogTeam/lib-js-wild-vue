var path = require('path')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],
    browsers: ['PhantomJS'],
    reporters: ['spec', 'coverage'],
    files: [
      'tests/wildvue.spec.js'
    ],
    preprocessors: {
      'tests/wildvue.spec.js': ['webpack', 'sourcemap']
    },
    client: {
      mocha: {
        timeout: 100000
      }
    },
    browserNoActivityTimeout: 100000,
    webpack: {
      devtool: '#inline-source-map',
      module: {
        loaders: [{
          include: path.resolve(__dirname, 'src/wildvue.js'),
          loader: 'istanbul-instrumenter'
        }]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
