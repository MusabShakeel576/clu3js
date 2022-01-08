import { useEffect, useRef } from "react";
import * as THREE from "three";

import { OrbitControls } from "../utils/OrbitControls";

import CarouselCLUNITED from "./CarouselCLUNITED";
import CarouselGoobers from "./CarouselGoobers";
import CarouselSandbox from "./CarouselSandbox";
import CarouselXena from "./CarouselXena";
import CarouselNFTMiami from "./CarouselNFTMiami";

function Carousel() {
  const carousel = useRef(null);

  useEffect(() => {
    const objects = [];

    let camera = new THREE.PerspectiveCamera(70, carousel.current.clientWidth / carousel.current.clientHeight, 0.01, 20);
    camera.position.set(0, 1, 7);

    let scene = new THREE.Scene();
    scene.background = new THREE.Color();
    scene.updateMatrixWorld(true);
    // const axesHelper = new THREE.AxesHelper( 5 );
    // scene.add( axesHelper );
    camera.lookAt(scene.position);

    const geometry = new THREE.SphereBufferGeometry();
    const material = new THREE.MeshNormalMaterial();

    const count = 5;

    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(geometry, material);

      const t = i / count * 2 * Math.PI;

      mesh.position.x = Math.cos(t) * 4;
      mesh.position.y = 0.5;
      mesh.position.z = Math.sin(t) * 4;
      scene.add(mesh);
      objects.push(mesh)
    }

    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(carousel.current.clientWidth, carousel.current.clientHeight);
    carousel.current.appendChild(renderer.domElement);

    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.5;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2;
    controls.enableZoom = false;

    function animate() {
      requestAnimationFrame(animate);

      for (let object of objects) {
        object.rotation.z += 0.005;
        object.rotation.x += 0.002;
      }

      // let position = new THREE.Vector3();
      // position.setFromMatrixPosition(objects[0].matrixWorld);
      // console.log(position.x + ',' + position.y + ',' + position.z);
      const rot = controls.getAzimuthalAngle();
      const rotMul = rot*600;
      for (let i = 1; i <= count; i++) {
        document.querySelector(`.carousel-description > div:nth-child(${i})`).style.transform = `translateX(${rotMul}px)`;
      }

      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }, [])

  return (
    <div>
      <div
        ref={carousel}
        style={{ width: "90%", height: "600px", margin: "40px" }}
      ></div>
      <div
        className="carousel-description"
      >
        <CarouselGoobers />
        <CarouselSandbox />
        <CarouselXena />
        <CarouselCLUNITED />
        <CarouselNFTMiami />
      </div>
    </div>

  )
}

export default Carousel;