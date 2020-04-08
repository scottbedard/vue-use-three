import Vue from 'vue';
import { defineComponent } from '../../api';
import { useScene } from '../../compositions/useScene';

export const Scene = defineComponent({
  setup() {
    const { getScene } = useScene();

    return {
      getScene,
    };
  },
  render(h: typeof Vue.prototype.$createElement) {
    return h('div', [
      this.$slots.default,
    ]);
  },
});
