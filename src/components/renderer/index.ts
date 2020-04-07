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
    return h('div', [
      this.$slots.default,
      h('canvas', { ref: 'canvas' }),
    ]);
  },
});
