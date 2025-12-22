import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Color, DoubleSide, TextureLoader } from "three";
import { domeTexture } from "./script";
import gsap from "gsap";

const loader = new GLTFLoader();

// Materials exports (giữ nguyên)
export var scocca = new THREE.MeshStandardMaterial({
  color: 0xb5ff4b,
  roughness: 0.2,
  metalness: 0.45,
});

export var dettagli = new THREE.MeshStandardMaterial({
  color: 0x111111,
  roughness: 0.6,
});

export var sedili = new THREE.MeshStandardMaterial({
  color: 0xff0000,
});

export var sedili2 = new THREE.MeshStandardMaterial({
  color: 0x222222,
});

export var interni = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  roughness: 0.5,
});

export var vetro = new THREE.MeshStandardMaterial({
  color: 0x000000,
  transparent: true,
  opacity: 0.8,
  side: THREE.DoubleSide,
});

export var luci = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  emissiveIntensity: 1,
  side: THREE.DoubleSide,
});

export var cerchi = new THREE.MeshStandardMaterial({
  color: 0x111111,
  roughness: 0.2,
  metalness: 0.5,
});

var fanali = new THREE.MeshStandardMaterial({
  color: 0xddddff,
  transparent: true,
  opacity: 0.8,
  emissive: 0xddddff,
  emissiveIntensity: 100,
  side: THREE.DoubleSide,
});

export var parti = [
  scocca,    // id="0" - Carrozzeria/Vỏ xe
  dettagli,  // id="1" - Dettagli/Chi tiết
  sedili,    // id="2" - Sedili/Ghế
  cerchi,    // id="3" - Cerchioni/Vành
  interni,   // id="4" - Interni/Nội thất
  vetro,     // id="5" - Vetro/Kính
  luci,      // id="6" - Luci/Đèn
];

// ========== BIẾN TOÀN CỤC CHO TÍNH NĂNG MỚI ==========
export let carGroup = null;
let carParts = [];
let isExploded = false;
export let autoRotate = false;

// Doors
let doorLeft = null;
let doorRight = null;
let isDoorOpen = false;

// ========== HÀM LOAD XE ==========
export function loadCar(scene) {
  loader.load(
    "ferrari.glb",
    function (gltf) {
      carGroup = gltf.scene;
      carGroup.position.set(-1, 0, 0);
      scene.add(carGroup);

      carGroup.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          // Lưu vị trí gốc cho exploded view
          child.userData.originalPosition = child.position.clone();
          carParts.push(child);

          // Debug: Xem tên materials
          console.log("✅ Material:", child.material.name, "| Mesh:", child.name);

          // Tìm cửa xe (tên có thể khác tùy model)
          const meshName = child.name.toLowerCase();
          if (meshName.includes("door") && meshName.includes("left")) {
            doorLeft = child;
            console.log("🚪 Found Left Door:", child.name);
          }
          if (meshName.includes("door") && meshName.includes("right")) {
            doorRight = child;
            console.log("🚪 Found Right Door:", child.name);
          }

          // Apply materials
          switch (child.material.name) {
            case "scocca":
              child.material = scocca;
              break;
            case "dettagli":
              child.material = dettagli;
              break;
            case "sedili":
              child.material = sedili;
              break;
            case "interni":
              child.material = interni;
              break;
            case "sedili2":
              child.material = sedili2;
              break;
            case "vetro":
              child.material = vetro;
              break;
            case "luci":
              child.material = luci;
              break;
            case "fanali":
              child.material = fanali;
              break;
            case "cerchi":
              child.material = cerchi;
              break;
          }
        }
      });

      console.log("🚗 Xe đã được load với", carParts.length, "bộ phận");
    }
  );
}

// ========== TÍNH NĂNG 1: MỞ/ĐÓNG CỬA ==========
export function toggleDoors() {
  if (!doorLeft && !doorRight) {
    console.warn("⚠️ Không tìm thấy mesh cửa. Model có thể không có cửa riêng biệt.");
    alert("Model này không có cửa riêng biệt để mở!");
    return;
  }

  isDoorOpen = !isDoorOpen;
  const targetRotation = isDoorOpen ? Math.PI / 3 : 0; // 60 độ

  if (doorLeft) {
    gsap.to(doorLeft.rotation, {
      y: targetRotation,
      duration: 1,
      ease: "power2.inOut"
    });
  }

  if (doorRight) {
    gsap.to(doorRight.rotation, {
      y: -targetRotation,
      duration: 1,
      ease: "power2.inOut"
    });
  }

  console.log(isDoorOpen ? "🚪 Cửa đã mở" : "🚪 Cửa đã đóng");
}

// ========== TÍNH NĂNG 2: EXPLODED VIEW ==========
export function toggleExplode() {
  if (!carGroup || carParts.length === 0) {
    console.warn("⚠️ Xe chưa được load");
    return;
  }

  isExploded = !isExploded;
  const explodeDistance = 2;

  carParts.forEach((part) => {
    // Tính vector từ tâm xe đến part
    const centerPos = new THREE.Vector3(-1, 0, 0); // Vị trí tâm xe
    const direction = part.position.clone().sub(centerPos).normalize();

    if (isExploded) {
      // Explode: Di chuyển ra xa
      gsap.to(part.position, {
        x: part.userData.originalPosition.x + direction.x * explodeDistance,
        y: part.userData.originalPosition.y + direction.y * explodeDistance,
        z: part.userData.originalPosition.z + direction.z * explodeDistance,
        duration: 1.5,
        ease: "power2.out"
      });
    } else {
      // Implode: Trở về vị trí gốc
      gsap.to(part.position, {
        x: part.userData.originalPosition.x,
        y: part.userData.originalPosition.y,
        z: part.userData.originalPosition.z,
        duration: 1.5,
        ease: "power2.inOut"
      });
    }
  });

  console.log(isExploded ? "🔧 Exploded view ON" : "🔧 Exploded view OFF");
}

// ========== TÍNH NĂNG 3: TOGGLE AUTO ROTATE ==========
export function toggleAutoRotate() {
  autoRotate = !autoRotate;
  console.log(autoRotate ? "🔄 Auto rotate ON" : "🔄 Auto rotate OFF");
  return autoRotate;
}

// ========== TÍNH NĂNG 4: CAMERA PRESETS ==========
export function setCameraView(camera, preset) {
  const cameraPresets = {
    front: { position: [3, 1.5, 6], lookAt: [-1, 0, 0] },
    back: { position: [-5, 1.5, -4], lookAt: [-1, 0, 0] },
    side: { position: [4, 1.5, 0], lookAt: [-1, 0, 0] },
    top: { position: [-1, 8, 0], lookAt: [-1, 0, 0] },
    interior: { position: [-1, 1.2, 0.5], lookAt: [-1, 1, -1] },
  };

  const view = cameraPresets[preset];
  if (!view) {
    console.warn("⚠️ Preset không tồn tại:", preset);
    return;
  }

  gsap.to(camera.position, {
    x: view.position[0],
    y: view.position[1],
    z: view.position[2],
    duration: 1.5,
    ease: "power2.inOut",
    onUpdate: () => {
      camera.lookAt(...view.lookAt);
    }
  });

  console.log("📸 Camera view:", preset);
}

// ========== TÍNH NĂNG 5: LƯU/LOAD CẤU HÌNH ==========
export function saveConfiguration() {
  const config = {
    scocca: scocca.color.getHex(),
    vetro: vetro.color.getHex(),
    cerchi: cerchi.color.getHex(),
    sedili: sedili.color.getHex(),
    dettagli: dettagli.color.getHex(),
    interni: interni.color.getHex(),
    luci: luci.color.getHex(),
  };

  localStorage.setItem('carConfig', JSON.stringify(config));
  alert('✅ Cấu hình đã được lưu!');
  console.log("💾 Config saved:", config);
}

export function loadConfiguration() {
  const saved = localStorage.getItem('carConfig');
  if (saved) {
    const config = JSON.parse(saved);

    scocca.color.setHex(config.scocca);
    vetro.color.setHex(config.vetro);
    cerchi.color.setHex(config.cerchi);
    sedili.color.setHex(config.sedili);
    dettagli.color.setHex(config.dettagli);
    interni.color.setHex(config.interni);
    luci.color.setHex(config.luci);

    alert('✅ Cấu hình đã được tải!');
    console.log("💾 Config loaded:", config);
  } else {
    alert('⚠️ Chưa có cấu hình nào được lưu!');
  }
}

// ========== TÍNH NĂNG 6: EXPORT SCREENSHOT ==========
export function takeScreenshot(renderer, scene, camera) {
  // Render một frame
  renderer.render(scene, camera);

  // Lấy canvas data
  const canvas = renderer.domElement;
  const dataURL = canvas.toDataURL('image/png');

  // Tạo link download
  const link = document.createElement('a');
  const timestamp = new Date().toISOString().slice(0, 10);
  link.download = `car-config-${timestamp}.png`;
  link.href = dataURL;
  link.click();

  console.log("📸 Screenshot saved");
}
