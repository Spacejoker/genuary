// Dithering
import * as THREE from 'three'
import {Scene} from '.././types';
//require('source-map-support').install();
const image = require('../assets/test.png')

export function generate(scene: Scene) {
  const w = 430;
  const h = 398;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', `${w}`);
  canvas.setAttribute('height',`${h}`);
  var context = canvas?.getContext('2d')!;
  const imgSrc = document.getElementById('srcImage');
  // 430x398
  context.drawImage(imgSrc as CanvasImageSource,0,0);
  //document.body.appendChild(canvas);
  document.body.insertBefore(canvas, document.body.firstChild);

  console.log('go?');
  const imageData = context.getImageData(0, 0, w, h);
  // Iterate through every pixel
  for (let y =0; y < h; y++) {
    for (let x =0; x < w; x++) {
      const idx = x + y * w;
      const curR = imageData.data[idx*4 + 0];
      const curG = imageData.data[idx*4 + 1];
      const curB = imageData.data[idx*4 + 2];
      const newVal = (curR + curG + curB) / 3 > Math.random()*255 ? 255 : 0;

      // Modify pixel data
      imageData.data[idx*4 + 0] = newVal;
      imageData.data[idx*4 + 1] = newVal;
      imageData.data[idx*4 + 2] = newVal;
      imageData.data[idx*4 + 3] = 255;
    }
  }
  context.putImageData(imageData, 0, 0);

  return async function () {
    const points :any= [];// new Array(10000).fill([]).map(() => [Math.random()-.5, Math.random()-.5])
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
