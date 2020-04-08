import { Scene, WebGLRenderer } from 'three';
import { useDisposable } from '../useDisposable';
import { computed, onMounted, provide, ref, Ref } from '../../api';

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

  onMounted(() => {
    renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: options.canvas.value,
    });
  });

  useDisposable(getRenderer);

  provide(rendererContext, rendererApi);

  return {
    getRenderer,
    empty,
  };
}
