import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useCallback } from "react";

function GoobersGLTF(scene) {
  const goobersGLTF = useCallback((scene, objects, count, geometry, material) => {
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('three/examples/js/libs/draco');
    loader.setDRACOLoader(dracoLoader);

    for (let i = 0; i < count; i++) {
      loader.load(
        // resource URL
        '/assets/goobers/goobers2.gltf',
        // called when the resource is loaded
        function (gltf) {
          const mesh = gltf.scene;
          // const mesh = new THREE.Mesh(geometry, material);
          const t = i / count * 2 * Math.PI;
          mesh.position.x = Math.cos(t) * 4;
          mesh.position.y = 0.5;
          mesh.position.z = Math.sin(t) * 4;
          scene.add(mesh);
          objects.push(mesh)
        },
        // called while loading is progressing
        function (xhr) {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // called when loading has errors
        function (error) {
          console.log('An error happened', error.toString());
        }
      );
    }
  }, [])

  return { goobersGLTF };
}

export default GoobersGLTF;