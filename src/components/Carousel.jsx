import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { OrbitControls } from "../utils/OrbitControls";

import CarouselCLUNITED from "./CarouselCLUNITED";
import CarouselGoobers from "./CarouselGoobers";
import CarouselSandbox from "./CarouselSandbox";
import CarouselXena from "./CarouselXena";
import CarouselNFTMiami from "./CarouselNFTMiami";
import GoobersGLTF from "../utils/GoobersGLTF";

function Carousel() {
  const carousel = useRef(null);
  const [rotate, setRotate] = useState();
  const { goobersGLTF } = GoobersGLTF()
  
  const [rotation] = useState({
    goobers: {
      start: -0.3,
      mid: 0.34,
      end: 0.98,
      difference: 0.64
    },
    sandbox: {
      start: 0.95,
      mid: 1.58,
      end: 2.18,
      difference: 0.6
    },
    xena: {
      start: 2.18,
      mid: 2.82,
      end: -2.84,
      difference: 0.64
    },
    clunited: {
      start: -2.84,
      mid: -2.19,
      end: -1.55,
      difference: 0.64
    },
    nftmiami: {
      start: -1.58,
      mid: -0.94,
      end: -0.3,
      difference: 0.64
    }
  })

  useEffect(() => {
    const objects = [];
    const count = 5;

    let camera = new THREE.PerspectiveCamera(70, carousel.current.clientWidth / carousel.current.clientHeight, 0.01, 20);
    camera.position.set(0, 1, 7);

    let scene = new THREE.Scene();
    scene.background = new THREE.Color();
    scene.updateMatrixWorld(true);
    camera.lookAt(scene.position);

    // HELPER
    // const axesHelper = new THREE.AxesHelper( 5 );
    // scene.add( axesHelper );

    const geometry = new THREE.SphereBufferGeometry();
    const material = new THREE.MeshNormalMaterial();

    goobersGLTF(scene, objects, count, geometry, material);

    const light = new THREE.AmbientLight(0x404040, 5);
    scene.add(light);

    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(carousel.current.clientWidth, carousel.current.clientHeight);
    carousel.current.appendChild(renderer.domElement);

    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.5;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.2;
    controls.enableZoom = false;

    function animate() {
      requestAnimationFrame(animate);

      for (let object of objects) {
        object.rotation.z += 0.005;
        object.rotation.x += 0.002;
      }

      const rot = controls.getAzimuthalAngle();
      let rotMul = 0;
      setRotate(rot);

      function transform(rotMul) {
        return document.querySelector(`.carousel-description > div:nth-child(1)`).style.transform = `translateX(${rotMul}px)`;
      }

      // if(rot >= rotation.goobers.start && rot < 0) {
      //   rotMul = ((rot-rotation.goobers.start)-rotation.goobers.difference) * 550;
      //   transform(rotMul);
      // } else if(rot < rotation.goobers.end && rot > 0) {
      //   rotMul = ((rot-rotation.goobers.end)+rotation.goobers.difference) * 550;
      //   transform(rotMul);
      // }

      // else if(rot >= rotation.sandbox.start && rot < rotation.sandbox.end) {
      //   rotMul = ((rot-rotation.sandbox.start)-rotation.sandbox.difference) * 550;
      //   transform(rotMul);
      // }
      
      // else if(rot >= rotation.xena.start && rot > 0) {
      //   rotMul = ((rot-rotation.xena.start)-rotation.xena.difference) * 550;
      //   transform(rotMul);
      // } else if(rot < rotation.xena.end && rot < 0) {
      //   rotMul = ((rot-rotation.xena.end)+rotation.xena.difference) * 550;
      //   transform(rotMul);
      // }

      // if(rot >= rotation.clunited.start && rot < rotation.clunited.end) {
      //   rotMul = ((rot-rotation.clunited.start)-rotation.clunited.difference) * 550;
      //   transform(rotMul);
      // }

      // if(rot >= rotation.nftmiami.start && rot < rotation.nftmiami.end) {
      //   rotMul = ((rot-rotation.nftmiami.start)-rotation.nftmiami.difference) * 550;
      //   transform(rotMul);
      // }

      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }, [goobersGLTF, rotation])

  // useEffect(() => {
  //   console.log(rotate);
  // }, [rotate])

  return (
    <div>
      <div
        ref={carousel}
        className="carousel"
        style={{ width: "90%", height: "600px", margin: "40px" }}
      ></div>
      <div
        className="carousel-description"
      >
        {rotate >= rotation.goobers.start && rotate < rotation.goobers.end
          ? <CarouselGoobers />
          : rotate >= rotation.sandbox.start && rotate < rotation.sandbox.end
          ? <CarouselSandbox />
          : rotate >= rotation.xena.start || rotate < rotation.xena.end
          ? <CarouselXena />
          : rotate >= rotation.clunited.start && rotate < rotation.clunited.end
          ? <CarouselCLUNITED />
          : <CarouselNFTMiami />
        }
        
      </div>
    </div>

  )
}

export default Carousel;