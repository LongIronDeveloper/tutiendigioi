# tests/test_ui_hud_e2e.py
import unittest
import os
import re

class TestUIHudE2E(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        cls.index_path = os.path.join(cls.base_dir, "index.html")
        cls.style_path = os.path.join(cls.base_dir, "style.css")
        cls.ui_js_path = os.path.join(cls.base_dir, "ui.js")
        cls.game_js_path = os.path.join(cls.base_dir, "game.js")

        with open(cls.index_path, "r", encoding="utf-8") as f:
            cls.index_content = f.read()
        with open(cls.style_path, "r", encoding="utf-8") as f:
            cls.style_content = f.read()
        with open(cls.ui_js_path, "r", encoding="utf-8") as f:
            cls.ui_js_content = f.read()
        with open(cls.game_js_path, "r", encoding="utf-8") as f:
            cls.game_js_content = f.read()

    def test_01_ui_js_file_and_polyfill(self):
        """1. Kiểm tra ui.js tồn tại, có polyfill claimDailyCheckin và hệ thống Toast"""
        self.assertTrue(os.path.exists(self.ui_js_path), "File ui.js phải tồn tại trong workspace")
        self.assertIn("claimDailyCheckin", self.ui_js_content, "ui.js phải có polyfill claimDailyCheckin")
        self.assertIn("showToast", self.ui_js_content, "ui.js phải có hàm showToast")
        self.assertIn("xianxia-toast", self.ui_js_content, "ui.js phải định nghĩa cấu trúc xianxia-toast")
        self.assertIn("initKeyboardShortcuts", self.ui_js_content, "ui.js phải có phím tắt điều hướng")
        self.assertIn("__TEST_HELPERS__", self.ui_js_content, "ui.js phải expose __TEST_HELPERS__ cho test automation")

    def test_02_index_html_integration(self):
        """2. Kiểm tra index.html nhúng ui.js trước game.js, có toast-container và mobile-menu-btn"""
        self.assertIn('<script src="ui.js"></script>', self.index_content, "index.html phải nạp ui.js")
        ui_pos = self.index_content.find('<script src="ui.js"></script>')
        game_pos = self.index_content.find('<script src="game.js"></script>')
        self.assertTrue(ui_pos != -1 and game_pos != -1, "Phải tìm thấy cả ui.js và game.js")
        self.assertLess(ui_pos, game_pos, "ui.js bắt buộc phải được nạp TRƯỚC game.js để polyfill runtime an toàn")
        self.assertIn('id="toast-container"', self.index_content, "index.html phải có container #toast-container")
        self.assertIn('id="btn-mobile-menu"', self.index_content, "index.html phải có nút #btn-mobile-menu trên location-top-bar")

    def test_03_aperture_pane_id_sync(self):
        """3. Kiểm tra ID tab Không Khiếu đồng bộ chính xác với game.js (sys-aperture-body)"""
        self.assertIn('id="sys-aperture-body"', self.index_content, "index.html phải có id='sys-aperture-body' để game.js render Không Khiếu")
        self.assertIn('sys-aperture-body', self.game_js_content, "game.js tìm kiếm sys-aperture-body")

    def test_04_library_modal_structure(self):
        """4. Kiểm tra cấu trúc thẻ modal-library-shop đóng đúng trước modal-confirm-learn-tech"""
        modal_lib_idx = self.index_content.find('id="modal-library-shop"')
        modal_confirm_idx = self.index_content.find('id="modal-confirm-learn-tech"')
        self.assertTrue(modal_lib_idx != -1 and modal_confirm_idx != -1)
        sub = self.index_content[modal_lib_idx:modal_confirm_idx]
        open_divs = len(re.findall(r'<div\b', sub))
        close_divs = len(re.findall(r'</div>', sub))
        self.assertEqual(open_divs, close_divs, "Thẻ div mở và đóng của modal-library-shop phải cân bằng trước khi mở modal tiếp theo")

    def test_05_style_css_responsive_breakpoints(self):
        """5. Kiểm tra style.css chứa đầy đủ Media Queries cho Desktop, Tablet và Mobile"""
        self.assertIn('@media (max-width: 768px)', self.style_content, "style.css phải có breakpoint mobile <= 768px")
        self.assertIn('@media (max-width: 1023px)', self.style_content, "style.css phải có breakpoint tablet <= 1023px")
        self.assertIn('@media (max-width: 1280px)', self.style_content, "style.css phải có breakpoint laptop <= 1280px")
        self.assertIn('@media (prefers-reduced-motion: reduce)', self.style_content, "style.css phải hỗ trợ reduced-motion WCAG")

    def test_06_style_css_zero_scroll_and_toast(self):
        """6. Kiểm tra style.css có ghim Sticky Dock, Toast classes và Mobile Drawer"""
        self.assertIn('.xianxia-toast-container', self.style_content, "style.css phải có style cho .xianxia-toast-container")
        self.assertIn('.xianxia-toast', self.style_content, "style.css phải có style cho .xianxia-toast")
        self.assertIn('.mobile-bottom-nav', self.style_content, "style.css phải có style cho .mobile-bottom-nav")
        self.assertIn('.sidebar-open', self.style_content, "style.css phải hỗ trợ class .sidebar-open cho mobile drawer")
        self.assertIn('.sidebar-tab-nav', self.style_content, "style.css phải có style tab chuyển đổi thông số sidebar")

    def test_07_style_css_xianxia_gold_jade_hazard_motif(self):
        """7. Kiểm tra --hazard-pattern đã chuyển hóa thành viền mây vàng ngọc Tiên Hiệp"""
        self.assertIn('rgba(212, 175, 55', self.style_content, "--hazard-pattern phải dùng tone vàng ngọc hổ phách Cổ Phong")
        self.assertNotIn('#f59e0b 0,\r\n        #f59e0b 12px,\r\n        #1c1917 12px', self.style_content, "Đã loại bỏ sọc vàng đen cảnh báo công nghiệp")

if __name__ == "__main__":
    unittest.main()
