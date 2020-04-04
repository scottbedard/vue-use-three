import { reactive } from '../../api';

export function usePosition() {
  const position = reactive({
    x: 0,
    y: 0,
    z: 0,
  });

  return { position };
}
