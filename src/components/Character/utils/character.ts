import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        let modelUrl: string;

        // Check if Web Crypto API is available (only in secure contexts / HTTPS or localhost)
        if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
          try {
            const encryptedBlob = await decryptFile(
              "/models/character.enc",
              "Character3D#@"
            );
            modelUrl = URL.createObjectURL(new Blob([encryptedBlob]));
          } catch (decryptErr) {
            console.error("Decryption failed, falling back to unencrypted model:", decryptErr);
            modelUrl = "/models/character.glb";
          }
        } else {
          console.warn(
            "Web Crypto API (crypto.subtle) is not available. This usually happens when accessing the site via HTTP instead of HTTPS (insecure contexts). Falling back to unencrypted model."
          );
          modelUrl = "/models/character.glb";
        }

        let character: THREE.Object3D;
        loader.load(
          modelUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
