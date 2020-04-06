import Vue from 'vue';
import { defineComponent, onMounted, ref } from '../../api';

export const Renderer = defineComponent({
  setup() {
    const canvas = ref(null);

    onMounted(() => {
      // show time...
    });

    return { canvas };
  },
  render(h: typeof Vue.prototype.$createElement) {
    // notice:
    // this does not work with vue 3 yet, we'll need to add a
    // step to the build script to convert the following...
    //
    // 1. h needs to be imported, not received as an argument
    // 2. slots are functions that must be called
    return h('div', [
      this.$slots.default,
      h('canvas', { ref: 'canvas' }),
    ]);
  },
});
