# -*- coding: utf-8 -*-
"""
Bộ Kiểm Thử Tự Động Bản Cập Nhật v5.1.1: Chuẩn Hóa Cổ Phương Theo Nguyên Tác Cổ Chân Nhân
"""
import unittest
import json
import re

class TestV511CanonicalRecipes(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        with open("gu_database.json", "r", encoding="utf-8") as f:
            cls.gu_db = json.load(f)

        with open("gu_data.js", "r", encoding="utf-8") as f:
            cls.gu_data_js = f.read()

        with open("game.js", "r", encoding="utf-8") as f:
            cls.game_js = f.read()

    def get_gu(self, guid_or_name):
        needle = guid_or_name.lower()
        return next((g for g in self.gu_db if g["id"] == guid_or_name or needle in g["name"].lower()), None)

    # -------------------------------------------------------------
    # 1. Kiểm tra Cổ Phương Chuỗi Tửu Trùng (Nhất -> Bát Chuyển)
    # -------------------------------------------------------------
    def test_01_liquor_worm_progression_recipes(self):
        # 1. Tửu Trùng Nhất Chuyển
        tuu1 = self.get_gu("Tửu trùng")
        self.assertIsNotNone(tuu1)
        self.assertEqual(tuu1["rank"], 1)
        self.assertIn("Tử Kim Thạch", json.dumps(tuu1["recipe"]["materials"], ensure_ascii=False))

        # 2. Tứ Vị Tửu Trùng Nhị Chuyển
        tuu2 = self.get_gu("Tứ Vị Tửu Trùng")
        self.assertIsNotNone(tuu2)
        self.assertEqual(tuu2["rank"], 2)
        tuu2_mats_str = json.dumps(tuu2["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Tửu Trùng (Nhất Chuyển)", tuu2_mats_str)
        self.assertIn("Rượu Tứ Vị", tuu2_mats_str)

        # 3. Thất Hương Tửu Trùng Tam Chuyển
        tuu3 = self.get_gu("Thất Hương Tửu Trùng")
        self.assertIsNotNone(tuu3)
        self.assertEqual(tuu3["rank"], 3)
        tuu3_mats_str = json.dumps(tuu3["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Tứ Vị Tửu Trùng (Nhị Chuyển)", tuu3_mats_str)
        self.assertIn("Thất Hương Dược Thảo", tuu3_mats_str)

        # 4. Cửu Nhãn Tửu Trùng Tứ Chuyển
        tuu4 = self.get_gu("Cửu Nhãn Tửu Trùng")
        self.assertIsNotNone(tuu4)
        self.assertEqual(tuu4["rank"], 4)
        tuu4_mats_str = json.dumps(tuu4["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Thất Hương Tửu Trùng (Tam Chuyển)", tuu4_mats_str)
        self.assertIn("Nhãn Cầu Bách Thú Vương", tuu4_mats_str)

        # 5. Bát Chuyển Tửu Trùng
        tuu8 = self.get_gu("Tửu Trùng (Bát Chuyển)")
        self.assertIsNotNone(tuu8)
        self.assertEqual(tuu8["rank"], 8)
        tuu8_mats_str = json.dumps(tuu8["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Tam Hoàng Mỹ Tửu", tuu8_mats_str)
        self.assertIn("Ngũ Đế Mỹ Tửu", tuu8_mats_str)

    # -------------------------------------------------------------
    # 2. Kiểm tra Cổ Phương Chuỗi Nguyệt Quang Cổ
    # -------------------------------------------------------------
    def test_02_moonlight_branching_recipes(self):
        # 1. Nguyệt Quang Cổ Nhất Chuyển
        nq = self.get_gu("Nguyệt Quang cổ")
        self.assertIsNotNone(nq)
        self.assertIn("Cánh Hoa Nguyệt Lan", json.dumps(nq["recipe"]["materials"], ensure_ascii=False))

        # 2. Nguyệt Ngân Cổ (Nguyệt Quang + Ngân Thạch Cổ)
        nn = self.get_gu("Nguyệt Ngân")
        self.assertIsNotNone(nn)
        nn_mats = json.dumps(nn["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Nguyệt Quang Cổ", nn_mats)
        self.assertIn("Ngân Thạch Cổ", nn_mats)

        # 3. Nguyệt Toàn Cổ (Nguyệt Quang + Toàn Phong Cổ)
        nt = self.get_gu("Nguyệt Toàn")
        self.assertIsNotNone(nt)
        nt_mats = json.dumps(nt["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Nguyệt Quang Cổ", nt_mats)
        self.assertIn("Toàn Phong Cổ", nt_mats)

        # 4. Nguyệt Mang Cổ (Nguyệt Quang + Tiểu Quang)
        nm = self.get_gu("Nguyệt Mang")
        self.assertIsNotNone(nm)
        nm_mats = json.dumps(nm["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Nguyệt Quang Cổ", nm_mats)
        self.assertIn("Tiểu Quang Cổ", nm_mats)

        # 5. Nguyệt Nghê Thường (Ngọc Bì + Nguyệt Quang)
        nnt = self.get_gu("Nguyệt Nghê Thường")
        self.assertIsNotNone(nnt)
        nnt_mats = json.dumps(nnt["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Ngọc Bì Cổ", nnt_mats)
        self.assertIn("Nguyệt Quang Cổ", nnt_mats)

        # 6. Huyết Nguyệt Cổ (Nguyệt Mang + Huyết Khí/Tích Cổ)
        hn = self.get_gu("Huyết Nguyệt cổ")
        self.assertIsNotNone(hn)
        hn_mats = json.dumps(hn["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Nguyệt Mang Cổ", hn_mats)
        self.assertIn("Huyết Khí Cổ", hn_mats)

    # -------------------------------------------------------------
    # 3. Kiểm tra Cổ Phương Phòng Ngự & Biến Hóa Kinh Điển
    # -------------------------------------------------------------
    def test_03_defensive_and_transformation_recipes(self):
        # 1. Bạch Ngọc Cổ (Ngọc Bì Cổ + Bạch Thỉ Cổ)
        bn = self.get_gu("Bạch Ngọc cổ")
        self.assertIsNotNone(bn)
        bn_mats = json.dumps(bn["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Ngọc Bì Cổ", bn_mats)
        self.assertIn("Bạch Thỉ Cổ", bn_mats)

        # 2. Thiên Bồng Cổ (Bạch Ngọc Cổ + Thủy Phòng/Thủy Giáp Cổ)
        tb = self.get_gu("Thiên Bồng cổ")
        self.assertIsNotNone(tb)
        tb_mats = json.dumps(tb["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Bạch Ngọc Cổ", tb_mats)
        self.assertIn("Thủy Phòng Cổ", tb_mats)

        # 3. Hắc Tông Cổ (Thanh Ti Cổ + Hắc Thỉ Cổ)
        ht = self.get_gu("Hắc Tông cổ")
        self.assertIsNotNone(ht)
        ht_mats = json.dumps(ht["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Thanh Ti Cổ", ht_mats)
        self.assertIn("Hắc Thỉ Cổ", ht_mats)

        # 4. Cốt Dực Cổ (Vô Túc Điểu + 4 phụ liệu)
        cd = self.get_gu("Cốt Dực")
        self.assertIsNotNone(cd)
        cd_mats = json.dumps(cd["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Vô Túc Điểu", cd_mats)
        self.assertIn("Cửu Cung Hoa", cd_mats)
        self.assertIn("Vấn Đỉnh Thạch", cd_mats)
        self.assertIn("Kim Ô Lưu Tinh", cd_mats)
        self.assertIn("Hàn Băng Thảo", cd_mats)

    # -------------------------------------------------------------
    # 4. Kiểm tra Cổ Phương Đa Tầng Đặc Thù (Ngôn Nhi Vô Tín, Ái Sinh Ly)
    # -------------------------------------------------------------
    def test_04_special_multi_stage_recipes(self):
        # 1. Ngôn Nhi Vô Tín Cổ
        nvt = self.get_gu("Ngôn Nhi Vô Tín")
        self.assertIsNotNone(nvt)
        nvt_mats = json.dumps(nvt["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("A Thỉ Cổ", nvt_mats)
        self.assertIn("Đại Lực Cổ", nvt_mats)
        self.assertIn("Sư Hống Cổ", nvt_mats)
        self.assertIn("Chỉ Hạc Cổ", nvt_mats)

        # 2. Ái Sinh Ly (Sinh Tức Thảo + Quả Phụ Chu + Hồng Châm Hạt)
        asl = self.get_gu("Ái Sinh Ly")
        self.assertIsNotNone(asl)
        asl_mats = json.dumps(asl["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Sinh Tức Thảo", asl_mats)
        self.assertIn("Quả Phụ Chu", asl_mats)
        self.assertIn("Hồng Châm Hạt", asl_mats)

    # -------------------------------------------------------------
    # 5. Kiểm tra Tiên Cổ Phương Huyền Thoại (Định Tiên Du, Vạn Ngã, Chí Tôn Tiên Thai)
    # -------------------------------------------------------------
    def test_05_legendary_immortal_gu_recipes(self):
        # 1. Định Tiên Du Cổ
        dty = self.get_gu("Định Tiên Du")
        self.assertIsNotNone(dty)
        dty_mats = json.dumps(dty["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Thần Du Cổ", dty_mats)
        self.assertIn("Định Tinh Cổ", dty_mats)
        self.assertIn("Bích Không Cổ", dty_mats)
        self.assertIn("Thái Cổ Vinh Diệu Chi Quang", dty_mats)

        # 2. Vạn Ngã Tiên Cổ (Sát chiêu hóa cổ)
        vn = self.get_gu("Vạn Ngã Tiên Cổ")
        self.assertIsNotNone(vn)
        vn_mats = json.dumps(vn["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Ẩm Đao Tửu", vn_mats)
        self.assertIn("Phàm Phong Cổ", vn_mats)
        self.assertIn("Tiền Hậu Thần Trở Châm", vn_mats)
        self.assertIn("Toàn Lực Dĩ Phó Cổ", vn_mats)

        # 3. Chí Tôn Tiên Thai Cổ (U Hồn Ma Tôn)
        cttt = self.get_gu("Chí Tôn Tiên Thai")
        self.assertIsNotNone(cttt)
        cttt_mats = json.dumps(cttt["recipe"]["materials"], ensure_ascii=False)
        self.assertIn("Thập Tuyệt Tiên Cương Vô Sinh Đại Trận", cttt_mats)
        self.assertIn("Thập Tuyệt Đạo Cổ Tài", cttt_mats)

        # 4. Túc Mệnh Cổ & Trí Tuệ Cổ
        tm = self.get_gu("Túc Mệnh Cổ")
        self.assertIsNotNone(tm)
        self.assertEqual(tm["rank"], 9)
        self.assertIn("Thiên Đạo", tm["recipe"]["method"])

        tt = self.get_gu("Trí Tuệ Cổ")
        self.assertIsNotNone(tt)
        self.assertEqual(tt["rank"], 9)
        self.assertIn("Vầng Sáng Trí Tuệ", json.dumps(tt["recipe"]["materials"], ensure_ascii=False))

    # -------------------------------------------------------------
    # 6. Kiểm tra Mảng LIBRARY_RECIPES Mở Rộng Trong game.js
    # -------------------------------------------------------------
    def test_06_library_recipes_expanded_in_game_js(self):
        # Kiểm tra LIBRARY_RECIPES có ít nhất 25 Cổ Phương
        lib_match = re.search(r'const LIBRARY_RECIPES = \[\s*([\s\S]*?)\];', self.game_js)
        self.assertIsNotNone(lib_match)
        lib_str = lib_match.group(1)
        recipe_count = len(re.findall(r'id:\s*"recipe_', lib_str))
        self.assertGreaterEqual(recipe_count, 25, f"LIBRARY_RECIPES must have at least 25 recipes, found {recipe_count}")

        # Kiểm tra sự hiện diện của các Cổ Phương mới
        self.assertIn("recipe_nguyet_quang", lib_str)
        self.assertIn("recipe_bach_thi", lib_str)
        self.assertIn("recipe_nguyet_nghe_thuong", lib_str)
        self.assertIn("recipe_ai_sinh_ly", lib_str)
        self.assertIn("recipe_cu_xi_kim_ngo", lib_str)
        self.assertIn("recipe_ngon_nhi_vo_tin", lib_str)
        self.assertIn("recipe_thien_nguyen_bao_lien", lib_str)
        self.assertIn("recipe_cuu_nhan_tuu_trung", lib_str)
        self.assertIn("recipe_thoi_boi_hoan_tran", lib_str)
        self.assertIn("recipe_dinh_tien_du", lib_str)
        self.assertIn("recipe_van_nga", lib_str)
        self.assertIn("recipe_tuu_trung_bat_chuyen", lib_str)
        self.assertIn("recipe_chi_ton_tien_thai", lib_str)

    # -------------------------------------------------------------
    # 7. Kiểm tra Giao Diện renderRecipesPane Hiển Thị Phương Pháp & Bí Phương
    # -------------------------------------------------------------
    def test_07_render_recipes_pane_displays_method_and_desc(self):
        self.assertIn("gu.recipe.method", self.game_js)
        self.assertIn("⚡ <strong>Phương pháp:</strong>", self.game_js)
        self.assertIn("📜 <strong>Bí phương:</strong>", self.game_js)

if __name__ == "__main__":
    unittest.main()
