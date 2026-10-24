"""
Unit Test Suite: UI/UX v5.4 Evolution
Covers:
- Bento Grid & Glassmorphism Tokens
- Talisman Corner Accents (✦)
- Floating Indicators (+EXP, -Stamina, +Loot)
- Dynamic Primeval Sea Waves (Sóng Nước Chân Nguyên Hải)
- RPG Inventory Slots & Xianxia Floating Tooltips
- 3D Tilt Hover & Notification Badges
- WCAG 2.2 AA & Reduced Motion Accessibility
"""

import os
import unittest

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class TestUIv54Evolution(unittest.TestCase):

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

    def test_01_index_html_has_floating_tooltip_container(self):
        """1. Kiểm tra index.html có container #xianxia-floating-tooltip chuẩn ARIA tooltip"""
        self.assertIn('id="xianxia-floating-tooltip"', self.index_html)
        self.assertIn('role="tooltip"', self.index_html)
        self.assertIn('class="xianxia-floating-tooltip hidden"', self.index_html)

    def test_02_style_css_floating_indicators(self):
        """2. Kiểm tra style.css định nghĩa đầy đủ Floating Indicators và Keyframes"""
        self.assertIn('.xianxia-float-indicator', self.style_css)
        self.assertIn('@keyframes xianxiaFloatUpFade', self.style_css)
        self.assertIn('.float-gold', self.style_css)
        self.assertIn('.float-cyan', self.style_css)
        self.assertIn('.float-green', self.style_css)
        self.assertIn('.float-purple', self.style_css)

    def test_03_style_css_primeval_sea_wave(self):
        """3. Kiểm tra style.css định nghĩa Sóng Nước Chân Nguyên Hải đa sắc thái"""
        self.assertIn('.primeval-wave-container', self.style_css)
        self.assertIn('.primeval-wave-svg', self.style_css)
        self.assertIn('.wave-layer-back', self.style_css)
        self.assertIn('.wave-layer-front', self.style_css)
        self.assertIn('.primeval-core-vital', self.style_css)
        self.assertIn('.wave-rank-1', self.style_css)
        self.assertIn('.wave-rank-6', self.style_css)

    def test_04_style_css_rpg_slots_and_tooltips(self):
        """4. Kiểm tra style.css định nghĩa Lưới Ô RPG (72px) và Floating Tooltip"""
        self.assertIn('.rpg-slot-grid', self.style_css)
        self.assertIn('.rpg-slot-item', self.style_css)
        self.assertIn('.rpg-slot-item.rarity-1', self.style_css)
        self.assertIn('.rpg-slot-item.rarity-6', self.style_css)
        self.assertIn('.xianxia-floating-tooltip', self.style_css)
        self.assertIn('.tooltip-rank-badge', self.style_css)

    def test_05_style_css_talisman_corners_and_reduced_motion(self):
        """5. Kiểm tra Cổ Phù Góc (✦) và Tương Thích Giảm Chuyển Động (prefers-reduced-motion)"""
        self.assertIn('content: "✦"', self.style_css)
        self.assertIn('.modal-box.system-card::before', self.style_css)
        self.assertIn('@media (prefers-reduced-motion: reduce)', self.style_css)
        self.assertIn('.has-badge::after', self.style_css)

    def test_06_ui_js_floating_indicator_and_primeval_wave(self):
        """6. Kiểm tra ui.js cài đặt logic Floating Indicators và Sóng Nước Không Khiếu"""
        self.assertIn('function showFloatingIndicator', self.ui_js)
        self.assertIn('function renderPrimevalSeaWave', self.ui_js)
        self.assertIn('RANK_PRIMEVAL_CONFIG', self.ui_js)
        self.assertIn('window.UI = {', self.ui_js)

    def test_07_ui_js_tooltips_and_card_tilt(self):
        """7. Kiểm tra ui.js cài đặt Tooltip động, 3D Tilt Hover và Chấm Đỏ Nhắc Nhở"""
        self.assertIn('function initXianxiaTooltips', self.ui_js)
        self.assertIn('function initCardTilt', self.ui_js)
        self.assertIn('function updateNotificationBadges', self.ui_js)
        self.assertIn('initFloatingActionHooks', self.ui_js)

if __name__ == "__main__":
    unittest.main()
