import unittest
import os
import re
import json

class TestV52Features(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        game_js_path = os.path.join(base_dir, 'game.js')
        index_html_path = os.path.join(base_dir, 'index.html')

        with open(game_js_path, 'r', encoding='utf-8') as f:
            cls.game_js = f.read()

        with open(index_html_path, 'r', encoding='utf-8') as f:
            cls.index_html = f.read()

    # -------------------------------------------------------------
    # 1. Kiểm tra Công Thức Khuếch Đại Tuyến Tính Đạo Ngân (N / 1000)
    # -------------------------------------------------------------
    def test_01_dao_linear_amplification(self):
        """1. Kiểm tra công thức khuếch đại tuyến tính N/1000 chuẩn nguyên tác Chương 1155"""
        self.assertIn('function getDaoMultiplier(daoId)', self.game_js)
        # Công thức: 1 + (marks / 1000)
        self.assertTrue('1 + (marks / 1000)' in self.game_js or '1 + marks / 1000' in self.game_js)
        # Đảm bảo hiển thị khuếch đại trong UI
        self.assertIn('dao-amplification-box', self.game_js)
        self.assertIn('Khuếch Đại Uy Lực', self.game_js)

    # -------------------------------------------------------------
    # 2. Kiểm tra Quy Luật Bài Xích Đạo Ngân & Ngoại Lệ Chí Tôn Tiên Thai
    # -------------------------------------------------------------
    def test_02_dao_conflict_and_sovereign_body(self):
        """2. Kiểm tra quy luật bài xích Đạo Ngân và ngoại lệ Thể Chất Chí Tôn Tiên Thai"""
        self.assertIn('function getDaoConflictFactor(daoId)', self.game_js)
        # Ngoại lệ Chí Tôn Tiên Thai: trả về 1.0 (không bài xích)
        self.assertIn('chi_ton_tien_thai', self.game_js)
        self.assertIn('Chí Tôn Vô Khuyết', self.game_js)
        # Tỷ lệ bài xích dị đạo: ratio = targetMarks / totalMarks
        self.assertTrue('targetMarks / totalMarks' in self.game_js or 'totalMarks' in self.game_js)

    # -------------------------------------------------------------
    # 3. Kiểm tra Điều Kiện Đạo Chủ (Dao Lord) & 4 Cấp Tiên Nguyên
    # -------------------------------------------------------------
    def test_03_dao_lord_attainment_and_immortal_essence(self):
        """3. Kiểm tra 4 điều kiện Thành Tôn & Đạo Chủ (Cửu Chuyển, 300k Đạo Ngân, Vô Thượng) & Tiên Nguyên"""
        self.assertIn('function checkDaoLordStatus()', self.game_js)
        self.assertIn('marks >= 300000', self.game_js)
        self.assertIn('player.rankIdx >= 8', self.game_js)
        # 4 Cấp Tiên Nguyên trong player
        self.assertIn('immortalEssence', self.game_js)
        self.assertIn('thanhDe', self.game_js)
        self.assertIn('hongTao', self.game_js)
        self.assertIn('bachLe', self.game_js)
        self.assertIn('hoangHanh', self.game_js)

    # -------------------------------------------------------------
    # 4. Kiểm tra Mở Rộng Đầy Đủ 36 Lưu Phái Chuẩn Nguyên Tác
    # -------------------------------------------------------------
    def test_04_dao_list_36_canonical_paths(self):
        """4. Kiểm tra mở rộng danh mục lên 36 Lưu Phái bao gồm Thực, Vận, Thâu, Mộng, Thiên, Tín Đạo"""
        # Trích xuất DAO_LIST từ game_js
        match = re.search(r'const DAO_LIST = \[([\s\S]*?)\];', self.game_js)
        self.assertIsNotNone(match, "DAO_LIST array must exist in game.js")
        content = match.group(1)
        
        # Kiểm tra 6 lưu phái mới thêm
        self.assertIn('"thuc"', content)
        self.assertIn('"van"', content)
        self.assertIn('"thau"', content)
        self.assertIn('"mong"', content)
        self.assertIn('"thien"', content)
        self.assertIn('"tin"', content)
        
        # Đếm tổng số id trong DAO_LIST
        ids = re.findall(r'id:\s*"([^"]+)"', content)
        self.assertEqual(len(ids), 36, f"DAO_LIST should have exactly 36 paths, found {len(ids)}")

    # -------------------------------------------------------------
    # 5. Kiểm tra Cơ Chế Bảo Toàn Bản Mệnh Cổ Khi Hợp Luyện Thất Bại
    # -------------------------------------------------------------
    def test_05_vital_gu_protection_on_refinement_failure(self):
        """5. Kiểm tra Bản Mệnh Cổ: bảo toàn 100% không bị hủy diệt khi xịt, phản phệ Cổ Sư"""
        self.assertIn('function setVitalGu(guId)', self.game_js)
        self.assertIn('player.vitalGuId', self.game_js)
        # Trong refineGu: kiểm tra isVitalGu
        self.assertIn('isVitalGu', self.game_js)
        self.assertIn('BẢN MỆNH CỔ tương liên tính mạng', self.game_js)
        # Phản phệ người chơi khi thất bại
        self.assertIn('player.hp = Math.max(1, Math.floor(player.hp * 0.75))', self.game_js)
        self.assertIn('player.mp = Math.max(0, Math.floor(player.mp * 0.5))', self.game_js)

    # -------------------------------------------------------------
    # 6. Kiểm tra Tính Duy Nhất Của Tiên Cổ & Bonus Đạo Ngân Luyện Đạo
    # -------------------------------------------------------------
    def test_06_immortal_gu_uniqueness_and_refinement_bonus(self):
        """6. Kiểm tra quy tắc Tiên Cổ Duy Nhất (Rank 6+) và bonus tỷ lệ từ Đạo Ngân Luyện Đạo"""
        self.assertIn('QUY TẮC ĐẠI ĐẠO DUY NHẤT', self.game_js)
        self.assertIn('gu.rank >= 6', self.game_js)
        # Bonus Luyện Đạo: bonusRefineMarks
        self.assertIn('bonusRefineMarks', self.game_js)
        self.assertIn('player.daoMarks.luyen', self.game_js)

    # -------------------------------------------------------------
    # 7. Kiểm tra UI Version Badge v5.2
    # -------------------------------------------------------------
    def test_07_ui_version_badge_v52(self):
        """7. Kiểm tra Version Badge v5.2 • ĐẠO NGÂN TRÙNG HỢP trên giao diện index.html"""
        self.assertIn('v5.2 • ĐẠO NGÂN TRÙNG HỢP', self.index_html)
        self.assertNotIn('v4.3 • NGHỊCH MỆNH', self.index_html)


if __name__ == '__main__':
    unittest.main()
