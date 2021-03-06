import * as THREE from 'three'
import {RenderStuff} from './types';

export function initScene() : RenderStuff{
  const loader = new THREE.CubeTextureLoader();
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 3

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement);

  const light = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( light );
  return {
    scene,
    camera,
    renderer
  };
}
