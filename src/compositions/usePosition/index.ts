import { Object3D } from 'three';
import { computed, watch } from '../../api';
import { VectorObj } from '../../types';
import { normalizeVectorObj } from '../../utils/object';

/**
 * Sync object position.
 *
 * @param {Object3D} obj 
 * @param {() => VectorObj} fn
 *
 * @return {void}
 */
export function usePosition(obj: Object3D, fn: () => VectorObj): void {
  const position = computed(() => normalizeVectorObj(fn()));

  watch(position, ({ x, y, z }) => {
    obj.position.x = x;
    obj.position.y = y;
    obj.position.z = z;
  }, { deep: true });
}
