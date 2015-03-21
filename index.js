'use strict';

var path    = require('path');
var ECT     = require('ect');
var ejs     = require('ejs');
var fs      = require('fs');
var template = ejs.compile(fs.readFileSync('./template.ejs').toString());
var through = require('through2');
var renderer = ECT();

var templateExtension = /\.(ect|html)$/;

function precompile(source) {
  return renderer.compile(source).toString().replace(/\n/g, '');
}

function build(source) {
  return template({precompiled: precompile(source)});
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
    var precompiled;

    try {
      this.push(build(str, options));
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
