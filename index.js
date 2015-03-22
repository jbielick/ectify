'use strict';

var path    = require('path');
var ECT     = require('ect');
var ejs     = require('ejs');
var fs      = require('fs');
var template = ejs.compile(fs.readFileSync(__dirname + '/template.ejs').toString());
var through = require('through2');
var renderer;

var templateExtension = /\.(ect|html)$/;

function precompile(source) {
  return renderer.compile(source).toString().replace(/\n/g, '');
}

function build(file, source, options) {
  return template({
    precompiled: precompile(source),
    name: path.relative(process.cwd(), file).replace('.', '_')
  });
}

function ectify(file, options) {
  if (!templateExtension.test(file)) return through();
  if (!options) options = {};

  var buffers = [];

  function push(chunk, enc, next) {
    buffers.push(chunk);
    next();
  }

  function end(next) {
    var str = Buffer.concat(buffers).toString();
    renderer = ECT(options);

    try {
      this.push(build(file, str, options));
    } catch(e) {
      return this.emit('error', e);
    }

    next();
  }

  return through(push, end);
}

module.exports = ectify;
module.exports.build = build;
module.exports.precompile = precompile;
