"""
Test Suite for Update v4.5: Tu Tien Gioi Web Game
Tests all 11 requirements specified in prompt_draft.md and technical_blueprint_v45.md
"""

import os
import re
import json
import unittest

WORKSPACE_DIR = r"C:\Users\LONG\.gemini\antigravity\scratch\tu-tien-rpg"
GAME_JS_PATH = os.path.join(WORKSPACE_DIR, "game.js")
GU_DATA_JS_PATH = os.path.join(WORKSPACE_DIR, "gu_data.js")
GU_DATABASE_JSON_PATH = os.path.join(WORKSPACE_DIR, "gu_database.json")

class TestUpdateV45Features(unittest.TestCase):

    def setUp(self):
        with open(GAME_JS_PATH, "r", encoding="utf-8") as f:
            self.game_js = f.read()
        with open(GU_DATA_JS_PATH, "r", encoding="utf-8") as f:
            self.gu_data_js = f.read()
        with open(GU_DATABASE_JSON_PATH, "r", encoding="utf-8") as f:
            self.gu_db_json = json.load(f)

    # -------------------------------------------------------------
    # Req 1: Hệ số tu luyện không hiện ở Linh Căn (sửa xundefined)
    # -------------------------------------------------------------
    def test_req1_spiritual_root_rate_display(self):
        # 1. Không còn 'linhCan.rate' trong game.js
        self.assertNotIn("linhCan.rate", self.game_js, "game.js should not access linhCan.rate directly as it is undefined")
        
        # 2. displayRolledLinhCan phải tính dựa trên bonusCultivate
        self.assertIn("linhCan.bonusCultivate", self.game_js, "displayRolledLinhCan should use bonusCultivate")
        
        # 3. Đo Linh Bàn hiển thị hệ số dạng (1 + bonusCultivate)
        self.assertIn("Hệ số tương thích công pháp: x${(1 + (linhCan.bonusCultivate || 0)).toFixed(2)} Tốc độ tu vi", self.game_js)

    # -------------------------------------------------------------
    # Req 2: Hệ thống tu luyện không bị NaN%
    # -------------------------------------------------------------
    def test_req2_tu_vi_nan_percent_fixed(self):
        # 1. resetPlayerToFreshState khởi tạo subStageIdx và maxExp
        self.assertIn("subStageIdx: 0", self.game_js)
        self.assertIn("maxExp: 385", self.game_js)
        self.assertIn("recalcMaxExp()", self.game_js)
        
        # 2. updateSidebarUI phòng thủ chống NaN
        self.assertIn("isNaN(player.maxExp)", self.game_js)
        self.assertIn("recalcMaxExp", self.game_js)

    # -------------------------------------------------------------
    # Req 3: Luyện Cổ trong Bảng Hệ Thống phải kiểm tra & tiêu hao nguyên liệu
    # -------------------------------------------------------------
    def test_req3_gu_refining_requires_materials(self):
        self.assertIn("function refineGu(", self.game_js)
        # Phải kiểm tra linh thạch hạ phẩm
        self.assertIn("player.stoneLow", self.game_js)
        # Phải kiểm tra nguyên liệu trong player.inventory
        self.assertIn("THIẾU NGUYÊN LIỆU HỢP LUYỆN", self.game_js)
        self.assertIn("matchedItem.count -= 1", self.game_js)

    # -------------------------------------------------------------
    # Req 4: Cửa hàng hệ thống mua hàng vào túi trữ vật & sử dụng được
    # -------------------------------------------------------------
    def test_req4_shop_purchases_to_inventory(self):
        # 1. Mua đan dược/sách phải vào player.inventory qua addItemToInventory
        self.assertIn("function addItemToInventory(", self.game_js)
        self.assertIn("addItemToInventory(", self.game_js)
        # 2. Cổ trùng vào guInventory
        self.assertIn("player.guInventory.push", self.game_js)
        # 3. Hiển thị nút sử dụng trong Túi trữ vật
        self.assertIn("btn-use-inv", self.game_js)

    # -------------------------------------------------------------
    # Req 5: Tốn thể lực lung tung khi di chuyển (di chuyển 0 thể lực)
    # -------------------------------------------------------------
    def test_req5_movement_stamina_cost_zero(self):
        # Trong LOCATIONS_CONFIG các địa điểm nội bộ có staminaCost: 0
        self.assertIn("home: {", self.game_js)
        self.assertTrue("staminaCost: 0" in self.game_js)
        # Giao diện render action card kiểm tra act.staminaCost > 0
        self.assertIn("act.staminaCost > 0", self.game_js)

    # -------------------------------------------------------------
    # Req 6: Xóa bỏ action card "Lĩnh ngộ công pháp mới" ở Tàng Thư Các
    # -------------------------------------------------------------
    def test_req6_remove_practice_technique_action_card(self):
        library_block_match = re.search(r'library:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}', self.game_js)
        self.assertIsNotNone(library_block_match)
        library_block = library_block_match.group(1)
        self.assertNotIn("act_practice_technique", library_block, "act_practice_technique action card must be removed from library")

    # -------------------------------------------------------------
    # Req 7: Di chuyển chỉ mất 5 phút (5 / 60 giờ) thay vì 1 tiếng
    # -------------------------------------------------------------
    def test_req7_movement_time_cost_5_minutes(self):
        # timeCost: 5 / 60
        self.assertIn("5 / 60", self.game_js, "Internal camp travel time cost must be 5 / 60 hours")
        # Action card rendering display '5 phút'
        self.assertIn("5 phút", self.game_js)

    # -------------------------------------------------------------
    # Req 8: Cổ trùng bị phân loại sai (Tửu Trùng)
    # -------------------------------------------------------------
    def test_req8_gu_classification_and_food(self):
        # In gu_database.json
        t_u_tr_ng_json = next((g for g in self.gu_db_json if g["id"] == "t_u_tr_ng"), None)
        self.assertIsNotNone(t_u_tr_ng_json, "Tửu Trùng must exist in gu_database.json")
        self.assertEqual(t_u_tr_ng_json["type"], "Hỗ Trợ", "Tửu Trùng type must be 'Hỗ Trợ'")
        self.assertIn("rượu", t_u_tr_ng_json["food"].lower(), "Tửu Trùng food must be wine/rượu")

        # In gu_data.js
        self.assertIn('"id": "t_u_tr_ng"', self.gu_data_js)
        self.assertIn('"name": "Tửu trùng"', self.gu_data_js)

    # -------------------------------------------------------------
    # Req 9: Hiển thị Linh Căn / Tư Chất / Thể Chất trong Bảng Hệ Thống
    # -------------------------------------------------------------
    def test_req9_display_roots_aptitude_physique_in_system(self):
        self.assertIn("renderAperturePane", self.game_js)
        self.assertIn("Linh Căn Tiên Đạo", self.game_js)
        self.assertIn("Tư Chất Không Khiếu", self.game_js)
        self.assertIn("Thể Chất Đạo Thể", self.game_js)

    # -------------------------------------------------------------
    # Req 10: Thẻ Mô Tả Nhân Vật Toàn Diện trong Bảng Hệ Thống
    # -------------------------------------------------------------
    def test_req10_character_profile_card(self):
        self.assertIn("THẺ HỒ SƠ NHÂN VẬT & ĐẠO CƠ TOÀN DIỆN", self.game_js)
        self.assertIn("📜 Công Pháp Chính:", self.game_js)
        self.assertIn("⭐ Lưu Phái Chính:", self.game_js)
        self.assertIn("🐛 Bản Mệnh Cổ:", self.game_js)
        self.assertIn("⚔️ Chiến Lực Tổng Hợp:", self.game_js)

    # -------------------------------------------------------------
    # Req 11: Lưu phái quyết định bởi Công Pháp Chính
    # -------------------------------------------------------------
    def test_req11_main_dao_determined_by_main_technique(self):
        # 1. Có hàm setMainTechnique
        self.assertIn("function setMainTechnique(", self.game_js)
        # 2. setMainTechnique đồng bộ player.mainDao = tech.dao
        self.assertIn("player.mainDao = tech.dao", self.game_js)
        # 3. Nút vận hành công pháp chính trong renderTechniquesSystemPane
        self.assertIn("btn-set-main-tech", self.game_js)
        self.assertIn("Vận Hành Làm Công Pháp Chính", self.game_js)
        # 4. renderDaosPane không còn nút chọn lưu phái tự do
        self.assertNotIn("btn-choose-dao", self.game_js, "Manual choosing dao button must be removed from renderDaosPane")

if __name__ == "__main__":
    unittest.main()
