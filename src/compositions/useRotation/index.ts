import { Object3D } from 'three';
import { computed, watch } from '../../api';
import { VectorObj } from '../../types';
import { degreesToRadians } from '../../utils/math';
import { normalizeVectorObj } from '../../utils/object';

type UseRotationOptions = {
  unit?: 'degrees' | 'radians';
};

/**
 * Sync object position.
 *
 * @param {Object3D} obj 
 * @param {() => VectorObj} fn
 *
 * @return {void}
 */
export function useRotation(obj: Object3D, fn: () => VectorObj, options: UseRotationOptions = {}): void {
  const rotation = computed(() => normalizeVectorObj(fn()));

  options = {
    unit: 'radians',
    ...options,
  };

  if (options.unit === 'degrees') {
    watch(rotation, ({ x, y, z }) => {
      obj.rotation.x = degreesToRadians(x);
      obj.rotation.y = degreesToRadians(y);
      obj.rotation.z = degreesToRadians(z);
    }, { deep: true });
  } else {
    watch(rotation, ({ x, y, z }) => {
      obj.rotation.x = x;
      obj.rotation.y = y;
      obj.rotation.z = z;
    }, { deep: true });
  }
}
