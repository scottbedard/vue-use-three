import { onUnmounted } from '../../api';
import { isFunction } from '../../utils/function';

/**
 * Disposable.
 */
type Disposable = { dispose: () => void };

/**
 * Lazy disposable.
 */
type LazyDisposable = () => Disposable;

/**
 * Dispose objects when component is destroyed.
 *
 * @param {Disposable[]}
 *
 * @return {void}
 */
export function useDisposable(...args: (Disposable|LazyDisposable)[]): void {
  onUnmounted(() => {
    args.forEach(disposable => {
      if (isFunction(disposable)) {
        disposable().dispose();
      } else {
        disposable.dispose();
      }
    });
  });
}
