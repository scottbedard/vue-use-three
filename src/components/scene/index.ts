import Vue from 'vue';
import { defineComponent, ref } from '../../api';
import { useScene } from '../../compositions/useScene';

export const Scene = defineComponent({
  setup() {
    const container = ref<HTMLElement>();
  
    const { getScene } = useScene({ container });

    return {
      container,
      getScene,
    };
  },
  render(h: typeof Vue.prototype.$createElement) {
    return h('div', { ref: 'container' }, [
      this.$slots.default,
    ]);
  },
});
