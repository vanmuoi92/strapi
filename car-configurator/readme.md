# Car Configurator - Three.js

A simple car configurator project built with Three.js. Free Ferrari model
downloaded from Sketchfab.

<p align="center">
  <img src="https://github.com/LorenzoDoremi/Configuratore_Lambo/blob/main/demo_images/screenshot.png" width="800" title="car">
</p>

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Server sẽ chạy tại: `http://localhost:8080` (hoặc port khác nếu 8080 đang được
sử dụng)

---

# 📚 Hướng Dẫn Customize

## 📁 Các File Quan Trọng

### 1. **src/script.js** - File Chính

File này điều khiển scene, nền, bầu trời, ánh sáng.

#### 🌍 **Đổi Nền (Ground/Floor)**

```javascript
// Dòng 22: Thay đổi texture nền
var concrete = loader.load("concrete.jpg"); // Thay "concrete.jpg" bằng file khác

// Dòng 25-26: Điều chỉnh lặp lại texture
concrete.repeat.set(32, 32); // Tăng/giảm số để thay đổi kích thước pattern

// Dòng 27-31: Thay đổi màu nền
const material = new THREE.MeshStandardMaterial({
	color: 0x555555, // Đổi màu hex (ví dụ: 0xffffff = trắng, 0x000000 = đen)
	map: concrete,
});
```

#### 🌌 **Đổi Bầu Trời/Background (Dome)**

```javascript
// Dòng 53: Thay đổi texture bầu trời
var domeTexture = loader.load("dome.png"); // Thay "dome.png" bằng file khác

// Dòng 56-62: Tùy chỉnh dome
var dome = new THREE.Mesh(
	new THREE.SphereBufferGeometry(400, 20), // 400 = bán kính, tăng để dome lớn hơn
	new THREE.MeshStandardMaterial({
		map: domeTexture,
		side: THREE.DoubleSide,
	}),
);
```

#### 💡 **Đổi Ánh Sáng**

```javascript
// Dòng 43: Fog (Sương mù)
scene.fog = new THREE.FogExp2(new THREE.Color(1, 1, 1), 0.0);
// Tham số 2: mật độ sương (0.0 = không có, 0.05 = dày)

// Dòng 44-47: Đèn spotlight
lightCreator(5, 3, 0, 0.8, scene);
// Tham số: (x, y, z, intensity, scene)

// Dòng 49: Ánh sáng môi trường
scene.add(new THREE.AmbientLight(0xffffff, 1));
// 0xffffff = màu trắng, 1 = cường độ
```

---

### 2. **src/loadCar.js** - Vật Liệu Xe

File này quản lý màu sắc và vật liệu của từng phần xe.

#### 🎨 **Đổi Màu Vỏ Xe (Scocca)**

```javascript
// Dòng 11-15
export var scocca = new THREE.MeshStandardMaterial({
	color: 0xb5ff4b, // ĐỔI MÀU Ở ĐÂY (hex color)
	roughness: 0.2, // 0 = bóng, 1 = nhám
	metalness: 0.45, // 0 = không kim loại, 1 = kim loại
});
```

#### 🪟 **Đổi Màu Kính Xe (Vetro)**

```javascript
// Dòng 33-38
export var vetro = new THREE.MeshStandardMaterial({
	color: 0x000000, // Màu kính (đen)
	transparent: true,
	opacity: 0.8, // 0 = trong suốt hoàn toàn, 1 = đục
	side: THREE.DoubleSide,
});
```

#### 🛞 **Đổi Màu Vành Xe (Cerchi)**

```javascript
// Dòng 47-51
export var cerchi = new THREE.MeshStandardMaterial({
	color: 0x111111, // ĐỔI MÀU VÀNH Ở ĐÂY
	roughness: 0.2,
	metalness: 0.5,
});
```

#### 🪑 **Đổi Màu Ghế (Sedili)**

```javascript
// Dòng 22-24
export var sedili = new THREE.MeshStandardMaterial({
	color: 0xff0000, // Đỏ - ĐỔI MÀU GHẾ Ở ĐÂY
});
```

---

### 3. **src/index.html** - UI Controls

File này chứa các nút chọn màu trong giao diện.

```html
<!-- Dòng 81-85: Màu vỏ xe -->
<input class="configure" type="radio" name="color" value="0xb5FF4b" id="0">verde</input>
<!-- Thay đổi value="0x..." để đổi màu -->
```

---

## 🎨 Bảng Màu Hex Phổ Biến

```
Đỏ:        0xff0000
Xanh:      0x0000ff
Vàng:      0xffff00
Xanh lá:   0x00ff00
Cam:       0xff8800
Tím:       0x8800ff
Trắng:     0xffffff
Đen:       0x000000
Xám:       0x888888
Bạc:       0xc0c0c0
Vàng gold: 0xffd700
```

---

## 🚀 Workflow Customize Nhanh

1. **Đổi màu xe**: Sửa `loadCar.js` → dòng 12 (scocca)
2. **Đổi màu vành**: Sửa `loadCar.js` → dòng 48 (cerchi)
3. **Đổi màu kính**: Sửa `loadCar.js` → dòng 34 (vetro)
4. **Đổi nền**: Sửa `script.js` → dòng 22, 29
5. **Đổi bầu trời**: Sửa `script.js` → dòng 53
6. **Đổi ánh sáng**: Sửa `script.js` → dòng 44-49

Sau mỗi thay đổi, trình duyệt sẽ tự động reload (hot reload).

---

# 🚗 Hướng Dẫn Tạo Model Xe GLB

## 🎯 Tổng Quan

File `.glb` (GL Transmission Format Binary) là định dạng 3D tối ưu cho web, được
Three.js hỗ trợ tốt.

---

## 📥 Cách 1: Tải Model Có Sẵn (Nhanh Nhất)

### Nguồn Miễn Phí:

1. **Sketchfab** (Khuyên dùng)

    - URL: https://sketchfab.com/
    - Tìm kiếm: "car" hoặc "ferrari"
    - Lọc: ✅ Downloadable, ✅ Free
    - Download format: **glTF 2.0 (.glb)**

2. **CGTrader** - https://www.cgtrader.com/
3. **TurboSquid** - https://www.turbosquid.com/

### Sau khi tải:

```bash
# Copy file vào thư mục static
cp downloaded-car.glb ./static/ferrari.glb
```

---

## 🛠️ Cách 2: Tạo Model Từ Blender

### Bước 1: Cài Đặt Blender

-   Download: https://www.blender.org/download/
-   Miễn phí, open-source

### Bước 2: Tạo/Import Model

```
Option A: Tạo từ đầu (khó, cần kỹ năng 3D)
Option B: Import file .obj, .fbx, .dae từ nguồn khác
```

### Bước 3: Đặt Tên Materials (QUAN TRỌNG!)

Để configurator hoạt động, materials phải có tên đúng:

```
✅ Tên materials cần có:
- scocca      (vỏ xe)
- vetro       (kính)
- cerchi      (vành)
- sedili      (ghế)
- dettagli    (chi tiết)
- interni     (nội thất)
- luci        (đèn)
- fanali      (đèn pha)
```

**Cách đặt tên trong Blender:**

1. Chọn object → Tab "Shading"
2. Material Properties → Đổi tên material
3. Ví dụ: "Body" → đổi thành "scocca"

### Bước 4: Export GLB

```
File → Export → glTF 2.0 (.glb/.gltf)

Settings quan trọng:
✅ Format: glTF Binary (.glb)
✅ Include: Selected Objects (hoặc All)
✅ Transform: +Y Up
✅ Geometry: Apply Modifiers
✅ Materials: Export
✅ Compression: Draco (optional, giảm dung lượng)
```

---

## 🔄 Cách 3: Chuyển Đổi Từ Định Dạng Khác

### Từ .obj, .fbx, .dae → .glb

**Online Converter (Dễ nhất):**

-   https://products.aspose.app/3d/conversion/obj-to-glb
-   https://imagetostl.com/convert/file/obj/to/glb

**Blender:**

```
1. File → Import → Wavefront (.obj) / FBX / Collada (.dae)
2. Đặt tên materials (xem Bước 3 ở trên)
3. File → Export → glTF 2.0 (.glb)
```

---

## 📝 Cập Nhật Code Sau Khi Có Model Mới

### 1. Thay file trong `static/`

```bash
mv your-new-car.glb ./static/ferrari.glb
```

### 2. Kiểm tra tên materials

Mở `src/loadCar.js` dòng 92-119:

```javascript
switch (child.material.name) {
	case "scocca": // Tên material trong file .glb
		child.material = scocca;
		break;
	case "vetro":
		child.material = vetro;
		break;
	// ... các case khác
}
```

**Nếu tên materials khác**, sửa `case "tên-cũ"` thành `case "tên-mới"`.

### 3. Điều chỉnh vị trí/kích thước (nếu cần)

Trong `loadCar.js` dòng 84:

```javascript
gscene.position.set(-1, 0, 0); // Thay đổi x, y, z
gscene.scale.set(1, 1, 1); // Thêm dòng này để scale
```

---

## 🔍 Debug Khi Model Không Hiển Thị

```javascript
// Thêm vào loadCar.js sau dòng 86 để debug
gscene.traverse(function (child) {
	if (child.isMesh) {
		console.log("Material name:", child.material.name); // Xem tên materials
	}
});
```

Mở Console (F12) để xem danh sách tên materials thực tế trong file.

---

## ⚠️ Lưu Ý Quan Trọng

1. **Kích thước file**: Nên < 50MB để load nhanh
2. **Tên materials**: Phải khớp với code trong `loadCar.js`
3. **Vị trí pivot**: Model nên có pivot ở giữa đáy xe
4. **Scale**: Model không quá lớn/nhỏ (thử scale 1:1 trước)
5. **Textures**: Nếu có textures, chúng sẽ được embed trong file .glb

---

## 📂 Cấu Trúc Thư Mục

```
car-configurator/
├── src/
│   ├── script.js          # Scene chính, nền, bầu trời, ánh sáng
│   ├── loadCar.js         # Load model và materials
│   ├── lightCreator.js    # Tạo đèn
│   ├── index.html         # UI controls
│   └── style.css          # Styles
├── static/
│   ├── ferrari.glb        # Model xe
│   ├── concrete.jpg       # Texture nền
│   ├── dome.png           # Texture bầu trời
│   └── logo.png           # Logo
├── bundler/               # Webpack configs
└── package.json
```

---

## 🎓 Credits

Original project by
[LorenzoDoremi](https://github.com/LorenzoDoremi/Configuratore_Lambo)
