"""
Test Suite: Core Regression Suite (Pure Reverend Insanity / Cổ Chân Nhân Standard)
Consolidates and validates core game engine mechanics:
- Zero Spiritual Roots (Linh Căn 100% eliminated, pure Aperture & Vital Gu)
- Authentic Aptitude Rates (Đinh 0.7, Bính 1.0, Ất 1.4, Giáp 1.7, Thập Tuyệt 2.0)
- Master Gu & Killer Moves Database (Techniques 100% eliminated)
- 9 Canonical Ranks (Chuyển), Dao Marks, Great Perfection, Economy & UI.
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
        killer_moves_js_path = os.path.join(BASE_DIR, "killer_moves_data.js")

        with open(game_js_path, "r", encoding="utf-8") as f:
            cls.game_js = f.read()

        with open(index_html_path, "r", encoding="utf-8") as f:
            cls.index_html = f.read()

        with open(gu_data_js_path, "r", encoding="utf-8") as f:
            cls.gu_data_js = f.read()

        with open(gu_database_json_path, "r", encoding="utf-8") as f:
            cls.gu_db_json = json.load(f)

        if os.path.exists(killer_moves_js_path):
            with open(killer_moves_js_path, "r", encoding="utf-8") as f:
                cls.killer_moves_js = f.read()
        else:
            cls.killer_moves_js = ""

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
        self.assertIn("subStageIdx: 0", self.game_js)
        self.assertIn("recalcMaxExp()", self.game_js)
        self.assertIn("isNaN(player.maxExp)", self.game_js)
        
        base_exp_match = re.search(r'baseExp:\s*(\d+)', self.game_js)
        self.assertIsNotNone(base_exp_match, "Must define baseExp in RANKS")
        first_rank_base_exp = int(base_exp_match.group(1))
        self.assertGreaterEqual(first_rank_base_exp, 450, "Rank 1 baseExp should be >= 450 to pace cultivation")

    def test_03_great_perfection_mechanics(self):
        """3. Kiểm tra cơ chế Đại Viên Mãn (tích lũy đến 1.6x maxExp trước khi đột phá)"""
        self.assertIn("checkExpThreshold", self.game_js)
        self.assertIn("1.6", self.game_js, "checkExpThreshold should use 1.6x maxExp cap for Great Perfection")

    # =========================================================================
    # NHÓM 2: TƯ CHẤT KHÔNG KHIẾU & BẢN MỆNH CỔ (PURE APERTURE & VITAL GU)
    # =========================================================================

    def test_04_no_spiritual_roots_and_pure_aperture_sidebar(self):
        """4. Đảm bảo Linh Căn đã bị xóa bỏ 100%, Sidebar hiển thị Tư Chất & Bản Mệnh Cổ, Tỷ lệ chuẩn (0.7, 1.0, 1.4, 1.7)"""
        # Không còn Linh Căn trên Sidebar
        self.assertNotIn('id="sb-linhcan-row"', self.index_html)
        self.assertNotIn('id="sb-linhcan-text"', self.index_html)

        # Có Tư Chất & Bản Mệnh Cổ trên Sidebar
        self.assertIn('id="sb-aptitude-row"', self.index_html)
        self.assertIn('id="sb-vitalgu-row"', self.index_html)
        self.assertIn('id="sb-vitalgu-text"', self.index_html)

        # Mảng SPIRITUAL_ROOTS đã bị làm rỗng hoặc loại bỏ
        self.assertTrue("SPIRITUAL_ROOTS = [];" in self.game_js or "SPIRITUAL_ROOTS" not in self.game_js)

        # Kiểm tra chuẩn hóa rate APTITUDES
        self.assertIn('rate: 0.7', self.game_js)
        self.assertIn('rate: 1.0', self.game_js)
        self.assertIn('rate: 1.4', self.game_js)
        self.assertIn('rate: 1.7', self.game_js)

    def test_05_character_dossier_and_aperture_pane(self):
        """5. Kiểm tra hồ sơ nhân vật toàn diện và hiển thị Không Khiếu trong bảng hệ thống"""
        self.assertIn("Tổng Quan & Không Khiếu", self.index_html)
        self.assertIn("Thuộc Tính Cơ Bản & Khí Huyết", self.game_js)
        self.assertIn("Thuộc Tính Đặc Biệt (Thiên Phú & Tinh Thần)", self.game_js)

        # Tư Chất Cổ Sư, Cổ Bản Mệnh, Thể Chất Đạo Thể
        self.assertIn("Tư Chất Cổ Sư", self.game_js)
        self.assertIn("Cổ Bản Mệnh", self.game_js)
        self.assertIn("Thể Chất Đạo Thể", self.game_js)
        self.assertNotIn("Linh Căn Tiên Đạo", self.game_js)

        # Thẻ Hồ Sơ Nhân Vật
        self.assertIn("THẺ HỒ SƠ NHÂN VẬT & ĐẠO CƠ TOÀN DIỆN", self.game_js)
        self.assertIn("🐛 Bản Mệnh Cổ:", self.game_js)
        self.assertIn("⚔️ Chiến Lực Tổng Hợp:", self.game_js)

    def test_06_special_physique_unique_traits(self):
        """6. Kiểm tra các hiệu ứng dị tượng độc nhất của Thập Đại Cổ Thể trong SPECIAL_PHYSIQUES"""
        self.assertIn("specialTrait", self.game_js)
        self.assertIn("function applyPhysiqueBonuses(", self.game_js)
        self.assertIn("Đặc Tính Bản Nguyên:", self.game_js)

    # =========================================================================
    # NHÓM 3: SÁT CHIÊU & CỔ TRÙNG MASTER (KILLER MOVES & PURE GU)
    # =========================================================================

    def test_07_pure_gu_mastery_and_no_technique_modals(self):
        """7. Đảm bảo toàn bộ modal/tab Công Pháp cũ đã bị dọn sạch, thay thế bằng Sát Chiêu & Cổ Trùng"""
        self.assertNotIn('id="systab-techniques"', self.index_html)
        self.assertNotIn('id="modal-techniques"', self.index_html)
        self.assertNotIn('id="modal-confirm-learn-tech"', self.index_html)

        # Có Tab và Modal Sát Chiêu
        self.assertIn('id="systab-killer-moves"', self.index_html)
        self.assertIn('id="modal-killer-moves"', self.index_html)
        self.assertIn('id="btn-open-killer-moves"', self.index_html)

    def test_08_main_path_determined_by_vital_gu_or_killer_move(self):
        """8. Kiểm tra Lưu Phái Chính gắn liền với Sát Chiêu và Cổ Bản Mệnh trong player state"""
        self.assertIn("vitalGuId", self.game_js)
        self.assertIn("killerMovesLearned", self.game_js)
        self.assertIn("activeKillerMoves", self.game_js)

    def test_09_pure_reverend_insanity_intro_stepper(self):
        """9. Đảm bảo Màn hình Mở đầu tinh gọn theo cốt truyện Cổ Nguyệt Sơn Trại (không còn Đo Linh Bàn)"""
        self.assertIn('1. Nhập Môn', self.index_html)
        self.assertIn('2. Khai Khiếu', self.index_html)
        self.assertIn('3. Thể Chất', self.index_html)
        self.assertIn('4. Bản Mệnh Cổ', self.index_html)
        self.assertNotIn('Đo Linh Bàn', self.index_html)
        self.assertIn('Xác Nhận Luyện Hóa & Bước Vào Sơn Trại', self.index_html)

    def test_10_library_study_caps(self):
        """10. Kiểm tra giới hạn trần cứng đọc sách Tàng Thư Các (maxCap = 10)"""
        self.assertIn("act_study_library", self.game_js)
        self.assertIn("maxCap = 10", self.game_js)

    def test_11_master_database_and_killer_moves(self):
        """11. Kiểm tra Master Database tích hợp đầy đủ và techniques_data.js đã bị loại bỏ"""
        self.assertIn('paths_data.js', self.index_html)
        self.assertIn('gu_data.js', self.index_html)
        self.assertIn('recipes_data.js', self.index_html)
        self.assertIn('killer_moves_data.js', self.index_html)
        self.assertNotIn('techniques_data.js', self.index_html)
        self.assertFalse(os.path.exists(os.path.join(BASE_DIR, "techniques_data.js")))

    # =========================================================================
    # NHÓM 4: CỔ TRÙNG & HỢP LUYỆN & CỔ PHƯƠNG (GU SYSTEM & RECIPES)
    # =========================================================================

    def test_12_gu_refining_materials_and_inventory_staging(self):
        """12. Kiểm tra Hợp Luyện Cổ: tiêu hao nguyên liệu, kiểm tra linh thạch và lưu vào Túi Trữ Vật"""
        self.assertIn("function refineGu(", self.game_js)
        self.assertIn("player.stoneLow", self.game_js)
        self.assertIn("THIẾU NGUYÊN LIỆU HỢP LUYỆN", self.game_js)
        self.assertIn("matchedItem.count -= 1", self.game_js)
        
        self.assertIn('addItemToInventory(`gu_${gu.id}`, 1, `Cổ Trùng: ${gu.name}', self.game_js)
        self.assertIn("isGuItem", self.game_js)
        self.assertIn("btn-refine-inv-gu", self.game_js)
        self.assertIn("TU VI CHƯA ĐỦ ĐỂ ÁP CHẾ", self.game_js)

    def test_13_gu_database_and_normalization(self):
        """13. Kiểm tra Database Cổ Trùng (>= 220 cổ, đủ 9 Chuyển, Tửu Trùng chuẩn hóa công kích = 0 và thức ăn rượu)"""
        self.assertGreaterEqual(len(self.gu_db_json), 220, "Total Gu count should be >= 220")

        ranks_in_db = set(g.get("rank") for g in self.gu_db_json)
        for r in range(1, 10):
            self.assertIn(r, ranks_in_db, f"Gu Database must include Rank {r} Gu")

        t_u_tr_ng_json = next((g for g in self.gu_db_json if g.get("id") == "t_u_tr_ng" or g.get("id") == "gu_liquor_worm_1"), None)
        self.assertIsNotNone(t_u_tr_ng_json, "Tửu Trùng must exist in gu_database.json")
        self.assertEqual(t_u_tr_ng_json.get("type"), "Hỗ Trợ")
        self.assertIn("rượu", t_u_tr_ng_json.get("food", "").lower())
        self.assertEqual(t_u_tr_ng_json.get("power", 0), 0)

        gu_ids = set(g.get("id") for g in self.gu_db_json)
        self.assertTrue(any("kien_tri" in gid for gid in gu_ids))
        self.assertTrue(any("tri_tue" in gid for gid in gu_ids))
        self.assertTrue(any("vinh_sinh" in gid for gid in gu_ids))

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
        self.assertIn("home: {", self.game_js)
        self.assertTrue("staminaCost: 0" in self.game_js)
        self.assertIn("act.staminaCost > 0", self.game_js)

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
        self.assertNotIn("systemPoints", cave_block)
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
        self.assertNotIn("gemini-api-key", self.index_html)
        self.assertNotIn("setupAiGenerator()", self.game_js)

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

        self.assertIn("function setupDevModeControls()", self.game_js)
        self.assertIn("player.devModeActive", self.game_js)
        self.assertIn("window.devBreakthrough = devBreakthrough", self.game_js)
        self.assertIn("window.devMaxRank = devMaxRank", self.game_js)


if __name__ == "__main__":
    unittest.main()
