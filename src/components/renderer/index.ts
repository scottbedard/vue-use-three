import Vue from 'vue';
import { defineComponent, ref } from '../../api';
import { useRenderer } from '../../compositions/useRenderer';

export const Renderer = defineComponent({
  setup() {
    const canvas = ref<HTMLCanvasElement>();

    const { empty, getRenderer } = useRenderer({ canvas });

    return {
      canvas,
      empty,
      getRenderer,
    };
  },
  render(h: typeof Vue.prototype.$createElement) {
    return h('div', [
      this.$slots.default,
      h('canvas', { ref: 'canvas' }),
    ]);
  },
});
