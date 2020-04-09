import { mount } from '@vue/test-utils';
import { Renderer } from '../renderer/index';
import { Scene as SceneComponent } from './index';
import { defineComponent } from '../../api';
import { Scene, WebGLRenderer } from 'three';

jest.mock('three');
WebGLRenderer.prototype.setClearColor = jest.fn();
WebGLRenderer.prototype.setPixelRatio = jest.fn();

describe('<Scene>', () => {
  beforeEach(() => {
    (Scene as unknown as jest.Mock).mockClear();
    (WebGLRenderer as jest.Mock).mockClear();
    (WebGLRenderer.prototype.setClearColor as jest.Mock).mockClear();
    (WebGLRenderer.prototype.setPixelRatio as jest.Mock).mockClear();
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

  it('stores the containing element on the scene object', () => {
    const vm: any = mount(defineComponent({
      components: {
        Scene: SceneComponent,
      },
      template: `<Scene ref="scene" />`,
    })).vm;

    const scene = vm.$refs.scene.getScene();
    
    expect(scene.userData.el).toBe(vm.$el);
  });
});
