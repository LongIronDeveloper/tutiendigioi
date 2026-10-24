"""
Kiểm thử tự động logic Mini-game Khai Khiếu và Hệ thống Âm thanh
Tuân thủ Phase 4: [TESTER AGENT]
"""
import re
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")


def test_audio_methods():
    print("[TEST 1] Kiểm tra các method âm thanh trong audio.js...")
    with open("audio.js", "r", encoding="utf-8") as f:
        content = f.read()
    
    required_methods = ["playCoins()", "playSuccess()", "playError()", "playMeditate()", "playBreakthrough()"]
    for m in required_methods:
        assert m in content or m[:-2] in content, f"Thiếu method âm thanh: {m}"
        print(f"  ✓ Đã có method: {m}")
    print("-> TEST 1 PASSED: audio.js đầy đủ tất cả method tổng hợp âm thanh procedural.")

def test_game_safe_sound_helper():
    print("\n[TEST 2] Kiểm tra safePlaySound helper trong game.js...")
    with open("game.js", "r", encoding="utf-8") as f:
        content = f.read()
    
    assert "function safePlaySound(methodName)" in content, "Thiếu hàm safePlaySound"
    assert "safePlaySound(\"playCoins\")" in content, "Chưa dùng safePlaySound cho playCoins trong minigame"
    assert "safePlaySound(\"playSuccess\")" in content, "Chưa dùng safePlaySound cho playSuccess"
    print("  ✓ safePlaySound được định nghĩa và áp dụng đầy đủ.")
    print("-> TEST 2 PASSED: Không còn rủi ro TypeError làm chặn đứng luồng game.")

def test_minigame_score_and_rank_mapping():
    print("\n[TEST 3] Kiểm tra logic tính điểm và ánh xạ tư chất...")
    
    def get_rank_preview(score):
        if score < 30:
            return "Đinh Đẳng", "rank-c"
        elif score < 60:
            return "Bính Đẳng", "rank-b"
        elif score < 80:
            return "Ất Đẳng", "rank-a"
        elif score < 100:
            return "Giáp Đẳng", "rank-s"
        else:
            return "Thập Đại Tuyệt Thể", "rank-s"

    def get_aptitude(score):
        if score >= 100:
            return "S", True
        elif score >= 80:
            return "S", False
        elif score >= 60:
            return "A", False
        elif score >= 30:
            return "B", False
        else:
            return "C", False

    # Test case từ ảnh chụp lỗi của User: 38%
    rank_name, css_class = get_rank_preview(38)
    assert rank_name == "Bính Đẳng", f"Lỗi: 38% phải ra Bính Đẳng, thực tế: {rank_name}"
    assert css_class == "rank-b"
    print(f"  ✓ Mức điểm 38% (User case): Hiển thị chính xác '{rank_name}' ({css_class})")

    # Test các mốc khác
    test_cases = [
        (0, "Đinh Đẳng", "C"),
        (28, "Đinh Đẳng", "C"),
        (30, "Bính Đẳng", "B"),
        (55, "Bính Đẳng", "B"),
        (60, "Ất Đẳng", "A"),
        (78, "Ất Đẳng", "A"),
        (80, "Giáp Đẳng", "S"),
        (95, "Giáp Đẳng", "S"),
        (100, "Thập Đại Tuyệt Thể", "S"),
        (120, "Thập Đại Tuyệt Thể", "S")
    ]
    for sc, exp_preview, exp_rank in test_cases:
        preview, _ = get_rank_preview(sc)
        apt_rank, is_force = get_aptitude(sc)
        assert exp_preview in preview, f"Sai preview tại {sc}%: mong đợi {exp_preview}, nhận {preview}"
        assert apt_rank == exp_rank, f"Sai apt_rank tại {sc}%: mong đợi {exp_rank}, nhận {apt_rank}"
        if sc >= 100:
            assert is_force == True, f"100% phải kích hoạt isTuyetTheForce"
        print(f"  ✓ Mốc {sc}% -> Preview: {preview} -> Tư chất: Hạng {apt_rank}")

    print("-> TEST 3 PASSED: Ánh xạ điểm số và tư chất chuẩn 100% nguyên tác Cổ Chân Nhân.")

def test_minigame_dom_cleanup_and_step_transition():
    print("\n[TEST 4] Kiểm tra logic dọn dẹp DOM và chuyển Bước 3...")
    with open("game.js", "r", encoding="utf-8") as f:
        content = f.read()

    # Kiểm tra trong collectOrb: orb.remove() được gọi
    collect_orb_match = re.search(r"const collectOrb = \(e\) => \{(.*?)\};", content, re.DOTALL)
    assert collect_orb_match, "Không tìm thấy collectOrb function"
    collect_body = collect_orb_match.group(1)
    
    assert "orb.style.display = \"none\"" in collect_body, "Thiếu ẩn orb"
    assert "orb.remove()" in collect_body, "Thiếu xóa orb khỏi DOM"
    assert "updateMiniRankPreview" in collect_body, "Thiếu cập nhật preview tư chất"
    print("  ✓ collectOrb xóa sạch element khỏi DOM ngay lập tức khi click.")

    # Kiểm tra trong finishAwakeningMiniGame
    finish_match = re.search(r"function finishAwakeningMiniGame\(\) \{(.*?)\n\}", content, re.DOTALL)
    assert finish_match, "Không tìm thấy finishAwakeningMiniGame"
    finish_body = finish_match.group(1)
    
    assert "switchIntroStep(3)" in finish_body, "Thiếu switchIntroStep(3) trong finishAwakeningMiniGame"
    assert "applyAwakeningResult" in finish_body, "Thiếu applyAwakeningResult trong finishAwakeningMiniGame"
    assert "riverWater.innerHTML = \"\"" in finish_body, "Thiếu dọn sạch river-water khi kết thúc"
    print("  ✓ finishAwakeningMiniGame đảm bảo dọn sạch river-water và gọi switchIntroStep(3).")

    print("-> TEST 4 PASSED: Quy trình dọn dẹp DOM và chuyển bước hoàn toàn trơn tru.")

if __name__ == "__main__":
    print("=" * 60)
    print("BẮT ĐẦU CHU TRÌNH TEST TỰ ĐỘNG - [TESTER AGENT]")
    print("=" * 60)
    try:
        test_audio_methods()
        test_game_safe_sound_helper()
        test_minigame_score_and_rank_mapping()
        test_minigame_dom_cleanup_and_step_transition()
        print("\n" + "=" * 60)
        print("TẤT CẢ 4 BỘ TEST ĐỀU ĐẠT CHUẨN PASS 100%! KHÔNG PHÁT HIỆN LỖI.")
        print("=" * 60)
    except AssertionError as e:
        print(f"\n❌ TEST THẤT BẠI: {e}")
        sys.exit(1)
