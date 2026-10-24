import unittest
import os
import re
import json

class TestV53Features(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        game_js_path = os.path.join(base_dir, 'game.js')
        index_html_path = os.path.join(base_dir, 'index.html')
        style_css_path = os.path.join(base_dir, 'style.css')
        gu_db_path = os.path.join(base_dir, 'gu_database.json')

        with open(game_js_path, 'r', encoding='utf-8') as f:
            cls.game_js = f.read()

        with open(index_html_path, 'r', encoding='utf-8') as f:
            cls.index_html = f.read()

        with open(style_css_path, 'r', encoding='utf-8') as f:
            cls.style_css = f.read()

        with open(gu_db_path, 'r', encoding='utf-8') as f:
            cls.gu_db = json.load(f)

    # -------------------------------------------------------------
    # 1. Kiểm tra Xóa Bỏ Đạo Ngân Săn Thú Phàm Cấp
    # -------------------------------------------------------------
    def test_01_no_dao_marks_from_hunting(self):
        """1. Đảm bảo xóa bỏ hoàn toàn việc nhận Đạo Ngân khi diệt yêu thú phàm cấp ở Bách Thú Lĩnh"""
        self.assertNotIn('addDaoMarks(player.mainDao || "moc", 20);', self.game_js)
        # Kiểm tra nội dung mô tả hạ thú không còn cộng đạo ngân
        self.assertIn('Thu hoạch nội đan, da thịt và tích lũy thêm kinh nghiệm thực chiến', self.game_js)

    # -------------------------------------------------------------
    # 2. Kiểm tra Cổ Tự Nhiên Không Thể Hợp Luyện & Chặn Luyện
    # -------------------------------------------------------------
    def test_02_natural_gu_refinement_blocked(self):
        """2. Đảm bảo Cổ Tự Nhiên (Tửu Trùng 1, Tửu Nang Hoa...) có canRefine=false và bị chặn luyện nhân tạo"""
        # Kiểm tra trong gu_database.json
        tuu_trung_1 = next((g for g in self.gu_db if g.get('id') == 't_u_tr_ng' or (g.get('name') == 'Tửu Trùng' and g.get('rank') == 1)), None)
        self.assertIsNotNone(tuu_trung_1)
        self.assertFalse(tuu_trung_1.get('recipe', {}).get('canRefine', True))
        self.assertEqual(tuu_trung_1.get('path'), 'Thực Đạo')

        # Kiểm tra trong game.js: chặn refineGu nếu canRefine === false
        self.assertIn('gu.recipe.canRefine === false', self.game_js)
        self.assertIn('CỔ TRÙNG THIÊN ĐỊA TỰ NHIÊN DỰNG DỤC', self.game_js)
        # Giao diện renderRecipesPane không hiện nút luyện cho cổ tự nhiên
        self.assertIn('cannot-refine-badge', self.game_js)

    # -------------------------------------------------------------
    # 3. Kiểm tra Kiểm Tra Nguyên Liệu Nghiêm Ngặt Trong refineGu
    # -------------------------------------------------------------
    def test_03_strict_materials_check_in_refine_gu(self):
        """3. Kiểm tra refineGu kiểm tra chi tiết từng nguyên liệu trong recipe.materials"""
        self.assertIn('missingMats', self.game_js)
        self.assertIn('THIẾU NGUYÊN LIỆU HỢP LUYỆN', self.game_js)
        # Bỏ giới hạn cứng 40 cổ phương để xem trọn vẹn 1-9 chuyển
        self.assertNotIn('filtered.slice(0, 40)', self.game_js)

    # -------------------------------------------------------------
    # 4. Kiểm tra Chu Kỳ Thất Nhật Điểm Danh (7 Ngày)
    # -------------------------------------------------------------
    def test_04_seven_day_checkin_cycle(self):
        """4. Kiểm tra chu kỳ điểm danh 7 ngày liên tục và Rương Thất Nhật Đại Thưởng ở ngày 7"""
        self.assertIn('player.checkinStreak', self.game_js)
        self.assertIn('RƯƠNG THẤT NHẬT ĐẠI THƯỞNG', self.game_js)
        self.assertIn('streak === 7', self.game_js)

    # -------------------------------------------------------------
    # 5. Kiểm tra Nâng Cấp Hệ Thống (1.0 -> 4.0) & Định Khiếu Đan
    # -------------------------------------------------------------
    def test_05_system_level_upgrade_and_dinh_khieu_dan(self):
        """5. Kiểm tra nâng cấp Hệ Thống (1.0->4.0) và vật phẩm Định Khiếu Đan bình ổn vách khiếu"""
        self.assertIn('function upgradeSystemLevel', self.game_js)
        self.assertIn('player.systemLevel', self.game_js)
        self.assertIn('dinh_khieu_dan', self.game_js)
        self.assertIn('Định Khiếu Đan', self.game_js)
        self.assertIn('player.apertureStability', self.game_js)

    # -------------------------------------------------------------
    # 6. Kiểm tra Nút Lĩnh Ngộ Công Pháp & Đồng Bộ ID Modal
    # -------------------------------------------------------------
    def test_06_learn_tech_modal_sync(self):
        """6. Kiểm tra nút Lĩnh Ngộ Công Pháp trong túi trữ vật đồng bộ ID và đóng modal-inventory"""
        self.assertIn('closeModal("modal-inventory")', self.game_js)
        self.assertIn('confirm-tech-requirements', self.game_js)
        self.assertIn('confirm-tech-name', self.game_js)
        self.assertIn('btn-do-learn-tech', self.game_js)

    # -------------------------------------------------------------
    # 7. Kiểm tra Bố Cục Chuyên Nghiệp Tab Không Khiếu (v5.3)
    # -------------------------------------------------------------
    def test_07_aperture_pane_professional_layout(self):
        """7. Kiểm tra bố cục Card chuyên nghiệp cho Tab Tổng Quan & Không Khiếu"""
        self.assertIn('aperture-overview-grid', self.game_js)
        self.assertIn('aperture-card-box', self.game_js)
        self.assertIn('Vách Không Khiếu & Biển Chân Nguyên', self.game_js)
        self.assertIn('Độ Ổn Định Vách Khiếu', self.game_js)

    # -------------------------------------------------------------
    # 8. Kiểm tra Custom Scrollbar & Version Badge v5.3 & 36 Lưu Phái
    # -------------------------------------------------------------
    def test_08_custom_scrollbar_and_ui_version_badge(self):
        """8. Kiểm tra CSS custom scrollbar tối màu, nhãn 36 Lưu Phái và Badge v5.3"""
        # CSS scrollbar
        self.assertIn('::-webkit-scrollbar', self.style_css)
        self.assertIn('::-webkit-scrollbar-thumb', self.style_css)
        self.assertIn('scrollbar-width: thin', self.style_css)
        # index.html
        self.assertIn('v5.3 • HOÀN THIỆN ĐẠI ĐẠO', self.index_html)
        self.assertIn('36 Lưu Phái Đạo Cảnh', self.index_html)
        self.assertNotIn('30 Lưu Phái Đạo Cảnh', self.index_html)


if __name__ == '__main__':
    unittest.main()
