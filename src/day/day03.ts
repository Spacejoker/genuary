// "Space"
import * as THREE from 'three'
import {RenderStuff} from '../types';
import {initScene} from '../scene';
// Recorded using 'peek'.

let stuff: RenderStuff = initScene();
let sun: THREE.Mesh;
let earth: THREE.Mesh;

export function run() {
  const stuff = initScene();

  let loop = 0;

  window.addEventListener('resize', onWindowResize, false)

  // create sun

  // 4. Add textures.
  const loader = new THREE.TextureLoader();
  loader.load( 'assets/earth.png', function ( texture ) {
    const geometry = new THREE.SphereGeometry( 0.2, 20, 20 );
    const material = new THREE.MeshBasicMaterial( { map: texture} );
    earth = new THREE.Mesh( geometry, material );
  } );
  loader.load( 'assets/sun.jpeg', function ( texture ) {
    const geometry = new THREE.SphereGeometry( 1, 32, 16 );
    const material = new THREE.MeshBasicMaterial( { map: texture} );
    sun = new THREE.Mesh( geometry, material );
  });

  animate();
  let angle = 0;
}



function render() {
  // Scene is always cleared??
  stuff.renderer.render(stuff.scene, stuff.camera)
}

function animate() {
  requestAnimationFrame(animate)
  stuff.camera.lookAt(stuff.camera.position.x,stuff.camera.position.y,0);
  if (earth && sun) {
    stuff.scene.add( sun );
    stuff.scene.add( earth );
  }
  let earthAngle = Date.now()/1000 % (2*Math.PI);
  earth.position.set(2*Math.cos(earthAngle), 1*Math.sin(earthAngle), 1*Math.sin(earthAngle));
  render()
}

function onWindowResize() {
  stuff.camera.aspect = window.innerWidth / window.innerHeight
  stuff.camera.updateProjectionMatrix()
  stuff.renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

// Run render loop.

//registerEventHandlers(clearScene, generate(scene), camera);
//
//function clearScene(scene: Scene) {
//  console.log('clearing scene');
//  for( let i = scene.children.length - 1; i >= 0; i--) {
//    let obj = scene.children[i];
//    scene.remove(obj);
//  }
//}

function addCellsToScene(points: number[][], scene : any, width:number, height: number) {
  const wallVertices : number[] = [];
  let pathVertices : number[]= [];
  const t0 = Date.now();
  for (const p of points) {
    const resize = 4;
    const x = p[0]* resize;
    const y = p[1]* resize;
    let dim = 0.03;

    // create square:
    const vertices = [
      x, y, 0, x+dim, y, 0, x+dim,y+dim, 0,
      //x, y, 0, x+dim, y+dim, 0, x, y+dim, 0
    ];
    for (const v of vertices) {
      pathVertices.push(v);
    }
  }
  console.log('drawing this stuff....', Date.now() - t0);
  const vertices = Float32Array.from(pathVertices)
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
  const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  const mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(0, 0, 0);
  scene.add( mesh );
}
