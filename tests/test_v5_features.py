"""
Test Suite for Update v5: Tu Tien Gioi Web Game
Tests all major features of v5: Dual Cultivation 9 Ranks/Realms, Pacing Nerf,
Great Perfection 65% vs 95%, Library Cap, and Expanded Techniques & Gu Databases.
"""

import os
import re
import json
import unittest

WORKSPACE_DIR = r"C:\Users\LONG\.gemini\antigravity\scratch\tu-tien-rpg"
GAME_JS_PATH = os.path.join(WORKSPACE_DIR, "game.js")
TECHNIQUES_DATA_JS_PATH = os.path.join(WORKSPACE_DIR, "techniques_data.js")
GU_DATA_JS_PATH = os.path.join(WORKSPACE_DIR, "gu_data.js")
GU_DATABASE_JSON_PATH = os.path.join(WORKSPACE_DIR, "gu_database.json")

class TestUpdateV5Features(unittest.TestCase):

    def setUp(self):
        with open(GAME_JS_PATH, "r", encoding="utf-8") as f:
            self.game_js = f.read()
        with open(TECHNIQUES_DATA_JS_PATH, "r", encoding="utf-8") as f:
            self.tech_data_js = f.read()
        with open(GU_DATA_JS_PATH, "r", encoding="utf-8") as f:
            self.gu_data_js = f.read()
        with open(GU_DATABASE_JSON_PATH, "r", encoding="utf-8") as f:
            self.gu_db_json = json.load(f)

    # -------------------------------------------------------------
    # Req 1: Quy Đổi & Chuẩn Hóa Cảnh Giới Kép 9 Chuyển = 9 Đại Cảnh Giới
    # -------------------------------------------------------------
    def test_req1_dual_cultivation_9_ranks(self):
        # 1. RANKS phải có đủ từ Rank 1 đến Rank 9
        ranks_match = re.search(r'const RANKS = \[\s*([\s\S]*?)\];', self.game_js)
        self.assertIsNotNone(ranks_match, "RANKS array must be defined in game.js")
        ranks_str = ranks_match.group(1)
        
        # Kiểm tra sự hiện diện của 9 Rank
        for r in range(1, 10):
            self.assertIn(f"rank: {r}", ranks_str, f"RANKS must contain rank {r}")
        
        # 2. Kiểm tra tên gọi Cổ Sư và Tiên Đạo tương ứng
        self.assertIn("Luyện Khí Kỳ", ranks_str)
        self.assertIn("Trúc Cơ Kỳ", ranks_str)
        self.assertIn("Kết Đan Kỳ", ranks_str)
        self.assertIn("Nguyên Anh Kỳ", ranks_str)
        self.assertIn("Hóa Thần Kỳ", ranks_str)
        self.assertIn("Luyện Hư Kỳ", ranks_str)
        self.assertIn("Hợp Thể Kỳ", ranks_str)
        self.assertIn("Đại Thừa Kỳ", ranks_str)
        self.assertIn("Chân Tiên Cảnh", ranks_str)
        self.assertIn("Cửu Chuyển", ranks_str)

    # -------------------------------------------------------------
    # Req 2: Tái Cân Bằng & Nerf Nhẹ Tốc Độ Tu Luyện (Cultivation Pacing Nerf)
    # -------------------------------------------------------------
    def test_req2_cultivation_nerf_pacing(self):
        # 1. baseExp của Rank 1 phải được nâng lên (>= 450 so với mức 350 cũ)
        self.assertIn("baseExp: 450", self.game_js)
        # 2. Hệ số nhân SUB_STAGES lũy tiến
        self.assertIn("multiplier: 1.8", self.game_js)
        self.assertIn("multiplier: 3.2", self.game_js)
        self.assertIn("multiplier: 8.0", self.game_js)

    # -------------------------------------------------------------
    # Req 3: Cơ Chế Tiểu Cảnh Giới Đại Viên Mãn & Tỷ Lệ Đột Phá 65% vs 95%
    # -------------------------------------------------------------
    def test_req3_great_perfection_mechanics(self):
        # 1. checkExpThreshold có logic tích lũy lên Đại Viên Mãn ở 1.6x maxExp
        self.assertIn("targetExpDaiVienMan = Math.round(player.maxExp * 1.6)", self.game_js)
        self.assertIn("player.isDaiVienMan = true", self.game_js)
        self.assertIn("player.subStageIdx = 5", self.game_js)
        
        # 2. attemptBreakthrough có tỷ lệ 95% ở Đại Viên Mãn và 65% ở Viên Mãn
        start_idx = self.game_js.find("function attemptBreakthrough()")
        self.assertNotEqual(start_idx, -1)
        end_idx = self.game_js.find("updateSidebarUI();", start_idx)
        breakthrough_code = self.game_js[start_idx:end_idx]
        
        self.assertIn("player.isDaiVienMan ? 95 : 65", breakthrough_code)
        
        # 3. Sidebar UI cũng hiển thị rate 95% vs 65%
        self.assertIn("player.isDaiVienMan ? Math.round(95 * (player.canCot / 100)) : Math.round(65 * (player.canCot / 100))", self.game_js)

    # -------------------------------------------------------------
    # Req 4: Giới Hạn Đọc Điển Tịch Tàng Thư (Hard Cap Ngộ Tính & Trí Mưu)
    # -------------------------------------------------------------
    def test_req4_library_study_caps(self):
        start_idx = self.game_js.find('case "act_study_library":')
        self.assertNotEqual(start_idx, -1, "act_study_library case must exist")
        end_idx = self.game_js.find('default:', start_idx)
        library_block = self.game_js[start_idx:end_idx]
        
        # 1. Có giới hạn trần cứng maxCap = 10
        self.assertIn("maxCap = 10", library_block)
        self.assertIn("player.libraryCompGained", library_block)
        self.assertIn("player.libraryIntelGained", library_block)
        
        # 2. Không còn tăng điểm Đạo Cảnh
        self.assertNotIn("checkDaoLevelUp", library_block)
        self.assertNotIn("daoLevels[currentDao].exp", library_block)

    # -------------------------------------------------------------
    # Req 5: Mở Rộng Kho Tàng Công Pháp (Techniques Database) Đủ 9 Cấp Bậc
    # -------------------------------------------------------------
    def test_req5_techniques_database_9_ranks(self):
        # 1. Techniques Database phải chứa công pháp trải dài từ Rank 1 đến Rank 9
        ranks_found = set()
        for r in range(1, 10):
            if f"rank: {r}" in self.tech_data_js:
                ranks_found.add(r)
        
        self.assertEqual(len(ranks_found), 9, f"Techniques must cover all 9 ranks! Found: {ranks_found}")
        
        # 2. Chứa các đại công pháp kinh điển trong tài liệu
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

    # -------------------------------------------------------------
    # Req 6: Mở Rộng Kho Tàng Cổ Trùng (Gu Database) Đủ 9 Chuyển
    # -------------------------------------------------------------
    def test_req6_gu_database_9_ranks(self):
        # 1. Tổng số Cổ Trùng phải lớn hơn 220
        self.assertGreaterEqual(len(self.gu_db_json), 220, "Total Gu count should be >= 220")
        
        # 2. Phải có Cổ Trùng ở tất cả các Rank từ 1 đến 9
        ranks_in_db = {g.get("rank") for g in self.gu_db_json}
        for r in range(1, 10):
            self.assertIn(r, ranks_in_db, f"Gu Database must include Rank {r} Gu")
        
        # 3. Phải có các Cổ Trùng kinh điển từ tài liệu Cổ Chân Nhân
        gu_ids = {g["id"] for g in self.gu_db_json}
        self.assertIn("kien_tri_tien_co", gu_ids)
        self.assertIn("van_nga_tien_co", gu_ids)
        self.assertIn("thai_do_co", gu_ids)
        self.assertIn("hoi_co", gu_ids)
        self.assertIn("tuc_menh_co", gu_ids)
        self.assertIn("tri_tue_co", gu_ids)
        self.assertIn("ai_tinh_co", gu_ids)
        self.assertIn("thien_nguyen_bao_hoang_lien", gu_ids)
        self.assertIn("vinh_sinh_co", gu_ids)

if __name__ == "__main__":
    unittest.main()
