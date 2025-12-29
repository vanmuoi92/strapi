# Cấu hình Nginx Cuối cùng (Đã xác thực đường dẫn)

Dựa trên cấu trúc thư mục bạn cung cấp, đây là cấu hình chính xác nhất để chạy
dự án.

## 1. Cấu hình Nginx

Chạy lệnh: `sudo nano /etc/nginx/sites-available/nimo-project`

Dán toàn bộ nội dung sau vào:

```nginx
server {
    listen 80;
    server_name 34.92.74.111;

    # TRỎ TRỰC TIẾP VÀO FOLDER FRONTEND
    root /home/vanmuoild001/strapi/frontend/dist;
    index index.html;

    location / {
        # Đảm bảo React Router hoạt động (tránh lỗi 404 khi refresh trang)
        try_files $uri $uri/ /index.html;
    }

    # PROXY CHO BACKEND API
    location /api/ {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Cấu hình cho Strapi Admin (Tùy chọn)
    location /admin {
        proxy_pass http://localhost:1337/admin;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 2. Kích hoạt và chạy

Sau khi lưu file (Ctrl+O, Enter, Ctrl+X), hãy chạy các lệnh sau:

```bash
# Xóa cấu hình mặc định nếu có
sudo rm /etc/nginx/sites-enabled/default

# Tạo link kích hoạt cấu hình mới
sudo ln -s /etc/nginx/sites-available/nimo-project /etc/nginx/sites-enabled/

# Kiểm tra syntax (Phải báo 'successful')
sudo nginx -t

# Khởi động lại Nginx
sudo systemctl restart nginx
```

## 3. Lưu ý quan trọng

1. **Build Frontend**: Bạn phải chạy `npm run build` trong thư mục
   `/home/vanmuoild001/strapi/frontend/` trước để tạo ra thư mục `dist`.
2. **Quyền truy cập**: Nếu Nginx báo lỗi **403 Forbidden**, hãy cấp quyền đọc
   cho folder: `chmod -R 755 /home/vanmuoild001/strapi`
3. **HTTP**: Truy cập qua `http://34.92.74.111` (không có chữ 's').
