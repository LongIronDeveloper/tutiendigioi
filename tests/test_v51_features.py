import unittest
import re
import os

BASE_DIR = r"C:\Users\LONG\.gemini\antigravity\scratch\tu-tien-rpg"

class TestV51Features(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        with open(os.path.join(BASE_DIR, "game.js"), "r", encoding="utf-8") as f:
            cls.game_js = f.read()
        with open(os.path.join(BASE_DIR, "index.html"), "r", encoding="utf-8") as f:
            cls.index_html = f.read()

    def test_01_ranks_simplified_to_chuyen(self):
        """1. Kiểm tra tu vi gộp lại chỉ tính theo Chuyển, không còn phân ra Luyện Khí Kỳ, Trúc Cơ Kỳ..."""
        self.assertIn('name: "Nhất Chuyển"', self.game_js)
        self.assertIn('name: "Nhị Chuyển"', self.game_js)
        self.assertIn('name: "Tam Chuyển"', self.game_js)
        self.assertIn('name: "Cửu Chuyển (Cổ Tôn)"', self.game_js)
        # Đảm bảo không còn hậu tố Luyện Khí Kỳ trong rank.name chính
        self.assertNotIn('name: "Nhất Chuyển • Luyện Khí Kỳ"', self.game_js)
        self.assertNotIn('name: "Nhị Chuyển • Trúc Cơ Kỳ"', self.game_js)

    def test_02_dao_levels_structure(self):
        """2. Kiểm tra hệ thống Đạo Ngân 8 cấp độ chuẩn nguyên tác Cổ Chân Nhân"""
        # Kiểm tra mốc Đạo Ngân
        self.assertIn('"Phổ Thông"', self.game_js)
        self.assertIn('"Chuẩn Đại Sư"', self.game_js)
        self.assertIn('"Đại Sư"', self.game_js)
        self.assertIn('"Chuẩn Tông Sư"', self.game_js)
        self.assertIn('"Tông Sư"', self.game_js)
        self.assertIn('"Chuẩn Đại Tông Sư"', self.game_js)
        self.assertIn('"Đại Tông Sư (Sát Chiêu)"', self.game_js)
        self.assertIn('"Vô Thượng Đại Tông Sư"', self.game_js)
        # Kiểm tra mốc số 150000 và 500000
        self.assertIn('reqMarks: 150000', self.game_js)
        self.assertIn('reqMarks: 500000', self.game_js)

    def test_03_killer_move_conditions(self):
        """3. Kiểm tra 4 điều kiện khai sáng Sát Chiêu: Đạo Ngân >= 150k, Ngộ Tính >= 30, Trí Mưu >= 25, Khí Vận >= 20"""
        self.assertIn('curMarks >= 150000', self.game_js)
        self.assertIn('player.comprehension >= 30', self.game_js)
        self.assertIn('player.intelligence >= 25', self.game_js)
        self.assertIn('player.luck >= 20', self.game_js)

    def test_04_dev_mode_controls(self):
        """4. Kiểm tra Chế Độ Nhà Phát Triển (Dev Mode) trong game.js và index.html"""
        # Kiểm tra trong index.html
        self.assertIn('id="systab-dev"', self.index_html)
        self.assertTrue('id="btn-toggle-devmode"' in self.index_html or 'id="btn-toggle-dev-mode"' in self.index_html)
        self.assertIn('devBreakthrough()', self.index_html)
        self.assertIn('devMaxRank()', self.index_html)
        self.assertIn('devFullStats()', self.index_html)
        self.assertIn('devAddMoney()', self.index_html)
        self.assertIn('devGiveScrolls()', self.index_html)
        self.assertIn('devGiveGu()', self.index_html)
        self.assertIn('devSetDaiVienMan()', self.index_html)
        self.assertIn('devAddDaoMarks()', self.index_html)
        self.assertIn('devAdvanceTime()', self.index_html)
        # Kiểm tra trong game.js
        self.assertIn('function setupDevModeControls()', self.game_js)
        self.assertIn('player.devModeActive', self.game_js)
        self.assertIn('window.devBreakthrough = devBreakthrough', self.game_js)
        self.assertIn('window.devMaxRank = devMaxRank', self.game_js)

    def test_05_no_gemini_api_in_system_tabs(self):
        """5. Đảm bảo Gemini API tab đã bị loại bỏ hoàn toàn khỏi Bảng Hệ Thống"""
        self.assertNotIn('gemini-api-key', self.index_html)
        self.assertNotIn('setupAiGenerator()', self.game_js)

    def test_06_learn_techniques_via_inventory_scrolls_only(self):
        """6. Kiểm tra công pháp buộc phải học qua Quyển Trục trong Túi Trữ Vật và có Modal Xác Nhận"""
        # Modal Xác Nhận Lĩnh Ngộ trong index.html
        self.assertIn('id="modal-confirm-learn-tech"', self.index_html)
        self.assertIn('id="btn-cancel-learn-tech"', self.index_html)
        self.assertIn('id="btn-do-learn-tech"', self.index_html)
        # Logic trong game.js
        self.assertIn('function openConfirmLearnTechModal', self.game_js)
        self.assertIn('function doConfirmLearnTech', self.game_js)
        # Không còn nút học công pháp trực tiếp trong renderTechniquesSystemPane
        self.assertNotIn('btn-learn-tech-sys', self.game_js)
        self.assertIn('tech-obtain-guide', self.game_js)

    def test_07_library_gu_recipes(self):
        """7. Kiểm tra các Cổ Phương chuẩn hóa trong LIBRARY_RECIPES"""
        self.assertIn('recipe_tuu_trung', self.game_js)
        self.assertIn('recipe_bach_ngoc', self.game_js)
        self.assertIn('recipe_thiet_bi', self.game_js)
        self.assertIn('recipe_nguyet_ngan', self.game_js)
        self.assertIn('recipe_tu_vi_tuu_trung', self.game_js)
        self.assertIn('recipe_huyet_nguyet', self.game_js)
        self.assertIn('recipe_thien_bong', self.game_js)
        self.assertIn('recipe_cot_duc', self.game_js)

    def test_08_dao_marks_absorption(self):
        """8. Kiểm tra cơ chế thôn phệ Đạo Ngân qua tu luyện, nuôi cổ, săn yêu thú và đọc sách"""
        self.assertIn('function addDaoMarks(daoId, amount)', self.game_js)
        # Tích hợp vào act_meditate
        self.assertIn('addDaoMarks(mainDaoId, daoMarksGained)', self.game_js)
        # Tích hợp vào feedGuItem
        self.assertIn('addDaoMarks(targetDao, 15)', self.game_js)
        # Tích hợp vào act_hunt_beast
        self.assertIn('addDaoMarks(player.mainDao || "moc", 20)', self.game_js)
        # Tích hợp vào act_study_library
        self.assertIn('addDaoMarks(player.mainDao || "moc", 10)', self.game_js)

if __name__ == "__main__":
    unittest.main()
