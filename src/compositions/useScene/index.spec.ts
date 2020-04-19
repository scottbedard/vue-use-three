import { mount } from '@vue/test-utils';
import { defineComponent, inject } from '../../api';
import { useRenderer } from '../useRenderer';
import { useScene } from './index';
import { Scene, WebGLRenderer } from 'three';

jest.mock('three');

describe('useScene', () => {
  beforeEach(() => {
    (WebGLRenderer as jest.Mock).mockClear();
  });

  it('registers and unregisters itself from parent renderer', async() => {
    const vm: any = mount(defineComponent({
      data() {
        return { show: false };
      },
      components: {
        Renderer: {
          setup() {
            const renderer = new WebGLRenderer();
            const { empty } = useRenderer(renderer);
            return { empty };
          },
          template: `
            <div :data-empty="empty ? 'true' : 'false'">
              <slot />
            </div>
          `,
        },
        Scene: {
          setup() {
            const scene = new Scene();
            useScene(scene);
            return {};
          },
          template: `<div>Scene</div>`,
        },
      },
      template: `
        <Renderer>
          <Scene v-if="show" />
        </Renderer>
      `,
    })).vm;

    expect(vm.$el.dataset.empty).toBe('true');

    vm.show = true;
    await vm.$nextTick();
    expect(vm.$el.dataset.empty).toBe('false');

    vm.show = false;
    await vm.$nextTick();
    expect(vm.$el.dataset.empty).toBe('true');
  });
});
