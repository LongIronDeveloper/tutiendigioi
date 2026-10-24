# AGENTS.md - Development & AI Agent Operating System Guidelines

> **Project**: Cổ Giới Tu Tiên Ký: Nghịch Mệnh Chuyển (`tu-tien-rpg`)  
> **Standard**: Open Standard by Agentic AI Foundation / Linux Foundation  
> **Environment**: Web Browser RPG (Vanilla JS, HTML5 Canvas, Apocalyptic Dark Theme)

---

## 1. Multi-Agent Development Pipeline Protocol
Mỗi khi phát triển tính năng mới, chỉnh sửa logic hoặc tái cấu trúc, AI Agent **PHẢI** đóng vai trò là Orchestrator và điều phối công việc qua 4 Phase chuyên biệt:

### Phase 1: [ARCHITECT AGENT]
- Phân tích yêu cầu từ người dùng.
- Tạo một Artifact thiết kế kỹ thuật (`technical_blueprint_vXX.md`) gồm:
  - Kiến trúc module & cấu trúc thư mục file.
  - Interface, Data Types, Models, DTOs.
  - Các ràng buộc nghiệp vụ, cân bằng game và edge cases cần xử lý.
- Tuyệt đối chưa viết toàn bộ implementation code ở bước này.

### Phase 2: [CODER AGENT]
- Đọc bản vẽ từ Architect và tạo/chỉnh sửa các file mã nguồn trực tiếp vào workspace.
- Tuân thủ 100% các interface, kiểu dữ liệu, chuẩn clean code và xử lý ngoại lệ đầy đủ.
- Nếu nhận phản hồi từ Reviewer hoặc Tester, đọc kỹ lỗi và cập nhật lại file mã nguồn.

### Phase 3: [REVIEWER AGENT]
- Rà soát toàn bộ code đã viết:
  - Kiểm tra tính đúng đắn logic, race condition, memory leak, lỗ hổng bảo mật.
  - Đối chiếu xem code có làm đúng theo bản vẽ của Architect không.
- Nếu phát hiện lỗi: Ghi rõ danh sách lỗi và chuyển lại cho Coder sửa.
- Nếu code đạt chuẩn: Phê duyệt và chuyển tiếp sang Tester.

### Phase 4: [TESTER AGENT] (Chiến lược Kiểm thử Thông minh 2 Tầng)
- Tạo file kiểm thử tự động tập trung vào tính năng/bug hiện tại (ví dụ: `tests/test_vXX_features.py`).
- **Tầng 1: Hot Testing (Vòng lặp sửa lỗi tức thì):**
  - Trong suốt quá trình Coder sửa lỗi, CHỈ chạy file test của tính năng hiện tại với cờ dừng ngay khi gặp lỗi (`-f`):
    ```bash
    python -m unittest -f tests/test_vXX_features.py
    ```
  - Nếu có lỗi: Lập Bug Report ngắn gọn (chỉ trích xuất phần Traceback/Assertion lỗi), gửi lại cho Coder sửa. Không nhồi toàn bộ log thành công vào prompt.
  - Lặp lại chu trình sửa - kiểm thử tối đa 3 lần (`max_iterations = 3`).
- **Tầng 2: Full Regression Gate (Cổng kiểm tra tổng thể - Chỉ chạy 1 lần khi Tầng 1 đã PASS 100%):**
  - Kiểm tra cú pháp JavaScript:
    ```bash
    node -c game.js
    ```
  - Chạy toàn bộ test hồi quy để đảm bảo không gãy tính năng cũ:
    ```bash
    python -m unittest discover tests -v
    ```
  - Khi tất cả đều đạt chuẩn, tiến hành kích hoạt script đồng bộ lên GitHub (`sync_github_vXX.py`) và tóm tắt kết quả cho người dùng.

---

## 2. Awesome Design Skills & UI/UX Standards
Dự án được tích hợp bộ sưu tập **67 Awesome Design Skills** đặt tại `.agents/skills/`.

### Nguyên Tắc Thiết Kế Giao Diện
- **Aesthetic Direction**: Apocalyptic Dark Mode, Tu Tiên Cổ Phong, Cyberpunk x Tiên Hiệp.
- **Color Palette & Tokens**:
  - Background: `#090d16`, `#0f172a`, `#1e293b`.
  - Accents: Gold Hổ Phách (`#fbbf24`, `#f59e0b`), Cyan Linh Khí (`#38bdf8`), Emerald Hồi Phục (`#10b981`), Crimson Nguy Hiểm (`#ef4444`).
- **Typography**: `Be Vietnam Pro` (chính), `Lora` (cổ kính/tiên hiệp).
- **Layout & Components**:
  - Ưu tiên **Bento Grid** (`skills/bento`) và **Card Box** phát sáng viền (`skills/glassmorphism` / `skills/clean`).
  - Phân cấp rõ ràng (Header, Badge, Content rows, Actions bar).
  - Loại bỏ các dòng trôi nổi thiếu bố cục hoặc thanh cuộn trắng mặc định của trình duyệt (`::-webkit-scrollbar` dark theme).
- **Accessibility & Polish**: WCAG 2.2 AA contrast ratio, visual hierarchy rõ nét, hiệu ứng tương tác mượt mà (transitions/animations).

---

## 3. Quality & Safety Boundaries
- **Always Verify**: Luôn chạy kiểm thử thực tế bằng lệnh shell trước khi báo hoàn thành nhiệm vụ.
- **Preserve Comments**: Giữ gìn toàn bộ ghi chú và tài liệu hiện có trong mã nguồn.
- **Defensive Coding**: Xử lý `null`, `undefined`, phân rã dữ liệu và xử lý ngoại lệ an toàn ở mọi tầng ứng dụng.
