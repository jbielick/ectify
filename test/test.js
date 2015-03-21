'use strict';

var concat = require('concat-stream');
var fs = require('fs');
var path = require('path');
var test = require('tape');
var vm = require('vm');

function startsWith(str, prefix) {
  return str.indexOf(prefix) === 0;
}

test('ectify', function(t) {

  var ectify = require('../');

  function ectifier(sourcePath, options, callback) {
    fs.createReadStream(sourcePath)
      .pipe(ectify(sourcePath, options))
      .pipe(concat({encoding: 'string'}, callback));
  }

  function loadAsModule(source) {
    var context = {
      require: function(name) {return require('./ect.min')},
      module: {},
      console: console
    };
    vm.runInNewContext(source, context);
    return context.module.exports;
  }

  t.test('without data', function(t) {
    t.plan(1);
    var filename = path.resolve('test/fixtures/index.ect');
    ectifier(filename, null, function(output) {
      var template = loadAsModule(output);
      t.equal(template(),
        '<div>\n    <p>i like red bull and cat gifs</p>\n        </div>\n',
        'should work');
    });
  });

  t.test('with data', function(t) {
    t.plan(1);
    var filename = path.resolve('test/fixtures/data.ect');
    ectifier(filename, null, function(output) {
      var template = loadAsModule(output);
      t.equal(template({like: 'birds'}),
        '<div>\n    <p>i like birds and cat gifs</p>\n        </div>\n',
        'should work');
    });
  });

  t.test('ignore non-template file', function(t) {
    t.plan(1);
    var filename = path.resolve('test/fixtures/ignore.js');
    ectifier(filename, null, function(output) {
      fs.createReadStream(filename)
        .pipe(concat({encoding: 'string'}, function(data) {
          t.equal(output, data, 'should leave file intact');
        }));
    });
  });

  t.end();
});
