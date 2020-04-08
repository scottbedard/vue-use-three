import { Scene } from 'three';
import { inject, onMounted, onUnmounted } from '../../api';
import { useDisposable } from '../useDisposable';
import { rendererContext, RendererApi } from '../useRenderer';

/**
 * Manage a scene.
 */
export function useScene() {
  let scene: Scene;

  const getScene = () => scene;

  const rendererApi = inject<RendererApi | null>(rendererContext, null);

  onMounted(() => {
    scene = new Scene();

    if (rendererApi) {
      rendererApi.addScene(scene);
    }
  });

  onUnmounted(() => {
    if (rendererApi) {
      rendererApi.removeScene(scene);
    }
  });

  useDisposable(getScene);

  return {
    getScene,
  };
}
