import { degreesToRadians } from './math';

describe('math utils', () => {
  it('degreesToRadians', () => {
    expect(degreesToRadians(90)).toBe(Math.PI * 0.5);
    expect(degreesToRadians(180)).toBe(Math.PI);
    expect(degreesToRadians(270)).toBe(Math.PI * 1.5);
    expect(degreesToRadians(360)).toBe(Math.PI * 2);
  });
});
