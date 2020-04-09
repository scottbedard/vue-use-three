import { Scene, WebGLRenderer } from 'three';
import { useDisposable } from '../useDisposable';
import { computed, onMounted, provide, ref, watch, Ref } from '../../api';

/**
 * Renderer API.
 */
export type RendererApi = {
  addScene: (scene: Scene) => void;
  removeScene: (scene: Scene) => void;
}

/**
 * Renderer options.
 */
export type UseRendererOptions = {
  canvas: Ref<HTMLCanvasElement | undefined>;
};

/**
 * Renderer context.
 */
export const rendererContext = Symbol();

/**
 * Bind a WebGLRenderer to a component.
 *
 * @return {WebGLRenderer}
 */
export function useRenderer(options: UseRendererOptions) {
  let renderer: WebGLRenderer;
  const getRenderer = () => renderer;
  
  const running = ref<boolean>(false);
  const scenes = ref<Array<() => Scene>>([]);
  const sceneCount = computed(() => scenes.value.length);
  const empty = computed(() => sceneCount.value === 0);

  const rendererApi: RendererApi = {
    addScene(scene: Scene) {
      scenes.value.push(() => scene);
    },
    removeScene(scene: Scene) {
      scenes.value = scenes.value.filter(sceneFn => sceneFn() !== scene);
    },
  };

  const draw = () => {
    console.log('draw');
  };

  const start = () => {
    if (!running.value) {
      running.value = true;

      const tick = () => {
        if (running.value) {
          draw();
          window.requestAnimationFrame(tick);
        }
      };

      tick();
    }
  };

  const stop = () => {
    running.value = false;
  };

  onMounted(() => {
    renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: options.canvas.value,
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
  });

  useDisposable(getRenderer);

  provide(rendererContext, rendererApi);

  watch(empty, () => {
    if (empty.value) {
      stop();
    } else {
      start();
    }
  });

  return {
    draw,
    empty,
    getRenderer,
    running,
    start,
    stop,
  };
}
