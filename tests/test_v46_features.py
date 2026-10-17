"""
Test Suite for Update v4.6: Tu Tien Gioi Web Game
Tests all 8 requirements specified in prompt_draft.md and technical_blueprint_v46.md
"""

import os
import re
import json
import unittest

WORKSPACE_DIR = r"C:\Users\LONG\.gemini\antigravity\scratch\tu-tien-rpg"
GAME_JS_PATH = os.path.join(WORKSPACE_DIR, "game.js")
INDEX_HTML_PATH = os.path.join(WORKSPACE_DIR, "index.html")
GU_DATA_JS_PATH = os.path.join(WORKSPACE_DIR, "gu_data.js")
GU_DATABASE_JSON_PATH = os.path.join(WORKSPACE_DIR, "gu_database.json")

class TestUpdateV46Features(unittest.TestCase):

    def setUp(self):
        with open(GAME_JS_PATH, "r", encoding="utf-8") as f:
            self.game_js = f.read()
        with open(INDEX_HTML_PATH, "r", encoding="utf-8") as f:
            self.index_html = f.read()
        with open(GU_DATA_JS_PATH, "r", encoding="utf-8") as f:
            self.gu_data_js = f.read()
        with open(GU_DATABASE_JSON_PATH, "r", encoding="utf-8") as f:
            self.gu_db_json = json.load(f)

    # -------------------------------------------------------------
    # Req 1: Sửa lỗi thời gian bị sai lệch (đồng hồ 24h HH:MM không bị float)
    # -------------------------------------------------------------
    def test_req1_time_clock_normalization(self):
        # 1. Đoạn tính toán giờ phải có tách displayHours và displayMinutes
        self.assertIn("displayHours", self.game_js)
        self.assertIn("displayMinutes", self.game_js)
        # 2. Định dạng chuỗi giờ HH:MM
        self.assertIn("${displayHours.toString().padStart(2, \"0\")}:${displayMinutes.toString().padStart(2, \"0\")}", self.game_js)
        # 3. Không còn hourStr dạng player.timeHour + ":00"
        self.assertNotIn("player.timeHour.toString().padStart(2, \"0\") + \":00\"", self.game_js)

    # -------------------------------------------------------------
    # Req 2: Hiển thị Linh Căn đạt được trên Sidebar
    # -------------------------------------------------------------
    def test_req2_spiritual_root_sidebar_display(self):
        # 1. Có phần tử sb-linhcan-row và sb-linhcan-text trong index.html
        self.assertIn('id="sb-linhcan-row"', self.index_html)
        self.assertIn('id="sb-linhcan-text"', self.index_html)
        # 2. Trong game.js có cập nhật DOM cho sb-linhcan-text
        self.assertIn("sb-linhcan-text", self.game_js)
        self.assertIn("player.linhCan", self.game_js)

    # -------------------------------------------------------------
    # Req 3: Bảng Hệ Thống có Tổng Quan Nhân Vật (Tư chất, Linh căn, Thể chất, Thuộc tính)
    # -------------------------------------------------------------
    def test_req3_character_dossier_in_system_modal(self):
        # 1. Subtab 2 được đổi nhãn thành Tổng Quan & Không Khiếu
        self.assertIn("Tổng Quan & Không Khiếu", self.index_html)
        # 2. Trong renderAperturePane có bảng Thuộc Tính Cơ Bản
        self.assertIn("Thuộc Tính Cơ Bản & Khí Huyết", self.game_js)
        # 3. Có bảng Thuộc Tính Đặc Biệt
        self.assertIn("Thuộc Tính Đặc Biệt (Thiên Phú & Tinh Thần)", self.game_js)
        # 4. Có hiển thị Đạo Cơ Tam Trụ: Tư Chất, Linh Căn, Thể Chất
        self.assertIn("Tư Chất Cổ Sư", self.game_js)
        self.assertIn("Linh Căn Tiên Đạo", self.game_js)
        self.assertIn("Thể Chất Đạo Thể", self.game_js)

    # -------------------------------------------------------------
    # Req 4: Điểm hệ thống không được nhận qua Thám Hiểm Hang Động
    # -------------------------------------------------------------
    def test_req4_cave_exploration_no_system_points(self):
        start_idx = self.game_js.find('case "act_explore_cave":')
        self.assertNotEqual(start_idx, -1, "act_explore_cave case must exist")
        end_idx = self.game_js.find('case "act_tournament_arena":', start_idx)
        if end_idx == -1:
            end_idx = self.game_js.find('break;', start_idx)
        cave_block = self.game_js[start_idx:end_idx]
        # Không được cộng điểm hệ thống
        self.assertNotIn("systemPoints", cave_block, "act_explore_cave must not award systemPoints")
        # Phải rơi khoáng thạch/nguyên liệu tự nhiên
        self.assertIn("addItemToInventory", cave_block)

    # -------------------------------------------------------------
    # Req 5: Cổ trùng và Công pháp chuyển vào Túi Trữ Vật & kiểm tra điều kiện
    # -------------------------------------------------------------
    def test_req5_gu_and_tech_inventory_staging(self):
        # 1. refineGu đưa cổ vào inventory dạng gu_item
        self.assertIn('addItemToInventory(`gu_${gu.id}`, 1, `Cổ Trùng: ${gu.name}', self.game_js)
        # 2. Túi trữ vật có xử lý isGuItem
        self.assertIn("isGuItem", self.game_js)
        self.assertIn("btn-refine-inv-gu", self.game_js)
        # 3. Kiểm tra điều kiện Rank và MP khi luyện hóa cổ
        self.assertIn("TU VI CHƯA ĐỦ ĐỂ ÁP CHẾ", self.game_js)
        # 4. Kiểm tra điều kiện khi lĩnh ngộ công pháp
        self.assertIn("THIẾU NGỘ TÍNH", self.game_js)
        self.assertIn("CẦN CÓ LINH CĂN", self.game_js)

    # -------------------------------------------------------------
    # Req 6: Thanh Phong / Thanh Tâm Quyết được thay thế bằng Trường Xuân Công
    # -------------------------------------------------------------
    def test_req6_truong_xuan_cong_canonical_art(self):
        # 1. Không còn Thanh Phong Quyết hay Thanh Tâm Quyết trong index.html
        self.assertNotIn("Thanh Phong Quyết", self.index_html)
        self.assertNotIn("Thanh Tâm Quyết", self.index_html)
        # 2. Thay bằng Trường Xuân Công trong heritage grid
        self.assertIn("Trường Xuân Công (Tâm Pháp Mộc Hệ Nhập Môn)", self.index_html)

    # -------------------------------------------------------------
    # Req 7: Đặc tính riêng biệt của Thể Chất (Special Traits)
    # -------------------------------------------------------------
    def test_req7_special_physique_unique_traits(self):
        # 1. SPECIAL_PHYSIQUES có specialTrait cho từng thể chất
        self.assertIn("specialTrait", self.game_js)
        # 2. Có hàm applyPhysiqueBonuses
        self.assertIn("function applyPhysiqueBonuses(", self.game_js)
        # 3. Thể chất được hiển thị đặc tính bản nguyên trong renderAperturePane
        self.assertIn("Đặc Tính Bản Nguyên:", self.game_js)

    # -------------------------------------------------------------
    # Req 8: Không phải cổ nào cũng có sức tấn công (Tửu Trùng power = 0)
    # -------------------------------------------------------------
    def test_req8_gu_attack_power_normalization(self):
        # 1. Tửu Trùng trong database có power == 0
        tuu_trung = next((g for g in self.gu_db_json if g["id"] == "t_u_tr_ng"), None)
        self.assertIsNotNone(tuu_trung)
        self.assertEqual(tuu_trung["power"], 0, "Tửu Trùng power must be 0")
        self.assertEqual(tuu_trung["type"], "Hỗ Trợ")
        self.assertIn("supportEffect", tuu_trung)
        # 2. calculateTotalPower chỉ cộng sức tấn công của Cổ Tấn Công
        start_idx = self.game_js.find('function calculateTotalPower()')
        self.assertNotEqual(start_idx, -1, "calculateTotalPower function must exist")
        end_idx = self.game_js.find('return base;', start_idx)
        self.assertNotEqual(end_idx, -1)
        calc_block = self.game_js[start_idx:end_idx+30]
        self.assertIn('g.type === "Tấn Công"', calc_block)

if __name__ == "__main__":
    unittest.main()
