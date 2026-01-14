Hướng dẫn Deploy lên Google Cloud Platform (GCP) Dưới đây là các bước chi tiết
để bạn triển khai dự án lên một máy ảo (Compute Engine instance) trên Google
Cloud.

Bước 1: Tạo Instance trên GCP Console Truy cập Google Cloud Console -> Compute
Engine -> VM Instances. Nhấn Create Instance. Cấu hình đề xuất: Machine type:
e2-medium (vCPU 2, RAM 4GB) - Đây là mức tối thiểu để chạy mượt cả backend và
frontend. Boot disk: Ubuntu 22.04 LTS hoặc 24.04 LTS. Firewall: Tích chọn Allow
HTTP traffic và Allow HTTPS traffic. Sau khi tạo xong, ghi lại External IP. Bước
2: Thiết lập Firewall (Rất quan trọng) GCP mặc định chặn các cổng không phải
80/443.

Vào VPC Network -> Firewall. Nhấn Create Firewall Rule: Name: allow-strapi
Targets: All instances in the network IP ranges: 0.0.0.0/0 Protocols and ports:
tcp:1337 (Để truy cập API/Admin của Strapi). Bước 3: Cài đặt môi trường trên VPS
(SSH) Mở terminal SSH vào VPS và chạy các lệnh:

# Cập nhật hệ thống

sudo apt update && sudo apt upgrade -y

# Cài đặt Node.js (Dùng NVM để quản lý)

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc nvm install 20

# Cài đặt công cụ quản lý process (PM2)

npm install pm2 -g

# Cài đặt Nginx (Làm Reverse Proxy)

sudo apt install nginx -y Bước 4: Triển khai Backend (Strapi) Clone code từ
GitHub: git clone <your-repo-url>. Truy cập folder backend: cd backend. Cài đặt
và build: npm install cp .env.example .env # Sau đó dùng 'nano .env' để sửa các
key bảo mật npm run build Chạy backend với PM2: pm2 start npm --name
"nimo-backend" -- run start pm2 save Bước 5: Triển khai Frontend (Vite) Truy cập
folder frontend: cd ../frontend. Cấu hình .env.production trỏ về IP của backend:
VITE_API_URL=http://<IP_VIRTUAL_MACHINE>:1337. Cài đặt và build: npm install npm
run build Folder dist sẽ được tạo ra. Chúng ta sẽ dùng Nginx để phục vụ folder
này. Bước 6: Cấu hình Nginx Tạo file cấu hình: sudo nano
/etc/nginx/sites-available/nimo. Dán nội dung sau (Thay đổi thông tin tương
ứng): server { listen 80; server_name <EXTERNAL_IP_HOAC_DOMAIN>; # Frontend
location / { root /home/<user>/nimo-electric-kart/frontend/dist; index
index.html; try_files $uri $uri/ /index.html; } # Backend Proxy (Nếu muốn truy
cập Strapi qua domain chính) location /api/ { proxy_pass http://localhost:1337;
proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header
Connection 'upgrade'; proxy_set_header Host $host; proxy_cache_bypass
$http_upgrade; } } Kích hoạt cấu hình: sudo ln -s
/etc/nginx/sites-available/nimo /etc/nginx/sites-enabled/ sudo nginx -t sudo
systemctl restart nginx Bước 7: Cài đặt Database (Tùy chọn) Nếu không dùng
SQLite, bạn nên cài PostgreSQL trên chính VPS đó: sudo apt install postgresql
postgresql-contrib -y.

Lưu ý: Để bảo mật bài bản, bạn nên mua một tên miền và cài đặt SSL bằng Certbot
(sudo apt install certbot python3-certbot-nginx).
