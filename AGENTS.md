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

### Phase 4: [TESTER AGENT] (Thực thi kiểm thử thực tế)
- Tạo file kiểm thử tự động (ví dụ: `tests/test_vXX_features.py`).
- Sử dụng công cụ terminal (`run_command`) để chạy test thực tế:
  ```bash
  node -c game.js
  python -m unittest discover tests -v
  ```
- Phân tích kết quả thực thi:
  - Nếu có lỗi: Lập Bug Report chi tiết (Input gây lỗi, Expected vs Actual, Traceback) và gửi lại cho [CODER AGENT] sửa.
  - Lặp lại chu trình sửa - kiểm thử tối đa 3 lần (`max_iterations = 3`).
  - Khi tất cả các test cases đều PASS 100%: Hoàn thành nhiệm vụ và tóm tắt kết quả cho người dùng.

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
- **Accessibility & Quality**: Tuân thủ chuẩn WCAG 2.2 AA (độ tương phản, tap target, phông chữ dễ đọc).

### Các Design Skills Nổi Bật Được Hỗ Trợ:
`agentic, ant, artistic, basic, bento, bold, brutalism, cafe, claude, claymorphism, clean, codex, colorful, contemporary, corporate, cosmic, creative, dithered, doodle, dramatic, editorial, enterprise, expressive, fantasy, fiction, flat, friendly, futuristic, geometric, glassmorphism, gradient, immersive, impeccable, levels, lingo...` (xem danh mục đầy đủ trong `DESIGN_SKILLS_INDEX.md`).

---

## 3. Build, Lint & Test Commands
Mọi thay đổi mã nguồn bắt buộc phải kiểm tra thông qua các lệnh terminal sau:

- **Kiểm tra cú pháp JavaScript**:
  ```bash
  node -c game.js
  ```
- **Chạy toàn bộ Test Suite hồi quy**:
  ```bash
  python -m unittest discover tests -v
  ```
- **Chạy bộ test tính năng cụ thể**:
  ```bash
  python -m unittest tests.test_v53_features -v
  ```

---

## 4. Guardrails & Operational Boundaries
- **ALWAYS**:
  - Giữ gìn tính toàn vẹn của dữ liệu lưu (`localStorage` / `TUTIEN_V4_SAVE`).
  - Bảo toàn toàn bộ các tính năng và logic của các phiên bản trước (Zero Regression).
  - Sử dụng link markdown có thể nhấp được (`[filename](file:///...)`) khi nhắc đến tệp tin.
- **ASK FIRST**:
  - Thay đổi cấu trúc dữ liệu lưu game làm mất save cũ của người dùng.
  - Xóa bỏ hoặc đổi tên các hàm API cốt lõi trong `game.js`.
- **NEVER**:
  - Đẩy code lên GitHub khi chưa chạy test hoặc có test bị fail.
  - Sửa trực tiếp code vào production mà không qua 4 Phase của Pipeline Protocol.
