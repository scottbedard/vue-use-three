import { Object3D } from 'three';
import { reactive } from '../../api';
import { usePosition } from './index';
import Vue from 'vue';

describe('usePosition', () => {
  it('syncs object position', async() => {
    const obj = new Object3D();

    const props = reactive({
      position: { x: 1, y: 2, z: 3 },
    });

    usePosition(obj, () => props.position);

    expect(obj.position.x).toBe(1);
    expect(obj.position.y).toBe(2);
    expect(obj.position.z).toBe(3);
    
    props.position.x = 4;
    props.position.y = 5;
    props.position.z = 6;

    await Vue.nextTick();

    expect(obj.position.x).toBe(4);
    expect(obj.position.y).toBe(5);
    expect(obj.position.z).toBe(6);
  });
});
