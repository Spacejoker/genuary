import * as THREE from 'three'
import "./styles.css"
import {registerEventHandlers} from './event_handlers';
import {initScene} from './scene';
import {generate} from './day/day01_ten_thousand';

const {scene, camera, renderer} = initScene();

let loop = 0;

window.addEventListener('resize', onWindowResize, false)

// 4. Add textures.

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

//let angle = 0;
//function animate() {
//  requestAnimationFrame(animate)
//  camera.lookAt(camera.position.x,camera.position.y,0);
//  render()
//}
generate(scene)();

function render() {
  console.log('render');
  renderer.render(scene, camera)
}
render();
// Run render loop.
//animate();

//registerEventHandlers(clearScene, generate(scene), camera);

function clearScene() {
  console.log('clearing scene');
  for( let i = scene.children.length - 1; i >= 0; i--) {
    let obj = scene.children[i];
    scene.remove(obj);
  }
}
