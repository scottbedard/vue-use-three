import { NormalizedVectorObj, VectorObj } from '../types';

/**
 * Normalize a raw vector object.
 *
 * @param {VectorObj} obj
 *
 * @return {NormalizedVectorObj} 
 */
export function normalizeVectorObj(obj: VectorObj): NormalizedVectorObj {
  return Object.assign({ x: 0, y: 0, z: 0 }, obj);
} 
