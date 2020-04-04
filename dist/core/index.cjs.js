'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtimeDom = require('@vue/runtime-dom');

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
