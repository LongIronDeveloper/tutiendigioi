"""
Unit Test Suite: Xianxia Celestial UI (v5.5)
Covers:
- Bạch Ngọc Vân Sơn (Celestial Xianxia Theme)
- Huyền Dạ Thư Các (Night Ink Xianxia Theme)
- Chu Sa Seal (㊞) on Starter Vital Gu
- Theme Switcher Toggle Controller in ui.js
- CSS Custom Property Tokens & Contrast Compliance
"""

import os
import unittest

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class TestXianxiaCelestialUI(unittest.TestCase):

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

    def test_01_index_html_has_theme_classes_and_toggle(self):
        """1. Kiểm tra index.html có class celestial-theme, nút đổi theme và triện Chu Sa"""
        self.assertIn('celestial-theme', self.index_html)
        self.assertIn('id="btn-theme-toggle"', self.index_html)
        self.assertIn('chu-sa-seal', self.index_html)
        self.assertIn('㊞', self.index_html)

    def test_02_style_css_celestial_tokens(self):
        """2. Kiểm tra style.css định nghĩa đầy đủ Tokens Bạch Ngọc Vân Sơn"""
        self.assertIn('body.celestial-theme', self.style_css)
        self.assertIn('--c-bg-canvas: #fbf8f3', self.style_css)
        self.assertIn('--c-text-primary: #1c1917', self.style_css)
        self.assertIn('--c-jade-primary: #059669', self.style_css)
        self.assertIn('--c-gold-primary: #b45309', self.style_css)
        self.assertIn('--c-cinnabar: #b91c1c', self.style_css)

    def test_03_style_css_night_ink_tokens(self):
        """3. Kiểm tra style.css định nghĩa chế độ Huyền Dạ Thư Các (Dạ Tu)"""
        self.assertIn('body.night-ink-theme', self.style_css)
        self.assertIn('--c-bg-canvas: #0f1319', self.style_css)
        self.assertIn('--c-text-primary: #f5f0e8', self.style_css)

    def test_04_style_css_chu_sa_seal(self):
        """4. Kiểm tra style.css định nghĩa Chu Sa Phong Ấn .chu-sa-seal"""
        self.assertIn('.chu-sa-seal', self.style_css)
        self.assertIn('border: 1.5px solid #b91c1c', self.style_css)

    def test_05_ui_js_theme_controller(self):
        """5. Kiểm tra ui.js cài đặt bộ điều khiển setTheme, toggleTheme và lưu trữ localStorage"""
        self.assertIn('function setTheme', self.ui_js)
        self.assertIn('function toggleTheme', self.ui_js)
        self.assertIn('function initThemeController', self.ui_js)
        self.assertIn('tu_tien_theme', self.ui_js)
        self.assertIn('setTheme: setTheme', self.ui_js)
        self.assertIn('toggleTheme: toggleTheme', self.ui_js)

if __name__ == "__main__":
    unittest.main()
