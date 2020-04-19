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
export const rendererContext = Symbol();

/**
 * Create a render context to manage scenes.
 *
 * @return {object}
 */
export function useRenderer(renderer: WebGLRenderer) {
  useDisposable(renderer);

  const empty = ref<boolean>(true);

  let scenes: Scene[] = [];

  const getScenes = () => scenes;

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

  provide(rendererContext, api);

  return {
    empty,
    getScenes,
  };
}
