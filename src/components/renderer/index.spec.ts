import { mount } from '@vue/test-utils';
import { Renderer } from './index';
import { defineComponent } from '../../api';
import { WebGLRenderer } from 'three';

jest.mock('three');
WebGLRenderer.prototype.setClearColor = jest.fn();
WebGLRenderer.prototype.setPixelRatio = jest.fn();

describe('<Renderer>', () => {
  beforeEach(() => {
    (WebGLRenderer as jest.Mock).mockClear();
    (WebGLRenderer.prototype.setClearColor as jest.Mock).mockClear();
    (WebGLRenderer.prototype.setPixelRatio as jest.Mock).mockClear();
  });

  it('renders a canvas and default slot', () => {
    const vm: any = mount(defineComponent({
      components: {
        Renderer,
      },
      template: `
        <Renderer>
          <div data-foo />
        </Renderer>
      `,
    })).vm;

    expect(vm.$el.querySelector('canvas')).not.toBe(null);
    expect(vm.$el.querySelector('[data-foo]')).not.toBe(null);
  });
});
