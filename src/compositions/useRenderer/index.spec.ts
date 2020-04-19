import { mount } from '@vue/test-utils';
import { WebGLRenderer } from 'three';
import { context, useRenderer, RendererApi } from './index';
import { defineComponent, inject } from '../../api';

jest.mock('three');

describe('useRenderer', () => {
  beforeEach(() => {
    (WebGLRenderer as jest.Mock).mockClear();
  });

  it('exposes a renderer context for child scenes', () => {
    // this assertion just exists to prevent false-positives
    // by verifying that the inner setup assertions ran.
    let innerSetupCalled = false;

    const vm: any = mount(defineComponent({
      setup() {
        const renderer = new WebGLRenderer();
        useRenderer(renderer);
      },
      components: {
        Scene: {
          setup() {
            const api = inject<RendererApi | null>(context, null);

            expect(typeof api?.addScene).toBe('function');
            expect(typeof api?.removeScene).toBe('function');

            innerSetupCalled = true;

            return {};
          },
          template: `<div>Scene</div>`,
        },
      },
      template: `
        <div>
          <Scene />
        </div>
      `,
    })).vm;

    expect(innerSetupCalled).toBe(true);
  });
});
