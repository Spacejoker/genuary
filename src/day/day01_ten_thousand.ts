import * as THREE from 'three'
import {Scene} from '.././types';

export function generate(scene: Scene) {
  return async function () {
    const points = new Array(10000).fill([]).map(() => [Math.random()-.5, Math.random()-.5])
    //const rsp : any = await dealWithRequest(params);
    //addCellsToScene(rsp.layer[0].tile, scene, params.width, params.height);
    const grid = ["#.","##"];
    addCellsToScene(points, scene, 2, 2);
  };
}

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

