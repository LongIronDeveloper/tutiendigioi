"""
Test Suite: Core Regression Suite (v4.5 - v5.1)
Consolidates and deduplicates all features and bug fixes from:
- test_v45_features.py (Update v4.5)
- test_v46_features.py (Update v4.6)
- test_v5_features.py (Update v5.0)
- test_v51_features.py (Update v5.1)
"""

import os
import re
import json
import unittest

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class TestCoreRegression(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        game_js_path = os.path.join(BASE_DIR, "game.js")
        index_html_path = os.path.join(BASE_DIR, "index.html")
        gu_data_js_path = os.path.join(BASE_DIR, "gu_data.js")
        gu_database_json_path = os.path.join(BASE_DIR, "gu_database.json")
        techniques_data_js_path = os.path.join(BASE_DIR, "techniques_data.js")

        with open(game_js_path, "r", encoding="utf-8") as f:
            cls.game_js = f.read()

        with open(index_html_path, "r", encoding="utf-8") as f:
            cls.index_html = f.read()

        with open(gu_data_js_path, "r", encoding="utf-8") as f:
            cls.gu_data_js = f.read()

        with open(gu_database_json_path, "r", encoding="utf-8") as f:
            cls.gu_db_json = json.load(f)

        with open(techniques_data_js_path, "r", encoding="utf-8") as f:
            cls.tech_data_js = f.read()

    # =========================================================================
    # NHÓM 1: TU VI & CẢNH GIỚI (CULTIVATION & RANKS)
    # =========================================================================

    def test_01_ranks_canonical_9_chuyen(self):
        """1. Kiểm tra tu vi chuẩn hóa 9 Chuyển thuần túy Cổ Chân Nhân, không còn phân hệ Luyện Khí/Trúc Cơ"""
        self.assertIn('name: "Nhất Chuyển"', self.game_js)
        self.assertIn('name: "Nhị Chuyển"', self.game_js)
        self.assertIn('name: "Tam Chuyển"', self.game_js)
        self.assertIn('name: "Cửu Chuyển (Cổ Tôn)"', self.game_js)
        self.assertNotIn('name: "Nhất Chuyển • Luyện Khí Kỳ"', self.game_js)
        self.assertNotIn('name: "Nhị Chuyển • Trúc Cơ Kỳ"', self.game_js)

    def test_02_cultivation_exp_pacing_and_anti_nan(self):
        """2. Kiểm tra tu vi không bị NaN% và tốc độ tu vi được nerf cân bằng (baseExp >= 450)"""
        # Anti-NaN & initialization
        self.assertIn("subStageIdx: 0", self.game_js)
        self.assertIn("recalcMaxExp()", self.game_js)
        self.assertIn("isNaN(player.maxExp)", self.game_js)
        
        # Cultivation nerf pacing: baseExp Rank 1 >= 450
        base_exp_match = re.search(r'baseExp:\s*(\d+)', self.game_js)
        self.assertIsNotNone(base_exp_match, "Must define baseExp in RANKS")
        first_rank_base_exp = int(base_exp_match.group(1))
        self.assertGreaterEqual(first_rank_base_exp, 450, "Rank 1 baseExp should be >= 450 to pace cultivation")

    def test_03_great_perfection_mechanics(self):
        """3. Kiểm tra cơ chế Đại Viên Mãn (tích lũy đến 1.6x maxExp trước khi đột phá)"""
        self.assertIn("checkExpThreshold", self.game_js)
        self.assertIn("1.6", self.game_js, "checkExpThreshold should use 1.6x maxExp cap for Great Perfection")

    # =========================================================================
    # NHÓM 2: LINH CĂN & THỂ CHẤT & KHÔNG KHIẾU (APTITUDE & PHYSIQUE & APERTURE)
    # =========================================================================

    def test_04_spiritual_roots_rate_and_sidebar(self):
        """4. Kiểm tra hệ số Linh Căn (sửa undefined) và hiển thị thanh bên (Sidebar)"""
        # Không còn 'linhCan.rate' trực tiếp
        self.assertNotIn("linhCan.rate", self.game_js)
        self.assertIn("linhCan.bonusCultivate", self.game_js)
        self.assertIn("Hệ số tương thích công pháp: x${(1 + (linhCan.bonusCultivate || 0)).toFixed(2)} Tốc độ tu vi", self.game_js)

        # Hiển thị trên sidebar
        self.assertIn('id="sb-linhcan-row"', self.index_html)
        self.assertIn('id="sb-linhcan-text"', self.index_html)
        self.assertIn("sb-linhcan-text", self.game_js)
        self.assertIn("player.linhCan", self.game_js)

    def test_05_character_dossier_and_aperture_pane(self):
        """5. Kiểm tra hồ sơ nhân vật toàn diện và hiển thị Không Khiếu trong bảng hệ thống"""
        # Subtab Tổng Quan & Không Khiếu trong index.html
        self.assertIn("Tổng Quan & Không Khiếu", self.index_html)
        self.assertIn("Thuộc Tính Cơ Bản & Khí Huyết", self.game_js)
        self.assertIn("Thuộc Tính Đặc Biệt (Thiên Phú & Tinh Thần)", self.game_js)

        # Đạo Cơ Tam Trụ: Tư Chất, Linh Căn, Thể Chất
        self.assertIn("Tư Chất Cổ Sư", self.game_js)
        self.assertIn("Linh Căn Tiên Đạo", self.game_js)
        self.assertIn("Thể Chất Đạo Thể", self.game_js)

        # Thẻ Hồ Sơ Nhân Vật
        self.assertIn("THẺ HỒ SƠ NHÂN VẬT & ĐẠO CƠ TOÀN DIỆN", self.game_js)
        self.assertIn("📜 Công Pháp Chính:", self.game_js)
        self.assertIn("⭐ Lưu Phái Chính:", self.game_js)
        self.assertIn("🐛 Bản Mệnh Cổ:", self.game_js)
        self.assertIn("⚔️ Chiến Lực Tổng Hợp:", self.game_js)

    def test_06_special_physique_unique_traits(self):
        """6. Kiểm tra các hiệu ứng dị tượng độc nhất của Thập Đại Cổ Thể trong SPECIAL_PHYSIQUES"""
        self.assertIn("specialTrait", self.game_js)
        self.assertIn("function applyPhysiqueBonuses(", self.game_js)
        self.assertIn("Đặc Tính Bản Nguyên:", self.game_js)

    # =========================================================================
    # NHÓM 3: CÔNG PHÁP & TÀNG THƯ CÁC & LƯU PHÁI (ARTS & LIBRARY)
    # =========================================================================

    def test_07_technique_acquisition_via_scrolls_only(self):
        """7. Kiểm tra công pháp buộc phải học qua Quyển Trục trong Túi Trữ Vật và có Modal Xác Nhận"""
        # Modal Xác Nhận Lĩnh Ngộ trong index.html
        self.assertIn('id="modal-confirm-learn-tech"', self.index_html)
        self.assertIn('id="btn-cancel-learn-tech"', self.index_html)
        self.assertIn('id="btn-do-learn-tech"', self.index_html)

        # Logic mở modal và xác nhận trong game.js
        self.assertIn("function openConfirmLearnTechModal", self.game_js)
        self.assertIn("function doConfirmLearnTech", self.game_js)

        # Không còn nút học công pháp trực tiếp trong renderTechniquesSystemPane
        self.assertNotIn("btn-learn-tech-sys", self.game_js)
        self.assertIn("tech-obtain-guide", self.game_js)

        # Không còn action card act_practice_technique trong Tàng Thư Các
        library_block_match = re.search(r'library:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}', self.game_js)
        self.assertIsNotNone(library_block_match)
        library_block = library_block_match.group(1)
        self.assertNotIn("act_practice_technique", library_block)

    def test_08_main_dao_determined_by_main_technique(self):
        """8. Kiểm tra Lưu Phái Chính được quyết định bởi Công Pháp Chính (setMainTechnique & player.mainDao = tech.dao)"""
        self.assertIn("function setMainTechnique(", self.game_js)
        self.assertIn("player.mainDao = tech.dao", self.game_js)
        self.assertIn("btn-set-main-tech", self.game_js)
        self.assertIn("Vận Hành Làm Công Pháp Chính", self.game_js)
        self.assertNotIn("btn-choose-dao", self.game_js)

    def test_09_truong_xuan_cong_canonical_art(self):
        """9. Đảm bảo Trường Xuân Công là công pháp chính đạo khởi đầu duy nhất, loại bỏ tàn dư cũ"""
        self.assertIn("Trường Xuân Công", self.game_js)
        self.assertNotIn("Thanh Phong Quyết", self.index_html)
        self.assertNotIn("Thanh Tâm Quyết", self.index_html)

    def test_10_library_study_caps(self):
        """10. Kiểm tra giới hạn trần cứng đọc sách Tàng Thư Các (maxCap = 10)"""
        self.assertIn("act_study_library", self.game_js)
        self.assertIn("maxCap = 10", self.game_js)

    def test_11_techniques_database_9_ranks(self):
        """11. Kiểm tra Techniques Database mở rộng công pháp trải dài từ Rank 1 đến Rank 9"""
        ranks_found = set()
        for r in range(1, 10):
            if f"rank: {r}" in self.tech_data_js:
                ranks_found.add(r)
        self.assertEqual(len(ranks_found), 9, f"Techniques must cover all 9 ranks! Found: {ranks_found}")

        self.assertIn("truong_xuan_cong", self.tech_data_js)
        self.assertIn("thanh_nguyen_kiem_quyet", self.tech_data_js)
        self.assertIn("tam_chuyen_trong_nguyen", self.tech_data_js)
        self.assertIn("dai_dien_quyet", self.tech_data_js)
        self.assertIn("minh_vuong_quyet", self.tech_data_js)
        self.assertIn("dai_canh_kiem_tran", self.tech_data_js)
        self.assertIn("nguyen_tu_than_quang", self.tech_data_js)
        self.assertIn("phan_thanh_chan_ma_cong", self.tech_data_js)
        self.assertIn("kinh_trap_thap_nhi_bien", self.tech_data_js)
        self.assertIn("tieu_bac_dau_tinh_nguyen", self.tech_data_js)
        self.assertIn("tan_thanh_nguyen_kiem_quyet", self.tech_data_js)
        self.assertIn("dai_chu_thien_tinh_nguyen", self.tech_data_js)
        self.assertIn("chan_ngon_hoa_luan_kinh", self.tech_data_js)
        self.assertIn("thien_sat_tran_nguc_cong", self.tech_data_js)
        self.assertIn("luyen_than_thuat", self.tech_data_js)
        self.assertIn("dai_ngu_hanh_huyen_the_quyet", self.tech_data_js)

    # =========================================================================
    # NHÓM 4: CỔ TRÙNG & HỢP LUYỆN & CỔ PHƯƠNG (GU SYSTEM & RECIPES)
    # =========================================================================

    def test_12_gu_refining_materials_and_inventory_staging(self):
        """12. Kiểm tra Hợp Luyện Cổ: tiêu hao nguyên liệu, kiểm tra linh thạch và lưu vào Túi Trữ Vật"""
        self.assertIn("function refineGu(", self.game_js)
        self.assertIn("player.stoneLow", self.game_js)
        self.assertIn("THIẾU NGUYÊN LIỆU HỢP LUYỆN", self.game_js)
        self.assertIn("matchedItem.count -= 1", self.game_js)
        
        # Staging vào inventory
        self.assertIn('addItemToInventory(`gu_${gu.id}`, 1, `Cổ Trùng: ${gu.name}', self.game_js)
        self.assertIn("isGuItem", self.game_js)
        self.assertIn("btn-refine-inv-gu", self.game_js)
        self.assertIn("TU VI CHƯA ĐỦ ĐỂ ÁP CHẾ", self.game_js)

    def test_13_gu_database_and_normalization(self):
        """13. Kiểm tra Database Cổ Trùng (>= 220 cổ, đủ 9 Chuyển, Tửu Trùng chuẩn hóa công kích = 0 và thức ăn rượu)"""
        # Tổng số Cổ Trùng >= 220
        self.assertGreaterEqual(len(self.gu_db_json), 220, "Total Gu count should be >= 220")

        # Có đủ các Rank 1-9
        ranks_in_db = set(g.get("rank") for g in self.gu_db_json)
        for r in range(1, 10):
            self.assertIn(r, ranks_in_db, f"Gu Database must include Rank {r} Gu")

        # Tửu Trùng chuẩn hóa
        t_u_tr_ng_json = next((g for g in self.gu_db_json if g.get("id") == "t_u_tr_ng"), None)
        self.assertIsNotNone(t_u_tr_ng_json, "Tửu Trùng must exist in gu_database.json")
        self.assertEqual(t_u_tr_ng_json["type"], "Hỗ Trợ")
        self.assertIn("rượu", t_u_tr_ng_json["food"].lower())
        self.assertEqual(t_u_tr_ng_json.get("power", 0), 0, "Tửu Trùng power should be 0")

        # Cổ Tiên Chuyển 6-9
        gu_ids = set(g.get("id") for g in self.gu_db_json)
        self.assertIn("kien_tri_tien_co", gu_ids)
        self.assertIn("tri_tue_co", gu_ids)
        self.assertIn("vinh_sinh_co", gu_ids)

    def test_14_library_gu_recipes(self):
        """14. Kiểm tra các Cổ Phương chuẩn hóa nguyên tác trong LIBRARY_RECIPES"""
        self.assertIn("recipe_tuu_trung", self.game_js)
        self.assertIn("recipe_bach_ngoc", self.game_js)
        self.assertIn("recipe_thiet_bi", self.game_js)
        self.assertIn("recipe_nguyet_ngan", self.game_js)
        self.assertIn("recipe_tu_vi_tuu_trung", self.game_js)
        self.assertIn("recipe_huyet_nguyet", self.game_js)
        self.assertIn("recipe_thien_bong", self.game_js)
        self.assertIn("recipe_cot_duc", self.game_js)

    # =========================================================================
    # NHÓM 5: HỆ THỐNG ĐẠO NGÂN & SÁT CHIÊU (DAO MARKS & KILLER MOVES)
    # =========================================================================

    def test_15_dao_levels_structure(self):
        """15. Kiểm tra hệ thống Đạo Ngân 8 cảnh giới chuẩn nguyên tác Cổ Chân Nhân"""
        self.assertIn('"Phổ Thông"', self.game_js)
        self.assertIn('"Chuẩn Đại Sư"', self.game_js)
        self.assertIn('"Đại Sư"', self.game_js)
        self.assertIn('"Chuẩn Tông Sư"', self.game_js)
        self.assertIn('"Tông Sư"', self.game_js)
        self.assertIn('"Chuẩn Đại Tông Sư"', self.game_js)
        self.assertIn('"Đại Tông Sư (Sát Chiêu)"', self.game_js)
        self.assertIn('"Vô Thượng Đại Tông Sư"', self.game_js)
        self.assertIn("reqMarks: 150000", self.game_js)
        self.assertIn("reqMarks: 500000", self.game_js)

    def test_16_killer_move_conditions(self):
        """16. Kiểm tra 4 điều kiện khai sáng Sát Chiêu: Đạo Ngân >= 150k, Ngộ Tính >= 30, Trí Mưu >= 25, Khí Vận >= 20"""
        self.assertIn("curMarks >= 150000", self.game_js)
        self.assertIn("player.comprehension >= 30", self.game_js)
        self.assertIn("player.intelligence >= 25", self.game_js)
        self.assertIn("player.luck >= 20", self.game_js)

    def test_17_dao_marks_absorption(self):
        """17. Kiểm tra cơ chế tích lũy Đạo Ngân qua tu luyện, nuôi cổ, đọc sách (đã loại trừ săn thú phàm)"""
        self.assertIn("function addDaoMarks(daoId, amount)", self.game_js)
        self.assertIn("addDaoMarks(mainDaoId, daoMarksGained)", self.game_js)
        self.assertIn("addDaoMarks(targetDao, 15)", self.game_js)
        self.assertNotIn('addDaoMarks(player.mainDao || "moc", 20)', self.game_js)
        self.assertIn('addDaoMarks(player.mainDao || "moc", 10)', self.game_js)

    # =========================================================================
    # NHÓM 6: KINH TẾ, DOANH TRẠI & DI CHUYỂN (ECONOMY & MOVEMENT)
    # =========================================================================

    def test_18_shop_purchases_to_inventory(self):
        """18. Kiểm tra Cửa Hàng mua đồ vào Túi Trữ Vật & hiển thị nút sử dụng"""
        self.assertIn("function addItemToInventory(", self.game_js)
        self.assertIn("player.guInventory.push", self.game_js)
        self.assertIn("btn-use-inv", self.game_js)

    def test_19_camp_movement_costs_stamina_and_time(self):
        """19. Kiểm tra chi phí di chuyển nội bộ doanh trại: 0 thể lực và 5 phút (5/60 giờ)"""
        # Stamina cost = 0
        self.assertIn("home: {", self.game_js)
        self.assertTrue("staminaCost: 0" in self.game_js)
        self.assertIn("act.staminaCost > 0", self.game_js)

        # Time cost = 5 minutes (5 / 60)
        self.assertIn("5 / 60", self.game_js)
        self.assertIn("5 phút", self.game_js)

    def test_20_cave_exploration_no_system_points(self):
        """20. Kiểm tra thám hiểm động phủ cân bằng, không cộng điểm hệ thống phi lý"""
        start_idx = self.game_js.find('case "act_explore_cave":')
        self.assertNotEqual(start_idx, -1, "act_explore_cave case must exist")
        end_idx = self.game_js.find('case "act_tournament_arena":', start_idx)
        if end_idx == -1:
            end_idx = self.game_js.find('break;', start_idx)
        cave_block = self.game_js[start_idx:end_idx]
        self.assertNotIn("systemPoints", cave_block, "act_explore_cave must not award systemPoints")
        self.assertIn("addItemToInventory", cave_block)

    # =========================================================================
    # NHÓM 7: GIAO DIỆN & CHẾ ĐỘ NHÀ PHÁT TRIỂN (UI & DEV MODE)
    # =========================================================================

    def test_21_time_clock_normalization(self):
        """21. Kiểm tra chuẩn hóa hiển thị thời gian đồng hồ Giờ:Phút (displayHours & displayMinutes)"""
        self.assertIn("displayHours", self.game_js)
        self.assertIn("displayMinutes", self.game_js)
        self.assertIn('${displayHours.toString().padStart(2, "0")}:${displayMinutes.toString().padStart(2, "0")}', self.game_js)
        self.assertNotIn('player.timeHour.toString().padStart(2, "0") + ":00"', self.game_js)

    def test_22_dev_mode_and_gemini_tab_removal(self):
        """22. Kiểm tra bảng Dev Mode đầy đủ chức năng và Gemini API tab đã được dọn sạch hoàn toàn"""
        # Gemini API tab removed
        self.assertNotIn("gemini-api-key", self.index_html)
        self.assertNotIn("setupAiGenerator()", self.game_js)

        # Dev Mode tab and controls
        self.assertIn('id="systab-dev"', self.index_html)
        self.assertTrue('id="btn-toggle-devmode"' in self.index_html or 'id="btn-toggle-dev-mode"' in self.index_html)
        self.assertIn("devBreakthrough()", self.index_html)
        self.assertIn("devMaxRank()", self.index_html)
        self.assertIn("devFullStats()", self.index_html)
        self.assertIn("devAddMoney()", self.index_html)
        self.assertIn("devGiveScrolls()", self.index_html)
        self.assertIn("devGiveGu()", self.index_html)
        self.assertIn("devSetDaiVienMan()", self.index_html)
        self.assertIn("devAddDaoMarks()", self.index_html)
        self.assertIn("devAdvanceTime()", self.index_html)

        # Dev Mode logic in game.js
        self.assertIn("function setupDevModeControls()", self.game_js)
        self.assertIn("player.devModeActive", self.game_js)
        self.assertIn("window.devBreakthrough = devBreakthrough", self.game_js)
        self.assertIn("window.devMaxRank = devMaxRank", self.game_js)


if __name__ == "__main__":
    unittest.main()
