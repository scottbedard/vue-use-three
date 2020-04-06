import { Object3D } from 'three';
import { mount } from '@vue/test-utils';
import { useNesting } from './index';
import { defineComponent, ref } from '../../api';

describe('useNesting', () => {
  it('adds and removes child objects', async() => {
    const parent = new Object3D();
    const child = new Object3D();

    const vm: any = mount(defineComponent({
      setup() {
        const showChild = ref(false);

        useNesting(parent);

        return { showChild };
      },
      components: {
        Child: defineComponent({
          setup() {
            useNesting(child);
          },
          template: `<div>Hello</div>`,
        }),
      },
      template: `
        <div>
          <Child v-if="showChild" />
        </div>
      `,
    })).vm;

    expect(parent.children).toEqual([]);

    vm.showChild = true;
    await vm.$nextTick();
    expect(parent.children).toEqual([child]);

    vm.showChild = false;
    await vm.$nextTick();
    expect(parent.children).toEqual([]);
  });
});
