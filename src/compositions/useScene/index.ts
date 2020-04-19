import { Scene } from 'three';
import { inject, onMounted, onUnmounted } from '../../api';
import { useDisposable } from '../useDisposable';
import { rendererContext, RendererApi } from '../useRenderer';


/**
 * Manage a scene.
 *
 * @param {Scene} scene
 *
 * @return {void}
 */
export function useScene(scene: Scene) {
  const rendererApi = inject<RendererApi | null>(rendererContext, null);

  useDisposable(scene);

  onMounted(() => {
    if (rendererApi) {
      rendererApi.addScene(scene);
    }
  });

  onUnmounted(() => {
    if (rendererApi) {
      rendererApi.removeScene(scene);
    }
  });
}
