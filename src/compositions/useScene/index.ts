import { Scene } from 'three';
import { inject, onMounted, onUnmounted, Ref } from '../../api';
import { useDisposable } from '../useDisposable';
import { rendererContext, RendererApi } from '../useRenderer';

/**
 * Scene options.
 */
export type UseSceneOptions = {
  container: Ref<HTMLElement | undefined>;
};

/**
 * Manage a scene.
 */
export function useScene(options: UseSceneOptions) {
  let scene: Scene;

  const getScene = () => scene;

  const rendererApi = inject<RendererApi | null>(rendererContext, null);

  onMounted(() => {
    scene = new Scene();

    scene.userData = {
      el: options.container.value,
    };

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
