# Heaven of beauty

Landing page bằng tiếng Séc cho Heaven of beauty tại Veveří 339/34, 602 00 Brno-střed: nehty, pedikúra, řasy, head spa và massage.

## Chạy thử

Mở `index.html` hoặc chạy `python -m http.server 4173 --bind 127.0.0.1` trong thư mục dự án, rồi mở http://127.0.0.1:4173. Website tĩnh, không cần build.

`index.html` nằm ngay thư mục gốc để GitHub Pages có thể phục vụ trực tiếp. CSS, JavaScript và hình ảnh đều dùng đường dẫn tương đối, hoạt động cả khi website nằm dưới đường dẫn repository.

## Nguồn thông tin

- Tên, ngôn ngữ, địa chỉ, điện thoại, mạng xã hội và liên kết Maps lấy từ `Tài liệu không có tiêu đề.docx`.
- Giá lấy từ ảnh bảng giá `402aa79d6c89511235c0ccb435aee60a71903b1a.jpg`. Phần bị gạch đỏ không đưa lên. Manikúra klasik không có giá đọc được nên không tự điền giá.
- Giờ mở cửa đã đối chiếu ngày 05/09/2026 qua [Živéfirmy](https://www.zivefirmy.cz/heaven-of-beauty_f1919772) và [Waze](https://www.waze.com/live-map/directions/cz/jihomoravsky-kraj/nail-salon-heaven-of-beauty?to=place.ChIJQ82B502VEkcRcyEnOrYrZmQ).
- Dịch vụ mi, head spa và massage được người dùng xác nhận bổ sung ngày 17/10/2026. Dịch vụ nối và dặm mi còn được đối chiếu trên [hồ sơ salon tại Notino](https://www.notino.cz/salony/heaven-of-beauty/). Chưa có bảng giá, thời lượng hoặc liệu trình được xác nhận cho ba nhóm này; website hướng khách gọi để được tư vấn thay vì tự đặt số liệu.
- Ba trích đoạn đánh giá của Sára S., Denisa U. và Adriana A. lấy từ [Zlatá Firma](https://www.zlatafirma.cz/company/heaven-of-beauty-nail-veveri-brno-986556), nơi ghi rõ nguồn Google Maps. Đã đối chiếu ngày 17/10/2026; website ghi nguồn trung gian dưới các trích đoạn. Không hiển thị điểm tổng, số sao từng người hoặc tổng số đánh giá vì chưa xác minh trực tiếp dữ liệu hiện tại trên Google.

## Giao diện và ảnh

Tông xám ghi với điểm nhấn xanh và đỏ, ảnh salon thật, bố cục desktop/mobile. Phần đầu giới thiệu đủ nhóm dịch vụ và nút chỉ đường, tiếp đến ba video, dịch vụ mi/head spa/massage, đánh giá, dịch vụ nail, bảng giá, thư viện, FAQ và liên hệ. Có nút gọi cố định trên điện thoại.

18 ảnh do người dùng cung cấp được chuyển từ PNG sang WebP trong `assets/real/`. Không chỉnh sửa móng hoặc thêm chi tiết vào tệp ảnh; lớp phủ CSS làm dịu ảnh nền hero. Ảnh `photo-08.webp` dùng ở hero, `photo-11.webp` giới thiệu dịch vụ mi; các ảnh vẫn xuất hiện đầy đủ trong thư viện. Ảnh pedicure bổ sung dùng tại ô dịch vụ pedicure (`assets/real/pedicure-treatment.webp`).

Instagram dùng SVG camera nhận diện trong `assets/brand/instagram.svg`. Biểu tượng Google Maps và Google G được lưu cục bộ từ tài nguyên Google: [Maps](https://www.gstatic.com/images/branding/product/2x/maps_96in128dp.png), [Google G](https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png). Khối Maps mở trực tiếp liên kết salon, khối Instagram mở đúng tài khoản; không cần tải bản đồ nhúng.

Ba video người dùng cung cấp nằm trong `assets/video/`. Video giữ nguyên nội dung gốc, có ảnh poster WebP, tải khi đi tới phần video, phát không tiếng, dừng khi rời khỏi màn hình. Nếu thiết bị bật giảm chuyển động, video chỉ phát khi bấm nút. Video thứ ba trong bốn tệp gốc là cảnh du lịch nên không dùng trên landing page salon.

## Kiểm tra

Lần cập nhật 17/10/2026 đã kiểm tra 320, 390, 768 và 1440 px: không tràn ngang, menu điện thoại mở đúng, chuyển tab giá và mở rộng thư viện hoạt động, video có thể phát/dừng, không có lỗi JavaScript. Đã xem trực tiếp ảnh chụp phần đầu, dịch vụ bổ sung, đánh giá và hai liên kết Instagram/Maps trên điện thoại lẫn desktop. `index.html`, dữ liệu JSON-LD và đường dẫn tài nguyên cục bộ đã kiểm tra hợp lệ. Ảnh chụp kiểm tra trong `qa/`; báo cáo Lighthouse cũ trong đó không phản ánh phiên bản hiện tại.
