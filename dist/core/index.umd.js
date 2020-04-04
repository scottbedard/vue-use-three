(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@vue/runtime-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', '@vue/runtime-dom'], factory) :
  (global = global || self, factory(global.VueUseThree = {}, global.Vue));
}(this, (function (exports, runtimeDom) { 'use strict';

  function usePosition() {
      var position = runtimeDom.reactive({
          x: 0,
          y: 0,
          z: 0,
      });
      return { position: position };
  }

  var version = '0.0.1';

  exports.usePosition = usePosition;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
