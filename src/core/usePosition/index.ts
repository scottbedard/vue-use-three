import { Object3D } from 'three';
import { computed, watch } from '../../api';

type Position = { x?: number; y?: number; z?: number }
type NormalizedPosition = { x: number; y: number; z: number }

const normalize = (position: Position): NormalizedPosition => Object.assign({ x: 0, y: 0, z: 0 }, position);

/**
 * Sync object position.
 *
 * @param {Object3D} obj 
 * @param {() => Position} fn
 *
 * @return {void}
 */
export function usePosition(obj: Object3D, fn: () => Position) {
  const normalizedPosition = computed(() => normalize(fn()))

  watch(normalizedPosition, ({ x, y, z }: NormalizedPosition) => {
     obj.position.x = x
    obj.position.y = y;
    obj.position.z = z;
  }, { deep: true });
}
