import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { OrbitControls } from "../utils/OrbitControls";

import CarouselCLUNITED from "./CarouselCLUNITED";
import CarouselGoobers from "./CarouselGoobers";
import CarouselSandbox from "./CarouselSandbox";
import CarouselXena from "./CarouselXena";
import CarouselNFTMiami from "./CarouselNFTMiami";
import GoobersGLTF from "../utils/GoobersGLTF";

import CarouselElement from "../components/CarouselElement"

function Carousel() {
  const carousel = useRef(null);
  const [rotate, setRotate] = useState();
  const { goobersGLTF } = GoobersGLTF()
  
  const goobersRef = useRef(null)
  const sandboxRef = useRef(null)
  const xenaRef = useRef(null)
  const clunitedRef = useRef(null)
  const nftmiamiRef = useRef(null)

  const goobersEcosistem = {
    title: "Goobers",
    description: "Goobers NFT are 15,000 uniquely generated arts"
  }

  const sandboxEcosistem = {
    title: "Sandbox",
    description: "Sandbox is a game developed in a metaverse"
  }

  const xenaEcosistem = {
    title: "Xena",
    description: "Xena is a custom game on Rust"
  }

  const clunitedEcosistem = {
    title: "CLUNITED",
    description: "CLUNITED is a non-profit 501(c) organization"
  }

  const nftmiamiEcosistem = {
    title: "NFTMiami",
    description: "NFTMiami is a meetup for NFT community"
  }
  
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
      setRotate(rot);

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
          ? <CarouselElement title={goobersEcosistem.title} description={goobersEcosistem.description} ref={goobersRef}/>
          : rotate >= rotation.sandbox.start && rotate < rotation.sandbox.end
          ? <CarouselElement title={sandboxEcosistem.title} description={sandboxEcosistem.description} ref={sandboxRef}/>
          : rotate >= rotation.xena.start || rotate < rotation.xena.end
          ? <CarouselElement title={xenaEcosistem.title} description={xenaEcosistem.description} ref={xenaRef}/>
          : rotate >= rotation.clunited.start && rotate < rotation.clunited.end
          ? <CarouselElement title={clunitedEcosistem.title} description={clunitedEcosistem.description} ref={clunitedRef}/>
          : <CarouselElement title={nftmiamiEcosistem.title} description={nftmiamiEcosistem.description} ref={nftmiamiRef}/>
        }
        
      </div>
    </div>

  )
}

export default Carousel;