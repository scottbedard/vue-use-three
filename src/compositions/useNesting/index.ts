import { Object3D } from 'three';
import { inject, onMounted, onUnmounted, provide } from '../../api';

const context = Symbol();

/**
 * Provide / inject a 3D nesting context.
 *
 * @param {Object3D} obj
 * @param {NestingOptions} options
 */
export function useNesting(obj: Object3D): void {
  const parent = inject<Object3D|null>(context, null);

  if (parent) {
    onMounted(() => parent.add(obj));
    onUnmounted(() => parent.remove(obj));
  }

  provide(context, obj);
}
