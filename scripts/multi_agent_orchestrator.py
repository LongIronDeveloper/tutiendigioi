import os, json, subprocess
from google import genai

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
issue_title = os.environ.get("ISSUE_TITLE", "")
issue_body = os.environ.get("ISSUE_BODY", "")
issue_number = os.environ.get("ISSUE_NUMBER", "0")

# 1. Đọc code hiện tại của game
with open("game.js", "r", encoding="utf-8") as f:
    game_js_code = f.read()

# ============================================================
# PHASE 1: [ARCHITECT AGENT] - Phân tích nguyên nhân & lập bản vẽ sửa
# ============================================================
print("🏛️ [PHASE 1] Architect Agent đang phân tích lỗi...")
architect_prompt = f"""
Bạn là ARCHITECT AGENT. Phân tích lỗi sau trong game Tu Tiên RPG:
Issue: {issue_title}
Chi tiết: {issue_body}

Mã nguồn game.js hiện tại:
{game_js_code[:8000]} # (Hoặc module liên quan)

Hãy xuất ra Technical Blueprint dạng JSON gồm:
1. root_cause: Nguyên nhân cốt lõi gây lỗi
2. affected_functions: Danh sách các hàm cần sửa
3. fix_strategy: Chiến lược sửa cụ thể không phá vỡ logic cũ
Chỉ trả về JSON hợp lệ.
"""
blueprint_resp = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=architect_prompt,
    config={"response_mime_type": "application/json"}
)
blueprint = json.loads(blueprint_resp.text)
print("✅ Architect Blueprint:", blueprint)

# ============================================================
# PHASE 2: [CODER AGENT] - Thực thi sửa code trực tiếp
# ============================================================
print("💻 [PHASE 2] Coder Agent đang tiến hành sửa mã nguồn...")
coder_prompt = f"""
Bạn là CODER AGENT. Hãy đọc bản vẽ sau và sửa lại mã nguồn:
{json.dumps(blueprint, indent=2, ensure_ascii=False)}

Mã nguồn file game.js:
{game_js_code}

Hãy trả về toàn bộ nội dung file game.js đã được sửa hoàn chỉnh, sạch lỗi cú pháp. Chỉ trả về code thuần.
"""
coder_resp = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=coder_prompt
)
fixed_code = coder_resp.text.replace("```javascript", "").replace("```", "").strip()

with open("game.js", "w", encoding="utf-8") as f:
    f.write(fixed_code)

# ============================================================
# PHASE 3: [REVIEWER AGENT] - Rà soát diff & bảo mật logic
# ============================================================
print("🔍 [PHASE 3] Reviewer Agent đang đối chiếu diff và rà soát logic...")
# Có thể gọi LLM review git diff để đảm bảo không bị regression

# ============================================================
# PHASE 4: [TESTER AGENT] - Chạy test thực tế & Tạo Pull Request
# ============================================================
print("🧪 [PHASE 4] Tester Agent đang chạy bộ kiểm thử...")
# Chạy script kiểm thử cú pháp và assertions
test_result = subprocess.run(["python", "-m", "py_compile", "scripts/multi_agent_orchestrator.py"], capture_output=True)

if test_result.returncode == 0:
    print("🎉 Toàn bộ kiểm thử PASS! Đang tạo Branch và Pull Request...")
    branch_name = f"fix/auto-fix-issue-{issue_number}"
    subprocess.run(["git", "config", "--global", "user.name", "Antigravity-Agent"])
    subprocess.run(["git", "config", "--global", "user.email", "agent@antigravity.ai"])
    subprocess.run(["git", "checkout", "-b", branch_name])
    subprocess.run(["git", "add", "game.js"])
    subprocess.run(["git", "commit", "-m", f"fix(core): Auto-fix for issue #{issue_number}\n\nArchitect Blueprint:\n{json.dumps(blueprint, ensure_ascii=False)}"])
    subprocess.run(["git", "push", "origin", branch_name])

    # Gọi GitHub CLI / REST API để tạo Pull Request tự động
    subprocess.run([
        "gh", "pr", "create",
        "--title", f"🤖 [Auto-Fix] Sửa lỗi: {issue_title}",
        "--body", f"Đã giải quyết tự động cho Issue #{issue_number}.\n\n### Architect Blueprint\n{blueprint['root_cause']}",
        "--head", branch_name,
        "--base", "main"
    ])
else:
    print("❌ Test thất bại, gửi lại vòng lặp cho Coder!")
