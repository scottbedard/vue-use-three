import { Object3D } from 'three';
import { reactive } from '../../api';
import { degreesToRadians } from '../../utils/math';
import { useRotation } from './index';
import Vue from 'vue';

describe('useRotation', () => {
  it('syncs object rotation (radians)', async() => {
    const obj = new Object3D();

    const props = reactive({
      rotation: { x: 1, y: 2, z: 3 },
    });

    useRotation(obj, () => props.rotation);

    expect(obj.rotation.x).toBe(1);
    expect(obj.rotation.y).toBe(2);
    expect(obj.rotation.z).toBe(3);
    
    props.rotation.x = 4;
    props.rotation.y = 5;
    props.rotation.z = 6;

    await Vue.nextTick();

    expect(obj.rotation.x).toBe(4);
    expect(obj.rotation.y).toBe(5);
    expect(obj.rotation.z).toBe(6);
  });

  it('syncs object rotation (degrees)', async() => {
    const obj = new Object3D();

    const props = reactive({
      rotation: { x: 0, y: 0, z: 0 },
    });

    useRotation(obj, () => props.rotation, { unit: 'degrees' });

    props.rotation.x = 10;
    props.rotation.y = 20;
    props.rotation.z = 30;

    await Vue.nextTick();

    expect(obj.rotation.x).toBe(degreesToRadians(10));
    expect(obj.rotation.y).toBe(degreesToRadians(20));
    expect(obj.rotation.z).toBe(degreesToRadians(30));
  });
});
