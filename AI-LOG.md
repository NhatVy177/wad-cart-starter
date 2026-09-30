# AI-LOG

**Student ID:** 23120192

---

## 2026-09-29 — Chạy test bị đỏ ban đầu
- **Công cụ:** Không dùng.
- **Yêu cầu:** —
- **Tự làm:** Clone repo `fithcmus/wad-cart-starter`, chạy lệnh `npm test` — 1 test, 1 fail, báo lỗi `Error: not implemented` tại `src/cart.js`. Sau đó tạo repo `NhatVy177/wad-cart-starter` trên GitHub và trỏ remote về đó. Bước này giúp mình kiểm chứng harness hoạt động tốt trước khi bắt đầu code.

---

## 2026-09-29 — Thiết lập harness, CI và code cơ bản (commit `0b6a74a`)
- **Công cụ:** Claude Opus 4.6 (Antigravity IDE).
- **Yêu cầu:** Thiết lập CI với Node 22, viết hàm `cartTotal` và bộ test cơ bản.
- **Giữ lại:** Cấu trúc file CI (`npm ci`, `npm test`, `npm run lint` chạy mỗi khi push). Logic cốt lõi của hàm `cartTotal`: dùng hàm `reduce` tính subtotal, `Math.round` để làm tròn, `>=` cho ngưỡng freeship, và có vòng lặp validate dữ liệu trước.
- **Thay đổi:** Ban đầu AI dùng Node 20 cho CI, mình bắt đổi sang Node 22 để khớp với slide bài giảng. AI dùng `item.price < 0` để kiểm tra giá, mình nhận ra như vậy sẽ bỏ sót `NaN` và `Infinity`, nên bắt sửa thành `typeof item.price !== "number" || !Number.isFinite(item.price) || item.price < 0`. Code ở commit này đã chạy qua 26 test.
- **Bỏ qua:** Không có.
- **Tự làm:** Đọc kỹ từng thay đổi và chạy lệnh `npm test` để kiểm chứng.

---

## 2026-09-29 — Cấu hình Prettier và viết lại tài liệu (từ commit `b953962` tới `8acdd62`)
- **Công cụ:** Claude Opus 4.6 (Antigravity IDE).
- **Yêu cầu:** Đưa `prettier` vào `devDependencies`, cấu hình `gitattributes` và viết lại `brief.md`.
- **Giữ lại:** File `.prettierrc.json` và `.gitattributes` để ép chuẩn xuống dòng LF trên môi trường Windows.
- **Thay đổi:** AI quên đưa `prettier` vào `devDependencies`, mình phải yêu cầu ghim cụ thể bản `3.9.9`.
- **Bỏ qua:** Bản `brief.md` đầu tiên AI sinh ra chỉ đơn thuần là copy paste đề bài. Mình từ chối và yêu cầu viết một bản đặc tả nghiêm túc gồm các mục Files, Contract, Error cases và Done when. Mình cũng từ chối bản `SELF_ASSESSMENT_REPORT.md` đầu tiên do AI tự bịa ra một cái rubric 14 hàng không hề có thật.
- **Tự làm:** Chạy `npm run lint` để kiểm tra code format.

---

## 2026-09-30 — Rà soát Rubric, tối ưu code và cập nhật báo cáo (từ commit `2d0f29b` tới `9674e9a`)
- **Công cụ:** Claude Sonnet 4.6 (Review qua chat).
- **Yêu cầu:** Đánh giá lại toàn bộ code, bài test, brief và báo cáo chấm điểm dựa trên Rubric.
- **Giữ lại / Áp dụng:** Tách bài test kiểm tra số nguyên thành 2 bài độc lập (`typeof number` và `Number.isInteger`). Bổ sung 2 bài test kiểm tra lỗi cố tình đặt ở item thứ hai. Xóa dòng comment thừa trong code và xóa luôn đoạn check `!items ||` (vì tài liệu đặc tả không hề yêu cầu). Cập nhật `SELF_ASSESSMENT_REPORT.md`: thêm link CI, bỏ các số dòng, liệt kê cụ thể 29 test và giữ nguyên mức điểm tự đánh giá là 100/100.
- **Bỏ qua:** AI khuyên nên hạ điểm tự chấm xuống 95. Mình quyết định bác bỏ và giữ mức 100 điểm vì theo rubric thì lệch trong khoảng ±10 sẽ không bị trừ điểm, để 100 vẫn nằm trong vùng an toàn.
- **Tự làm:** Tự chạy lệnh `npm test` (kết quả 29/29 xanh) và `npm run lint` (xanh). Truy cập GitHub kiểm tra kết quả CI Run để lấy link cập nhật vào báo cáo.
