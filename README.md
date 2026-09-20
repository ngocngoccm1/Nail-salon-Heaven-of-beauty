# Heaven of beauty

Landing page bằng tiếng Séc cho Nail salon Heaven of beauty tại Veveří 339/34, 602 00 Brno-střed.

## Chạy thử

Mở `index.html` hoặc chạy `python -m http.server 4173 --bind 127.0.0.1` trong thư mục dự án, rồi mở http://127.0.0.1:4173. Website tĩnh, không cần build.

## Nguồn thông tin

- Tên, ngôn ngữ, địa chỉ, điện thoại, mạng xã hội và liên kết Maps lấy từ `Tài liệu không có tiêu đề.docx`.
- Giá lấy từ ảnh bảng giá `402aa79d6c89511235c0ccb435aee60a71903b1a.jpg`. Phần bị gạch đỏ không đưa lên. Manikúra klasik không có giá đọc được nên không tự điền giá.
- Giờ mở cửa đã đối chiếu ngày 05/09/2026 qua [Živéfirmy](https://www.zivefirmy.cz/heaven-of-beauty_f1919772) và [Waze](https://www.waze.com/live-map/directions/cz/jihomoravsky-kraj/nail-salon-heaven-of-beauty?to=place.ChIJQ82B502VEkcRcyEnOrYrZmQ).

## Giao diện và ảnh

Tông xám ghi, ảnh salon thật, có bố cục desktop/mobile và chế độ tối. Trang gồm thông tin dịch vụ, bảng giá dạng tab, thư viện 18 ảnh thật, ba video ngắn, FAQ, bản đồ, liên hệ và nút gọi cố định trên điện thoại.

18 ảnh do người dùng cung cấp được chuyển nguyên nội dung từ PNG sang WebP trong `assets/real/`. Không chỉnh sửa móng, màu hay thêm chi tiết vào ảnh. Ảnh `photo-12.webp` dùng ở hero; các ảnh khác giới thiệu dịch vụ và xuất hiện đủ trong thư viện. Ảnh pedicure bổ sung dùng tại ô dịch vụ pedicure (`assets/real/pedicure-treatment.webp`). Ảnh gốc vẫn ở vị trí tệp đính kèm do Codex quản lý.

Ba video người dùng cung cấp nằm trong `assets/video/`. Video giữ nguyên nội dung gốc, có ảnh poster WebP, tải khi đi tới phần video, phát không tiếng, dừng khi rời khỏi màn hình. Nếu thiết bị bật giảm chuyển động, video chỉ phát khi bấm nút. Video thứ ba trong bốn tệp gốc là cảnh du lịch nên không dùng trên landing page salon.

## Kiểm tra

Đã kiểm tra ảnh, menu, bảng giá, nút mở rộng thư viện, chế độ tối và tràn ngang ở desktop/mobile. Ảnh chụp kiểm tra trong `qa/`. Báo cáo Lighthouse cũ trong `qa/` được tạo trước lần thay ảnh thật và video, không phản ánh phiên bản này.
