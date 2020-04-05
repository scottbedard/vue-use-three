import { onUnmounted } from '../../api';

type Disposable = { dispose: () => void };

/**
 * Dispose objects when component is destroyed.
 *
 * @param {Disposable[]}
 *
 * @return {void}
 */
export function useDisposable(...args: Disposable[]): void {
  onUnmounted(() => args.forEach(obj => obj.dispose()));
}
