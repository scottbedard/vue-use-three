import { Scene } from 'three';
import { inject, onMounted, onUnmounted } from '../../api';
import { rendererContext, RendererApi } from '../useRenderer';

export function useScene() {
  let scene: Scene;

  const rendererApi = inject<RendererApi | null>(rendererContext, null);

  onMounted(() => {
    scene = new Scene();

    if (rendererApi) {
      rendererApi.addScene(scene);
    }
  });

  onUnmounted(() => {
    scene.dispose();

    if (rendererApi) {
      rendererApi.removeScene(scene);
    }
  });

  return {
    getScene: () => scene,
  };
}
