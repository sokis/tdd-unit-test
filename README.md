# TDD Unit Test
TDD教程 练习

## 安装

```
git clone https://github.com/sokis/tdd-unit-test-.git tdd-unit-test
cd tdd-unit-test

npm install

# open split terminal window
npm run dev      # get webpack server running
npm run dev:test # to get karma test server going
```


## 设置 Karma

```
npm i karma karma-chai karma-mocha karma-webpack --save-dev
npm i karma-sourcemap-loader karma-phantomjs-launcher --save-dev
npm i karma-spec-reporter --save-dev
npm i phantomjs --save-dev

# The polyfills arn't required but will help with browser support issues
# and are easy enough to include in our karma config that I figured why not
npm i babel-polyfill phantomjs-polyfill --save-dev
```


## 创建 Karma Config

```
touch karma.config.js
```

```javascript
// ./karma.config.js

var argv = require('yargs').argv;
var path = require('path');

module.exports = function(config) {
  config.set({
    // only use PhantomJS for our 'test' browser
    browsers: ['PhantomJS'],

    // just run once by default unless --watch flag is passed
    singleRun: !argv.watch,

    // which karma frameworks do we want integrated
    frameworks: ['mocha', 'chai'],

    // displays tests in a nice readable format
    reporters: ['spec'],

    // include some polyfills for babel and phantomjs
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './test/test_helper.js' // specify files to watch for tests
    ],
    preprocessors: {
      // these files we want to be precompiled with webpack
      // also run tests throug sourcemap for easier debugging
      ['./test/test_helper.js']: ['webpack','sourcemap']
    },
    // A lot of people will reuse the same webpack config that they use
    // in development for karma but remove any production plugins like UglifyJS etc.
    // I chose to just re-write the config so readers can see what it needs to have
    webpack: {
       devtool: 'inline-source-map',
       resolve: {
        // allow us to import components in tests like:
        // import Example from 'components/Example';
        root: path.resolve(__dirname, './src'),

        // allow us to avoid including extension name
        extensions: ['', '.js', '.jsx'],

        // required for enzyme to work properly
        alias: {
          'sinon': 'sinon/pkg/sinon'
        }
      },
      module: {
        // don't run babel-loader through the sinon module
        noParse: [
          /sinon\\pkg\\sinon\.js/
        ],
        // run babel loader for our tests
        loaders: [
          { test: /\.js?$/, exclude: /node_modules/, loader: 'babel' },
        ],
      },
      // required for enzyme to work properly
      externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window'
      },
    },
    webpackMiddleware: {
      noInfo: true
    },
    // tell karma all the plugins we're going to be using to prevent warnings
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-webpack',
      'karma-babel-preprocessor',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-sourcemap-loader'
    ]
  });
};
```

## 修改 package.json

```javascript
  "scripts" {
    "test": "node_modules/.bin/karma start karma.config.js",
    "test:dev": "npm run test -- --watch",
  }
```