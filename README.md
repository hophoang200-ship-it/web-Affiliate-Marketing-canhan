# GócLàmViệc – Website affiliate (frontend tĩnh)

## Cấu trúc
- index.html – khung trang
- assets/css/style.css – giao diện (sáng/tối, responsive)
- assets/js/config.js – CẤU HÌNH, sản phẩm mẫu, bài viết mẫu, LINKS affiliate
- assets/js/app.js – định tuyến, tìm kiếm/lọc/sắp xếp, so sánh, form, SEO meta
- robots.txt – mẫu

## Thư viện / framework
Không dùng thư viện hay framework nào (thuần HTML/CSS/JavaScript), không cần cài đặt.

## Chạy thử
Mở index.html bằng trình duyệt, hoặc: `python3 -m http.server 8000` rồi vào http://localhost:8000

## Cấu hình
- Đổi tên, ngách, danh mục: `CONFIG` trong config.js
- Thêm link affiliate (chỉ khi đã được đối tác chấp thuận): `LINKS`, domain được phép: `ALLOWED`
- Google Analytics: điền `CONFIG.ga4Id` và tự thêm script gtag.js + thông báo cookie
- Sản phẩm trong PRODUCTS là DỮ LIỆU MINH HỌA, cần thay bằng dữ liệu thật

## Giới hạn
Chưa có backend: không có đăng nhập quản trị, redirect /go/, lưu thống kê, gửi form liên hệ, sitemap.xml, Schema.org.
Trang chính sách là bản nháp, cần rà soát pháp lý.
