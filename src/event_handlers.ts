import * as THREE from 'three'

export function getValueById(id: string) {
  const numRooms = document.getElementById(id)
  return (numRooms as HTMLInputElement).value
}

export function registerEventHandlers(clearScene: Function, generate: Function, camera: THREE.PerspectiveCamera) {
  // Random Rooms Num rooms click handler.
  document.getElementById("rrGenerate")?.addEventListener("click", (e:Event) => {
    clearScene();
    generate();
  });

//  // PoC button
//  const btn = document.getElementById("switchButton");
//  btn?.addEventListener("click", (e:Event) => {
//    let wallColor = 0x00ff00;
//    const newColor = Math.random() * 256*256*256 | 0;
//    for (const wall of walls) {
//      wall.material.color.setHex(newColor);
//    }
//  });
//
//  const canvasEl= document.querySelector('canvas')!;
//  let mousePressed = false;
//  // Camera mouse handling
//  canvasEl.addEventListener('wheel', function zoom(event: WheelEvent) {
//    event.preventDefault();
//
//    let newDist = camera.position.z + event.deltaY * 0.005;
//    newDist = Math.max(0.5, Math.min(50, newDist));
//    camera.position.z  = newDist;
//  });
//  canvasEl.addEventListener('mousedown', function(event: MouseEvent) {
//    if (event.button === 0) {
//      mousePressed = true;
//    }
//  });
//  canvasEl.addEventListener('mouseup', function(event: MouseEvent) {
//    if (event.button === 0) {
//      mousePressed = false;
//    }
//  });
//  canvasEl.addEventListener('mousemove', function(event: MouseEvent) {
//    if (mousePressed) {
//      const mouseScaleFactor = 0.0015 * camera.position.z;
//      camera.position.x -= event.movementX * mouseScaleFactor;
//      camera.position.y += event.movementY * mouseScaleFactor;
//    }
//  });
}
