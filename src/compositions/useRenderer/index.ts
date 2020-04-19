import { useDisposable } from '../useDisposable';
import { Scene, WebGLRenderer } from 'three';
import { provide, ref } from  '../../api';

/**
 * Renderer API.
 */
export type RendererApi = {
  addScene: (scene: Scene) => void;
  removeScene: (scene: Scene) => void;
}

/**
 * Renderer context.
 */
export const context = Symbol();

/**
 * Create a render context to manage scenes.
 *
 * @return {object}
 */
export function useRenderer(renderer: WebGLRenderer) {
  useDisposable(renderer);

  const empty = ref<boolean>(false);

  let scenes: Scene[] = [];

  const updateEmpty = () => empty.value = scenes.length === 0;

  const api: RendererApi = {
    addScene(scene: Scene) {
      scenes.push(scene);
      updateEmpty();
    },
    removeScene(scene: Scene) {
      scenes = scenes.filter(obj => obj !== scene);
      updateEmpty();
    },
  };

  provide(context, api);
}
