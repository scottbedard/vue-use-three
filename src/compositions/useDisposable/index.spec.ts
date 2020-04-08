import Vue from 'vue';
import { useDisposable } from './index';

describe('useDisposable', () => {
  it('disposes objects when component is destroyed', () => {
    const foo = { dispose: jest.fn() };
    const bar = { dispose: jest.fn() };
    const baz = { dispose: jest.fn() };
    const lazyBaz = () => baz;

    const vm  = new Vue({
      setup() {
        useDisposable(foo, bar, lazyBaz);
        return {};
      },
    });

    expect(foo.dispose).not.toHaveBeenCalled();
    expect(bar.dispose).not.toHaveBeenCalled();
    expect(baz.dispose).not.toHaveBeenCalled();

    vm.$destroy();

    expect(foo.dispose).toHaveBeenCalled();
    expect(bar.dispose).toHaveBeenCalled();
    expect(baz.dispose).toHaveBeenCalled();
  });
});
