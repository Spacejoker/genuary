import * as THREE from 'three'

export interface Scene {
  scene: any;
  camera: THREE.PerspectiveCamera;
  renderer: any;
}
