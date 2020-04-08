import { mount } from '@vue/test-utils';
import { Renderer } from '../renderer/index';
import { Scene as SceneComponent } from './index';
import { defineComponent } from '../../api';
import { Scene, WebGLRenderer } from 'three';

jest.mock('three');

describe('<Scene>', () => {
  beforeEach(() => {
    (Scene as unknown as jest.Mock).mockClear();
    (WebGLRenderer as jest.Mock).mockClear();
  });

  it('register and unregisters itself with the parent renderer', async() => {
    const vm: any = mount(defineComponent({
      data() {
        return {
          showScene: false,
        };
      },
      components: {
        Renderer,
        Scene: SceneComponent,
      },
      template: `
        <Renderer ref="renderer">
          <Scene v-if="showScene" />
        </Renderer>
      `,
    })).vm;
    
    const { renderer } = vm.$refs;
    expect(renderer.empty).toBe(true);

    vm.showScene = true;
    await vm.$nextTick();
    expect(renderer.empty).toBe(false);

    vm.showScene = false;
    await vm.$nextTick();
    expect(renderer.empty).toBe(true);
  });
});
