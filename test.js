(function __ectTemplate(__ectTemplateContext, __ectFileInfo, include, content, block) {
var __ectContainer, __ectExtended, __ectOutput, ref;

__ectExtended = false;

__ectOutput = '<div>\n    <p>' + (__ectFileInfo.line = 2, '') + ((ref = "i like red bull and cat gifs") != null ? ref : '') + '</p>\n        </div>\n';

if (!__ectExtended) {
  return __ectOutput;
} else {
  __ectContainer = __ectTemplateContext.load(__ectParent);
  __ectFileInfo.file = __ectContainer.file;
  __ectFileInfo.line = 1;
  __ectTemplateContext.childContent = __ectOutput;
  return __ectContainer.compiled.call(this, __ectTemplateContext, __ectFileInfo, include, content, block);
}
});