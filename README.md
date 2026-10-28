# Heaven of beauty

Landing page bằng tiếng Séc cho Heaven of beauty tại Veveří 339/34, 602 00 Brno-střed: nehty, pedikúra, řasy, head spa và massage.

## Chạy thử

Mở `index.html` hoặc chạy `python -m http.server 4173 --bind 127.0.0.1` trong thư mục dự án, rồi mở http://127.0.0.1:4173. Website tĩnh, không cần build.

`index.html` nằm ngay thư mục gốc để GitHub Pages có thể phục vụ trực tiếp. CSS, JavaScript và hình ảnh đều dùng đường dẫn tương đối, hoạt động cả khi website nằm dưới đường dẫn repository.

## Nguồn thông tin

- Tên, ngôn ngữ, địa chỉ, điện thoại, mạng xã hội và liên kết Maps lấy từ `Tài liệu không có tiêu đề.docx`.
- Giá gốc lấy từ ảnh bảng giá `402aa79d6c89511235c0ccb435aee60a71903b1a.jpg`. Theo chú thích người dùng ngày 19/10/2026: Shellac 520 Kč đã bao gồm manicure; Manikúra 250 Kč; bỏ P.Shine khỏi bảng giá và mô tả dịch vụ.
- Giờ mở cửa đã đối chiếu ngày 05/09/2026 qua [Živéfirmy](https://www.zivefirmy.cz/heaven-of-beauty_f1919772) và [Waze](https://www.waze.com/live-map/directions/cz/jihomoravsky-kraj/nail-salon-heaven-of-beauty?to=place.ChIJQ82B502VEkcRcyEnOrYrZmQ).
- Dịch vụ mi, head spa và massage được người dùng xác nhận bổ sung ngày 17/10/2026. Dịch vụ nối và dặm mi còn được đối chiếu trên [hồ sơ salon tại Notino](https://www.notino.cz/salony/heaven-of-beauty/). Giá mi và chân mày được bổ sung theo ảnh bảng giá người dùng cung cấp ngày 25/10/2026. Head spa và massage vẫn hướng khách gọi để được tư vấn giá, thời lượng.
- Ba trích đoạn đánh giá của Sára S., Denisa U. và Adriana A. lấy từ [Zlatá Firma](https://www.zlatafirma.cz/company/heaven-of-beauty-nail-veveri-brno-986556), nơi ghi rõ nguồn Google Maps. Đã đối chiếu ngày 17/10/2026; website ghi nguồn trung gian dưới các trích đoạn. Không hiển thị điểm tổng, số sao từng người hoặc tổng số đánh giá vì chưa xác minh trực tiếp dữ liệu hiện tại trên Google.

## Giao diện và ảnh

Nền sáng đồng nhất (#faf9f6) xuyên suốt các phần nội dung, header và footer, giữ điểm nhấn xanh/đỏ, ảnh salon thật, bố cục desktop/mobile. Phần đầu giới thiệu đủ nhóm dịch vụ và nút chỉ đường, tiếp đến năm video, ba ô thông tin về vật liệu/chất lượng/vệ sinh, dịch vụ mi/head spa/massage, ảnh không gian salon, đánh giá, dịch vụ nail, bảng giá, thư viện, FAQ và liên hệ. Có nút gọi cố định trên điện thoại.

18 ảnh do người dùng cung cấp được chuyển từ PNG sang WebP trong `assets/real/`. Không chỉnh sửa móng hoặc thêm chi tiết vào tệp ảnh; lớp phủ CSS làm dịu ảnh nền hero. Ảnh `photo-08.webp` dùng ở hero, `lashes-01.webp` giới thiệu dịch vụ mi; các ảnh vẫn xuất hiện đầy đủ trong thư viện. Ảnh pedicure bổ sung dùng tại ô dịch vụ pedicure (`assets/real/pedicure-treatment.webp`).

Bảy ảnh mi bổ sung ngày 19/10/2026 nằm trong `assets/real/lashes-01.webp` đến `lashes-07.webp`; ảnh đầu dùng ở khối giới thiệu mi, sáu ảnh còn lại ở thư viện riêng ngay bên dưới. Ảnh được giữ nguyên nội dung và tối ưu WebP. Ba ô thông tin dưới video dùng nội dung tiếng Séc theo chủ đề ảnh tham khảo, ảnh thực tế hiện có của salon; không tự thêm con số màu sắc hoặc quy trình khử trùng cụ thể.

Instagram dùng SVG camera nhận diện trong `assets/brand/instagram.svg`. Biểu tượng Google Maps và Google G được lưu cục bộ từ tài nguyên Google: [Maps](https://www.gstatic.com/images/branding/product/2x/maps_96in128dp.png), [Google G](https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png). Có thêm nút Facebook và Instagram ngay phần đầu trang. Khối Maps mở trực tiếp liên kết salon, khối Instagram mở đúng tài khoản; không cần tải bản đồ nhúng.

Năm video người dùng cung cấp nằm trong `assets/video/`. Video giữ nguyên nội dung gốc, có ảnh poster WebP, tải khi đi tới phần video, phát không tiếng, dừng khi rời khỏi màn hình. Nếu thiết bị bật giảm chuyển động, video chỉ phát khi bấm nút. Video thứ ba trong bốn tệp gốc là cảnh du lịch nên không dùng trên landing page salon. Hai video thêm ngày 19/10/2026 là chuẩn bị pedicure và head spa, giữ nguyên tệp MP4 gốc, có poster trích trực tiếp từ video.

## Kiểm tra

Lần cập nhật 17/10/2026 đã kiểm tra 320, 390, 768 và 1440 px: không tràn ngang, menu điện thoại mở đúng, chuyển tab giá hoạt động và toàn bộ 18 ảnh thư viện hiển thị sẵn, video có thể phát/dừng, không có lỗi JavaScript. Đã xem trực tiếp ảnh chụp phần đầu, dịch vụ bổ sung, đánh giá và hai liên kết Instagram/Maps trên điện thoại lẫn desktop. `index.html`, dữ liệu JSON-LD và đường dẫn tài nguyên cục bộ đã kiểm tra hợp lệ. Ảnh chụp kiểm tra trong `qa/`; báo cáo Lighthouse cũ trong đó không phản ánh phiên bản hiện tại.


Cập nhật 19/10/2026: đã kiểm tra bằng Chromium ở 320, 390, 768 và 1440 px; không tràn ngang, hai nút mạng xã hội đủ vùng chạm 44 px, menu và tab giá hoạt động. Cả năm video phát/dừng được, hai clip mới có metadata hợp lệ; video tự phát khi hiện trong màn hình và dừng khi ra ngoài. Không có lỗi JavaScript hoặc tài nguyên HTTP bị thiếu. Đã xem ảnh chụp phần đầu, ba ô thông tin, thư viện mi, bảng giá, khối giới thiệu mi và video trên desktop/mobile. Bằng chứng ở `qa/oct19-*.png`, kết quả ở `qa/oct19-checks.json`. Các liên kết tài nguyên và JSON-LD hợp lệ.


## Cập nhật 25/10/2026

- Bảng giá mi chép từ `codex-clipboard-ff6ee6d7-4cf9-4278-a23e-5306d9ea9c61.png`, ảnh thứ hai `ccccc7dc-2b1d-4a09-be07-7332cba3f4f2` trùng hoàn toàn ảnh đầu (cùng SHA-256). Các ảnh thể hiện giá mi/chân mày, không ghi giá massage. Trang tiếp tục hướng dẫn khách liên hệ salon để được báo giá head spa/massage; phần này không chặn các cập nhật còn lại. Bản chép dữ liệu để đối chiếu ở `qa/lash-prices-oct25.json`.
- Thêm tab `Řasy & obočí`, gồm bốn nhóm nối mi: klasik 650 Kč, Volume 750 Kč, Mega volume / Hybrid / Fox eyes 850 Kč và Designové 900 Kč cho bộ mới. Mỗi nhóm có đầy đủ giá dặm theo thời gian trong ảnh, bao gồm các mốc 10 ngày, 2,5 và 3,5 tuần ở nhóm tương ứng. Thêm laminace, lash lifting và dịch vụ chân mày. Giữ Shellac 520 Kč (đã gồm manicure), Manikúra 250 Kč theo xác nhận trước đó.
- Thêm bảy ảnh salon khác nhau trong `assets/salon/`, gồm bốn ảnh không gian hiện tại và ba ảnh ghép so sánh năm 2018–2026. Một ảnh head spa bị gửi lặp đã được loại trùng. Các ảnh ghép hiển thị đầy đủ nội dung và mốc năm, không cắt ảnh. Tối ưu WebP, giữ nguyên nội dung ảnh.
- Bỏ các mảng nền xám xen kẽ; các phần nội dung, thanh đầu và chân trang dùng cùng nền sáng. Ảnh nền hero và các ô ảnh vẫn giữ độ tương phản để đọc chữ.

Kiểm tra 25/10/2026: Chromium ở 320, 390, 768, 1024 và 1440 px; không tràn ngang, nền nội dung đồng nhất cả khi thiết bị chọn light/dark, menu điện thoại và điều khiển bàn phím của tab giá hoạt động. Đã đối chiếu toàn bộ giá nối/dặm mi và laminace, giữ nguyên giá nail đã xác nhận, giải mã thành công toàn bộ ảnh, không có lỗi JavaScript hoặc HTTP. Đã xem ảnh chụp phần đầu, salon, bảng giá mi/laminace, đánh giá và liên hệ trên điện thoại và desktop. Kết quả tại `qa/oct25-checks.json`, ảnh chụp tại `qa/oct25-*.png`.


## Sửa nền đồng nhất ngày 28/10/2026

Gộp các khai báo màu về một bộ biến duy nhất, bỏ toàn bộ nhánh màu tối cũ. Header, hero, thông tin nhanh, tất cả section và footer cùng nền #faf9f6; ảnh hero nằm trong khối riêng trên nền sáng. Các khối giá, đánh giá và liên hệ dùng trực tiếp cùng biến nền. File CSS được gắn phiên bản styles.css?v=20261028 để trình duyệt lấy bản mới. Đã kiểm tra 320, 390, 768, 1440 px ở cả light/dark; không tràn ngang và mọi vùng nền chính cùng màu. Bằng chứng trong qa/oct28-background-checks.json và qa/oct28-*.png.
