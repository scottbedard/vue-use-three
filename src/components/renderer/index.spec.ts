import { mount } from '@vue/test-utils';
import { Renderer } from './index';
import { defineComponent } from '../../api';
import { WebGLRenderer } from 'three';

jest.mock('three');

describe('<Renderer>', () => {
  beforeEach(() => {
    (WebGLRenderer as jest.Mock).mockClear();
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
