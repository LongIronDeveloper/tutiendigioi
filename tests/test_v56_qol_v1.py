"""
Unit Test Suite: QOL v1.0 (Tiên Hiệp Chân Truyền)
Covers:
- Vá lỗi tương phản & Hố đen trung tâm
- Tam Đại Ngọc Bài (Quick Cultivate Bar)
- Mực Loang Thủy Mặc khi click chuột (.ink-splash-ripple)
- Lớp Mây Tiên Phiêu Diễu Bồng Bềnh (.celestial-clouds-backdrop)
- Hệ thống Hạt Linh Khí Ngũ Sắc tương tác chuột (initCelestialQiCanvas)
- Web Audio API Click Feedback Hooks
"""

import os
import unittest

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class TestQOLv1(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        index_path = os.path.join(BASE_DIR, "index.html")
        style_path = os.path.join(BASE_DIR, "style.css")
        ui_path = os.path.join(BASE_DIR, "ui.js")

        with open(index_path, "r", encoding="utf-8") as f:
            cls.index_html = f.read()

        with open(style_path, "r", encoding="utf-8") as f:
            cls.style_css = f.read()

        with open(ui_path, "r", encoding="utf-8") as f:
            cls.ui_js = f.read()

    def test_01_index_html_has_celestial_clouds_and_talisman_buttons(self):
        """1. Kiểm tra index.html có backdrop mây bồng bềnh và Tam Đại Ngọc Bài chân trang"""
        self.assertIn('id="celestial-clouds-backdrop"', self.index_html)
        self.assertIn('cloud-layer-back', self.index_html)
        self.assertIn('cloud-layer-front', self.index_html)
        self.assertIn('talisman-btn-jade', self.index_html)
        self.assertIn('talisman-btn-amber', self.index_html)
        self.assertIn('talisman-btn-crimson', self.index_html)
        self.assertIn('btn-talisman-icon', self.index_html)

    def test_02_style_css_ambient_contrast_and_scroll_stage(self):
        """2. Kiểm tra style.css đã khắc phục lỗi tương phản và tạo Silk Scroll Stage"""
        self.assertIn('body.celestial-theme .ambient-world-bg', self.style_css)
        self.assertIn('body.celestial-theme .action-stage-panel', self.style_css)
        self.assertIn('body.celestial-theme .stage-header h2', self.style_css)
        self.assertIn('#92400e', self.style_css)

    def test_03_style_css_ink_ripple_and_cloud_drift(self):
        """3. Kiểm tra style.css có hiệu ứng Mực Loang, Mây Trôi và Lún Phím Cơ Học"""
        self.assertIn('.ink-splash-ripple', self.style_css)
        self.assertIn('@keyframes inkRippleSpread', self.style_css)
        self.assertIn('@keyframes cloudDriftSlow', self.style_css)
        self.assertIn('@keyframes cloudDriftFast', self.style_css)
        self.assertIn('transform: scale(0.96) translateY(1px)', self.style_css)

    def test_04_ui_js_universal_click_and_qi_canvas(self):
        """4. Kiểm tra ui.js cài đặt Mực Loang, Âm thanh Web Audio và Linh Khí tương tác chuột"""
        self.assertIn('function createInkRipple', self.ui_js)
        self.assertIn('function initUniversalClickFeedback', self.ui_js)
        self.assertIn('function initCelestialQiCanvas', self.ui_js)
        self.assertIn('playClick', self.ui_js)
        self.assertIn('playThunder', self.ui_js)
        self.assertIn('createInkRipple: createInkRipple', self.ui_js)

if __name__ == "__main__":
    unittest.main()
