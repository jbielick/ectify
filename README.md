ectify
======

`ectify` is a [Browserify](https://github.com/substack/node-browserify) transformer for creating modules of pre-compiled [ECT](https://github.com/baryshev/ect) templates.
With [`npm`](http://npmjs.org/) as a local development dependency:

```bash
npm install --save-dev ectify
```


### Configuration ###

All options given to `ectify` will be passed to `ECT()`.

** Note that only `open` and `close` options are supported. Use all other options at your own risk.

The transform is only be applied to `.ect` or `.html` files.


### Usage ###

In `templates/main.ect`:
```html+ect
<p>I like <%- @noun %></p>
```

In `example/main.js`:
```js
var template = require('templates/main.ect');
$('#main').html( template({ noun: 'red bull' }) );
```

Compiles to:
```html
<p>I like red bull</p>
```

### Transformed Samples ###

Template source:
```html+ejs
  <div>
    <p><%- "i like red bull" %></p>
      </div>


<div>
  i also like cat gifs
</div>
```

Compiled:
```js
var ect = require('ect')({
  root: {
    template: '(' + function __ectTemplate(__ectTemplateContext, __ectFileInfo, include, content, block) {var __ectContainer, __ectExtended, __ectOutput, ref;__ectExtended = false;__ectOutput = '  <div>\n    <p>' + (__ectFileInfo.line = 2, '') + ((ref = "i like red bull") != null ? ref : '') + '</p>\n      </div>\n\n\n<div>\n  i also like cat gifs\n</div>';if (!__ectExtended) {  return __ectOutput;} else {  __ectContainer = __ectTemplateContext.load(__ectParent);  __ectFileInfo.file = __ectContainer.file;  __ectFileInfo.line = 1;  __ectTemplateContext.childContent = __ectOutput;  return __ectContainer.compiled.call(this, __ectTemplateContext, __ectFileInfo, include, content, block);}} + ');'
  }
});

module.exports = function(data) {
  return ect.render('template', data);
};
```
