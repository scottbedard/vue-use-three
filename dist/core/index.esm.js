import { reactive } from '@vue/runtime-dom';

function usePosition() {
    var position = reactive({
        x: 0,
        y: 0,
        z: 0,
    });
    return { position: position };
}

var version = '0.0.1';

export { usePosition, version };
