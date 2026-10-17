/**
 * CỔ GIỚI TU TIÊN KÝ: NGHỊCH MỆNH CHUYỂN v4.1
 * Bố cục Apocalyptic World UI & Phong cách Cổ Chân Nhân
 * Cập nhật & Sửa lỗi v4.1:
 * - Sửa Mini-game Khai Khiếu (15s): Sóng quang linh đa điểm, xét chuẩn 4 bậc tư chất (C, B, A, S),
 *   tỉ lệ Thập Đại Tuyệt Thể cực hiếm (4% khi đạt Giáp Đẳng S). Hỗ trợ nút tự chọn tư chất.
 * - Tab Hệ Thống hiển thị nổi bật trên Top Bar & Sidebar, tích hợp cả Cổ Phương và Công Pháp vào trong Hệ Thống.
 * - Khai khiếu xong người chơi TỰ CHỌN BẢN MỆNH CỔ ĐẦU TIÊN (6 Cổ trùng kinh điển), không còn mặc định có sẵn.
 * - Phường Thị: Cửa hàng bán đan dược/nguyên liệu và Quầy thu mua yêu thú/nguyên liệu đổi linh thạch.
 * - Tàng Thư Các: Bán quyển trục công pháp Hàn Lập, cổ phương bí truyền và cổ trùng gia tộc.
 * - Cổ trùng phân loại rõ ràng: Rank, Loại hình (Công kích, Phòng ngự, Di động, Trị liệu...), Lưu phái.
 * - Tốc độ tu luyện cân chỉnh chân thực theo mốc 1 năm (360 ngày) chuẩn bị cho Diễn Võ Sơn Trại.
 */

// ============================================================
// 1. CÁC HẰNG SỐ & HỆ THỐNG CỐT LÕI
// ============================================================

const SUB_STAGES = [
    { id: 0, name: "Sơ Giai", multiplier: 1.0 },
    { id: 1, name: "Trung Giai", multiplier: 1.7 },
    { id: 2, name: "Cao Giai", multiplier: 2.9 },
    { id: 3, name: "Đỉnh Phong", multiplier: 4.7 },
    { id: 4, name: "Viên Mãn", multiplier: 7.3 },
    { id: 5, name: "Đại Viên Mãn", multiplier: 10.9 }
];

const RANKS = [
    { rank: 1, name: "Nhất Chuyển", baseExp: 350, maxHp: 200, maxMp: 160, maxAge: 100, expStepMult: 1.1, power: 30, staminaBonus: 0, wallName: "Màng Quang Thô Sơ", seaName: "Thanh Đồng Hải" },
    { rank: 2, name: "Nhị Chuyển", baseExp: 1200, maxHp: 550, maxMp: 450, maxAge: 160, expStepMult: 1.2, power: 90, staminaBonus: 20, wallName: "Màng Ngọc Kiên Cố", seaName: "Xích Thiết Hải" },
    { rank: 3, name: "Tam Chuyển", baseExp: 3500, maxHp: 1500, maxMp: 1200, maxAge: 240, expStepMult: 1.4, power: 280, staminaBonus: 40, wallName: "Màng Bạc Lấp Lánh", seaName: "Bạch Ngân Hải" },
    { rank: 4, name: "Tứ Chuyển", baseExp: 10000, maxHp: 4000, maxMp: 3200, maxAge: 360, expStepMult: 1.7, power: 950, staminaBonus: 60, wallName: "Màng Tinh Thạch Vàng", seaName: "Hoàng Kim Hải" },
    { rank: 5, name: "Ngũ Chuyển", baseExp: 30000, maxHp: 11000, maxMp: 9000, maxAge: 500, expStepMult: 2.0, power: 3200, staminaBonus: 100, wallName: "Màng Tinh Thạch Tím", seaName: "Tử Tinh Hải" },
    { rank: 6, name: "Lục Chuyển (Cổ Tiên)", baseExp: 100000, maxHp: 35000, maxMp: 30000, maxAge: 1200, expStepMult: 2.5, power: 13000, staminaBonus: 999999, wallName: "Tiên Khiếu Phúc Địa", seaName: "Bạch Ngọc Tiên Nguyên" }
];

const APTITUDES = {
    C: { rank: "C", name: "Đinh Đẳng (Hạng C)", rate: 0.75, seaPct: 0.25, color: "#94a3b8", desc: "Không khiếu u ám, chỉ chứa 2-3 phần chân nguyên, tu luyện chậm chạp." },
    B: { rank: "B", name: "Bính Đẳng (Hạng B)", rate: 1.00, seaPct: 0.45, color: "#60a5fa", desc: "Không khiếu sáng sủa, chứa 4-5 phần chân nguyên, tư chất trung bình gia tộc." },
    A: { rank: "A", name: "Ất Đẳng (Hạng A)", rate: 1.25, seaPct: 0.65, color: "#f59e0b", desc: "Không khiếu ánh bạc, chứa 6-7 phần chân nguyên, thiên tài gia tộc trọng vọng." },
    S: { rank: "S", name: "Giáp Đẳng (Hạng S)", rate: 1.50, seaPct: 0.85, color: "#10b981", desc: "Không khiếu kim quang chói lòa, chứa 8-9 phần chân nguyên, ngàn người có một!" }
};

const SPECIAL_PHYSIQUES = [
    { id: "none", name: "Phàm Thể", rateBoost: 0, desc: "Thân thể bình thường không có dị tượng." },
    { id: "thai_nhat", name: "Thái Nhật Dương Mãng Thể", rateBoost: 1.0, desc: "+100% Tốc độ tu luyện. Cực hạn Viêm Đạo & Lực Đạo, khí huyết như mặt trời chói chang." },
    { id: "co_nguyet", name: "Cổ Nguyệt Âm Hoang Thể", rateBoost: 1.0, desc: "+100% Tốc độ tu luyện. Cực hạn Quang Đạo & Nguyệt Đạo, chân nguyên u lam tinh thuần vô song." },
    { id: "bac_minh", name: "Bắc Minh Băng Phách Thể", rateBoost: 1.0, desc: "+100% Tốc độ tu luyện. Cực hạn Hàn Đạo & Băng Đạo, đông kết vạn vật sinh linh." },
    { id: "sam_hai", name: "Sâm Hải Luân Hồi Thể", rateBoost: 1.0, desc: "+100% Tốc độ tu luyện. Cực hạn Mộc Đạo & Sinh Mệnh, tự hồi máu và gia tăng thọ nguyên." },
    { id: "viem_hoang", name: "Viêm Hoàng Lôi Trạch Thể", rateBoost: 1.0, desc: "+100% Tốc độ tu luyện. Cực hạn Lôi Đạo & Viêm Đạo, sấm sét lôi đình bộc phát hủy diệt." },
    { id: "van_kim", name: "Vạn Kim Diệu Hoa Thể", rateBoost: 1.0, desc: "+100% Tốc độ tu luyện. Cực hạn Kim Đạo & Quang Đạo, thân thể bất hoại như thần kim." },
    { id: "dai_luc", name: "Đại Lực Chân Vũ Thể", rateBoost: 1.0, desc: "+100% Tốc độ tu luyện. Cực hạn Lực Đạo thuần túy, cử đỉnh bạt sơn, cận chiến vô địch." },
    { id: "tieu_dieu", name: "Tiêu Diêu Trí Tâm Thể", rateBoost: 1.0, desc: "+100% Tốc độ tu luyện. Cực hạn Trí Đạo, ngộ tính nghịch thiên, học công pháp tức thì." },
    { id: "hon_quy", name: "Hồn Quy Thiến U Thể", rateBoost: 1.0, desc: "+100% Tốc độ tu luyện. Cực hạn Hồn Đạo, thần thức vô lượng, nhiếp hồn đoạt phách." },
    { id: "khong_tuyet", name: "Không Tuyệt Không Thể", rateBoost: 1.0, desc: "+100% Tốc độ tu luyện. Cực hạn Vũ Đạo / Không Gian, độn không vô ảnh, dịch chuyển tức thời." }
];

const DAO_LIST = [
    { id: "luc", name: "Lực Đạo", desc: "Sức mạnh thể chất thuần túy, cử đỉnh bạt sơn.", killerMove: "Vạn Thú Hư Ảnh Chưởng" },
    { id: "khi", name: "Khí Đạo", desc: "Điều khiển và vận dụng khí vô hình, tụ khí thành đao.", killerMove: "Kình Thiên Khí Thuẫn" },
    { id: "no", name: "Nô Đạo", desc: "Thu phục và điều khiển bầy thú, dị thú phục vụ.", killerMove: "Vạn Thú Triều Tịch" },
    { id: "tran", name: "Trận Đạo", desc: "Bày binh bố trận, kết nối thiên địa linh mạch.", killerMove: "Bát Quái Tru Ma Trận" },
    { id: "nhan", name: "Nhân Đạo", desc: "Lòng nhân ái, sự hòa hợp và ý chí con người.", killerMove: "Nhân Tâm Sở Hướng" },
    { id: "tri", name: "Trí Đạo", desc: "Trí tuệ mưu lược, suy diễn tính toán vạn vật.", killerMove: "Nhất Niệm Thiên Cơ Đoán" },
    { id: "tinh", name: "Tinh Đạo", desc: "Tinh hoa ánh sao và năng lượng tinh tú vũ trụ.", killerMove: "Tinh Lạc Cửu Thiên" },
    { id: "luyen", name: "Luyện Đạo", desc: "Luyện chế vạn vật, hợp luyện cổ trùng vi diệu.", killerMove: "Thiên Địa Hóa Lô Thuật" },
    { id: "luat", name: "Luật Đạo", desc: "Quy luật và trật tự, phong tỏa cấm chế nghiêm cẩn.", killerMove: "Pháp Luật Như Sơn" },
    { id: "bien_hoa", name: "Biến Hóa Đạo", desc: "Mô phỏng muôn loài, biến thân thành dị thú thần cầm.", killerMove: "Bách Thú Biến Thần Quyết" },
    { id: "phong", name: "Phong Đạo", desc: "Tốc độ của gió, lốc xoáy và phong nhận xé rách.", killerMove: "Cuồng Phong Bạo Liệt Nhận" },
    { id: "viem", name: "Viêm Đạo", desc: "Hỏa diễm thiêu đốt, dung nham và nhiệt lượng hủy diệt.", killerMove: "Phần Thiên Chân Hỏa" },
    { id: "thuy", name: "Thủy Đạo", desc: "Nước chảy triền miên, nhu hòa nhưng vô cùng kiên trì.", killerMove: "Nghịch Lưu Bất Tức Xung" },
    { id: "han", name: "Hàn Đạo", desc: "Hàn băng thấu xương, đóng băng vạn dặm sinh linh.", killerMove: "Thiên Niên Hàn Băng Phong" },
    { id: "quang", name: "Quang Đạo", desc: "Ánh sáng chói lòa, tốc độ cực nhanh không thể bắt kịp.", killerMove: "Cực Quang Thuấn Sát" },
    { id: "am", name: "Ám Đạo", desc: "Bóng tối sâu thẳm, ẩn nặc hành tung và ám sát chí mạng.", killerMove: "Dạ Mạc Thôn Phệ Bào" },
    { id: "tru", name: "Trụ Đạo", desc: "Sự bất khuất, kiên định và dòng thời gian trường cửu.", killerMove: "Bất Diệt Thiết Ý Trụ" },
    { id: "moc", name: "Mộc Đạo", desc: "Cây cối sinh trưởng, hồi phục sinh mệnh và trói buộc.", killerMove: "Vạn Mộc Hồi Xuân Thuật" },
    { id: "am_duong", name: "Âm Dương Đạo", desc: "Cân bằng lưỡng cực, dung hòa biến hóa tương khắc.", killerMove: "Lưỡng Nghi Nghịch Chuyển Kính" },
    { id: "loi", name: "Lôi Đạo", desc: "Sấm sét thiên kiếp, lực công phá cuồng bạo nhất thế gian.", killerMove: "Cửu Tiêu Thần Lôi Kích" },
    { id: "tho", name: "Thổ Đạo", desc: "Đất mẹ kiên cố, phòng ngự vững chắc không thể suy suyển.", killerMove: "Địa Giáp Bất Hoại Thể" },
    { id: "hon", name: "Hồn Đạo", desc: "Luyện hồn phách, rèn giũa linh hồn và đoạt phách câu hồn.", killerMove: "U Hồn Luyện Ngục Chưởng" },
    { id: "cam", name: "Cấm Đạo", desc: "Cấm kỵ cổ xưa, phong ấn sức mạnh và tước đoạt năng lực.", killerMove: "Vạn Cổ Cấm Đoạn Chỉ" },
    { id: "kiem", name: "Kiếm Đạo", desc: "Kiếm khí tung hoành, sắc bén vô song, trảm phá hư không.", killerMove: "Bách Trượng Trảm Thiên Kiếm" },
    { id: "dan", name: "Đan Đạo", desc: "Thuật chế tạo đan dược, dược tễ tẩm bổ hoặc đầu độc.", killerMove: "Cực Phẩm Đan Hương Trận" },
    { id: "mi", name: "Mị Đạo", desc: "Mê hoặc lòng người, tạo ảo cảnh và thao túng tinh thần.", killerMove: "Khuynh Thành Hoặc Tâm Thuật" },
    { id: "doc", name: "Độc Đạo", desc: "Độc dược ăn mòn da thịt và kinh mạch không thể kháng cự.", killerMove: "Thiên Chu Hóa Cốt Hủ" },
    { id: "huyet", name: "Huyết Đạo", desc: "Hấp thu tinh huyết, năng lượng sinh mệnh và huyết sát cuồng bạo.", killerMove: "Huyết Hải Cuồng Triều Bạo" },
    { id: "vu", name: "Vũ Đạo", desc: "Kỹ năng cận chiến đỉnh cao, không gian sát phạt liên hoàn.", killerMove: "Bát Hoang Liệt Không Quyền" },
    { id: "kim", name: "Kim Đạo", desc: "Độ cứng và sắc bén của kim loại, khoáng thạch vô địch.", killerMove: "Kim Cương Bất Bại Thân" }
];

const DAO_LEVELS = [
    { level: 0, name: "Phổ Thông", reqExp: 0, bonus: 0 },
    { level: 1, name: "Đại Sư", reqExp: 100, bonus: 25 },
    { level: 2, name: "Tông Sư", reqExp: 300, bonus: 60 },
    { level: 3, name: "Đại Tông Sư (Sát Chiêu)", reqExp: 750, bonus: 130 },
    { level: 4, name: "Vô Thượng Đại Tông Sư", reqExp: 1800, bonus: 240 },
    { level: 5, name: "Đạo Chủ", reqExp: 4000, bonus: 400 }
];

const CHECKIN_REWARDS = [
    { day: 1, name: "100 Linh Thạch Hạ & 50 Bạc", icon: "💎", apply: () => { player.stoneLow += 100; player.mortalSilver += 50; } },
    { day: 2, name: "2 Bồi Nguyên Đan & 2 Bổ Khí Đan", icon: "💊", apply: () => { addItemToInventory("boi_nguyen_dan", 2, "Bồi Nguyên Đan (Hồi Thể Lực)"); addItemToInventory("bo_khi_dan", 2, "Tụ Khí Đan"); } },
    { day: 3, name: "Cổ Phương Nhị Chuyển & 20 Điểm", icon: "📜", apply: () => { player.systemPoints += 20; addItemToInventory("co_phuong_thiet_bi", 1, "Cổ Phương Thiết Bì Cổ"); } },
    { day: 4, name: "250 Linh Thạch Hạ & Huyền Thiết Tinh", icon: "💎", apply: () => { player.stoneLow += 250; addItemToInventory("huyen_thiet_tinh", 3, "Huyền Thiết Tinh"); } },
    { day: 5, name: "Cổ Trùng Quý Ngẫu Nhiên", icon: "🐛", apply: () => { rewardRandomGu(2); } },
    { day: 6, name: "Quyển Trục Công Pháp Bí Truyền", icon: "📖", apply: () => { addItemToInventory("scroll_bi_truyen", 1, "Quyển Trục Bí Truyền"); } },
    { day: 7, name: "1 Linh Thạch Thượng & 80 Điểm", icon: "👑", apply: () => { player.stoneHigh += 1; player.systemPoints += 80; } }
];

const SYSTEM_QUESTS = [
    {
        id: "quest_tourney_first",
        title: "Quán Quân Diễn Võ Sơn Trại",
        desc: "Đoạt hạng nhất trong Diễn Võ Đại Hội Sơn Trại sau 1 năm chuẩn bị.",
        req: "Đánh bại các đối thủ tại Diễn Võ Trường",
        pts: 150,
        rewardText: "+150 Điểm Hệ Thống & 1 Cổ Trùng Tam Chuyển Quý",
        isDone: false,
        isClaimed: false
    },
    {
        id: "quest_breakthrough_rank2",
        title: "Đột Phá Nhị Chuyển",
        desc: "Nâng cao tu vi vượt qua gông cùm Nhất Chuyển lên Nhị Chuyển.",
        req: "Đạt cảnh giới Nhị Chuyển Sơ Giai",
        pts: 100,
        rewardText: "+100 Điểm Hệ Thống",
        isDone: false,
        isClaimed: false
    },
    {
        id: "quest_master_dao",
        title: "Khai Sáng Sát Chiêu",
        desc: "Đạt cảnh giới Đại Tông Sư ở một Lưu Phái để lĩnh ngộ Sát Chiêu uy chấn bát hoang.",
        req: "Đạt cấp bậc Đại Tông Sư ở bất kỳ Đạo nào",
        pts: 250,
        rewardText: "+250 Điểm Hệ Thống",
        isDone: false,
        isClaimed: false
    },
    {
        id: "quest_hunt_beasts",
        title: "Thảo Phạt Bách Thú",
        desc: "Tiêu diệt 5 con yêu thú tại Bách Thú Lĩnh.",
        req: "Giết 5 yêu thú hoang dã",
        pts: 120,
        rewardText: "+120 Điểm Hệ Thống",
        isDone: false,
        isClaimed: false
    }
];

const SPIRITUAL_ROOTS = [
    // 1. Thiên Linh Căn (3%)
    { id: "root_thien_kim", name: "Thiên Linh Căn [Kim]", tier: "Thiên Phẩm", elements: ["Kim"], bonusCultivate: 1.2, power: 40, desc: "Đơn nhất Kim hệ linh căn tinh thuần vô song, tu luyện công pháp Kim hệ thần tốc, không gặp bình cảnh kết đan.", weight: 0.6 },
    { id: "root_thien_moc", name: "Thiên Linh Căn [Mộc]", tier: "Thiên Phẩm", elements: ["Mộc"], bonusCultivate: 1.2, power: 40, desc: "Đơn nhất Mộc hệ linh căn xanh biếc ngút trời, thọ nguyên kéo dài, phục hồi sinh mệnh cực mạnh.", weight: 0.6 },
    { id: "root_thien_thuy", name: "Thiên Linh Căn [Thủy]", tier: "Thiên Phẩm", elements: ["Thủy"], bonusCultivate: 1.2, power: 40, desc: "Đơn nhất Thủy hệ linh căn nhu hòa triền miên, chân nguyên tinh khiết như sương mai.", weight: 0.6 },
    { id: "root_thien_hoa", name: "Thiên Linh Căn [Hỏa]", tier: "Thiên Phẩm", elements: ["Hỏa"], bonusCultivate: 1.2, power: 40, desc: "Đơn nhất Hỏa hệ linh căn diễm diễm chấn động, hỏa diễm bạo liệt thiêu đốt càn khôn.", weight: 0.6 },
    { id: "root_thien_tho", name: "Thiên Linh Căn [Thổ]", tier: "Thiên Phẩm", elements: ["Thổ"], bonusCultivate: 1.2, power: 40, desc: "Đơn nhất Thổ hệ linh căn vững như bàn thạch, phòng ngự tuyệt luân.", weight: 0.6 },

    // 2. Dị Linh Căn (2%)
    { id: "root_di_loi", name: "Dị Linh Căn [Lôi]", tier: "Dị Phẩm", elements: ["Lôi"], bonusCultivate: 1.0, power: 55, desc: "Lôi điện thiên kiếp biến dị, sát phạt cuồng bạo bậc nhất tu chân giới, khắc chế ma đạo.", weight: 0.5 },
    { id: "root_di_phong", name: "Dị Linh Căn [Phong]", tier: "Dị Phẩm", elements: ["Phong"], bonusCultivate: 1.0, power: 45, desc: "Gió lốc biến dị, thân pháp phiêu dật vô tung vô ảnh, tốc độ xuất chiêu cực nhanh.", weight: 0.5 },
    { id: "root_di_bang", name: "Dị Linh Căn [Băng]", tier: "Dị Phẩm", elements: ["Băng"], bonusCultivate: 1.0, power: 50, desc: "Cực hàn băng phách, đóng băng kinh mạch đối thủ, uy lực đông cứng vạn vật.", weight: 0.5 },
    { id: "root_di_quang", name: "Dị Linh Căn [Quang]", tier: "Dị Phẩm", elements: ["Quang"], bonusCultivate: 1.0, power: 45, desc: "Ánh sáng tinh thuần, thần thánh chói lọi, phá giải tà thuật u ám.", weight: 0.5 },

    // 3. Chân Linh Căn (20%)
    { id: "root_chan_mochoa", name: "Chân Linh Căn [Mộc - Hỏa]", tier: "Chân Phẩm", elements: ["Mộc", "Hỏa"], bonusCultivate: 0.6, power: 30, desc: "Mộc sinh Hỏa, linh căn tương sinh tuyệt hảo cho luyện đan và hỏa công.", weight: 4.0 },
    { id: "root_chan_thuymoc", name: "Chân Linh Căn [Thủy - Mộc]", tier: "Chân Phẩm", elements: ["Thủy", "Mộc"], bonusCultivate: 0.6, power: 28, desc: "Thủy dưỡng Mộc, chân nguyên sinh sôi không dứt, tu luyện ôn hòa ổn định.", weight: 4.0 },
    { id: "root_chan_thokim", name: "Chân Linh Căn [Thổ - Kim]", tier: "Chân Phẩm", elements: ["Thổ", "Kim"], bonusCultivate: 0.6, power: 32, desc: "Thổ sinh Kim, cứng cáp sắc bén, đao thương khó hoại.", weight: 4.0 },
    { id: "root_chan_kimthuy", name: "Chân Linh Căn [Kim - Thủy]", tier: "Chân Phẩm", elements: ["Kim", "Thủy"], bonusCultivate: 0.6, power: 30, desc: "Kim sinh Thủy, sắc bén mà nhu hòa, linh hoạt biến ảo.", weight: 4.0 },
    { id: "root_chan_hoatho", name: "Chân Linh Căn [Hỏa - Thổ]", tier: "Chân Phẩm", elements: ["Hỏa", "Thổ"], bonusCultivate: 0.6, power: 30, desc: "Hỏa sinh Thổ, nung đúc kiên cố như dung nham.", weight: 4.0 },

    // 4. Tam Linh Căn (35%)
    { id: "root_tam_kimmocthuy", name: "Tam Linh Căn [Kim - Mộc - Thủy]", tier: "Tam Phẩm", elements: ["Kim", "Mộc", "Thủy"], bonusCultivate: 0.3, power: 18, desc: "Ba hệ tương hỗn, tư chất trung bình phổ biến trong các đại tông môn tu tiên.", weight: 8.75 },
    { id: "root_tam_mochoatho", name: "Tam Linh Căn [Mộc - Hỏa - Thổ]", tier: "Tam Phẩm", elements: ["Mộc", "Hỏa", "Thổ"], bonusCultivate: 0.3, power: 18, desc: "Cân bằng ba hệ mộc hỏa thổ, công thủ vẹn toàn.", weight: 8.75 },
    { id: "root_tam_thuyhoakim", name: "Tam Linh Căn [Thủy - Hỏa - Kim]", tier: "Tam Phẩm", elements: ["Thủy", "Hỏa", "Kim"], bonusCultivate: 0.3, power: 18, desc: "Xung khắc đan xen, đòi hỏi tâm tính vững vàng khi đả tọa.", weight: 8.75 },
    { id: "root_tam_thokimthuy", name: "Tam Linh Căn [Thổ - Kim - Thủy]", tier: "Tam Phẩm", elements: ["Thổ", "Kim", "Thủy"], bonusCultivate: 0.3, power: 18, desc: "Lưu chuyển vững chãi, cơ sở tu luyện tương đối khá.", weight: 8.75 },

    // 5. Ngụy Linh Căn / Tạp Linh Căn (38%)
    { id: "root_nguy_tuhe", name: "Ngụy Linh Căn [Tứ Linh Căn]", tier: "Ngụy Phẩm", elements: ["Kim", "Mộc", "Thủy", "Hỏa"], bonusCultivate: 0.15, power: 10, desc: "Bốn hệ hỗn tạp khó khăn, giống hệt Hàn Lập thời niên thiếu, cần nhiều đan dược bồi bổ.", weight: 20.0 },
    { id: "root_tap_nguhanh", name: "Tạp Linh Căn [Ngũ Hành Hỗn Loạn]", tier: "Ngụy Phẩm", elements: ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"], bonusCultivate: 0.10, power: 8, desc: "Cả năm thuộc tính tạp loạn, linh khí hấp thu phân tán, tu luyện gian nan trắc trở.", weight: 18.0 },

    // 6. Vô Linh Căn (2%)
    { id: "root_vo_linhcan", name: "Vô Linh Căn [Phàm Thể]", tier: "Phàm Nhân", elements: [], bonusCultivate: 0.0, power: 0, desc: "Thân thể không có linh căn tiên đạo, không thể tu luyện công pháp, chỉ có thể thuần tu Cổ Sư.", weight: 2.0 }
];

const SYSTEM_SHOP_ITEMS = [
    { id: "shop_tay_tuy", name: "Tẩy Tủy Thần Đan", pts: 60, desc: "Chữa lành hoàn toàn 100% Căn Cốt tổn thương do đột phá thất bại.", type: "pill", canCotRestore: 100 },
    { id: "shop_the_luc", name: "Bổ Thể Kim Đan (x5)", pts: 30, desc: "Gói 5 viên đan dược hồi phục tức thì 50 Thể Lực mỗi viên.", type: "stamina", count: 5 },
    { id: "shop_ngung_khi", name: "Ngưng Khí Đan (x3)", pts: 40, desc: "Đan dược tinh thuần, uống vào tăng ngay 100 điểm Tu Vi.", type: "pill_exp", expGain: 100 },
    { id: "shop_dinh_nhan", name: "Định Nhan Thần Đan", pts: 50, desc: "Gia tăng thêm 50 năm tuổi thọ và dung mạo bất lão.", type: "age", ageAdd: 50 },
    { id: "shop_tay_linh_dan", name: "Tẩy Linh Đan", pts: 80, desc: "Tẩy rửa linh căn, cho phép quay lại Đo Linh Bàn để trắc định lại linh căn mới!", type: "reroll_linhcan" },
    { id: "shop_tuu_trung", name: "Tửu Trùng (Nhất Chuyển)", pts: 50, desc: "Tinh luyện chân nguyên, nâng cao thực lực nửa giai.", type: "gu", guId: "t_u_tr_ng" },
    { id: "shop_thiet_bi", name: "Thiết Bì Cổ (Nhị Chuyển)", pts: 80, desc: "Cổ trùng phòng ngự, da thịt đúc bằng sắt thép.", type: "gu", guId: "thi_t_b_c" },
    { id: "shop_kim_giap", name: "Kim Cương Cổ (Tam Chuyển)", pts: 120, desc: "Toàn thân đúc thành kim cương lưu ly, vô địch phòng ngự Tam Chuyển.", type: "gu", guId: "bach_ngoc_co" },
    { id: "shop_xa_loi_3", name: "Bạch Ngân Xá Lợi Cổ (Tam Chuyển)", pts: 150, desc: "Tiêu hao cổ, tăng ngay 1 tiểu cảnh giới cho tu sĩ Tam Chuyển.", type: "gu", guId: "b_ch_ng_n_x_l_i_c" },
    { id: "shop_xa_loi_4", name: "Hoàng Kim Xá Lợi Cổ (Tứ Chuyển)", pts: 250, desc: "Cổ bảo trân quý, tăng thẳng 1 tiểu cảnh giới cho tu sĩ Tứ Chuyển.", type: "gu", guId: "t_u_tr_ng" },
    { id: "shop_scroll_kiem_quyet", name: "Bản Gốc Thanh Nguyên Kiếm Quyết", pts: 100, desc: "Quyển trục công pháp chí cao Kiếm Đạo của Hàn Lập.", type: "scroll", techId: "thanh_nguyen_kiem_quyet" },
    { id: "shop_scroll_dai_dien", name: "Bản Gốc Đại Diễn Quyết", pts: 110, desc: "Bí kíp cường hóa thần thức vô song Trí Đạo.", type: "scroll", techId: "dai_dien_quyet" },
    { id: "shop_scroll_minh_vuong", name: "Bản Gốc Minh Vương Quyết", pts: 140, desc: "Bí pháp luyện thể kim cương bất hoại Lực Đạo.", type: "scroll", techId: "minh_vuong_quyet" },
    { id: "shop_recipe_tuu_trung", name: "Cổ Phương Tửu Trùng Cổ", pts: 45, desc: "Phương pháp bí truyền phối chế Tửu Trùng Nhất Chuyển.", type: "recipe", recipeId: "recipe_tuu_trung" },
    { id: "shop_stone_high", name: "10 Linh Thạch Thượng Phẩm", pts: 70, desc: "Tương đương 100.000 Linh Thạch Hạ Phẩm, linh khí dồi dào.", type: "stone_high", count: 10 }
];

// Danh sách Cổ Trùng Cho Người Chơi Chọn Bản Mệnh Cổ Đầu Tiên
const STARTER_GU_CHOICES = [
    {
        id: "nguy_t_quang_c",
        name: "Nguyệt Quang Cổ",
        rank: 1,
        path: "Quang Đạo",
        type: "Công Kích",
        desc: "Bản mệnh cổ trấn tộc Cổ Nguyệt! Phát ra U Lam Nguyệt Nhận sắc bén chém địch từ xa. Thức ăn: Cánh hoa nguyệt lan.",
        power: 40,
        mpCost: 20
    },
    {
        id: "t_u_tr_ng",
        name: "Tửu Trùng",
        rank: 1,
        path: "Khí Đạo",
        type: "Hỗ Trợ",
        desc: "Cổ trùng trân quý vô song! Tinh luyện chân nguyên nâng cao thực lực nửa tiểu cảnh giới, đẩy nhanh tốc độ tu luyện. Thức ăn: Rượu ngon.",
        power: 25,
        mpCost: 15
    },
    {
        id: "hac_thiet_co",
        name: "Hắc Thạch Cổ",
        rank: 1,
        path: "Thổ Đạo",
        type: "Phòng Ngự",
        desc: "Tụ thạch giáp bảo vệ kinh mạch và da thịt, kháng sát thương vật lý mạnh mẽ. Thức ăn: Khoáng thạch đen.",
        power: 35,
        mpCost: 20
    },
    {
        id: "thanh_dang_co",
        name: "Thanh Đằng Cổ",
        rank: 1,
        path: "Mộc Đạo",
        type: "Hỗ Trợ",
        desc: "Phóng ra dây leo thanh đằng trói chặt kẻ thù, khống chế cục diện chiến trường. Thức ăn: Nước linh tuyền.",
        power: 30,
        mpCost: 20
    },
    {
        id: "bach_ngoc_co",
        name: "Bạch Ngọc Cổ",
        rank: 1,
        path: "Kim Đạo",
        type: "Phòng Ngự",
        desc: "Khiến da thịt hóa thành bạch ngọc bóng loáng, phòng thủ toàn diện đao thương bất nhập. Thức ăn: Bột ngọc bích.",
        power: 45,
        mpCost: 25
    },
    {
        id: "huyet_tich_co",
        name: "Huyết Tích Cổ",
        rank: 1,
        path: "Huyết Đạo",
        type: "Công Kích",
        desc: "Cổ trùng hung sát viễn cổ! Tụ huyết ti sát phạt cuồng bạo, hút sinh lực đối thủ. Thức ăn: Huyết dịch dã thú.",
        power: 45,
        mpCost: 25
    }
];

// ============================================================
// 2. CẤU TRÚC DỮ LIỆU NGƯỜI CHƠI (PLAYER STATE)
// ============================================================

let player = {
    name: "Cổ Nguyệt Phong",
    rankIdx: 0,        // 0 = Nhất Chuyển ... 5 = Lục Chuyển
    subStageIdx: 0,    // 0 = Sơ Giai ... 4 = Viên Mãn, 5 = Đại Viên Mãn
    isDaiVienMan: false,
    exp: 0,
    maxExp: 385,       // Cân chỉnh theo mốc chân thực (Nhất Chuyển Sơ Giai)

    // Chỉ số sinh mệnh & năng lượng
    hp: 200,
    maxHp: 200,
    mp: 72,            // 45% của 160 (tương ứng Bính đẳng)
    maxMp: 160,
    stamina: 120,
    maxStamina: 120,
    staminaPillCountToday: 0, // Tối đa 5 lần/ngày
    staminaRestCountToday: 0, // Tối đa 1 lần/ngày
    canCot: 100,             // 0 - 100%

    // Thuộc tính đạo cơ
    comprehension: 15,
    mentalSense: 14,
    luck: 16,
    intelligence: 17,
    spiritPower: 15,
    power: 30,

    // Tư chất & Thể chất (Mặc định trước khi Khai Khiếu)
    aptitude: APTITUDES.B,
    specialPhysique: SPECIAL_PHYSIQUES[0],
    linhCan: null,             // Linh căn Phàm Nhân Tu Tiên
    cultivateMode: "dual",     // "dual": Kiêm tu, "gu": Thuần tu Cổ, "technique": Thuần tu Pháp

    // Lưu phái tu luyện (Tối đa 5/30 Đạo)
    activeDaos: ["quang"],
    mainDao: "quang",
    daoLevels: {
        quang: { exp: 20, level: 0 }
    },

    // Tiền tệ kép
    stoneHigh: 0,
    stoneMid: 0,
    stoneLow: 100,
    mortalGold: 0,
    mortalSilver: 200,
    mortalCopper: 0,

    // Hệ thống thiên mệnh
    systemPoints: 50,
    checkinDay: 1,
    checkinClaimedToday: false,

    // Thời gian chân thực
    timeYear: 1,
    timeDay: 1,
    timeHour: 8,
    age: 15,
    maxAge: 100,
    tournamentDaysLeft: 360,
    tournamentCompleted: false,

    // Địa điểm hiện tại
    currentLocation: "home",

    // Công pháp đã học (Bắt đầu với 1 tâm pháp thổ nạp sơ cấp)
    techniquesLearned: [
        {
            id: "truong_xuan_cong",
            name: "Trường Xuân Công",
            dao: "Mộc Đạo",
            masteryExp: 10,
            masteryStage: "Nhập Môn"
        }
    ],

    // Cổ trùng trong Không Khiếu (Ban đầu hoàn toàn TRỐNG, chờ tự chọn Bản Mệnh Cổ)
    guInventory: [],

    // Túi trữ vật
    inventory: [
        { id: "boi_nguyen_dan", name: "Bồi Nguyên Đan (Hồi Thể Lực)", count: 3, type: "stamina", restore: 40 },
        { id: "bo_khi_dan", name: "Tụ Khí Đan", count: 2, type: "pill", exp: 40 }
    ],

    // Thống kê & Quái vật đã săn
    beastsHunted: 0,
    pendingMonsterLoot: null,
    logEntries: []
};

// ============================================================
// 3. TIỆN ÍCH AN TOÀN ÂM THANH & LƯU/TẢI GAME (DEFENSIVE HELPERS)
// ============================================================

function safePlaySound(methodName) {
    try {
        if (window.soundEngine && typeof window.soundEngine[methodName] === "function") {
            window.soundEngine[methodName]();
        }
    } catch (e) {
        console.warn("Sound play error suppressed:", e);
    }
}

function safeGetStorage(key) {
    try {
        return window.localStorage ? window.localStorage.getItem(key) : null;
    } catch (e) {
        console.warn("Storage read blocked or failed:", e);
        return null;
    }
}

function safeSetStorage(key, val) {
    try {
        if (window.localStorage) {
            window.localStorage.setItem(key, val);
            return true;
        }
    } catch (e) {
        console.warn("Storage write blocked or failed:", e);
    }
    return false;
}

function safeRemoveStorage(key) {
    try {
        if (window.localStorage) {
            window.localStorage.removeItem(key);
            return true;
        }
    } catch (e) {
        console.warn("Storage remove blocked or failed:", e);
    }
    return false;
}

function resetPlayerToFreshState(name = "Cổ Nguyệt Phong") {
    player = {
        name: name,
        rankIdx: 0,
        subIdx: 0,
        subStageIdx: 0,
        exp: 0,
        maxExp: 385,
        isDaiVienMan: false,
        hp: 200,
        maxHp: 200,
        mp: 72,
        maxMp: 160,
        stamina: 120,
        maxStamina: 120,
        staminaPillCountToday: 0,
        staminaRestCountToday: 0,
        canCot: 100,

        comprehension: 15,
        mentalSense: 14,
        luck: 16,
        intelligence: 17,
        spiritPower: 15,
        power: 30,

        aptitude: APTITUDES.B,
        specialPhysique: SPECIAL_PHYSIQUES[0],
        linhCan: null,
        cultivateMode: "dual",

        activeDaos: ["moc"],
        mainDao: "Mộc Đạo",
        mainTechId: "truong_xuan_cong",
        daoLevels: {
            moc: { exp: 20, level: 0 },
            quang: { exp: 20, level: 0 }
        },

        stoneHigh: 0,
        stoneMid: 0,
        stoneLow: 100,
        mortalGold: 0,
        mortalSilver: 200,
        mortalCopper: 0,

        systemPoints: 50,
        checkinDay: 1,
        checkinClaimedToday: false,

        timeYear: 1,
        timeDay: 1,
        timeHour: 8,
        age: 15,
        maxAge: 100,
        tournamentDaysLeft: 360,
        tournamentCompleted: false,

        currentLocation: "home",

        techniquesLearned: [
            {
                id: "truong_xuan_cong",
                name: "Trường Xuân Công",
                dao: "Mộc Đạo",
                masteryExp: 10,
                masteryStage: "Nhập Môn"
            }
        ],

        guInventory: [],

        inventory: [
            { id: "boi_nguyen_dan", name: "Bồi Nguyên Đan (Hồi Thể Lực)", count: 3, type: "pill_stamina", restore: 40 },
            { id: "bo_khi_dan", name: "Tụ Khí Đan (Tăng 40 Tu Vi)", count: 2, type: "pill_exp", exp: 40 }
        ],

        beastsHunted: 0,
        pendingMonsterLoot: null,
        logEntries: [
            { text: "[Năm 1 • Ngày 1] Thức tỉnh tại sườn núi Thanh Trúc Sơn Trại.", type: "info" }
        ]
    };

    recalcMaxExp();
}

function resetGame() {
    if (confirm("⚠️ ĐẠO HỮU CHẮC CHẮN MUỐN TRÙNG SINH?\n\nToàn bộ tu vi, cổ trùng, công pháp và ký ức hiện tại sẽ được khởi tạo lại từ đầu để tham gia Đại Lễ Khai Khiếu!")) {
        safeRemoveStorage("TUTIEN_V4_SAVE");
        resetPlayerToFreshState("Cổ Nguyệt Phong");
        updateSidebarUI();
        renderCurrentLocationStage();
        
        const introScreen = document.getElementById("intro-awakening-screen");
        const btnContinue = document.getElementById("btn-continue-game");
        if (btnContinue) btnContinue.classList.add("hidden");
        if (introScreen) {
            introScreen.classList.remove("hidden");
            switchIntroStep(1);
        }
        addLog("Đạo hữu đã tán công chuyển thế, bắt đầu lại kiếp tu chân mới!", "special");
    }
}

function saveGame() {
    try {
        const ok = safeSetStorage("TUTIEN_V4_SAVE", JSON.stringify(player));
        if (ok) {
            addLog("Đã lưu tiến trình tu tiên vào linh hồn ký ức thành công!", "success");
            safePlaySound("playCoins");
            alert("💾 Lưu game thành công! Ký ức tu hành đã được lưu lại.");
        } else {
            alert("⚠️ Trình duyệt chặn ghi bộ nhớ cục bộ (localStorage). Hãy kiểm tra quyền riêng tư của trình duyệt.");
        }
    } catch (e) {
        console.error("Save error:", e);
    }
}

function loadGame() {
    try {
        const data = safeGetStorage("TUTIEN_V4_SAVE");
        if (data) {
            const loaded = JSON.parse(data);
            player = Object.assign(player, loaded);

            // Defensive defaults against outdated/corrupted save fields
            if (!LOCATIONS_CONFIG[player.currentLocation]) {
                player.currentLocation = "home";
            }
            if (!player.aptitude || !player.aptitude.rate) {
                player.aptitude = APTITUDES.B;
            }
            if (!player.specialPhysique) {
                player.specialPhysique = SPECIAL_PHYSIQUES[0];
            }
            if (!Array.isArray(player.guInventory)) {
                player.guInventory = [];
            }
            if (!Array.isArray(player.inventory)) {
                player.inventory = [];
            }
            if (!Array.isArray(player.techniquesLearned)) {
                player.techniquesLearned = [];
            }
            if (!Array.isArray(player.logEntries)) {
                player.logEntries = [];
            }
            if (player.subStageIdx === undefined) {
                player.subStageIdx = player.subIdx || 0;
            }
            if (isNaN(player.exp) || player.exp === undefined) {
                player.exp = 0;
            }
            if (!player.mainTechId && player.techniquesLearned.length > 0) {
                player.mainTechId = player.techniquesLearned[0].id;
                player.mainDao = player.techniquesLearned[0].dao || "Mộc Đạo";
            }
            recalcMaxExp();

            addLog("Đã khôi phục ký ức luân hồi thành công!", "info");
            updateSidebarUI();
            renderCurrentLocationStage();
            return true;
        }
    } catch (e) {
        console.error("Load error:", e);
    }
    return false;
}

// ============================================================
// 4. HỆ THỐNG THỜI GIAN & CHÂN THỰC
// ============================================================

const WEEKDAYS = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

function advanceTime(hours, days = 0) {
    let totalHours = hours + (days * 24);
    let prevDay = player.timeDay;

    player.timeHour += totalHours;
    while (player.timeHour >= 24) {
        player.timeHour -= 24;
        player.timeDay += 1;
    }

    let daysPassed = player.timeDay - prevDay;
    if (daysPassed > 0) {
        // Cập nhật đếm ngược Diễn Võ Đại Hội
        player.tournamentDaysLeft = Math.max(0, player.tournamentDaysLeft - daysPassed);

        // Reset giới hạn thể lực mỗi ngày
        player.staminaPillCountToday = 0;
        player.staminaRestCountToday = 0;
        player.checkinClaimedToday = false;

        // Chân nguyên tự nhiên hồi phục x5 theo ngày
        let mpRecovery = Math.min(player.maxMp, player.mp + (45 * daysPassed));
        player.mp = mpRecovery;

        // Tiến trình năm và tuổi thọ
        while (player.timeDay > 360) {
            player.timeDay -= 360;
            player.timeYear += 1;
            player.age += 1;
            addLog(`Ngươi đã tăng 1 tuổi! Thọ nguyên hiện tại: ${player.age}/${player.maxAge} tuổi.`, "warning");
        }
    }

    updateSidebarUI();
}

// ============================================================
// 5. CẬP NHẬT GIAO DIỆN SIDEBAR (APOCALYPTIC WORLD)
// ============================================================

function updateSidebarUI() {
    // 1. Thời gian & Thứ & Ngày
    const weekdayName = WEEKDAYS[player.timeDay % 7];
    const hourStr = player.timeHour.toString().padStart(2, "0") + ":00";
    
    const elWeekday = document.getElementById("time-weekday");
    if (elWeekday) elWeekday.textContent = weekdayName;

    const elClock = document.getElementById("time-clock");
    if (elClock) elClock.textContent = hourStr;

    const elDay = document.getElementById("time-day-count");
    if (elDay) elDay.textContent = player.timeDay;

    const elYear = document.getElementById("time-year-count");
    if (elYear) elYear.textContent = player.timeYear;

    const elAge = document.getElementById("sidebar-age");
    if (elAge) elAge.textContent = player.age;

    const elMaxAge = document.getElementById("sidebar-max-age");
    if (elMaxAge) elMaxAge.textContent = player.maxAge;

    // 2. Các thanh trạng thái (HP, MP, Stamina, Tu Vi, Căn Cốt, Tư Chất)
    const hpPct = Math.min(100, Math.max(0, Math.round((player.hp / player.maxHp) * 100)));
    const elHpFill = document.getElementById("sb-hp-fill");
    const elHpText = document.getElementById("sb-hp-text");
    if (elHpFill) elHpFill.style.width = hpPct + "%";
    if (elHpText) elHpText.textContent = `${Math.round(player.hp)} / ${player.maxHp}`;

    const mpPct = Math.min(100, Math.max(0, Math.round((player.mp / player.maxMp) * 100)));
    const elMpFill = document.getElementById("sb-mp-fill");
    const elMpText = document.getElementById("sb-mp-text");
    if (elMpFill) elMpFill.style.width = mpPct + "%";
    if (elMpText) elMpText.textContent = `${Math.round(player.mp)} / ${player.maxMp}`;

    const isImmortal = player.rankIdx >= 5; // Lục Chuyển trở lên miễn nhiễm thể lực
    const staPct = isImmortal ? 100 : Math.min(100, Math.max(0, Math.round((player.stamina / player.maxStamina) * 100)));
    const elStaFill = document.getElementById("sb-stamina-fill");
    const elStaText = document.getElementById("sb-stamina-text");
    if (elStaFill) elStaFill.style.width = staPct + "%";
    if (elStaText) elStaText.textContent = isImmortal ? "Vô Tận (Tiên Thể)" : `${Math.round(player.stamina)} / ${player.maxStamina}`;

    // Tu Vi & Cảnh Giới
    if (!player.maxExp || isNaN(player.maxExp) || player.maxExp <= 0) {
        recalcMaxExp();
    }
    if (isNaN(player.exp) || player.exp === undefined || player.exp === null) {
        player.exp = 0;
    }
    const curRank = RANKS[player.rankIdx] || RANKS[0];
    const curSub = SUB_STAGES[player.subStageIdx] || SUB_STAGES[0];
    const safeMaxExp = (player.maxExp && !isNaN(player.maxExp)) ? player.maxExp : 385;
    const expPct = Math.min(100, Math.max(0, Math.round((player.exp / safeMaxExp) * 100))) || 0;
    const elExpFill = document.getElementById("sb-exp-fill");
    const elRealmText = document.getElementById("sb-realm-text");
    if (elExpFill) elExpFill.style.width = expPct + "%";
    if (elRealmText) {
        const stageStr = player.isDaiVienMan ? "Đại Viên Mãn" : curSub.name;
        elRealmText.textContent = `${curRank.name} • ${stageStr} (${expPct}%)`;
    }

    // Căn Cốt
    const elCanCot = document.getElementById("sb-cancot-text");
    if (elCanCot) {
        elCanCot.textContent = `${player.canCot}%`;
        if (player.canCot < 60) elCanCot.className = "text-red";
        else if (player.canCot < 90) elCanCot.className = "text-orange";
        else elCanCot.className = "text-gold";
    }



    // Cập nhật hiển thị Bản Mệnh Cổ trên Sidebar
    const elStarterGu = document.getElementById("sb-starter-gu-name");
    if (elStarterGu) {
        if (player.guInventory && player.guInventory.length > 0) {
            const firstGu = player.guInventory[0];
            elStarterGu.textContent = `${firstGu.name} (${firstGu.rank} Chuyển)`;
            elStarterGu.className = "text-gold";
        } else {
            elStarterGu.textContent = "Chưa Có (Nhấp Chọn)";
            elStarterGu.className = "text-cyan";
        }
    }

    // 3. Tiền Tệ
    const elHigh = document.getElementById("curr-sb-high");
    const elMid = document.getElementById("curr-sb-mid");
    const elLow = document.getElementById("curr-sb-low");
    const elGold = document.getElementById("curr-sb-gold");
    const elSilver = document.getElementById("curr-sb-silver");
    const elCopper = document.getElementById("curr-sb-copper");
    if (elHigh) elHigh.textContent = player.stoneHigh;
    if (elMid) elMid.textContent = player.stoneMid;
    if (elLow) elLow.textContent = player.stoneLow;
    if (elGold) elGold.textContent = player.mortalGold;
    if (elSilver) elSilver.textContent = player.mortalSilver;
    if (elCopper) elCopper.textContent = player.mortalCopper;

    // 4. Thuộc Tính Đạo Cơ (Tính thêm buff từ công pháp & cổ trùng)
    const effectivePower = calculateTotalPower();
    const elComp = document.getElementById("stat-sb-comp");
    const elSense = document.getElementById("stat-sb-sense");
    const elLuck = document.getElementById("stat-sb-luck");
    const elIntel = document.getElementById("stat-sb-intel");
    const elSpirit = document.getElementById("stat-sb-spirit");
    const elPower = document.getElementById("stat-sb-power");
    if (elComp) elComp.textContent = player.comprehension;
    if (elSense) elSense.textContent = player.mentalSense;
    if (elLuck) elLuck.textContent = player.luck;
    if (elIntel) elIntel.textContent = player.intelligence;
    if (elSpirit) elSpirit.textContent = player.spiritPower;
    if (elPower) elPower.textContent = effectivePower;

    // 5. Thao tác thể lực nhanh
    const elPillCount = document.getElementById("pill-count-text");
    const elRestCount = document.getElementById("rest-count-text");
    if (elPillCount) elPillCount.textContent = `${5 - player.staminaPillCountToday}/5`;
    if (elRestCount) elRestCount.textContent = `${1 - player.staminaRestCountToday}/1`;

    // 6. Nút Đột Phá Cảnh Giới
    const btnBreakthrough = document.getElementById("btn-breakthrough");
    const txtBreakthrough = document.getElementById("breakthrough-status-text");
    if (btnBreakthrough && txtBreakthrough) {
        if (player.subStageIdx >= 4) {
            btnBreakthrough.disabled = false;
            btnBreakthrough.classList.add("btn-breakthrough-pulse");
            const rate = player.isDaiVienMan ? 90 : Math.round(65 * (player.canCot / 100));
            txtBreakthrough.textContent = player.isDaiVienMan ? `Đại Viên Mãn (Tỉ lệ ${rate}%)` : `Viên Mãn (Tỉ lệ ${rate}%)`;
        } else {
            btnBreakthrough.disabled = true;
            btnBreakthrough.classList.remove("btn-breakthrough-pulse");
            txtBreakthrough.textContent = `Cần đạt Viên Mãn (${expPct}%)`;
        }
    }

    // 7. Diễn Võ Đếm Ngược
    const elTourney = document.getElementById("top-tourney-days");
    if (elTourney) elTourney.textContent = `${player.tournamentDaysLeft} ngày`;

    // 8. Điểm Hệ Thống
    const elSysPts = document.getElementById("sys-pts-display");
    if (elSysPts) elSysPts.textContent = `${player.systemPoints} Điểm`;
}

function calculateTotalPower() {
    let base = RANKS[player.rankIdx].power;
    // Cộng thêm từ các công pháp đã học
    if (window.TECHNIQUES_DATABASE && player.techniquesLearned) {
        player.techniquesLearned.forEach(tl => {
            const db = window.TECHNIQUES_DATABASE.find(t => t.id === tl.id);
            if (db) {
                base += (db.rank * 15);
            }
        });
    }
    // Cộng thêm từ cổ trùng trong không khiếu
    if (player.guInventory) {
        player.guInventory.forEach(g => {
            base += (g.power || 20);
        });
    }
    // Cộng thêm từ Đạo Cảnh
    if (player.activeDaos) {
        player.activeDaos.forEach(d => {
            const lvl = player.daoLevels[d] ? player.daoLevels[d].level : 0;
            base += (DAO_LEVELS[lvl] ? DAO_LEVELS[lvl].bonus : 0);
        });
    }
    return base;
}

// ============================================================
// 6. HỆ THỐNG ĐỊA ĐIỂM & ACTION CARDS (APOCALYPTIC WORLD)
// ============================================================

const LOCATIONS_CONFIG = {
    home: {
        title: "NHÀ Ở SƠN TRẠI",
        densityText: "Nồng Độ Linh Khí: Căn Bản (x1.0)",
        density: 1.0,
        icon: "🏠",
        actions: [
            { key: "act_meditate", label: "Tọa Thiền Thổ Nạp", staminaCost: 15, timeCost: 2, desc: "Tĩnh tọa 2 giờ dẫn khí nhập thể, hấp thu linh khí thiên địa." },
            { key: "act_practice_technique", label: "Diễn Luyện Công Pháp", staminaCost: 20, timeCost: 2, desc: "Vận hành chu thiên công pháp Hàn Lập, gia tăng độ thành thạo." },
            { key: "act_feed_gu", label: "Ôn Dưỡng Cổ Trùng", staminaCost: 10, timeCost: 1, desc: "Cung phụng đồ ăn và rót chân nguyên nuôi dưỡng cổ trùng trong không khiếu." },
            { key: "act_rest_tea", label: "Thưởng Trà Ngộ Đạo", staminaCost: 0, timeCost: 1, desc: "Uống trà thư giãn, hồi phục thể lực và thanh lọc tâm trí." },
            { key: "act_schedule", label: "Bế Quan Lập Lịch", staminaCost: 0, timeCost: 0, desc: "Lập kế hoạch bế quan tu luyện dài ngày tự động (Ngày & Giờ)." },
            { key: "act_leave_home", label: "Xuất Ngoại Lịch Luyện", staminaCost: 0, timeCost: 5 / 60, desc: "Di chuyển loanh quanh trong sơn trại (5 phút, tu sĩ không tốn thể lực)." }
        ]
    },
    adventure: {
        title: "BÁCH THÚ LĨNH HOANG VỰC",
        densityText: "Nồng Độ Linh Khí: Nồng Nặc (x1.5)",
        density: 1.5,
        icon: "🌲",
        actions: [
            { key: "act_hunt_beast", label: "Săn Bắn Yêu Thú", staminaCost: 30, timeCost: 3, desc: "Tìm kiếm và chiến đấu yêu thú, thu nội đan/nguyên liệu hoặc bán lấy linh thạch." },
            { key: "act_gather_herbs", label: "Hái Lượm Linh Dược", staminaCost: 20, timeCost: 2, desc: "Tìm kiếm các loại linh thảo, khoáng thạch để làm nguyên liệu luyện cổ." },
            { key: "act_explore_cave", label: "Thám Hiểm Cổ Động", staminaCost: 35, timeCost: 4, desc: "Khám phá di tích hang động viễn cổ, tìm kiếm kỳ ngộ truyền thừa." },
            { key: "act_leave_home", label: "Trở Về Sơn Trại", staminaCost: 0, timeCost: 15 / 60, desc: "Rời khỏi núi rừng hoang vu, quay lại căn nhà an toàn (15 phút)." }
        ]
    },
    market: {
        title: "PHƯỜNG THỊ & TIỀN TRANG",
        densityText: "Nồng Độ Linh Khí: Phồn Hoa (x1.0)",
        density: 1.0,
        icon: "🏮",
        actions: [
            { key: "act_visit_market", label: "Tiệm Thuốc & Quầy Thu Mua", staminaCost: 5, timeCost: 1, desc: "Mua Bồi Nguyên Đan, Tụ Khí Đan, nguyên liệu hoặc BÁN Yêu Thú lấy Linh Thạch." },
            { key: "act_exchange_money", label: "Đổi Tiền Tiền Trang", staminaCost: 0, timeCost: 1, desc: "Quy đổi hai chiều giữa tiền phàm (Đồng/Bạc/Vàng) và Linh Thạch." },
            { key: "act_leave_home", label: "Trở Về Sơn Trại", staminaCost: 0, timeCost: 5 / 60, desc: "Rời khỏi chốn ồn ào trở về phòng nghỉ ngơi (5 phút)." }
        ]
    },
    tournament: {
        title: "DIỄN VÕ ĐẠI HỘI SƠN TRẠI",
        densityText: "Nồng Độ Linh Khí: Sôi Động (x1.1)",
        density: 1.1,
        icon: "🏆",
        actions: [
            { key: "act_tournament_arena", label: "Khiêu Chiến Lôi Đài", staminaCost: 25, timeCost: 2, desc: "Giao đấu với các đệ tử thiếu niên Cổ Nguyệt gia tộc, tranh đoạt phần thưởng." },
            { key: "act_leave_home", label: "Trở Về Sơn Trại", staminaCost: 0, timeCost: 5 / 60, desc: "Rời khỏi võ trường trở về phòng (5 phút)." }
        ]
    },
    library: {
        title: "TÀNG THƯ CÁC GIA TỘC",
        densityText: "Nồng Độ Linh Khí: Tĩnh Lặng (x1.2)",
        density: 1.2,
        icon: "📚",
        actions: [
            { key: "act_library_shop", label: "Mua Quyển Trục & Cổ Bảo", staminaCost: 5, timeCost: 1, desc: "Đổi Linh Thạch mua Quyển Trục Công Pháp Hàn Lập, Cổ Phương và Cổ Trùng." },
            { key: "act_study_library", label: "Nghiên Cứu Điển Tịch", staminaCost: 15, timeCost: 3, desc: "Đọc cổ tịch gia tộc, gia tăng Ngộ Tính và tích lũy điểm Đạo Cảnh." },
            { key: "act_leave_home", label: "Trở Về Sơn Trại", staminaCost: 0, timeCost: 5 / 60, desc: "Rời khỏi thư các trở về phòng (5 phút)." }
        ]
    }
};

function renderCurrentLocationStage() {
    const loc = LOCATIONS_CONFIG[player.currentLocation] || LOCATIONS_CONFIG.home;
    
    // Update Header
    const titleEl = document.getElementById("stage-location-title");
    const badgeEl = document.getElementById("stage-density-badge");
    const thumbIcon = document.getElementById("loc-thumb-icon");
    if (titleEl) titleEl.textContent = loc.title;
    if (badgeEl) badgeEl.textContent = loc.densityText;
    if (thumbIcon) thumbIcon.textContent = loc.icon;

    // Hide execution card, show action cards grid
    const execCard = document.getElementById("action-execution-card");
    const cardsGrid = document.getElementById("action-cards-grid");
    if (execCard) execCard.classList.add("hidden");
    if (cardsGrid) {
        cardsGrid.classList.remove("hidden");
        cardsGrid.innerHTML = "";

        loc.actions.forEach(act => {
            const cardEl = document.createElement("div");
            cardEl.className = "action-card-16-9";
            
            // Get SVG art from ArtEngine
            let artKey = act.key;
            if (artKey === "act_library_shop") artKey = "act_study_library";
            const svgFn = (window.ArtEngine && window.ArtEngine.actionCards && window.ArtEngine.actionCards[artKey]) 
                ? window.ArtEngine.actionCards[artKey] 
                : (window.ArtEngine && window.ArtEngine.actionCards && window.ArtEngine.actionCards.act_meditate);
            const svgHtml = svgFn ? svgFn() : "";

            let staBadge = "";
            if (act.staminaCost > 0) {
                staBadge = `<span class="act-stamina-tag">⚡ -${act.staminaCost}</span>`;
            } else if (act.timeCost > 0) {
                const minStr = act.timeCost < 1 ? `${Math.round(act.timeCost * 60)} phút` : `${act.timeCost} giờ`;
                staBadge = `<span class="act-stamina-tag" style="background: rgba(16, 185, 129, 0.85); color: #fff;">⏱️ ${minStr}</span>`;
            }

            cardEl.innerHTML = `
                <div class="card-visual-frame">
                    ${svgHtml}
                    ${staBadge}
                </div>
                <div class="card-title-bar">
                    <span class="card-action-name">${act.label}</span>
                </div>
            `;

            cardEl.addEventListener("click", () => {
                executeAction(act.key, act);
            });

            cardsGrid.appendChild(cardEl);
        });
    }

    // Update active tab buttons in top navigation
    document.querySelectorAll(".loc-tab-btn").forEach(btn => {
        if (btn.getAttribute("data-location") === player.currentLocation) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

// ============================================================
// 7. THỰC THI HÀNH ĐỘNG (ACTION EXECUTION)
// ============================================================

function executeAction(actionKey, actConfig = null) {
    // 1. Kiểm tra các hành động mở Modal trực tiếp
    if (actionKey === "act_schedule") {
        openModal("modal-cultivate-schedule");
        updateScheduleSummary();
        return;
    }
    if (actionKey === "act_exchange_money") {
        openModal("modal-exchange-currency");
        return;
    }
    if (actionKey === "act_practice_technique") {
        openModal("modal-system");
        switchToSystemTab("systab-techniques");
        return;
    }
    if (actionKey === "act_feed_gu") {
        openModal("modal-gu-inventory");
        renderGuModal();
        return;
    }
    if (actionKey === "act_visit_market") {
        openModal("modal-market-shop");
        renderMarketShop();
        return;
    }
    if (actionKey === "act_library_shop") {
        openModal("modal-library-shop");
        renderLibraryShop();
        return;
    }
    if (actionKey === "act_leave_home") {
        const isFromWild = (player.currentLocation === "adventure");
        if (player.currentLocation === "home") {
            player.currentLocation = "adventure";
        } else {
            player.currentLocation = "home";
        }
        advanceTime(isFromWild ? (15 / 60) : (5 / 60));
        renderCurrentLocationStage();
        return;
    }

    // 2. Kiểm tra thể lực cho các hành động tại chỗ
    const staminaCost = actConfig ? actConfig.staminaCost : 15;
    if (player.rankIdx < 5 && player.stamina < staminaCost) {
        alert("Thể lực không đủ! Hãy nuốt Đan Dược, Nghỉ Ngơi hoặc Ngủ Qua Ngày.");
        if (window.soundEngine) window.soundEngine.playError();
        return;
    }

    // Tiêu hao thể lực
    if (player.rankIdx < 5) {
        player.stamina = Math.max(0, player.stamina - staminaCost);
    }

    // Trôi thời gian
    const hoursCost = actConfig ? actConfig.timeCost : 2;
    advanceTime(hoursCost);

    // 3. Xử lý logic hành động cụ thể
    let title = "Kết Quả Hành Động";
    let desc = "";
    let lootHtml = "";

    const locDensity = LOCATIONS_CONFIG[player.currentLocation] ? LOCATIONS_CONFIG[player.currentLocation].density : 1.0;

    switch (actionKey) {
        case "act_meditate": {
            if (window.soundEngine) window.soundEngine.playMeditate();
            // Cân chỉnh tốc độ tu luyện chân thực: 2 giờ đả tọa cho 6-10 tu vi
            const baseGain = 7 + (player.comprehension * 0.2);
            const aptRate = player.aptitude.rate;
            const physRate = 1.0 + (player.specialPhysique.rateBoost || 0);
            const canCotRate = player.canCot / 100;
            const expGained = Math.max(1, Math.round(baseGain * aptRate * physRate * canCotRate * locDensity));

            player.exp += expGained;
            // Hồi phục Chân Nguyên (x5)
            player.mp = Math.min(player.maxMp, player.mp + 25);

            checkExpThreshold();

            title = "🧘 Tọa Thiền Thổ Nạp Hoàn Tất";
            desc = `Ngươi ngồi xếp bằng đả tọa trong ${hoursCost} giờ, vận chuyển chân khí một vòng chu thiên. Linh khí đất trời cuồn cuộn đổ vào không khiếu ôn dưỡng đan điền.`;
            lootHtml = `
                <div class="loot-tag text-jade">+${expGained} Tu Vi</div>
                <div class="loot-tag text-cyan">+25 Chân Nguyên Hồi Phục</div>
                <div class="loot-tag text-orange">-${staminaCost} Thể Lực (${hoursCost} Giờ)</div>
            `;
            addLog(`Tọa thiền thổ nạp thu hoạch +${expGained} Tu Vi, hồi phục 25 Chân Nguyên.`, "success");
            break;
        }

        case "act_rest_tea": {
            player.stamina = Math.min(player.maxStamina, player.stamina + 25);
            player.hp = Math.min(player.maxHp, player.hp + 15);
            title = "🍵 Thưởng Trà Ngộ Đạo";
            desc = "Nhấp một ngụm linh trà thơm ngát, hơi ấm lan tỏa khắp lục phủ ngũ tạng, xua tan hết nỗi mệt nhọc trên con đường tu tiên đầy trắc trở.";
            lootHtml = `
                <div class="loot-tag text-jade">+25 Thể Lực Hồi Phục</div>
                <div class="loot-tag text-red">+15 Khí Huyết</div>
            `;
            addLog("Thưởng trà ngâm thơ, hồi phục 25 Thể Lực và 15 Khí Huyết.", "info");
            break;
        }

        case "act_hunt_beast": {
            // Săn bắn yêu thú
            const beasts = [
                { id: "thiet_bi_tru", name: "Thiết Bì Trư", power: 25, coreName: "Nội Đan Heo Sắt", sellPrice: 25 },
                { id: "doc_giac_lang", name: "Độc Giác Lang", power: 45, coreName: "Nội Đan Sói Một Sừng", sellPrice: 35 },
                { id: "huyet_anh_bao", name: "Huyết Ảnh Báo", power: 70, coreName: "Nội Đan Báo Huyết Sát", sellPrice: 55 },
                { id: "bang_suong_vien", name: "Băng Sương Cự Viên", power: 110, coreName: "Nội Đan Vượn Băng", sellPrice: 90 }
            ];
            const myPower = calculateTotalPower();
            const beast = beasts[Math.min(player.rankIdx, beasts.length - 1)];

            if (myPower >= beast.power * 0.75) {
                // Thắng trận
                player.beastsHunted += 1;
                player.systemPoints += 10;
                player.pendingMonsterLoot = beast;

                title = `🐺 Tiêu Diệt Thành Công ${beast.name}!`;
                desc = `Sau một hồi giao chiến kịch liệt, ngươi đã hạ gục ${beast.name}. Hãy chọn phương án xử lý chiến lợi phẩm:`;
                lootHtml = `
                    <div class="loot-tag text-gold">+10 Điểm Hệ Thống</div>
                    <div class="loot-tag text-jade">Chiến Thắng Yêu Thú</div>
                `;

                // Mở Modal Xử Lý Yêu Thú
                openMonsterLootModal(beast);
            } else {
                // Bại trận, bị thương
                player.hp = Math.max(10, player.hp - 60);
                title = `⚠️ Bị ${beast.name} Đả Thương!`;
                desc = `Sức chiến đấu của ${beast.name} quá hung hãn! Ngươi buộc phải chật vật đào tẩu và bị tổn hao nguyên khí!`;
                lootHtml = `<div class="loot-tag text-red">-60 Khí Huyết</div>`;
                addLog(`Giao chiến với ${beast.name} thất bại, may mắn trốn thoát nhưng hao tổn 60 Khí Huyết.`, "danger");
            }
            break;
        }

        case "act_gather_herbs": {
            const herbs = [
                { id: "thanh_linh_thao", name: "Thanh Linh Thảo" },
                { id: "nguyet_quang_hoa", name: "Nguyệt Quang Hoa" },
                { id: "huyen_thiet_quang", name: "Huyền Thiết Quặng" },
                { id: "bang_tinh_thao", name: "Băng Tinh Thảo" }
            ];
            const found = herbs[Math.floor(Math.random() * herbs.length)];
            const count = Math.floor(Math.random() * 3) + 1;
            addItemToInventory(found.id, count, found.name);

            title = `🌿 Thu Hái Linh Dược Thành Công`;
            desc = `Lần theo linh khí dao động bên vách đá, ngươi cẩn thận đào được ${count} cây ${found.name}.`;
            lootHtml = `<div class="loot-tag text-jade">+${count} ${found.name} (Bỏ vào túi trữ vật)</div>`;
            addLog(`Hái lượm thu được ${count} ${found.name}.`, "success");
            break;
        }

        case "act_explore_cave": {
            const roll = Math.random();
            if (roll > 0.6) {
                const stones = Math.floor(Math.random() * 40) + 20;
                player.stoneLow += stones;
                player.systemPoints += 15;
                title = `✨ Khám Phá Thạch Động Cổ`;
                desc = `Trong góc hang động tiền bối, ngươi phát hiện một hòm ngọc mục nát chứa linh thạch thượng cổ!`;
                lootHtml = `
                    <div class="loot-tag text-gold">+${stones} Linh Thạch Hạ</div>
                    <div class="loot-tag text-purple">+15 Điểm Hệ Thống</div>
                `;
                addLog(`Thám hiểm thạch động nhặt được ${stones} Linh Thạch Hạ và 15 Điểm Hệ Thống!`, "success");
            } else {
                title = `🕸️ Hang Động Trống Không`;
                desc = `Ngươi cẩn thận lục soát khắp hang đá nhưng chỉ thấy tro tàn và dấu vết dời đi từ ngàn năm trước.`;
                lootHtml = `<div class="loot-tag text-slate">Không có thu hoạch đặc biệt</div>`;
                addLog("Thám hiểm hang động không phát hiện cơ duyên nào.", "info");
            }
            break;
        }

        case "act_tournament_arena": {
            const oppName = "Cổ Nguyệt Xích Sơn";
            const myPower = calculateTotalPower();
            if (myPower >= 50) {
                player.systemPoints += 25;
                title = `🏆 Đắc Thắng Lôi Đài!`;
                desc = `Ngươi thi triển thân pháp xuất chúng, đánh bại đệ tử ${oppName} trước sự tán thưởng của toàn bộ trưởng lão gia tộc!`;
                lootHtml = `
                    <div class="loot-tag text-gold">+25 Điểm Hệ Thống</div>
                    <div class="loot-tag text-jade">Danh Vọng Sơn Trại Tăng Cao</div>
                `;
                addLog(`Đánh bại ${oppName} trên lôi đài, nhận +25 Điểm Hệ Thống.`, "success");
            } else {
                player.hp = Math.max(20, player.hp - 40);
                title = `⚔️ Thua Trận Trên Lôi Đài`;
                desc = `Thực lực đối phương quá áp đảo. Ngươi bị trúng một chiêu Nguyệt Nhận phải lui bước nhận thua.`;
                lootHtml = `<div class="loot-tag text-red">-40 Khí Huyết</div>`;
                addLog("Giao đấu lôi đài thất bại, cần bế quan khổ luyện thêm.", "warning");
            }
            break;
        }

        case "act_study_library": {
            // Tăng ngộ tính và điểm Đạo Cảnh
            const currentDao = player.mainDao || "quang";
            if (!player.daoLevels[currentDao]) {
                player.daoLevels[currentDao] = { exp: 0, level: 0 };
            }
            player.daoLevels[currentDao].exp += 25;
            checkDaoLevelUp(currentDao);

            title = `📚 Nghiên Cứu Điển Tịch Thượng Cổ`;
            desc = `Ngươi nghiền ngẫm những cuốn da dê cổ, cảm ngộ quy luật thiên địa, tích lũy kiến thức sâu sắc cho con đường tu chân.`;
            lootHtml = `
                <div class="loot-tag text-purple">+25 Điểm Đạo Cảnh (${currentDao.toUpperCase()})</div>
                <div class="loot-tag text-jade">Tâm Trí Thông Suốt</div>
            `;
            addLog(`Nghiên cứu điển tịch gia tăng 25 điểm Đạo Cảnh.`, "info");
            break;
        }

        default:
            title = "Hoàn Thành Hành Động";
            desc = "Ngươi đã hoàn tất hành động tu luyện.";
            lootHtml = `<div class="loot-tag text-jade">Thành công</div>`;
    }

    // Hiển thị khung Action Execution Screen
    showActionExecutionScreen(actionKey, title, desc, lootHtml);
    updateSidebarUI();
}

function showActionExecutionScreen(actionKey, title, desc, lootHtml) {
    const cardsGrid = document.getElementById("action-cards-grid");
    const execCard = document.getElementById("action-execution-card");
    if (cardsGrid) cardsGrid.classList.add("hidden");
    if (!execCard) return;

    execCard.classList.remove("hidden");

    // Ảnh minh họa lớn
    const visualBox = document.getElementById("action-visual-display");
    if (visualBox) {
        let artKey = actionKey;
        if (artKey === "act_library_shop") artKey = "act_study_library";
        const svgFn = (window.ArtEngine && window.ArtEngine.actionCards && window.ArtEngine.actionCards[artKey]) 
            ? window.ArtEngine.actionCards[artKey] 
            : (window.ArtEngine && window.ArtEngine.actionCards && window.ArtEngine.actionCards.act_meditate);
        visualBox.innerHTML = svgFn ? svgFn() : "";
    }

    const titleEl = document.getElementById("action-result-title");
    const descEl = document.getElementById("action-result-desc");
    const lootEl = document.getElementById("action-loot-summary");
    const choicesEl = document.getElementById("action-next-choices");

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (lootEl) lootEl.innerHTML = lootHtml;

    if (choicesEl) {
        choicesEl.innerHTML = `
            <button class="btn-primary" id="btn-exec-repeat">⚡ Thực Hiện Lại Hành Động Này</button>
            <button class="btn-secondary" id="btn-exec-back">↩️ Trở Lại Danh Sách Hành Động</button>
        `;

        document.getElementById("btn-exec-repeat").addEventListener("click", () => {
            const loc = LOCATIONS_CONFIG[player.currentLocation];
            const act = loc ? loc.actions.find(a => a.key === actionKey) : null;
            executeAction(actionKey, act);
        });

        document.getElementById("btn-exec-back").addEventListener("click", () => {
            renderCurrentLocationStage();
        });
    }
}

// ============================================================
// 8. ĐỘT PHÁ CẢNH GIỚI & CĂN CỐT
// ============================================================

function checkExpThreshold() {
    if (player.exp >= player.maxExp) {
        if (player.subStageIdx < 4) {
            // Tự động lên tiểu cảnh giới (Sơ Giai -> Trung Giai -> Cao Giai -> Đỉnh Phong -> Viên Mãn)
            player.exp -= player.maxExp;
            player.subStageIdx += 1;
            recalcMaxExp();
            const subName = SUB_STAGES[player.subStageIdx].name;
            addLog(`Chúc mừng! Ngươi đã tiến cấp lên ${RANKS[player.rankIdx].name} • ${subName}!`, "success");
            if (window.soundEngine) window.soundEngine.playSuccess();
        } else if (player.subStageIdx === 4 && !player.isDaiVienMan) {
            // Đã đạt Viên Mãn, cho phép tiếp tục tích lũy exp để lên Đại Viên Mãn
            if (player.exp >= player.maxExp * 1.5) {
                player.exp = player.maxExp * 1.5;
                player.isDaiVienMan = true;
                addLog(`✨ Linh quang ngút trời! Ngươi đã tu luyện tới cảnh giới ĐẠI VIÊN MÃN! Tỉ lệ đột phá tăng vọt lên 90%!`, "special");
                if (window.soundEngine) window.soundEngine.playSuccess();
            }
        }
    }
}

function recalcMaxExp() {
    const curRank = RANKS[player.rankIdx] || RANKS[0];
    const curSub = SUB_STAGES[player.subStageIdx] || SUB_STAGES[0];
    // Thời gian tu luyện tăng dần: x1.1 cho Chuyển 1, x1.2 cho Chuyển 2, x1.4 cho Chuyển 3, x1.7 cho Chuyển 4, x2.0 cho Chuyển 5
    player.maxExp = Math.round(curRank.baseExp * curSub.multiplier * curRank.expStepMult);
}

function attemptBreakthrough() {
    if (player.subStageIdx < 4) {
        alert("Chưa đạt cảnh giới Viên Mãn để tiến hành đột phá!");
        return;
    }

    // Tỉ lệ thành công
    let baseRate = player.isDaiVienMan ? 90 : 65;
    // Căn cốt ảnh hưởng trực tiếp đến tỉ lệ đột phá
    let finalRate = Math.round(baseRate * (player.canCot / 100));

    const roll = Math.random() * 100;
    if (roll <= finalRate) {
        // ĐỘT PHÁ THÀNH CÔNG!
        if (player.rankIdx < RANKS.length - 1) {
            player.rankIdx += 1;
            player.subStageIdx = 0;
            player.isDaiVienMan = false;
            player.exp = 0;
            
            const nextRank = RANKS[player.rankIdx];
            player.maxHp = nextRank.maxHp;
            player.hp = player.maxHp;
            player.maxMp = nextRank.maxMp;
            player.mp = player.maxMp;
            player.maxAge = nextRank.maxAge;
            player.power = nextRank.power;
            
            recalcMaxExp();
            
            if (window.soundEngine) window.soundEngine.playBreakthrough();
            addLog(`🎉 ĐỘT PHÁ THÀNH CÔNG! Ngươi đã phá vỡ xiềng xích, bước vào cảnh giới ${nextRank.name}! Chân nguyên biến hóa thành ${nextRank.seaName}!`, "special");
            alert(`🎉 Chúc mừng! Ngươi đã đột phá thành công lên ${nextRank.name}!`);
        } else {
            alert("Ngươi đã đạt cảnh giới tối cao trong phiên bản hiện tại!");
        }
    } else {
        // ĐỘT PHÁ THẤT BẠI - TỔN THƯƠNG CĂN CỐT!
        const canCotLost = Math.floor(Math.random() * 15) + 10;
        player.canCot = Math.max(10, player.canCot - canCotLost);
        player.hp = Math.max(10, Math.round(player.hp * 0.5));
        
        if (window.soundEngine) window.soundEngine.playError();
        addLog(`💥 Đột phá thất bại! Nghịch chuyển kinh mạch, Căn Cốt bị tổn thương giảm -${canCotLost}%! (Căn cốt hiện tại: ${player.canCot}%). Tốc độ tu luyện và tỉ lệ đột phá sau này bị suy giảm!`, "danger");
        alert(`💥 Đột phá thất bại! Căn Cốt tổn thương -${canCotLost}%. Hãy dùng Tẩy Tủy Đan hoặc công pháp Tẩy Tủy Quyết để chữa lành!`);
    }

    updateSidebarUI();
}

// ============================================================
// 9. THIẾT LẬP LỊCH TU LUYỆN (MODAL CULTIVATE SCHEDULE)
// ============================================================

function updateScheduleSummary() {
    const days = parseInt(document.getElementById("sched-days").value, 10);
    const hours = parseInt(document.getElementById("sched-hours").value, 10);

    const elDaysVal = document.getElementById("sched-days-val");
    const elHoursVal = document.getElementById("sched-hours-val");
    if (elDaysVal) elDaysVal.textContent = `${days} Ngày`;
    if (elHoursVal) elHoursVal.textContent = `${hours} Giờ / ngày`;

    const locDensity = LOCATIONS_CONFIG[player.currentLocation] ? LOCATIONS_CONFIG[player.currentLocation].density : 1.0;
    // Mỗi ngày 8 giờ tu luyện cho khoảng 28 tu vi
    const baseGainPerDay = (28 * (hours / 8));
    const aptRate = player.aptitude.rate;
    const physRate = 1.0 + (player.specialPhysique.rateBoost || 0);
    const canCotRate = player.canCot / 100;
    const totalExpEst = Math.max(1, Math.round(baseGainPerDay * aptRate * physRate * canCotRate * locDensity * days));

    const elExpEst = document.getElementById("sched-exp-est");
    const elTimeCost = document.getElementById("sched-time-cost");
    const elLocName = document.getElementById("sched-loc-name");
    if (elExpEst) elExpEst.textContent = `+${totalExpEst} Tu Vi`;
    if (elTimeCost) elTimeCost.textContent = `${days} Ngày 0 Giờ`;
    if (elLocName) elLocName.textContent = `${LOCATIONS_CONFIG[player.currentLocation].title} (x${locDensity.toFixed(1)})`;
}

function executeCultivateSchedule() {
    const days = parseInt(document.getElementById("sched-days").value, 10);
    const hours = parseInt(document.getElementById("sched-hours").value, 10);

    const locDensity = LOCATIONS_CONFIG[player.currentLocation] ? LOCATIONS_CONFIG[player.currentLocation].density : 1.0;
    const baseGainPerDay = (28 * (hours / 8));
    const aptRate = player.aptitude.rate;
    const physRate = 1.0 + (player.specialPhysique.rateBoost || 0);
    const canCotRate = player.canCot / 100;
    const totalExp = Math.max(1, Math.round(baseGainPerDay * aptRate * physRate * canCotRate * locDensity * days));

    player.exp += totalExp;
    checkExpThreshold();

    // Tiến hành trôi thời gian theo số ngày
    advanceTime(0, days);

    closeModal("modal-cultivate-schedule");

    if (window.soundEngine) window.soundEngine.playMeditate();
    addLog(`Bế quan tu luyện ${days} ngày (${hours} giờ/ngày) hoàn tất, thu hoạch được +${totalExp} Tu Vi!`, "success");
    alert(`🧘 Bế quan hoàn tất! Thu hoạch +${totalExp} Tu Vi trong ${days} ngày.`);
    updateSidebarUI();
}

// ============================================================
// 10. THIÊN MỆNH HỆ THỐNG & 9 SUBTABS
// ============================================================

function setupSystemSubtabs() {
    const tabBtns = document.querySelectorAll(".sys-tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetPaneId = btn.getAttribute("data-systab");
            switchToSystemTab(targetPaneId);
        });
    });
}

function switchToSystemTab(targetPaneId) {
    document.querySelectorAll(".sys-tab-btn").forEach(b => {
        if (b.getAttribute("data-systab") === targetPaneId) {
            b.classList.add("active");
        } else {
            b.classList.remove("active");
        }
    });

    document.querySelectorAll(".systab-pane").forEach(pane => {
        pane.classList.remove("active");
    });
    const targetPane = document.getElementById(targetPaneId);
    if (targetPane) targetPane.classList.add("active");

    // Kích hoạt render nội dung tương ứng
    if (targetPaneId === "systab-checkin") renderCheckinPane();
    if (targetPaneId === "systab-aperture") renderAperturePane();
    if (targetPaneId === "systab-recipes") renderRecipesPane();
    if (targetPaneId === "systab-techniques") renderTechniquesSystemPane();
    if (targetPaneId === "systab-daos") renderDaosPane();
    if (targetPaneId === "systab-stats") renderStatsAllocationPane();
    if (targetPaneId === "systab-shop") renderShopPane();
    if (targetPaneId === "systab-quests") renderQuestsPane();
}

// Subtab 1: Thất Nhật Điểm Danh
function renderCheckinPane() {
    const grid = document.getElementById("checkin-grid");
    if (!grid) return;
    grid.innerHTML = "";

    CHECKIN_REWARDS.forEach((rw, idx) => {
        const dayNum = idx + 1;
        const isPast = dayNum < player.checkinDay;
        const isCurrent = dayNum === player.checkinDay;
        const card = document.createElement("div");
        card.className = `checkin-day-card ${isCurrent ? 'current' : ''} ${isPast ? 'claimed' : ''}`;
        card.innerHTML = `
            <div class="chk-day-title">Ngày ${dayNum}</div>
            <div class="chk-icon">${rw.icon}</div>
            <div class="chk-name">${rw.name}</div>
            <div class="chk-status">${isPast ? '✓ Đã nhận' : (isCurrent ? (player.checkinClaimedToday ? '✓ Đã nhận hôm nay' : '🌟 Hôm nay') : 'Chưa mở')}</div>
        `;
        grid.appendChild(card);
    });

    const btnClaim = document.getElementById("btn-claim-checkin");
    if (btnClaim) {
        if (player.checkinClaimedToday) {
            btnClaim.disabled = true;
            btnClaim.textContent = "Hôm Nay Đã Nhận Quà Rồi";
        } else {
            btnClaim.disabled = false;
            btnClaim.textContent = `Nhận Quà Ngày ${player.checkinDay}`;
        }
    }
}

function claimDailyCheckin() {
    if (player.checkinClaimedToday) return;
    const rw = CHECKIN_REWARDS[player.checkinDay - 1];
    if (rw && rw.apply) {
        rw.apply();
        player.checkinClaimedToday = true;
        player.checkinDay = (player.checkinDay % 7) + 1;
        if (window.soundEngine) window.soundEngine.playSuccess();
        addLog(`Điểm danh nhận thành công: ${rw.name}!`, "special");
        alert(`Nhận quà điểm danh thành công: ${rw.name}!`);
        renderCheckinPane();
        updateSidebarUI();
    }
}

// Subtab 2: Dò Xét Không Khiếu & Linh Căn
function renderAperturePane() {
    const box = document.getElementById("aperture-visual-container");
    if (box && window.ArtEngine && window.ArtEngine.renderApertureVisual) {
        box.innerHTML = window.ArtEngine.renderApertureVisual(player);
    }

    const detailsGrid = document.getElementById("aperture-details-grid");
    if (detailsGrid) {
        const curRank = RANKS[player.rankIdx] || RANKS[0];
        const curSub = SUB_STAGES[player.subStageIdx] || SUB_STAGES[0];
        const stageStr = player.isDaiVienMan ? "Đại Viên Mãn" : curSub.name;
        const expPct = Math.min(100, Math.max(0, Math.round((player.exp / (player.maxExp || 385)) * 100)));

        const linhCanMult = (player.linhCan && player.linhCan.bonusCultivate > 0)
            ? `x${(1 + player.linhCan.bonusCultivate).toFixed(2)} (+${Math.round(player.linhCan.bonusCultivate * 100)}%)`
            : "x1.00";

        const linhCanInfo = player.linhCan ? `
            <p class="text-gold" style="font-weight:700;">${player.linhCan.name} (${player.linhCan.tier})</p>
            <small>Ngũ Hành: <strong>${player.linhCan.elements.join(", ") || "Vô"}</strong> • Tốc độ tu công pháp: <strong class="text-gold">${linhCanMult}</strong></small>
        ` : `
            <p class="text-slate">Chưa Thức Tỉnh Linh Căn</p>
            <small>Có thể dùng Tẩy Linh Đan tại Cửa Hàng Hệ Thống để trắc định</small>
        `;

        let modeText = "⚡ Kiêm Tu (Cổ Trùng + Công Pháp)";
        if (player.cultivateMode === "gu") modeText = "🐛 Thuần Tu Cổ Sư (Chuyên Nhất Cổ Đạo)";
        if (player.cultivateMode === "technique") modeText = "📜 Thuần Tu Tiên Đạo (Chuyên Nhất Công Pháp)";

        const mainTech = player.techniquesLearned.find(t => t.id === player.mainTechId) || player.techniquesLearned[0];
        const mainTechName = mainTech ? `${mainTech.name} (${mainTech.masteryStage || 'Nhập Môn'})` : "Trường Xuân Công (Nhập Môn)";
        const starterGu = player.guInventory[0];
        const starterGuName = starterGu ? `${starterGu.name} (${starterGu.rank} Chuyển • ${starterGu.path})` : "Chưa Thu Phục";

        detailsGrid.innerHTML = `
            <!-- THẺ HỒ SƠ NHÂN VẬT & ĐẠO CƠ TOÀN DIỆN -->
            <div class="aperture-stat-card" style="grid-column: 1 / -1; background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95)); border: 1px solid #eab308; padding: 14px 18px; border-radius: 10px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; border-bottom:1px solid #334155; padding-bottom:8px; margin-bottom:10px;">
                    <div>
                        <span style="font-size:18px; font-weight:800; color:#fbbf24;">👤 ${player.name}</span>
                        <span style="font-size:13px; color:#94a3b8; margin-left:10px;">Thọ nguyên: ${player.age} / ${player.maxAge} tuổi</span>
                    </div>
                    <div>
                        <span style="background: rgba(56, 189, 248, 0.2); color:#38bdf8; padding: 4px 10px; border-radius: 6px; font-weight:700; font-size:13px; border:1px solid #0284c7;">
                            Cảnh giới: ${curRank.name} • ${stageStr} (${expPct}%)
                        </span>
                    </div>
                </div>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; font-size: 13px;">
                    <div><strong>📜 Công Pháp Chính:</strong> <span class="text-gold">${mainTechName}</span></div>
                    <div><strong>⭐ Lưu Phái Chính:</strong> <span class="text-cyan">${player.mainDao || 'Mộc Đạo'}</span> <small style="color:#94a3b8;">(Theo công pháp)</small></div>
                    <div><strong>🐛 Bản Mệnh Cổ:</strong> <span style="color:#34d399;">${starterGuName}</span></div>
                    <div><strong>⚔️ Chiến Lực Tổng Hợp:</strong> <strong class="text-gold">${player.power || 30} Điểm</strong></div>
                </div>
            </div>

            <div class="aperture-stat-card">
                <h4>Vách Không Khiếu</h4>
                <p>${curRank.wallName}</p>
                <small>Bền bỉ, ngưng tụ tự nhiên theo cảnh giới</small>
            </div>
            <div class="aperture-stat-card">
                <h4>Tư Chất Không Khiếu</h4>
                <p style="color:${player.aptitude.color}; font-weight:700;">${player.aptitude.name}</p>
                <small>Dung lượng: ${Math.round((player.aptitude.seaPct || 0.45) * 100)}% • Tốc độ tu vi: x${player.aptitude.rate}</small>
            </div>
            <div class="aperture-stat-card">
                <h4>Biển Chân Nguyên (${curRank.seaName})</h4>
                <p class="text-jade">${player.mp} / ${player.maxMp} Chân Nguyên</p>
                <small>Dung lượng hiện tại: ${Math.round((player.mp/player.maxMp)*100)}%</small>
            </div>
            <div class="aperture-stat-card">
                <h4>Thể Chất Đạo Thể</h4>
                <p class="text-gold">${player.specialPhysique.name}</p>
                <small>${player.specialPhysique.desc}</small>
            </div>
            <div class="aperture-stat-card">
                <h4>Linh Căn Tiên Đạo</h4>
                ${linhCanInfo}
            </div>
            <div class="aperture-stat-card">
                <h4>Định Hướng Tu Luyện</h4>
                <p class="text-cyan">${modeText}</p>
                <small>Quyết định phương thức phối hợp sức mạnh chiến đấu</small>
            </div>
            <div class="aperture-stat-card" style="grid-column: 1 / -1;">
                <h4>Cổ Trùng Đang Ôn Dưỡng (${player.guInventory.length} Con)</h4>
                <p class="text-cyan">${player.guInventory.map(g => `${g.name} (${g.rank} Chuyển • ${g.type || 'Hỗ Trợ'})`).join(", ") || "Chưa có cổ trùng nào trong không khiếu"}</p>
            </div>
        `;
    }
}

// Subtab 3: Cổ Phương & Hợp Luyện (194 Cổ trùng Cổ Chân Nhân)
function renderRecipesPane() {
    const grid = document.getElementById("recipes-catalog-grid");
    if (!grid || !window.GU_DATABASE) return;

    const rankFilter = document.getElementById("recipe-rank-filter").value;
    const searchVal = document.getElementById("recipe-search-input").value.toLowerCase().trim();

    grid.innerHTML = "";

    const filtered = window.GU_DATABASE.filter(g => {
        if (rankFilter !== "all" && g.rank.toString() !== rankFilter) return false;
        if (searchVal && !g.name.toLowerCase().includes(searchVal) && !g.path.toLowerCase().includes(searchVal)) return false;
        return true;
    });

    filtered.slice(0, 40).forEach(gu => {
        const card = document.createElement("div");
        card.className = "recipe-item-card";

        let matsHtml = "";
        if (gu.recipe && gu.recipe.materials) {
            matsHtml = gu.recipe.materials.map(m => `<li>${m.name}</li>`).join("");
        } else {
            matsHtml = `<li>Linh Thạch x30</li><li>Nguyên Liệu ${gu.path}</li>`;
        }

        const successRate = gu.recipe && gu.recipe.successRate ? gu.recipe.successRate : 80;

        card.innerHTML = `
            <div class="recipe-card-header">
                <strong>${gu.name}</strong>
                <span class="recipe-rank-badge">${gu.rank} Chuyển • ${gu.path}</span>
            </div>
            <p class="recipe-desc">${gu.desc}</p>
            <div class="recipe-requirements">
                <strong>Nguyên liệu phối hợp:</strong>
                <ul>${matsHtml}</ul>
                <div class="recipe-rate">Tỷ lệ thành công: <strong class="text-gold">${successRate}%</strong></div>
            </div>
            <button class="btn-primary btn-refine-gu" data-guid="${gu.id}">⚡ Bắt Đầu Hợp Luyện</button>
        `;

        card.querySelector(".btn-refine-gu").addEventListener("click", () => {
            refineGu(gu);
        });

        grid.appendChild(card);
    });
}

function refineGu(gu) {
    // 1. Xác định yêu cầu Linh Thạch
    let reqStone = 25;
    if (gu.recipe && gu.recipe.materials) {
        const curMat = gu.recipe.materials.find(m => m.type === "currency");
        if (curMat && curMat.count) reqStone = curMat.count;
    } else {
        reqStone = (gu.rank || 1) * 25;
    }

    if (player.stoneLow < reqStone) {
        alert(`⚠️ KHÔNG ĐỦ LINH THẠCH!\n\nHợp luyện ${gu.name} cần ít nhất ${reqStone} viên Linh Thạch Hạ Phẩm làm chất xúc tác ngưng tụ! Hiện có: ${player.stoneLow} viên.`);
        return;
    }

    // 2. Kiểm tra Chân Nguyên
    const reqMp = gu.mpCost || 20;
    if (player.mp < reqMp) {
        alert(`⚠️ KHÔNG ĐỦ CHÂN NGUYÊN!\n\nCần ${reqMp} điểm Chân Nguyên để thúc đẩy trận pháp luyện cổ. Hiện có: ${player.mp} điểm.`);
        return;
    }

    // 3. Kiểm tra Nguyên Liệu Lưu Phái / Dược Liệu trong Túi Trữ Vật
    const pathKeyword = (gu.path || "").toLowerCase().replace(" đạo", "");
    const matIndex = player.inventory.findIndex(i => {
        if (!i || i.count <= 0) return false;
        const iname = (i.name || "").toLowerCase();
        const iid = (i.id || "").toLowerCase();
        return iname.includes(pathKeyword) ||
               iid.includes(pathKeyword) ||
               (gu.path.includes("Mộc") && iname.includes("thảo")) ||
               (gu.path.includes("Kim") && (iname.includes("thiết") || iname.includes("quặng"))) ||
               (gu.path.includes("Thổ") && (iname.includes("thạch") || iname.includes("quặng"))) ||
               (gu.path.includes("Khí") && (iname.includes("khí") || iname.includes("tửu") || iname.includes("đan"))) ||
               (gu.path.includes("Quang") && iname.includes("nguyệt")) ||
               iid.startsWith("core_") || iid.startsWith("skin_") || iname.includes("nguyên liệu");
    });

    if (matIndex === -1) {
        alert(`⚠️ THIẾU NGUYÊN LIỆU HỢP LUYỆN!\n\nĐể hợp luyện "${gu.name}" (${gu.rank} Chuyển • ${gu.path}), đạo hữu bắt buộc phải có nguyên liệu ${gu.path} (hoặc dược thảo/khoáng thạch/yêu đan tương thích) trong Túi Trữ Vật!\n\n💡 Cách kiếm nguyên liệu:\n- Xuất ngoại đến Bách Thú Lĩnh: Săn bắt Yêu Thú hoặc Hái Lượm Linh Dược\n- Đến Phường Thị: Mua khoáng thạch, linh thảo tại Tiệm Thuốc.`);
        return;
    }

    const matchedItem = player.inventory[matIndex];

    // Tiêu hao tài nguyên
    player.stoneLow -= reqStone;
    player.mp -= reqMp;
    matchedItem.count -= 1;
    if (matchedItem.count <= 0) {
        player.inventory.splice(matIndex, 1);
    }

    const baseRate = gu.recipe && gu.recipe.successRate ? gu.recipe.successRate : 75;
    const bonusRate = Math.min(20, Math.floor(player.spiritPower / 2));
    const finalRate = Math.min(95, baseRate + bonusRate);

    const roll = Math.random() * 100;
    if (roll <= finalRate) {
        // Hợp luyện thành công
        const newGu = {
            id: gu.id,
            name: gu.name,
            rank: gu.rank,
            path: gu.path,
            type: gu.type || "Hỗ Trợ",
            food: gu.food || "Các loại danh tửu, rượu ngon thế gian",
            power: gu.power || 30,
            mpCost: gu.mpCost || 20
        };
        player.guInventory.push(newGu);
        player.systemPoints += 15;
        safePlaySound("playSuccess");
        addLog(`🎉 Hợp luyện thành công! Ngươi tiêu hao 1 ${matchedItem.name} và ${reqStone} Linh Thạch, luyện xuất: ${gu.name} (${gu.rank} Chuyển)!`, "special");
        alert(`🎉 Hợp luyện thành công!\n\nĐã tiêu hao 1 ${matchedItem.name} & ${reqStone} Linh Thạch.\nNhận được Cổ Trùng: ${gu.name} (${gu.rank} Chuyển • ${gu.path}) vào Không Khiếu!`);
    } else {
        // Thất bại
        safePlaySound("playError");
        addLog(`💥 Lò luyện nổ tung! Hợp luyện ${gu.name} thất bại, tiêu hao 1 ${matchedItem.name} và ${reqStone} Linh Thạch!`, "danger");
        alert(`💥 Hợp luyện thất bại!\n\nLò luyện chấn động nổ tung, tiêu hao 1 ${matchedItem.name} và ${reqStone} Linh Thạch làm tro bụi.`);
    }

    updateSidebarUI();
    renderAperturePane();
}

// Subtab 4: Công Pháp Thượng Thừa (Kinh Điển Hàn Lập Trong Tab Hệ Thống)
function renderTechniquesSystemPane() {
    const grid = document.getElementById("sys-tech-list-grid");
    if (!grid || !window.TECHNIQUES_DATABASE) return;

    grid.innerHTML = "";

    window.TECHNIQUES_DATABASE.forEach(tech => {
        const learned = player.techniquesLearned.find(t => t.id === tech.id);
        const card = document.createElement("div");
        card.className = `tech-card-item ${learned ? 'learned' : ''}`;

        let stagesHtml = "";
        tech.masteryStages.forEach(st => {
            const isCur = learned && learned.masteryStage === st.stage;
            stagesHtml += `
                <div class="tech-stage-step ${isCur ? 'active-step' : ''}">
                    <strong>${st.stage}</strong>: ${st.buffText}
                </div>
            `;
        });

        const hasLinhCan = !!player.linhCan;
        const isGuOnly = player.cultivateMode === "gu";
        let reasonCantLearn = "";
        if (isGuOnly) reasonCantLearn = "🔒 Thuần Tu Cổ Sư";
        else if (!hasLinhCan) reasonCantLearn = "🔒 Cần Có Linh Căn";
        else if (player.comprehension < tech.reqComprehension) reasonCantLearn = "🔒 Thiếu Ngộ Tính";
        else if ((player.rankIdx + 1) < tech.reqRank) reasonCantLearn = "🔒 Cảnh Giới Chưa Đủ";

        const canLearn = !learned && hasLinhCan && !isGuOnly && player.comprehension >= tech.reqComprehension && (player.rankIdx + 1) >= tech.reqRank;
        const isMainTech = (player.mainTechId === tech.id);

        card.innerHTML = `
            <div class="tech-card-header">
                <div>
                    <h4>${tech.name} ${isMainTech ? '<span style="background:#fbbf24; color:#111; font-size:10px; padding:2px 6px; border-radius:4px; margin-left:6px; font-weight:bold;">⭐ CÔNG PHÁP CHÍNH</span>' : ''}</h4>
                    <span class="tech-rank-badge">${tech.rank} Chuyển • ${tech.dao}</span>
                </div>
                <span class="tech-status-tag">${learned ? `Đạt: ${learned.masteryStage}` : 'Chưa Lĩnh Ngộ'}</span>
            </div>
            <p class="tech-desc">${tech.desc}</p>
            <div class="tech-reqs-line">
                <span>Yêu Cầu Tu Vi: <strong>${tech.reqRealm}</strong></span>
                <span>Ngộ Tính Cần: <strong>${tech.reqComprehension}</strong></span>
            </div>
            <div class="tech-stages-list">
                ${stagesHtml}
            </div>
            <div class="tech-action-footer">
                ${learned ? `
                    <div class="tech-mastery-progress">
                        <small>Độ thành thục: ${learned.masteryExp} điểm (Linh Căn: x${player.linhCan ? (1 + (player.linhCan.bonusCultivate || 0)).toFixed(2) : '1.00'})</small>
                    </div>
                    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
                        <button class="btn-primary btn-practice-tech-sys" data-techid="${tech.id}" style="flex:1;">🧘 Bế Quan Diễn Luyện (-20 Thể Lực)</button>
                        ${!isMainTech ? `<button class="btn-subtle btn-set-main-tech" data-techid="${tech.id}" style="border:1px solid #d4af37; color:#fbbf24; background:rgba(212,175,55,0.15); padding:6px 12px; font-size:12px;">⚡ Vận Hành Làm Công Pháp Chính</button>` : ''}
                    </div>
                ` : `
                    <button class="btn-primary btn-learn-tech-sys" data-techid="${tech.id}" ${canLearn ? '' : 'disabled'}>
                        ${canLearn ? '📜 Lĩnh Ngộ Công Pháp' : reasonCantLearn}
                    </button>
                `}
            </div>
        `;

        if (learned) {
            card.querySelector(".btn-practice-tech-sys").addEventListener("click", () => {
                practiceTechnique(tech, learned);
                renderTechniquesSystemPane();
            });
            const btnSetMain = card.querySelector(".btn-set-main-tech");
            if (btnSetMain) {
                btnSetMain.addEventListener("click", () => {
                    setMainTechnique(tech.id);
                });
            }
        } else if (canLearn) {
            card.querySelector(".btn-learn-tech-sys").addEventListener("click", () => {
                learnTechnique(tech);
                renderTechniquesSystemPane();
            });
        }

        grid.appendChild(card);
    });
}

// Subtab 5: 30 Lưu Phái Đạo Cảnh & Sát Chiêu
function renderDaosPane() {
    const summary = document.getElementById("active-daos-summary");
    const grid = document.getElementById("daos-catalog-grid");
    if (!summary || !grid) return;

    const curMainTech = window.TECHNIQUES_DATABASE ? window.TECHNIQUES_DATABASE.find(t => t.id === player.mainTechId) : null;
    const curMainTechName = curMainTech ? curMainTech.name : "Trường Xuân Công";

    summary.innerHTML = `
        <div style="background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div>
                    <span style="color:#888; font-size:13px;">⭐ Lưu Phái Chính Bản Mệnh:</span>
                    <strong style="color:#fbbf24; font-size:16px; margin-left:6px;">${player.mainDao || 'Mộc Đạo'}</strong>
                </div>
                <div style="font-size:12px; color:#aaa;">
                    (Định hình tự động bởi Công Pháp Chính: <span style="color:#6ee7b7; font-weight:600;">${curMainTechName}</span>)
                </div>
            </div>
            <div style="margin-top:8px; font-size:12px; color:#bbb;">
                💡 <em>Quy tắc Đạo giới:</em> Lưu phái chính gắn liền với công pháp đạo cơ đang vận hành. Để đổi lưu phái chính, hãy vào tab <strong>Công Pháp Thượng Thừa</strong> và vận hành công pháp thuộc lưu phái tương ứng.
            </div>
        </div>
        <div style="font-size:13px; color:#ddd; margin-bottom:8px;">
            Lưu Phái Đang Kiêm Tu: <strong>${(player.activeDaos || []).map(d => {
                const found = DAO_LIST.find(x => x.id === d);
                const lvl = player.daoLevels[d] ? player.daoLevels[d].level : 0;
                return `${found ? found.name : d} (${DAO_LEVELS[lvl].name})`;
            }).join(", ") || 'Chưa kiêm tu'}</strong>
        </div>
    `;

    grid.innerHTML = "";

    DAO_LIST.forEach(dao => {
        const isMainDao = (dao.id === (player.mainDao || "Mộc Đạo"));
        const isActive = player.activeDaos.includes(dao.id) || isMainDao;
        const curExp = player.daoLevels[dao.id] ? player.daoLevels[dao.id].exp : 0;
        const curLvl = player.daoLevels[dao.id] ? player.daoLevels[dao.id].level : 0;
        const lvlInfo = DAO_LEVELS[curLvl];
        const nextLvlInfo = DAO_LEVELS[curLvl + 1];

        const card = document.createElement("div");
        card.className = `dao-card ${isMainDao ? 'main-active-dao' : (isActive ? 'active-dao' : '')}`;
        if (isMainDao) {
            card.style.borderColor = "#fbbf24";
            card.style.boxShadow = "0 0 10px rgba(251, 191, 36, 0.2)";
        }

        const isGrandmaster = curLvl >= 3;

        card.innerHTML = `
            <div class="dao-card-header">
                <div>
                    <strong>${dao.name}</strong>
                    ${isMainDao ? `<span style="background:#fbbf24; color:#111; font-size:10px; padding:2px 6px; border-radius:4px; margin-left:6px; font-weight:bold;">⭐ LƯU PHÁI CHÍNH</span>` : ''}
                </div>
                <span class="dao-level-badge">${lvlInfo.name}</span>
            </div>
            <p class="dao-desc">${dao.desc}</p>
            <div class="dao-progress-box">
                <small>Điểm Đạo Cảnh: ${curExp} ${nextLvlInfo ? `/ ${nextLvlInfo.reqExp}` : '(Tối đa)'}</small>
                <div class="bar-track-outer mini">
                    <div class="bar-fill-inner exp-fill" style="width: ${nextLvlInfo ? Math.min(100, (curExp / nextLvlInfo.reqExp) * 100) : 100}%"></div>
                </div>
            </div>
            <div class="dao-killer-move ${isGrandmaster ? 'unlocked' : 'locked'}">
                <strong>Sát Chiêu Đạo Cảnh:</strong>
                <span>${dao.killerMove}</span>
                <small>${isGrandmaster ? '⚡ ĐÃ KHAI SÁNG & THI TRIỂN ĐƯỢC' : '🔒 Cần đạt Đại Tông Sư'}</small>
            </div>
        `;

        grid.appendChild(card);
    });
}

function checkDaoLevelUp(daoId) {
    if (!player.daoLevels[daoId]) return;
    const curExp = player.daoLevels[daoId].exp;
    const curLvl = player.daoLevels[daoId].level;
    const nextLvl = DAO_LEVELS[curLvl + 1];
    if (nextLvl && curExp >= nextLvl.reqExp) {
        player.daoLevels[daoId].level += 1;
        const daoObj = DAO_LIST.find(d => d.id === daoId);
        const name = daoObj ? daoObj.name : daoId;
        addLog(`🌟 Chúc mừng! Cảnh giới ${name} đã đột phá lên cấp bậc ${nextLvl.name}!`, "special");
        if (nextLvl.level === 3) {
            addLog(`⚡ KỲ TÍCH: Ngươi đã trở thành ĐẠI TÔNG SƯ ${name}! Khai sáng thành công Sát Chiêu: "${daoObj.killerMove}"!`, "special");
        }
        if (window.soundEngine) window.soundEngine.playSuccess();
    }
}

// Subtab 6: Cộng Điểm Thuộc Tính
function renderStatsAllocationPane() {
    const grid = document.getElementById("sys-stat-grid");
    if (!grid) return;

    const stats = [
        { key: "comprehension", name: "Ngộ Tính", icon: "🧠", val: player.comprehension, cost: 10, add: 1, desc: "Tăng tốc độ lĩnh ngộ công pháp & cổ phương." },
        { key: "mentalSense", name: "Thần Thức", icon: "👁️", val: player.mentalSense, cost: 10, add: 1, desc: "Tăng khả năng dò xét cổ trùng & phòng ngự tâm thần." },
        { key: "luck", name: "Khí Vận", icon: "🍀", val: player.luck, cost: 10, add: 1, desc: "Tăng cơ duyên nhặt kỳ ngộ và tỷ lệ rơi bảo vật." },
        { key: "intelligence", name: "Trí Mưu", icon: "💡", val: player.intelligence, cost: 10, add: 1, desc: "Tăng hiệu quả mưu tính sách lược và bố trận." },
        { key: "spiritPower", name: "Tinh Thần Lực", icon: "🔮", val: player.spiritPower, cost: 10, add: 1, desc: "Tăng tỷ lệ hợp luyện cổ trùng thành công." },
        { key: "canCot", name: "Căn Cốt", icon: "🦴", val: `${player.canCot}%`, cost: 15, add: 2, isPct: true, desc: "Gia cố thiên tư đạo cơ, tăng tỉ lệ chuyển hóa tu vi và đột phá cảnh giới." },
        { key: "maxHp", name: "Khí Huyết Tối Đa", icon: "❤️", val: player.maxHp, cost: 10, add: 25, desc: "Tăng lượng sinh mệnh tối đa để chống chịu sát thương." },
        { key: "maxMp", name: "Chân Nguyên Tối Đa", icon: "💧", val: player.maxMp, cost: 10, add: 20, desc: "Mở rộng dung lượng chân nguyên trong không khiếu." },
        { key: "maxStamina", name: "Thể Lực Tối Đa", icon: "⚡", val: player.maxStamina, cost: 10, add: 15, desc: "Tăng giới hạn sức chịu đựng để làm nhiều việc hơn mỗi ngày." }
    ];

    grid.innerHTML = "";

    stats.forEach(st => {
        const card = document.createElement("div");
        card.className = "stat-alloc-card";
        card.innerHTML = `
            <div class="stat-alloc-head">
                <span class="icon">${st.icon}</span>
                <strong>${st.name}: ${st.val}</strong>
            </div>
            <p>${st.desc}</p>
            <button class="btn-primary btn-alloc-stat" data-stat="${st.key}">+${st.add}${st.isPct ? '%' : ''} (${st.cost} Điểm Hệ Thống)</button>
        `;

        card.querySelector(".btn-alloc-stat").addEventListener("click", () => {
            if (player.systemPoints < st.cost) {
                alert(`Không đủ Điểm Hệ Thống! Cần ${st.cost} Điểm.`);
                return;
            }
            if (st.key === "canCot" && player.canCot >= 100) {
                alert("Căn Cốt đã đạt mức hoàn mỹ 100%, không thể bồi đắp thêm!");
                return;
            }

            player.systemPoints -= st.cost;
            if (st.key === "canCot") {
                player.canCot = Math.min(100, player.canCot + st.add);
            } else if (st.key === "maxHp") {
                player.maxHp += st.add;
                player.hp += st.add;
            } else if (st.key === "maxMp") {
                player.maxMp += st.add;
                player.mp += st.add;
            } else if (st.key === "maxStamina") {
                player.maxStamina += st.add;
                player.stamina += st.add;
            } else {
                player[st.key] += st.add;
            }

            // Lưu game và cập nhật giao diện ngay lập tức
            saveGame();
            if (window.soundEngine) window.soundEngine.playSuccess();
            renderStatsAllocationPane();
            updateSidebarUI();
        });

        grid.appendChild(card);
    });
}

// Subtab 7: Cửa Hàng Hệ Thống Đa Dạng Mặt Hàng (15 Món)
function renderShopPane() {
    const grid = document.getElementById("sys-shop-grid");
    if (!grid) return;
    grid.innerHTML = "";

    SYSTEM_SHOP_ITEMS.forEach(it => {
        const card = document.createElement("div");
        card.className = "shop-item-card";
        card.innerHTML = `
            <h4>${it.name}</h4>
            <p>${it.desc}</p>
            <div class="shop-cost-line">Giá: <strong class="text-gold">${it.pts} Điểm</strong></div>
            <button class="btn-primary btn-buy-shop" data-itemid="${it.id}">Mua Ngay</button>
        `;

        card.querySelector(".btn-buy-shop").addEventListener("click", () => {
            if (player.systemPoints < it.pts) {
                alert("Không đủ Điểm Hệ Thống!");
                return;
            }
            player.systemPoints -= it.pts;

            if (it.type === "pill" && it.canCotRestore) {
                addItemToInventory("tay_tuy_dan", 1, "Tẩy Tủy Thần Đan", "pill_cancot", { canCotRestore: 100 });
                alert("🎉 Đã mua thành công Tẩy Tủy Thần Đan! Vật phẩm đã được chuyển vào Túi Trữ Vật. Hãy mở túi đồ khi cần hồi phục Căn Cốt.");
            } else if (it.type === "stamina") {
                const count = it.count || 5;
                addItemToInventory("bo_the_kim_dan", count, "Bổ Thể Kim Đan", "pill_stamina", { restore: 50 });
                alert(`🎉 Đã nhận ${count} viên Bổ Thể Kim Đan vào Túi Trữ Vật!`);
            } else if (it.type === "pill_exp") {
                addItemToInventory("ngung_khi_dan", 3, "Ngưng Khí Đan", "pill_exp", { expGain: 100 });
                alert("🎉 Đã nhận 3 viên Ngưng Khí Đan vào Túi Trữ Vật! Uống vào tăng +100 Tu Vi mỗi viên.");
            } else if (it.type === "age") {
                addItemToInventory("dinh_nhan_dan", 1, "Định Nhan Thần Đan", "pill_age", { ageAdd: 50 });
                alert("🎉 Đã nhận 1 viên Định Nhan Thần Đan vào Túi Trữ Vật! Dùng để kéo dài thêm +50 năm thọ nguyên.");
            } else if (it.type === "reroll_linhcan") {
                addItemToInventory("tay_linh_dan", 1, "Tẩy Linh Đan", "pill_reroll");
                alert("🎉 Đã nhận 1 viên Tẩy Linh Đan vào Túi Trữ Vật! Mở túi dùng khi muốn tẩy trừ linh căn để trắc định lại.");
            } else if (it.type === "scroll" && it.techId) {
                addItemToInventory("scroll_" + it.techId, 1, it.name, "scroll", { techId: it.techId });
                alert(`🎉 Đã mua và chuyển ${it.name} vào Túi Trữ Vật! Mở túi đồ bấm "Lĩnh Ngộ Công Pháp" để học.`);
            } else if (it.type === "recipe" && it.recipeId) {
                addItemToInventory("recipe_" + it.recipeId, 1, it.name, "recipe", { recipeId: it.recipeId });
                alert(`🎉 Đã mua và chuyển ${it.name} vào Túi Trữ Vật! Mở túi đồ bấm "Nghiên Cứu Cổ Phương" để học.`);
            } else if (it.type === "stone_high") {
                player.stoneHigh += (it.count || 10);
                player.stoneLow += (it.count || 10) * 1000;
                alert(`💎 Đã quy đổi ${it.count || 10} Linh Thạch Thượng Phẩm thành +10.000 Linh Thạch Hạ Phẩm dồi dào!`);
            } else if (it.type === "gu" && it.guId) {
                const guData = window.GU_DATABASE ? window.GU_DATABASE.find(g => g.id === it.guId) : null;
                if (guData) {
                    player.guInventory.push({
                        id: guData.id,
                        name: guData.name,
                        rank: guData.rank,
                        path: guData.path,
                        type: guData.type || "Hỗ Trợ",
                        power: guData.power || 50,
                        food: guData.food || "Các loại danh tửu, rượu ngon thế gian",
                        mpCost: guData.mpCost || 25
                    });
                    alert(`🎉 Đã thu nhận cổ trùng thượng cổ: ${guData.name} (${guData.rank} Chuyển • ${guData.path}) vào Không Khiếu!`);
                }
            }

            // Lưu game tức thì
            saveGame();
            safePlaySound("playCoins");
            updateSidebarUI();
            renderShopPane();
        });

        grid.appendChild(card);
    });
}

// Subtab 8: Nhiệm Vụ Hệ Thống
function renderQuestsPane() {
    const list = document.getElementById("sys-quests-list");
    if (!list) return;
    list.innerHTML = "";

    SYSTEM_QUESTS.forEach(q => {
        // Kiểm tra điều kiện tự động
        if (q.id === "quest_breakthrough_rank2" && player.rankIdx >= 1) q.isDone = true;
        if (q.id === "quest_hunt_beasts" && player.beastsHunted >= 5) q.isDone = true;

        const card = document.createElement("div");
        card.className = `quest-item-card ${q.isDone ? 'done' : ''}`;
        card.innerHTML = `
            <div class="quest-title-row">
                <strong>${q.title}</strong>
                <span class="quest-pts-tag">+${q.pts} Điểm</span>
            </div>
            <p class="quest-desc">${q.desc}</p>
            <div class="quest-req-line">Mục tiêu: <em>${q.req}</em></div>
            <div class="quest-status-row">
                <span>Phần thưởng: ${q.rewardText}</span>
                ${q.isClaimed ? '<span class="text-slate">✓ Đã nhận</span>' : (q.isDone ? `<button class="btn-primary btn-claim-quest" data-qid="${q.id}">Nhận Thưởng</button>` : '<span class="text-orange">Đang tiến hành</span>')}
            </div>
        `;

        if (q.isDone && !q.isClaimed) {
            card.querySelector(".btn-claim-quest").addEventListener("click", () => {
                q.isClaimed = true;
                player.systemPoints += q.pts;
                if (window.soundEngine) window.soundEngine.playSuccess();
                renderQuestsPane();
                updateSidebarUI();
            });
        }

        list.appendChild(card);
    });
}

// Subtab 9: Tạo Ảnh AI Gemini Dev
function setupAiGenerator() {
    const btnGen = document.getElementById("btn-generate-ai-scene");
    if (!btnGen) return;

    btnGen.addEventListener("click", async () => {
        const apiKey = document.getElementById("gemini-api-key").value.trim();
        const prompt = document.getElementById("ai-scene-prompt").value.trim();
        const preview = document.getElementById("ai-result-preview");
        if (!preview) return;

        preview.innerHTML = `<div class="ai-loading">🎨 Đang phân tích thần thức và kiến tạo cảnh giới tu tiên...</div>`;

        if (apiKey) {
            try {
                // Gọi API Gemini Dev
                const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Hãy tạo một đoạn mã SVG minh họa tỉ lệ 16:9 chất lượng cao, phong cách tiên hiệp huyền ảo cinematic về cảnh: "${prompt}". Chỉ trả về duy nhất khối mã SVG bắt đầu bằng <svg> và kết thúc bằng </svg>, không kèm markdown giải thích.`
                            }]
                        }]
                    })
                });
                const data = await resp.json();
                const text = data.candidates[0].content.parts[0].text;
                const svgMatch = text.match(/<svg[\s\S]*?<\/svg>/i);
                if (svgMatch) {
                    preview.innerHTML = svgMatch[0];
                    return;
                }
            } catch (err) {
                console.warn("Gemini API call failed, falling back to ArtEngine:", err);
            }
        }

        // Procedural Vector Fallback từ ArtEngine
        setTimeout(() => {
            preview.innerHTML = `
                <div class="ai-generated-frame">
                    ${window.ArtEngine && window.ArtEngine.actionCards ? window.ArtEngine.actionCards.act_meditate() : ""}
                    <p style="color:#38bdf8; text-align:center; margin-top:0.5rem;">Cảnh minh họa đã được kiến tạo từ ArtEngine Vector Cinematic!</p>
                </div>
            `;
        }, 600);
    });
}

// ============================================================
// 11. BẢNG CÔNG PHÁP (HÀN LẬP - PHÀM NHÂN TU TIÊN)
// ============================================================

function practiceTechnique(tech, learned) {
    if (player.rankIdx < 5 && player.stamina < 20) {
        alert("Thể lực không đủ! Cần 20 Thể Lực.");
        return;
    }
    if (player.rankIdx < 5) player.stamina -= 20;
    advanceTime(2);

    const linhCanRate = player.linhCan ? (1 + (player.linhCan.bonusCultivate || 0)) : 1.0;
    const masteryGain = Math.round(30 * linhCanRate);
    const expGain = Math.round(15 * linhCanRate);

    learned.masteryExp += masteryGain;
    player.exp += expGain;
    checkExpThreshold();

    // Kiểm tra thăng cấp độ thành thạo
    if (learned.masteryStage === "Nhập Môn" && learned.masteryExp >= 50) {
        learned.masteryStage = "Tiểu Thành";
        addLog(`Công pháp ${tech.name} đã đột phá lên cấp TIỂU THÀNH!`, "success");
    } else if (learned.masteryStage === "Tiểu Thành" && learned.masteryExp >= 150) {
        learned.masteryStage = "Trung Thành";
        addLog(`Công pháp ${tech.name} đã đột phá lên cấp TRUNG THÀNH!`, "success");
    } else if (learned.masteryStage === "Trung Thành" && learned.masteryExp >= 350) {
        learned.masteryStage = "Đại Thành";
        addLog(`✨ VIÊN MÃN: Công pháp ${tech.name} đã tu luyện tới cảnh giới ĐẠI THÀNH! Khai mở bí thuật!`, "special");
    }

    if (window.soundEngine) window.soundEngine.playSuccess();
    updateSidebarUI();
}

function learnTechnique(tech) {
    player.techniquesLearned.push({
        id: tech.id,
        name: tech.name,
        dao: tech.dao,
        masteryExp: 0,
        masteryStage: "Nhập Môn"
    });
    // Nếu chưa có mainTechId, tự động đặt làm công pháp chính
    if (!player.mainTechId) {
        player.mainTechId = tech.id;
        player.mainDao = tech.dao;
        if (!player.activeDaos.includes(tech.dao)) {
            player.activeDaos.unshift(tech.dao);
        }
        if (!player.daoLevels[tech.dao]) {
            player.daoLevels[tech.dao] = { exp: 0, level: 0 };
        }
    }
    if (window.soundEngine) window.soundEngine.playSuccess();
    addLog(`Đã lĩnh ngộ thành công công pháp: ${tech.name}!`, "special");
    alert(`Lĩnh ngộ thành công ${tech.name}!`);
    updateSidebarUI();
}

function setMainTechnique(techId) {
    const tech = window.TECHNIQUES_DATABASE ? window.TECHNIQUES_DATABASE.find(t => t.id === techId) : null;
    if (!tech) return;
    
    player.mainTechId = tech.id;
    player.mainDao = tech.dao;
    
    // Đảm bảo tech.dao có trong activeDaos
    if (!player.activeDaos.includes(tech.dao)) {
        player.activeDaos.unshift(tech.dao);
    }
    if (!player.daoLevels[tech.dao]) {
        player.daoLevels[tech.dao] = { exp: 0, level: 0 };
    }
    
    addLog(`Đã chuyển sang vận hành [${tech.name}] làm Công Pháp Chính! Lưu phái chủ đạo định hình thành: ${tech.dao}.`, "special");
    if (window.soundEngine) window.soundEngine.playSuccess();
    
    updateSidebarUI();
    renderTechniquesSystemPane();
    renderAperturePane();
    const daosPane = document.getElementById("sys-daos-pane");
    if (daosPane && !daosPane.classList.contains("hidden")) {
        renderDaosPane();
    }
}

// ============================================================
// 12. BẢNG CỔ TRÙNG (194 CON - LỌC ĐA CHIỀU CHI TIẾT)
// ============================================================

function renderGuModal() {
    const myCountEl = document.getElementById("my-gu-count");
    const myListEl = document.getElementById("my-gu-list");
    const allCatalogEl = document.getElementById("all-gu-catalog");
    if (!myListEl || !allCatalogEl || !window.GU_DATABASE) return;

    if (myCountEl) myCountEl.textContent = player.guInventory.length;

    // Render cổ trùng đang sở hữu trong không khiếu
    myListEl.innerHTML = "";
    if (player.guInventory.length === 0) {
        myListEl.innerHTML = `<p style="color:#94a3b8; font-style:italic;">Không khiếu hiện tại trống rỗng, chưa nuôi dưỡng cổ trùng nào.</p>`;
    } else {
        player.guInventory.forEach((g, idx) => {
            const card = document.createElement("div");
            card.className = "my-gu-item-card";
            card.innerHTML = `
                <div class="my-gu-head">
                    <strong>${g.name} ${idx === 0 ? '<span class="text-gold">(Bản Mệnh)</span>' : ''}</strong>
                    <span class="gu-rank-tag">${g.rank} Chuyển • ${g.path} • ${g.type || 'Hỗ Trợ'}</span>
                </div>
                <div class="my-gu-body">
                    <span>🌱 Thức ăn: <strong>${g.food || 'Linh tuyền'}</strong></span>
                    <span>🌀 Tiêu hao Chân Nguyên: <strong>${g.mpCost || 20}</strong></span>
                    <span>⚔️ Uy lực: <strong>+${g.power || 30}</strong></span>
                </div>
                <button class="btn-subtle btn-feed-one-gu" data-gidx="${idx}">🌱 Rót Chân Nguyên Ôn Dưỡng</button>
            `;
            card.querySelector(".btn-feed-one-gu").addEventListener("click", () => {
                feedGuItem(g);
            });
            myListEl.appendChild(card);
        });
    }

    // Render toàn thư 194 cổ trùng với bộ lọc đa chiều
    const searchVal = document.getElementById("gu-search-box").value.toLowerCase().trim();
    const rankFilter = document.getElementById("gu-rank-select").value;
    const typeFilter = document.getElementById("gu-type-select") ? document.getElementById("gu-type-select").value : "all";
    const pathFilter = document.getElementById("gu-path-select") ? document.getElementById("gu-path-select").value : "all";

    allCatalogEl.innerHTML = "";
    const filtered = window.GU_DATABASE.filter(g => {
        if (rankFilter !== "all" && g.rank.toString() !== rankFilter) return false;
        if (typeFilter !== "all" && g.type !== typeFilter) return false;
        if (pathFilter !== "all" && g.path !== pathFilter) return false;
        if (searchVal && !g.name.toLowerCase().includes(searchVal) && !g.path.toLowerCase().includes(searchVal) && !(g.desc && g.desc.toLowerCase().includes(searchVal))) return false;
        return true;
    });

    filtered.slice(0, 60).forEach(gu => {
        const card = document.createElement("div");
        card.className = "catalog-gu-item";
        card.innerHTML = `
            <div class="cat-gu-head">
                <strong>${gu.name}</strong>
                <span class="cat-gu-rank">${gu.rank} Chuyển</span>
            </div>
            <div class="cat-gu-tags" style="display:flex; gap:0.3rem; margin: 0.2rem 0;">
                <span class="recipe-rank-badge">${gu.path}</span>
                <span class="tag-physique-mini" style="font-size:0.68rem;">${gu.type || 'Hỗ Trợ'}</span>
            </div>
            <p class="cat-gu-desc">${gu.desc}</p>
            <div class="cat-gu-footer">
                <small>🌱 Ăn: ${gu.food || 'Thảo dược'}</small>
                <small>⚔️ Uy lực: +${gu.power || 30}</small>
            </div>
        `;
        allCatalogEl.appendChild(card);
    });
}

function feedGuItem(gu) {
    if (player.mp < (gu.mpCost || 15)) {
        alert("Chân nguyên không đủ để ôn dưỡng cổ trùng!");
        return;
    }
    player.mp -= (gu.mpCost || 15);
    advanceTime(1);
    if (window.soundEngine) window.soundEngine.playCoins();
    addLog(`Đã rót chân nguyên và cung phụng thức ăn ôn dưỡng ${gu.name}. Cổ trùng vui vẻ bay lượn!`, "success");
    alert(`Đã ôn dưỡng thành công ${gu.name}!`);
    updateSidebarUI();
}

function rewardRandomGu(rank = 1) {
    if (!window.GU_DATABASE) return;
    const pool = window.GU_DATABASE.filter(g => g.rank === rank);
    if (pool.length > 0) {
        const picked = pool[Math.floor(Math.random() * pool.length)];
        player.guInventory.push({
            id: picked.id,
            name: picked.name,
            rank: picked.rank,
            path: picked.path,
            type: picked.type || "Hỗ Trợ",
            power: picked.power || 30,
            food: picked.food || "Linh tuyền"
        });
        addLog(`Thu được cổ trùng mới: ${picked.name} (${picked.rank} Chuyển)!`, "special");
    }
}

// ============================================================
// 13. TÚI TRỮ VẬT & TIỆN ÍCH VẬT PHẨM
// ============================================================

function addItemToInventory(id, count = 1, name = "Vật Phẩm", type = "material", extra = {}) {
    const existing = player.inventory.find(i => i.id === id);
    if (existing) {
        existing.count += count;
        if (extra) Object.assign(existing, extra);
    } else {
        player.inventory.push({ id, name, count, type, ...extra });
    }
}

function renderInventoryModal() {
    const grid = document.getElementById("inventory-grid");
    if (!grid) return;
    grid.innerHTML = "";

    if (player.inventory.length === 0) {
        grid.innerHTML = `<p style="color:#94a3b8; font-style:italic;">Túi trữ vật trống không. Hãy đến Phường Thị hoặc Cửa Hàng Hệ Thống để sắm bảo vật.</p>`;
        return;
    }

    player.inventory.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = "inventory-item-card";

        let useBtnHtml = "";
        const isStaminaPill = item.type === "pill_stamina" || item.id === "boi_nguyen_dan" || item.id === "bo_the_kim_dan";
        const isExpPill = item.type === "pill_exp" || item.id === "bo_khi_dan" || item.id === "ngung_khi_dan";
        const isCanCotPill = item.type === "pill_cancot" || item.id === "tay_tuy_dan";
        const isAgePill = item.type === "pill_age" || item.id === "dinh_nhan_dan";
        const isRerollPill = item.type === "pill_reroll" || item.id === "tay_linh_dan";
        const isScroll = item.type === "scroll" || item.id.startsWith("scroll_");
        const isRecipe = item.type === "recipe" || item.id.startsWith("recipe_");

        if (isStaminaPill) {
            const addVal = item.restore || (item.id === "bo_the_kim_dan" ? 50 : 40);
            useBtnHtml = `<button class="btn-subtle btn-use-inv" data-idx="${idx}">💊 Uống (Hồi +${addVal} Thể Lực)</button>`;
        } else if (isExpPill) {
            const addExp = item.exp || item.expGain || (item.id === "ngung_khi_dan" ? 100 : 40);
            useBtnHtml = `<button class="btn-subtle btn-use-inv" data-idx="${idx}">✨ Uống (Tăng +${addExp} Tu Vi)</button>`;
        } else if (isCanCotPill) {
            useBtnHtml = `<button class="btn-subtle btn-use-inv" data-idx="${idx}">🦴 Uống (Hồi Phục 100% Căn Cốt)</button>`;
        } else if (isAgePill) {
            useBtnHtml = `<button class="btn-subtle btn-use-inv" data-idx="${idx}">⏳ Uống (Tăng +50 Năm Thọ Nguyên)</button>`;
        } else if (isRerollPill) {
            useBtnHtml = `<button class="btn-subtle btn-use-inv" data-idx="${idx}">🌊 Dùng (Tẩy Linh Đan - Trắc Định Lại)</button>`;
        } else if (isScroll) {
            useBtnHtml = `<button class="btn-subtle btn-use-inv" data-idx="${idx}">📜 Lĩnh Ngộ Công Pháp</button>`;
        } else if (isRecipe) {
            useBtnHtml = `<button class="btn-subtle btn-use-inv" data-idx="${idx}">📖 Khắc Sâu Cổ Phương</button>`;
        }

        card.innerHTML = `
            <div class="inv-item-name">${item.name}</div>
            <div class="inv-item-count">Số lượng: <strong class="text-gold">${item.count}</strong></div>
            ${useBtnHtml}
        `;

        const btnUse = card.querySelector(".btn-use-inv");
        if (btnUse) {
            btnUse.addEventListener("click", () => {
                if (item.count <= 0) return;
                item.count -= 1;

                if (isStaminaPill) {
                    const addVal = item.restore || (item.id === "bo_the_kim_dan" ? 50 : 40);
                    player.stamina = Math.min(player.maxStamina, player.stamina + addVal);
                    addLog(`Đã dùng 1 viên ${item.name}, hồi phục ${addVal} Thể Lực!`, "success");
                } else if (isExpPill) {
                    const addExp = item.exp || item.expGain || (item.id === "ngung_khi_dan" ? 100 : 40);
                    player.exp += addExp;
                    checkExpThreshold();
                    addLog(`Đã dùng 1 viên ${item.name}, gia tăng +${addExp} Tu Vi!`, "success");
                } else if (isCanCotPill) {
                    player.canCot = 100;
                    addLog(`Đã dùng 1 viên ${item.name}, Căn Cốt hồi phục 100% hoàn mỹ!`, "special");
                    alert("🎉 Đã dùng Tẩy Tủy Thần Đan, Căn Cốt của ngươi đã hồi phục 100% hoàn mỹ!");
                } else if (isAgePill) {
                    player.maxAge += 50;
                    addLog(`Đã dùng 1 viên ${item.name}, kéo dài thêm +50 năm thọ nguyên (${player.maxAge} tuổi)!`, "special");
                    alert(`🌟 Đã dùng Định Nhan Thần Đan! Thọ nguyên tối đa tăng lên: ${player.maxAge} tuổi.`);
                } else if (isRerollPill) {
                    player.linhCan = null;
                    linhCanRollsLeft = 10;
                    addLog("Đã tẩy rửa sạch sẽ toàn bộ tạp chất linh căn!", "special");
                    alert("🌊 Tẩy rửa linh căn thành công! Đạo hữu có thể chuyển sang Đo Linh Bàn (10 lượt rút) để trắc định lại linh căn mới.");
                    closeModal("modal-inventory");
                    openModal("modal-system");
                    switchToSystemTab("systab-aperture");
                } else if (isScroll) {
                    const tid = item.techId || item.id.replace("scroll_", "");
                    const techObj = window.TECHNIQUES_DATABASE ? window.TECHNIQUES_DATABASE.find(t => t.id === tid) : null;
                    if (techObj) {
                        learnTechnique(techObj);
                    } else {
                        alert("Đã mở quyển trục và lĩnh ngộ bí kíp thành công!");
                    }
                } else if (isRecipe) {
                    alert("Đã khắc sâu cổ phương vào thức hải! Đạo hữu có thể vào tab Cổ Phương & Hợp Luyện để luyện chế.");
                    closeModal("modal-inventory");
                    openModal("modal-system");
                    switchToSystemTab("systab-recipes");
                }

                if (item.count <= 0) {
                    player.inventory.splice(idx, 1);
                }

                safePlaySound("playCoins");
                updateSidebarUI();
                renderInventoryModal();
            });
        }

        grid.appendChild(card);
    });
}

// ============================================================
// 14. PHƯỜNG THỊ & TIỆM THU MUA YÊU THÚ
// ============================================================

const MARKET_ITEMS = [
    { id: "boi_nguyen_dan", name: "Bồi Nguyên Đan", desc: "Hồi 40 Thể Lực (Dùng tối đa 5 lần/ngày)", priceSilver: 15, priceStone: 1, count: 1 },
    { id: "bo_khi_dan", name: "Tụ Khí Đan", desc: "Uống vào tăng trực tiếp 40 điểm Tu Vi", priceSilver: 30, priceStone: 2, count: 1 },
    { id: "tay_tuy_dan", name: "Tẩy Tủy Đan", desc: "Chữa lành 30% Căn Cốt bị tổn thương", priceStone: 15, count: 1 },
    { id: "thanh_linh_thao", name: "Thanh Linh Thảo (x3)", desc: "Linh thảo Mộc Đạo dùng để phối dược hoặc nuôi cổ", priceSilver: 15, count: 3 },
    { id: "nguyet_quang_hoa", name: "Nguyệt Quang Hoa (x3)", desc: "Hoa cánh sáng thức ăn của Nguyệt Quang Cổ", priceSilver: 20, count: 3 },
    { id: "huyen_thiet_quang", name: "Huyền Thiết Quặng (x3)", desc: "Khoáng thạch sắt đúc giáp luyện cổ phòng ngự", priceSilver: 25, count: 3 }
];

function renderMarketShop() {
    const buyGrid = document.getElementById("market-buy-grid");
    const sellGrid = document.getElementById("market-sell-grid");
    if (!buyGrid || !sellGrid) return;

    // Render Kệ Mua Hàng
    buyGrid.innerHTML = "";
    MARKET_ITEMS.forEach(it => {
        const card = document.createElement("div");
        card.className = "shop-trade-card";
        let costText = "";
        if (it.priceStone) costText = `<strong class="text-cyan">${it.priceStone} Linh Thạch Hạ</strong>`;
        else costText = `<strong class="text-gold">${it.priceSilver} Lạng Bạc</strong>`;

        card.innerHTML = `
            <h4>${it.name}</h4>
            <p>${it.desc}</p>
            <div class="shop-price-line">
                <span>Giá bán:</span>
                ${costText}
            </div>
            <button class="btn-primary btn-buy-market" data-itid="${it.id}">Mua Ngay</button>
        `;

        card.querySelector(".btn-buy-market").addEventListener("click", () => {
            if (it.priceStone && player.stoneLow < it.priceStone) {
                alert(`Không đủ Linh Thạch Hạ Phẩm! (Cần ${it.priceStone} viên)`);
                return;
            }
            if (it.priceSilver && player.mortalSilver < it.priceSilver) {
                alert(`Không đủ Lạng Bạc! (Cần ${it.priceSilver} lạng)`);
                return;
            }

            if (it.priceStone) player.stoneLow -= it.priceStone;
            if (it.priceSilver) player.mortalSilver -= it.priceSilver;

            if (it.id === "tay_tuy_dan") {
                player.canCot = Math.min(100, player.canCot + 30);
                alert("Đã uống Tẩy Tủy Đan, Căn Cốt hồi phục 30%!");
            } else {
                addItemToInventory(it.id, it.count || 1, it.name);
                alert(`Đã mua thành công ${it.name}!`);
            }

            if (window.soundEngine) window.soundEngine.playCoins();
            updateSidebarUI();
            renderMarketShop();
        });

        buyGrid.appendChild(card);
    });

    // Render Quầy Thu Mua Yêu Thú & Đồ Đạc
    sellGrid.innerHTML = "";
    const sellables = player.inventory.filter(i => i.count > 0 && (i.id.startsWith("core_") || i.id.startsWith("skin_") || i.id.includes("thao") || i.id.includes("quang")));
    
    if (sellables.length === 0) {
        sellGrid.innerHTML = `<p style="color:#94a3b8; font-style:italic;">Không có nội đan, da thịt yêu thú hoặc thảo dược nào để bán trong túi trữ vật.</p>`;
        return;
    }

    sellables.forEach(it => {
        const card = document.createElement("div");
        card.className = "shop-trade-card";
        // Giá thu mua
        let unitPriceStone = 1;
        let unitPriceSilver = 10;
        if (it.id.startsWith("core_")) {
            unitPriceStone = 20; // 1 nội đan = 20 Linh thạch hạ
            unitPriceSilver = 0;
        } else if (it.id.startsWith("skin_")) {
            unitPriceStone = 5;
            unitPriceSilver = 50;
        }

        card.innerHTML = `
            <h4>${it.name}</h4>
            <p>Số lượng trong túi: <strong class="text-gold">${it.count}</strong></p>
            <div class="shop-price-line">
                <span>Thu mua mỗi cái:</span>
                <strong class="text-cyan">${unitPriceStone > 0 ? `${unitPriceStone} Linh Thạch` : `${unitPriceSilver} Bạc`}</strong>
            </div>
            <div style="display:flex; gap:0.5rem; margin-top:0.4rem;">
                <button class="btn-subtle btn-sell-one" style="flex:1;">Bán 1 Cái</button>
                <button class="btn-primary btn-sell-all" style="flex:1;">Bán Hết (${it.count})</button>
            </div>
        `;

        card.querySelector(".btn-sell-one").addEventListener("click", () => {
            if (it.count <= 0) return;
            it.count -= 1;
            player.stoneLow += unitPriceStone;
            player.mortalSilver += unitPriceSilver;
            if (window.soundEngine) window.soundEngine.playCoins();
            addLog(`Đã bán 1 ${it.name} nhận được ${unitPriceStone} Linh Thạch Hạ Phẩm!`, "success");
            updateSidebarUI();
            renderMarketShop();
        });

        card.querySelector(".btn-sell-all").addEventListener("click", () => {
            if (it.count <= 0) return;
            const totalStone = unitPriceStone * it.count;
            const totalSilver = unitPriceSilver * it.count;
            addLog(`Đã bán toàn bộ ${it.count} ${it.name} nhận được ${totalStone} Linh Thạch Hạ Phẩm!`, "success");
            it.count = 0;
            player.stoneLow += totalStone;
            player.mortalSilver += totalSilver;
            if (window.soundEngine) window.soundEngine.playCoins();
            updateSidebarUI();
            renderMarketShop();
        });

        sellGrid.appendChild(card);
    });
}

// ============================================================
// 15. TÀNG THƯ CÁC (BÁN QUYỂN TRỤC & CỔ TRÙNG)
// ============================================================

const LIBRARY_SCROLLS = [
    { id: "truong_xuan_cong", name: "Quyển Trục Trường Xuân Công", dao: "Mộc Đạo", rank: 1, price: 30, desc: "Công pháp dưỡng sinh mộc hệ, tăng chân nguyên và thọ nguyên." },
    { id: "tay_tuy_quyet", name: "Quyển Trục Tẩy Tủy Quyết", dao: "Đan Đạo", rank: 1, price: 50, desc: "Gột rửa tủy kinh, phục hồi Căn Cốt tổn thương sau khi đột phá thất bại." },
    { id: "thanh_nguyen_kiem_quyet", name: "Quyển Trục Thanh Nguyên Kiếm Quyết", dao: "Kiếm Đạo", rank: 2, price: 120, desc: "Kiếm tu đệ nhất công pháp, luyện kiếm ảnh hộ thể và kiếm quang phân hóa." },
    { id: "dai_dien_quyet", name: "Quyển Trục Đại Diễn Quyết", dao: "Trí Đạo", rank: 2, price: 150, desc: "Bí pháp cường hóa thần thức tuyệt đỉnh, khống chế trăm con khôi lỗi." },
    { id: "minh_vuong_quyet", name: "Quyển Trục Minh Vương Quyết", dao: "Lực Đạo", rank: 3, price: 220, desc: "Luyện thể đại thành, thân như kim cương kim thân bất hoại." },
    { id: "bach_mach_luyen_bao_quyet", name: "Quyển Trục Bách Mạch Luyện Bảo Quyết", dao: "Luyện Đạo", rank: 3, price: 260, desc: "Dung hợp pháp bảo vào trăm mạch kinh lạc, xuất chiêu uy chấn bát hoang." }
];

const LIBRARY_RECIPES = [
    { id: "recipe_thiet_bi", name: "Cổ Phương Thiết Bì Cổ", rank: 2, price: 40, desc: "Công thức hợp luyện Thiết Bì Cổ (Nhị Chuyển Phòng Ngự)." },
    { id: "recipe_tuu_trung", name: "Cổ Phương Tửu Trùng", rank: 1, price: 60, desc: "Công thức cổ xưa tinh luyện Tửu Trùng (Nhất Chuyển Hỗ Trợ)." },
    { id: "recipe_xa_loi_3", name: "Cổ Phương Bạch Ngân Xá Lợi Cổ", rank: 3, price: 180, desc: "Công thức luyện đan cổ tăng trực tiếp 1 tiểu cảnh giới Tam Chuyển." }
];

function renderLibraryShop() {
    const scrollsGrid = document.getElementById("lib-scrolls-grid");
    const recipesGrid = document.getElementById("lib-recipes-grid");
    const gusGrid = document.getElementById("lib-gus-grid");
    if (!scrollsGrid || !recipesGrid || !gusGrid) return;

    // Render Quyển Trục Công Pháp
    scrollsGrid.innerHTML = "";
    LIBRARY_SCROLLS.forEach(sc => {
        const hasLearned = player.techniquesLearned.some(t => t.id === sc.id);
        const card = document.createElement("div");
        card.className = "shop-trade-card";
        card.innerHTML = `
            <h4>${sc.name}</h4>
            <span class="recipe-rank-badge">${sc.rank} Chuyển • ${sc.dao}</span>
            <p>${sc.desc}</p>
            <div class="shop-price-line">
                <span>Giá đổi:</span>
                <strong class="text-cyan">${sc.price} Linh Thạch Hạ</strong>
            </div>
            <button class="btn-primary btn-buy-scroll" data-scid="${sc.id}" ${hasLearned ? 'disabled' : ''}>
                ${hasLearned ? '✓ Đã Lĩnh Ngộ' : 'Mua & Lĩnh Ngộ'}
            </button>
        `;

        if (!hasLearned) {
            card.querySelector(".btn-buy-scroll").addEventListener("click", () => {
                if (player.stoneLow < sc.price) {
                    alert(`Không đủ Linh Thạch Hạ Phẩm! (Cần ${sc.price} viên)`);
                    return;
                }
                const techObj = window.TECHNIQUES_DATABASE ? window.TECHNIQUES_DATABASE.find(t => t.id === sc.id) : null;
                if (!techObj) return;

                if (player.comprehension < techObj.reqComprehension) {
                    alert(`Ngộ tính không đủ để lĩnh ngộ công pháp này! (Cần ${techObj.reqComprehension} Ngộ tính, hiện có ${player.comprehension}). Hãy cộng điểm ngộ tính trong Hệ Thống trước!`);
                    return;
                }

                player.stoneLow -= sc.price;
                learnTechnique(techObj);
                renderLibraryShop();
            });
        }

        scrollsGrid.appendChild(card);
    });

    // Render Cổ Phương
    recipesGrid.innerHTML = "";
    LIBRARY_RECIPES.forEach(rc => {
        const card = document.createElement("div");
        card.className = "shop-trade-card";
        card.innerHTML = `
            <h4>${rc.name}</h4>
            <span class="recipe-rank-badge">${rc.rank} Chuyển</span>
            <p>${rc.desc}</p>
            <div class="shop-price-line">
                <span>Giá đổi:</span>
                <strong class="text-cyan">${rc.price} Linh Thạch Hạ</strong>
            </div>
            <button class="btn-primary btn-buy-recipe">Mua Cổ Phương</button>
        `;

        card.querySelector(".btn-buy-recipe").addEventListener("click", () => {
            if (player.stoneLow < rc.price) {
                alert(`Không đủ Linh Thạch! (Cần ${rc.price} viên)`);
                return;
            }
            player.stoneLow -= rc.price;
            addItemToInventory(rc.id, 1, rc.name);
            alert(`Đã mua thành công ${rc.name} đưa vào Túi Trữ Vật!`);
            if (window.soundEngine) window.soundEngine.playCoins();
            updateSidebarUI();
        });

        recipesGrid.appendChild(card);
    });

    // Render Cổ Trùng Gia Tộc
    gusGrid.innerHTML = "";
    const clanGus = [
        { id: "nguy_t_quang_c", name: "Nguyệt Quang Cổ", rank: 1, path: "Quang Đạo", type: "Công Kích", price: 50 },
        { id: "t_u_tr_ng", name: "Tửu Trùng", rank: 1, path: "Khí Đạo", type: "Hỗ Trợ", price: 80 },
        { id: "bach_ngoc_co", name: "Bạch Ngọc Cổ", rank: 1, path: "Kim Đạo", type: "Phòng Ngự", price: 60 },
        { id: "thi_t_b_c", name: "Thiết Bì Cổ", rank: 2, path: "Kim Đạo", type: "Phòng Ngự", price: 150 }
    ];

    clanGus.forEach(cg => {
        const card = document.createElement("div");
        card.className = "shop-trade-card";
        card.innerHTML = `
            <h4>${cg.name}</h4>
            <span class="recipe-rank-badge">${cg.rank} Chuyển • ${cg.path} • ${cg.type}</span>
            <p>Cổ trùng thuần dưỡng trong mật thất gia tộc, có thể trực tiếp thu nạp vào không khiếu.</p>
            <div class="shop-price-line">
                <span>Giá đổi:</span>
                <strong class="text-cyan">${cg.price} Linh Thạch Hạ</strong>
            </div>
            <button class="btn-primary btn-buy-clan-gu">Thu Nạp Cổ Trùng</button>
        `;

        card.querySelector(".btn-buy-clan-gu").addEventListener("click", () => {
            if (player.stoneLow < cg.price) {
                alert(`Không đủ Linh Thạch! (Cần ${cg.price} viên)`);
                return;
            }
            player.stoneLow -= cg.price;
            player.guInventory.push({
                id: cg.id,
                name: cg.name,
                rank: cg.rank,
                path: cg.path,
                type: cg.type,
                power: 35,
                food: "Linh tuyền"
            });
            alert(`Đã thu nạp thành công ${cg.name} vào không khiếu!`);
            if (window.soundEngine) window.soundEngine.playCoins();
            updateSidebarUI();
        });

        gusGrid.appendChild(card);
    });
}

// ============================================================
// 16. TIỀN TRANG ĐỔI TIỀN HAI CHIỀU (EXCHANGE)
// ============================================================

window.exchangeCurrency = function(type) {
    switch (type) {
        case "copper_to_silver":
            if (player.mortalCopper >= 100) {
                player.mortalCopper -= 100;
                player.mortalSilver += 1;
                addLog("Quy đổi: 100 Xu Đồng ➔ 1 Lạng Bạc.", "info");
            } else alert("Không đủ Xu Đồng!");
            break;
        case "silver_to_copper":
            if (player.mortalSilver >= 1) {
                player.mortalSilver -= 1;
                player.mortalCopper += 100;
                addLog("Quy đổi: 1 Lạng Bạc ➔ 100 Xu Đồng.", "info");
            } else alert("Không đủ Lạng Bạc!");
            break;
        case "silver_to_gold":
            if (player.mortalSilver >= 100) {
                player.mortalSilver -= 100;
                player.mortalGold += 1;
                addLog("Quy đổi: 100 Lạng Bạc ➔ 1 Lạng Vàng.", "info");
            } else alert("Không đủ Lạng Bạc!");
            break;
        case "gold_to_silver":
            if (player.mortalGold >= 1) {
                player.mortalGold -= 1;
                player.mortalSilver += 100;
                addLog("Quy đổi: 1 Lạng Vàng ➔ 100 Lạng Bạc.", "info");
            } else alert("Không đủ Lạng Vàng!");
            break;
        case "gold_to_stone_low":
            if (player.mortalGold >= 1) {
                player.mortalGold -= 1;
                player.stoneLow += 1;
                addLog("Quy đổi: 1 Lạng Vàng ➔ 1 Linh Thạch Hạ Phẩm.", "info");
            } else alert("Không đủ Lạng Vàng!");
            break;
        case "stone_low_to_gold":
            if (player.stoneLow >= 1) {
                player.stoneLow -= 1;
                player.mortalGold += 1;
                addLog("Quy đổi: 1 Linh Thạch Hạ Phẩm ➔ 1 Lạng Vàng.", "info");
            } else alert("Không đủ Linh Thạch Hạ Phẩm!");
            break;
        case "stone_low_to_mid":
            if (player.stoneLow >= 100) {
                player.stoneLow -= 100;
                player.stoneMid += 1;
                addLog("Quy đổi: 100 Hạ Phẩm ➔ 1 Trung Phẩm Linh Thạch.", "info");
            } else alert("Không đủ Linh Thạch Hạ Phẩm (Cần 100 viên)!");
            break;
        case "stone_mid_to_low":
            if (player.stoneMid >= 1) {
                player.stoneMid -= 1;
                player.stoneLow += 100;
                addLog("Quy đổi: 1 Trung Phẩm ➔ 100 Hạ Phẩm Linh Thạch.", "info");
            } else alert("Không đủ Linh Thạch Trung Phẩm!");
            break;
        case "stone_mid_to_high":
            if (player.stoneMid >= 100) {
                player.stoneMid -= 100;
                player.stoneHigh += 1;
                addLog("Quy đổi: 100 Trung Phẩm ➔ 1 Thượng Phẩm Linh Thạch.", "info");
            } else alert("Không đủ Linh Thạch Trung Phẩm (Cần 100 viên)!");
            break;
        case "stone_high_to_mid":
            if (player.stoneHigh >= 1) {
                player.stoneHigh -= 1;
                player.stoneMid += 100;
                addLog("Quy đổi: 1 Thượng Phẩm ➔ 100 Trung Phẩm Linh Thạch.", "info");
            } else alert("Không đủ Linh Thạch Thượng Phẩm!");
            break;
    }

    if (window.soundEngine) window.soundEngine.playCoins();
    updateSidebarUI();
};

// ============================================================
// 17. MODAL XỬ LÝ CHIẾN LỢI PHẨM YÊU THÚ
// ============================================================

function openMonsterLootModal(beast) {
    const modal = document.getElementById("modal-monster-loot");
    const titleEl = document.getElementById("monster-loot-title");
    const descEl = document.getElementById("monster-loot-desc");
    const priceEl = document.getElementById("monster-sell-price");
    if (!modal) return;

    if (titleEl) titleEl.textContent = `🐺 Đã Hạ Gục ${beast.name}!`;
    if (descEl) descEl.textContent = `Ngươi vừa tiêu diệt thành công ${beast.name}. Hãy lựa chọn cách xử lý xác thú:`;
    if (priceEl) priceEl.textContent = `${beast.sellPrice} Linh Thạch Hạ Phẩm`;

    modal.classList.remove("hidden");

    // Gán sự kiện nút lựa chọn
    document.getElementById("btn-loot-dissect").onclick = () => {
        addItemToInventory(`core_${beast.name}`, 1, beast.coreName);
        addItemToInventory(`skin_${beast.name}`, 2, `Da Thịt ${beast.name}`);
        addLog(`Đã mổ xẻ ${beast.name}, thu được 1 ${beast.coreName} và 2 Da Thịt quý vào túi trữ vật!`, "success");
        modal.classList.add("hidden");
        updateSidebarUI();
    };

    document.getElementById("btn-loot-sell").onclick = () => {
        player.stoneLow += beast.sellPrice;
        addLog(`Đã bán toàn bộ xác ${beast.name} cho thương đội thu được ${beast.sellPrice} Linh Thạch Hạ Phẩm!`, "success");
        if (window.soundEngine) window.soundEngine.playCoins();
        modal.classList.add("hidden");
        updateSidebarUI();
    };
}

// ============================================================
// 18. TRANG MỞ ĐẦU 5 BƯỚC & MINI-GAME KHAI KHIẾU (20 GIÂY) CHUẨN NGUYÊN TÁC
// ============================================================

let miniGameTimer = null;
let miniGameTimeLeft = 20.0;
let miniGameScore = 0; // Tương ứng % dung lượng Chân Nguyên Hải tích tụ

let linhCanRollsLeft = 10;
let currentRolledLinhCan = null;
let currentPickedStarterGu = null;

// Hàm chuyển bước trên Trang Mở Đầu Toàn Cảnh
function switchIntroStep(stepNum) {
    for (let i = 1; i <= 5; i++) {
        const pill = document.getElementById(`step-pill-${i}`);
        const pane = document.getElementById(`intro-step-${i}`);
        if (pill) {
            if (i === stepNum) {
                pill.className = "step-pill active";
            } else if (i < stepNum) {
                pill.className = "step-pill completed";
            } else {
                pill.className = "step-pill";
            }
        }
        if (pane) {
            if (i === stepNum) pane.classList.add("active");
            else pane.classList.remove("active");
        }
    }
}

function prepareAwakeningMiniGame() {
    miniGameScore = 0;
    miniGameTimeLeft = 20.0;
    if (miniGameTimer) clearInterval(miniGameTimer);

    const timerEl = document.getElementById("mini-timer");
    const scoreEl = document.getElementById("mini-score");
    const previewEl = document.getElementById("mini-rank-preview");
    if (timerEl) timerEl.textContent = "20.0s";
    if (scoreEl) scoreEl.textContent = "0%";
    if (previewEl) {
        previewEl.textContent = "Đinh Đẳng (<30% • 2-3 thành Chân Nguyên)";
        previewEl.className = "rank-c";
    }

    const riverWater = document.getElementById("river-water");
    if (riverWater) riverWater.innerHTML = "";

    const overlay = document.getElementById("river-start-overlay");
    if (overlay) {
        overlay.style.display = "flex";
        overlay.style.visibility = "visible";
        overlay.style.pointerEvents = "auto";
    }

    const manualOpts = document.getElementById("manual-rank-options");
    if (manualOpts) manualOpts.classList.add("hidden");
}

function startAwakeningMiniGame() {
    const overlay = document.getElementById("river-start-overlay");
    if (overlay) {
        overlay.style.display = "none";
        overlay.style.visibility = "hidden";
        overlay.style.pointerEvents = "none";
    }

    miniGameScore = 0;
    miniGameTimeLeft = 20.0;

    const timerEl = document.getElementById("mini-timer");
    const scoreEl = document.getElementById("mini-score");
    if (timerEl) timerEl.textContent = "20.0s";
    if (scoreEl) scoreEl.textContent = "0%";

    const riverWater = document.getElementById("river-water");
    if (riverWater) riverWater.innerHTML = "";

    // Vòng lặp đếm ngược 20.0 giây
    if (miniGameTimer) {
        clearInterval(miniGameTimer);
        miniGameTimer = null;
    }

    const intervalMs = 100;
    miniGameTimer = setInterval(() => {
        miniGameTimeLeft -= (intervalMs / 1000);
        if (miniGameTimeLeft <= 0) {
            miniGameTimeLeft = 0;
            if (miniGameTimer) {
                clearInterval(miniGameTimer);
                miniGameTimer = null;
            }
            if (timerEl) timerEl.textContent = "0.0s";
            const river = document.getElementById("river-water");
            if (river) river.innerHTML = "";
            finishAwakeningMiniGame();
            return;
        }
        if (timerEl) timerEl.textContent = miniGameTimeLeft.toFixed(1) + "s";
    }, intervalMs);

    // Sinh sóng quang linh dập dềnh
    spawnSpiritualOrbsWave();
}

function spawnSpiritualOrbsWave() {
    if (miniGameTimeLeft <= 0) return;

    const count = Math.random() < 0.65 ? 1 : 2;
    for (let i = 0; i < count; i++) {
        spawnSingleOrb();
    }

    const nextDelay = 1300 + Math.random() * 400;
    setTimeout(spawnSpiritualOrbsWave, nextDelay);
}

function createOrbCollectEffect(arena, xPercent, yPercent, val, isGold) {
    if (!arena) return;

    // 1. Text số % chân nguyên bay bổng lơ lửng
    const floatEl = document.createElement("div");
    floatEl.className = isGold ? "floating-score gold-score" : "floating-score";
    floatEl.textContent = `+${val}% Chân Nguyên`;
    floatEl.style.left = `${xPercent}%`;
    floatEl.style.top = `${yPercent}%`;
    arena.appendChild(floatEl);

    // 2. Gợn sóng nước lan tỏa
    const rippleEl = document.createElement("div");
    rippleEl.className = "river-ripple";
    rippleEl.style.left = `${xPercent}%`;
    rippleEl.style.top = `${yPercent}%`;
    arena.appendChild(rippleEl);

    // 3. Chùm hạt lấp lánh tóe ra
    const pCount = isGold ? 8 : 5;
    for (let i = 0; i < pCount; i++) {
        const p = document.createElement("div");
        p.className = "sparkle-particle";
        const angle = (Math.PI * 2 / pCount) * i + (Math.random() * 0.4);
        const dist = 20 + Math.random() * 25;
        p.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
        p.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
        p.style.left = `${xPercent}%`;
        p.style.top = `${yPercent}%`;
        if (isGold) p.style.background = "#fbbf24";
        arena.appendChild(p);
        setTimeout(() => { if (p.parentNode) p.remove(); }, 600);
    }

    setTimeout(() => {
        if (floatEl.parentNode) floatEl.remove();
        if (rippleEl.parentNode) rippleEl.remove();
    }, 850);
}

function spawnSingleOrb() {
    const arena = document.getElementById("river-water");
    if (!arena || miniGameTimeLeft <= 0) return;

    const orb = document.createElement("div");
    orb.className = "spirit-orb";

    const posX = Math.floor(Math.random() * 80) + 10;
    const posY = Math.floor(Math.random() * 68) + 14;
    orb.style.left = posX + "%";
    orb.style.top = posY + "%";

    const roll = Math.random();
    let val = 4;
    let isGold = false;

    if (roll > 0.88) {
        val = 15; // Hoàng Kim Cực Phẩm
        isGold = true;
        orb.classList.add("gold-orb");
    } else if (roll > 0.65) {
        val = 8; // Bích Ngọc Thượng Phẩm
        orb.style.background = "radial-gradient(circle at 35% 35%, #ffffff 0%, #10b981 50%, #064e3b 100%)";
        orb.style.boxShadow = "0 0 20px #10b981";
    } else {
        val = Math.random() < 0.5 ? 4 : 5; // Thanh Đồng Trung Phẩm
    }

    const collectOrb = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (orb.dataset.collected === "true") return;
        orb.dataset.collected = "true";

        // 1. Cập nhật điểm số ngay lập tức
        miniGameScore += val;
        const scoreEl = document.getElementById("mini-score");
        if (scoreEl) scoreEl.textContent = `${miniGameScore}%`;

        // 2. Cập nhật preview tư chất tương ứng với % đạt được ngay lập tức
        updateMiniRankPreview(miniGameScore);

        // 3. Biến mất và xóa khỏi DOM ngay lập tức
        orb.style.display = "none";
        if (orb.parentNode) orb.remove();

        // 4. Kích hoạt hiệu ứng bay bổng & gợn sóng sông an toàn
        try {
            createOrbCollectEffect(arena, posX, posY, val, isGold);
        } catch (err) {
            console.warn("Effect render error:", err);
        }

        // 5. Phát âm thanh an toàn
        safePlaySound("playCoins");
    };

    orb.addEventListener("pointerdown", collectOrb);
    orb.addEventListener("click", collectOrb);

    arena.appendChild(orb);

    setTimeout(() => {
        if (orb.parentNode && orb.dataset.collected !== "true") {
            orb.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            orb.style.opacity = "0";
            orb.style.transform = "scale(0.3)";
            setTimeout(() => {
                if (orb.parentNode && orb.dataset.collected !== "true") orb.remove();
            }, 400);
        }
    }, 2500);
}

function updateMiniRankPreview(score) {
    const el = document.getElementById("mini-rank-preview");
    if (!el) return;
    if (score < 30) {
        el.textContent = `Đinh Đẳng (${score}% • 2-3 thành Chân Nguyên)`;
        el.className = "rank-c";
    } else if (score < 60) {
        el.textContent = `Bính Đẳng (${score}% • 4-5 thành Chân Nguyên)`;
        el.className = "rank-b";
    } else if (score < 80) {
        el.textContent = `Ất Đẳng (${score}% • 6-7 thành Chân Nguyên)`;
        el.className = "rank-a";
    } else if (score < 100) {
        el.textContent = `Giáp Đẳng (${score}% • 8-9 thành Chân Nguyên)`;
        el.className = "rank-s";
    } else {
        el.textContent = `🌟 THẬP ĐẠI TUYỆT THỂ (${score}% • 10 thành Trọn Vẹn) 🌟`;
        el.className = "rank-s";
    }
}

function finishAwakeningMiniGame() {
    if (miniGameTimer) {
        clearInterval(miniGameTimer);
        miniGameTimer = null;
    }

    const timerEl = document.getElementById("mini-timer");
    if (timerEl) timerEl.textContent = "0.0s";

    const riverWater = document.getElementById("river-water");
    if (riverWater) riverWater.innerHTML = "";

    let apt = APTITUDES.C;
    let isTuyetTheForce = false;

    if (miniGameScore >= 100) {
        apt = APTITUDES.S;
        isTuyetTheForce = true;
    } else if (miniGameScore >= 80) {
        apt = APTITUDES.S;
    } else if (miniGameScore >= 60) {
        apt = APTITUDES.A;
    } else if (miniGameScore >= 30) {
        apt = APTITUDES.B;
    } else {
        apt = APTITUDES.C;
    }

    try {
        applyAwakeningResult(apt, isTuyetTheForce);
    } catch (e) {
        console.error("applyAwakeningResult error:", e);
    }

    // Đảm bảo chuyển bước 3 mượt mà
    switchIntroStep(3);
}

function applyAwakeningResult(apt, isTuyetTheForce = false) {
    player.aptitude = apt;
    player.mp = Math.round(player.maxMp * (apt.seaPct || 0.45));

    const physiqueBox = document.getElementById("res-physique-box");
    const physiqueNameEl = document.getElementById("res-physique-name");
    const physiqueDescEl = document.getElementById("res-physique-desc");

    const shouldAwakenPhysique = isTuyetTheForce || (apt.rank === "S" && Math.random() < 0.04);

    if (shouldAwakenPhysique) {
        const specialIdx = Math.floor(Math.random() * (SPECIAL_PHYSIQUES.length - 1)) + 1;
        player.specialPhysique = SPECIAL_PHYSIQUES[specialIdx];
        if (physiqueBox) physiqueBox.classList.remove("hidden");
        if (physiqueNameEl) physiqueNameEl.textContent = player.specialPhysique.name;
        if (physiqueDescEl) physiqueDescEl.textContent = player.specialPhysique.desc;
        addLog(`⚡ DỊ TƯỢNG TRỜI GIÁNG: Ngươi thức tỉnh THẬP ĐẠI TUYỆT THỂ: ${player.specialPhysique.name}! Chân nguyên 10 thành trọn vẹn!`, "special");
    } else {
        player.specialPhysique = SPECIAL_PHYSIQUES[0]; // Phàm thể
        if (physiqueBox) physiqueBox.classList.add("hidden");
    }

    const resBadge = document.getElementById("res-rank-badge");
    const resDesc = document.getElementById("res-rank-desc");
    if (resBadge) resBadge.textContent = apt.name;
    if (resDesc) resDesc.textContent = apt.desc;

    safePlaySound("playSuccess");
}

function showManualRankSelection() {
    const opts = document.getElementById("manual-rank-options");
    if (opts) opts.classList.toggle("hidden");
}

function selectManualRank(rankKey) {
    const safeKey = (rankKey === "C") ? "C" : "B";
    const apt = APTITUDES[safeKey] || APTITUDES.B;
    if (miniGameTimer) {
        clearInterval(miniGameTimer);
        miniGameTimer = null;
    }
    const riverWater = document.getElementById("river-water");
    if (riverWater) riverWater.innerHTML = "";
    try {
        applyAwakeningResult(apt, false);
    } catch (e) {
        console.error("selectManualRank apply error:", e);
    }
    switchIntroStep(3);
}

// ============================================================
// 19. ĐO LINH BÀN 10 LƯỢT RÚT & BAN BẢN MỆNH CỔ GIA TỘC
// ============================================================

function rollLinhCanRandom() {
    if (linhCanRollsLeft <= 0) {
        alert("Đã hết 10 lượt rút ngẫu nhiên! Vui lòng bấm 'Tiến Vào Đại Điển Ban Cổ' để tiếp tục.");
        return;
    }
    linhCanRollsLeft -= 1;

    const hudEl = document.getElementById("linhcan-rolls-hud");
    const btnRoll = document.getElementById("btn-roll-linhcan");
    const btnLock = document.getElementById("btn-lock-linhcan");
    const btnNext = document.getElementById("btn-step4-next");

    if (hudEl) hudEl.textContent = `Lượt rút còn lại: ${linhCanRollsLeft} / 10`;
    if (btnRoll) btnRoll.textContent = `🎲 Khởi Động Đo Linh Bàn (Còn ${linhCanRollsLeft} Lượt)`;

    const wheelEl = document.getElementById("linhcan-wheel-display");
    if (wheelEl) wheelEl.classList.add("spinning");

    // Tỉ lệ rút theo chuẩn Phàm Nhân Tu Tiên:
    // Ngụy Linh Căn (45%), Tam Linh Căn (30%), Chân Linh Căn (15%), Dị Linh Căn (7%), Thiên Linh Căn (3%)
    const roll = Math.random() * 100;
    let pool = [];
    if (roll < 3) {
        pool = SPIRITUAL_ROOTS.filter(r => r.tier === "Thiên Linh Căn");
    } else if (roll < 10) {
        pool = SPIRITUAL_ROOTS.filter(r => r.tier === "Dị Linh Căn");
    } else if (roll < 25) {
        pool = SPIRITUAL_ROOTS.filter(r => r.tier === "Chân Linh Căn");
    } else if (roll < 55) {
        pool = SPIRITUAL_ROOTS.filter(r => r.tier === "Tam Linh Căn");
    } else {
        pool = SPIRITUAL_ROOTS.filter(r => r.tier === "Ngụy Linh Căn");
    }

    if (pool.length === 0) pool = SPIRITUAL_ROOTS;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    currentRolledLinhCan = picked;

    setTimeout(() => {
        if (wheelEl) wheelEl.classList.remove("spinning");
        displayRolledLinhCan(picked);

        if (btnLock) {
            btnLock.style.display = "inline-block";
            btnLock.textContent = `✓ Khóa & Chọn: ${picked.name}`;
            btnLock.style.borderColor = "#10b981";
            btnLock.style.color = "#10b981";
        }
        if (btnNext) btnNext.disabled = false;

        if (linhCanRollsLeft === 0) {
            if (btnRoll) {
                btnRoll.disabled = true;
                btnRoll.textContent = "Hết 10 Lượt Rút (Đã Khóa Linh Căn Hiện Tại)";
            }
            lockCurrentLinhCan();
        }
        if (window.soundEngine) window.soundEngine.playCoins();
    }, 400);
}

function displayRolledLinhCan(linhCan) {
    const nameEl = document.getElementById("linhcan-name-display");
    const elemsEl = document.getElementById("linhcan-elements-display");
    const descEl = document.getElementById("linhcan-desc-display");
    const buffEl = document.getElementById("linhcan-buff-display");

    if (nameEl) {
        nameEl.textContent = `${linhCan.name} (${linhCan.tier})`;
        nameEl.style.color = linhCan.color;
    }

    if (elemsEl) {
        elemsEl.innerHTML = linhCan.elements.map(e => {
            let cls = "elem-kim";
            if (e === "Mộc") cls = "elem-moc";
            if (e === "Thủy") cls = "elem-thuy";
            if (e === "Hỏa") cls = "elem-hoa";
            if (e === "Thổ") cls = "elem-tho";
            if (e === "Lôi") cls = "elem-loi";
            if (e === "Phong") cls = "elem-phong";
            if (e === "Băng") cls = "elem-bang";
            return `<span class="elem-tag ${cls}">${e}</span>`;
        }).join(" ");
    }

    if (descEl) descEl.textContent = linhCan.desc;
    if (buffEl) buffEl.textContent = `Hệ số tương thích công pháp: x${(1 + (linhCan.bonusCultivate || 0)).toFixed(2)} Tốc độ tu vi`;
}

function lockCurrentLinhCan() {
    if (!currentRolledLinhCan) {
        alert("Vui lòng khởi động Đo Linh Bàn ít nhất 1 lần để rút Linh Căn!");
        return;
    }
    player.linhCan = currentRolledLinhCan;
    const btnLock = document.getElementById("btn-lock-linhcan");
    const btnNext = document.getElementById("btn-step4-next");
    if (btnLock) {
        btnLock.textContent = `✓ ĐÃ KHÓA: ${player.linhCan.name}`;
        btnLock.style.borderColor = "#fbbf24";
        btnLock.style.color = "#fbbf24";
    }
    if (btnNext) btnNext.disabled = false;
    addLog(`Đo Linh Bàn trắc định: Đạo hữu thức tỉnh ${player.linhCan.name} (${player.linhCan.tier})!`, "special");
    if (window.soundEngine) window.soundEngine.playSuccess();
}

function renderStarterGuGrid() {
    const grid = document.getElementById("starter-gu-grid");
    const selectedNameEl = document.getElementById("selected-gu-name");
    const btnConfirm = document.getElementById("btn-confirm-starter-gu");
    if (!grid) return;

    grid.innerHTML = "";
    currentPickedStarterGu = null;

    if (selectedNameEl) selectedNameEl.textContent = "Chưa chọn (Vui lòng bấm chọn 1 con Cổ ở dưới)";
    if (btnConfirm) {
        btnConfirm.disabled = true;
        btnConfirm.style.opacity = "0.5";
        btnConfirm.style.cursor = "not-allowed";
    }

    STARTER_GU_CHOICES.forEach(gu => {
        const box = document.createElement("div");
        box.className = "starter-gu-box";
        box.setAttribute("data-guid", gu.id);
        box.innerHTML = `
            <div class="starter-gu-box-header">
                <strong>${gu.name}</strong>
                <span class="recipe-rank-badge">${gu.rank} Chuyển • ${gu.path}</span>
            </div>
            <span class="tag-physique-mini" style="width: fit-content; margin: 4px 0;">Loại: ${gu.type}</span>
            <p>${gu.desc}</p>
            <div style="font-size:0.75rem; color:#94a3b8; margin: 6px 0;">
                <span>Tiêu hao: ${gu.mpCost} Chân Nguyên</span> | <span>Uy lực: +${gu.power}</span>
            </div>
            <div class="starter-gu-footer-row" style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                <span class="starter-gu-status-label" style="font-size:0.75rem; color:#64748b; font-weight:600;">Nhấp để chọn thẻ</span>
                <button type="button" class="btn-primary btn-choose-this-gu" style="font-size:0.8rem; padding:4px 10px;">⚡ Chọn Cổ Này</button>
            </div>
        `;

        const markAsSelected = () => {
            document.querySelectorAll(".starter-gu-box").forEach(b => {
                b.classList.remove("active-selected");
                const lbl = b.querySelector(".starter-gu-status-label");
                if (lbl) {
                    lbl.textContent = "Nhấp để chọn thẻ";
                    lbl.style.color = "#64748b";
                }
            });
            box.classList.add("active-selected");
            const curLbl = box.querySelector(".starter-gu-status-label");
            if (curLbl) {
                curLbl.textContent = "✓ ĐÃ CHỌN";
                curLbl.style.color = "#10b981";
            }

            currentPickedStarterGu = gu;
            if (selectedNameEl) {
                selectedNameEl.innerHTML = `<span style="color:#10b981; font-weight:700;">${gu.name}</span> (${gu.rank} Chuyển • ${gu.path} • ${gu.type})`;
            }
            if (btnConfirm) {
                btnConfirm.disabled = false;
                btnConfirm.style.opacity = "1";
                btnConfirm.style.cursor = "pointer";
            }
            if (window.soundEngine) window.soundEngine.playMeditate();
        };

        box.addEventListener("click", markAsSelected);
        const btnInside = box.querySelector(".btn-choose-this-gu");
        if (btnInside) {
            btnInside.addEventListener("click", (e) => {
                e.stopPropagation();
                markAsSelected();
            });
        }

        grid.appendChild(box);
    });
}

function confirmStarterGuSelection() {
    if (!currentPickedStarterGu) {
        alert("Vui lòng nhấp chọn 1 trong 6 Cổ Trùng bản mệnh trước khi tiến hành luyện hóa!");
        return;
    }

    const gu = currentPickedStarterGu;
    player.guInventory = [{
        id: gu.id,
        name: gu.name,
        rank: gu.rank,
        path: gu.path,
        type: gu.type,
        power: gu.power,
        food: gu.food || "Linh tuyền",
        isBonded: true
    }];

    // Đọc chế độ tu luyện đã chọn
    const selMode = document.querySelector('input[name="cultivate-mode-radio"]:checked');
    if (selMode) player.cultivateMode = selMode.value;

    // Ẩn màn hình mở đầu toàn cảnh
    const introScreen = document.getElementById("intro-awakening-screen");
    if (introScreen) introScreen.classList.add("hidden");

    // LƯU GAME TỨC THÌ
    saveGame();

    if (window.soundEngine) window.soundEngine.playSuccess();
    addLog(`Đã hoàn tất nghi lễ luyện hóa! ${gu.name} (${gu.rank} Chuyển • ${gu.path}) đã trở thành BẢN MỆNH CỔ đầu tiên của ngươi!`, "special");
    alert(`🎉 Đại Điển Kết Thúc! Chúc mừng ${player.name} đã luyện hóa thành công Bản Mệnh Cổ: ${gu.name}!\nBản lưu game đã được bảo toàn. Hãy bắt đầu hành trình nghịch thiên tu tiên!`);
    updateSidebarUI();
    renderCurrentLocationStage();
}

// ============================================================
// 20. KHỞI TẠO GAME & BINDING SỰ KIỆN DOM
// ============================================================

function addLog(msg, type = "info") {
    const timestamp = `[Năm ${player.timeYear} • Ngày ${player.timeDay}]`;
    const fullMsg = `${timestamp} ${msg}`;
    player.logEntries.unshift({ text: fullMsg, type });

    const logBox = document.getElementById("full-game-log");
    if (logBox) {
        const row = document.createElement("div");
        row.className = `log-line line-${type}`;
        row.textContent = fullMsg;
        logBox.prepend(row);
    }
}

function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("hidden");
}

function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
}

function setupEventListeners() {
    function safeAddListener(id, event, handler) {
        const el = document.getElementById(id);
        if (el) el.addEventListener(event, handler);
    }

    // Top fast travel tabs
    document.querySelectorAll(".loc-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.id === "top-tab-system") {
                openModal("modal-system");
                switchToSystemTab("systab-checkin");
                return;
            }
            const targetLoc = btn.getAttribute("data-location");
            if (targetLoc && LOCATIONS_CONFIG[targetLoc]) {
                player.currentLocation = targetLoc;
                const travelMins = targetLoc === "adventure" ? (15 / 60) : (5 / 60);
                advanceTime(travelMins);
                renderCurrentLocationStage();
            }
        });
    });

    // Mở Bảng Hệ Thống từ Banner Sidebar hoặc Dock
    safeAddListener("btn-sidebar-system", "click", () => {
        openModal("modal-system");
        switchToSystemTab("systab-checkin");
    });

    safeAddListener("btn-open-system", "click", () => {
        openModal("modal-system");
        switchToSystemTab("systab-checkin");
    });
    safeAddListener("btn-close-system", "click", () => closeModal("modal-system"));

    // Thao tác nhanh Thể Lực
    safeAddListener("btn-stamina-pill", "click", () => {
        if (player.staminaPillCountToday >= 5) {
            alert("Hôm nay đã nuốt tối đa 5 viên Bồi Nguyên Đan rồi! Cần để cơ thể tiêu hóa dược lực.");
            return;
        }
        const pillItem = player.inventory.find(i => i.id === "boi_nguyen_dan" && i.count > 0);
        if (!pillItem) {
            alert("Túi trữ vật đã hết Bồi Nguyên Đan! Hãy đến Phường Thị để mua thêm.");
            return;
        }
        pillItem.count -= 1;
        player.staminaPillCountToday += 1;
        player.stamina = Math.min(player.maxStamina, player.stamina + 40);
        if (window.soundEngine) window.soundEngine.playCoins();
        addLog(`Nuốt 1 Bồi Nguyên Đan, hồi phục 40 Thể Lực (${player.staminaPillCountToday}/5 lần hôm nay).`, "success");
        updateSidebarUI();
    });

    safeAddListener("btn-stamina-rest", "click", () => {
        if (player.staminaRestCountToday >= 1) {
            alert("Hôm nay đã tĩnh tọa nghỉ ngơi rồi!");
            return;
        }
        player.staminaRestCountToday += 1;
        player.stamina = Math.min(player.maxStamina, player.stamina + 25);
        advanceTime(1);
        addLog("Tĩnh tọa nghỉ ngơi 1 giờ, hồi phục 25 Thể Lực.", "info");
        updateSidebarUI();
    });

    safeAddListener("btn-stamina-sleep", "click", () => {
        const hoursTillSix = (24 - player.timeHour + 6) % 24 || 24;
        advanceTime(hoursTillSix);
        player.stamina = player.maxStamina;
        addLog("Một giấc ngủ say tới sáng hôm sau! Thể lực khôi phục 100%.", "special");
        alert("💤 Một đêm trôi qua, cơ thể tràn đầy sinh lực!");
        updateSidebarUI();
    });

    // Các nút mở Modal nhanh trên Sidebar Dock
    safeAddListener("btn-open-techniques", "click", () => {
        openModal("modal-system");
        switchToSystemTab("systab-techniques");
    });
    safeAddListener("btn-close-techniques", "click", () => closeModal("modal-techniques"));

    safeAddListener("btn-open-gus", "click", () => {
        openModal("modal-gu-inventory");
        renderGuModal();
    });
    safeAddListener("btn-close-gus", "click", () => closeModal("modal-gu-inventory"));

    safeAddListener("btn-open-inventory", "click", () => {
        openModal("modal-inventory");
        renderInventoryModal();
    });
    safeAddListener("btn-close-inventory", "click", () => closeModal("modal-inventory"));

    safeAddListener("btn-open-log", "click", () => openModal("modal-log"));
    safeAddListener("btn-close-log", "click", () => closeModal("modal-log"));

    safeAddListener("btn-toggle-sound", "click", () => {
        if (window.soundEngine) {
            const on = window.soundEngine.toggle();
            alert(`Âm thanh đã: ${on ? 'BẬT 🔊' : 'TẮT 🔇'}`);
        }
    });

    safeAddListener("btn-save-game", "click", saveGame);
    safeAddListener("btn-reset-game", "click", resetGame);

    // Lập lịch bế quan
    safeAddListener("btn-open-schedule", "click", () => {
        openModal("modal-cultivate-schedule");
        updateScheduleSummary();
    });
    safeAddListener("btn-close-sched-top", "click", () => closeModal("modal-cultivate-schedule"));
    safeAddListener("btn-cancel-sched", "click", () => closeModal("modal-cultivate-schedule"));
    safeAddListener("btn-execute-sched", "click", executeCultivateSchedule);

    safeAddListener("sched-days", "input", updateScheduleSummary);
    safeAddListener("sched-hours", "input", updateScheduleSummary);

    // Tu luyện nhanh 1 ngày (8 giờ đả tọa)
    safeAddListener("btn-quick-meditate-day", "click", () => {
        if (player.rankIdx < 5 && player.stamina < 30) {
            alert("Thể lực không đủ để tu luyện 1 ngày (Cần 30 Thể Lực)!");
            return;
        }
        if (player.rankIdx < 5) player.stamina = Math.max(0, player.stamina - 30);
        const baseGain = 28 + (player.comprehension * 0.4);
        const expGain = Math.max(1, Math.round(baseGain * player.aptitude.rate * (player.canCot / 100)));
        player.exp += expGain;
        advanceTime(8, 1);
        checkExpThreshold();
        if (window.soundEngine) window.soundEngine.playMeditate();
        addLog(`Tu luyện 1 ngày (8 giờ đả tọa) nhận được +${expGain} Tu Vi.`, "success");
        updateSidebarUI();
    });

    // Đột phá cảnh giới
    safeAddListener("btn-breakthrough", "click", attemptBreakthrough);

    // Tiền trang đóng
    safeAddListener("btn-close-exchange-top", "click", () => closeModal("modal-exchange-currency"));
    safeAddListener("btn-close-exchange", "click", () => closeModal("modal-exchange-currency"));

    // Cửa hàng Phường Thị
    safeAddListener("btn-close-market-shop", "click", () => closeModal("modal-market-shop"));
    document.querySelectorAll(".market-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".market-tab-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const target = btn.getAttribute("data-markettab");
            document.querySelectorAll(".market-pane").forEach(p => p.classList.remove("active"));
            const targetPane = document.getElementById(target);
            if (targetPane) targetPane.classList.add("active");
            renderMarketShop();
        });
    });

    // Tàng Kinh Các
    safeAddListener("btn-close-lib-shop", "click", () => closeModal("modal-library-shop"));
    document.querySelectorAll(".lib-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".lib-tab-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const target = btn.getAttribute("data-libtab");
            document.querySelectorAll(".lib-pane").forEach(p => p.classList.remove("active"));
            const targetPane = document.getElementById(target);
            if (targetPane) targetPane.classList.add("active");
            renderLibraryShop();
        });
    });

    // Lọc cổ phương
    safeAddListener("recipe-rank-filter", "change", renderRecipesPane);
    safeAddListener("recipe-search-input", "input", renderRecipesPane);

    // Lọc cổ trùng đa chiều
    safeAddListener("gu-rank-select", "change", renderGuModal);
    safeAddListener("gu-type-select", "change", renderGuModal);
    safeAddListener("gu-path-select", "change", renderGuModal);
    safeAddListener("gu-search-box", "input", renderGuModal);

    // Điểm danh
    safeAddListener("btn-claim-checkin", "click", claimDailyCheckin);

    // ==========================================
    // CÁC SỰ KIỆN TRANG MỞ ĐẦU 5 BƯỚC
    // ==========================================

    // Bước 1: Random tên & Tiếp tục
    safeAddListener("btn-random-name", "click", () => {
        const names = ["Cổ Nguyệt Phương Nguyên", "Cổ Nguyệt Phương Chính", "Cổ Nguyệt Phong", "Bạch Ngưng Băng", "Tiêu Viêm", "Hàn Lập", "Thẩm Lãng", "Lâm Động", "Lục Trầm"];
        const picked = names[Math.floor(Math.random() * names.length)];
        const inputName = document.getElementById("input-char-name");
        if (inputName) inputName.value = picked;
    });

    safeAddListener("btn-step1-next", "click", () => {
        const inputName = document.getElementById("input-char-name");
        const charName = inputName ? inputName.value.trim() : "Cổ Nguyệt Phong";
        resetPlayerToFreshState(charName || "Cổ Nguyệt Phong");
        prepareAwakeningMiniGame();
        switchIntroStep(2);
    });

    safeAddListener("btn-continue-game", "click", () => {
        if (loadGame()) {
            const introScreen = document.getElementById("intro-awakening-screen");
            if (introScreen) introScreen.classList.add("hidden");
            alert(`🎉 Chào mừng ${player.name} đã trở lại Cổ Giới Tu Tiên!`);
        } else {
            alert("Không thể khôi phục ký ức cũ. Hãy bắt đầu kiếp tu hành mới!");
        }
    });

    // Bước 2: Mini-game sông khai khiếu
    safeAddListener("btn-start-mini", "click", startAwakeningMiniGame);
    safeAddListener("btn-manual-choose-rank", "click", showManualRankSelection);

    document.querySelectorAll(".btn-manual-rank").forEach(btn => {
        btn.addEventListener("click", () => {
            const rankKey = btn.getAttribute("data-rank") || "B";
            selectManualRank(rankKey);
        });
    });

    // Bước 3: Xem kết quả -> Qua Đo Linh Bàn
    safeAddListener("btn-step3-next", "click", () => {
        switchIntroStep(4);
        if (linhCanRollsLeft === 10 && !currentRolledLinhCan) {
            rollLinhCanRandom(); // Tự động quay mở màn
        }
    });

    // Bước 4: Đo Linh Bàn (10 lượt) & Chế độ tu luyện
    safeAddListener("btn-roll-linhcan", "click", rollLinhCanRandom);
    safeAddListener("btn-lock-linhcan", "click", lockCurrentLinhCan);

    document.querySelectorAll(".mode-choice-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".mode-choice-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const radio = btn.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    safeAddListener("btn-step4-next", "click", () => {
        if (!player.linhCan) {
            if (currentRolledLinhCan) player.linhCan = currentRolledLinhCan;
            else player.linhCan = SPIRITUAL_ROOTS[0];
        }
        renderStarterGuGrid();
        switchIntroStep(5);
    });

    // Bước 5: Chọn Bản Mệnh Cổ & Xác nhận
    safeAddListener("sb-starter-gu-row", "click", () => {
        if (!player.guInventory || player.guInventory.length === 0) {
            switchIntroStep(5);
            renderStarterGuGrid();
            const introScreen = document.getElementById("intro-awakening-screen");
            if (introScreen) introScreen.classList.remove("hidden");
        } else {
            openModal("modal-gu-inventory");
            renderGuModal();
        }
    });

    safeAddListener("btn-confirm-starter-gu", "click", confirmStarterGuSelection);

    // Thu gọn Sidebar
    safeAddListener("btn-toggle-sidebar", "click", () => {
        const sidebar = document.querySelector(".sidebar-apocalyptic");
        if (sidebar) sidebar.classList.toggle("collapsed");
    });

    setupSystemSubtabs();
    setupAiGenerator();
}

// ============================================================
// 21. HIỆU ỨNG HẠT LINH KHÍ BACKGROUND CANVAS
// ============================================================

function initQiParticleCanvas() {
    const canvas = document.getElementById("qi-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const pCount = 35;
    for (let i = 0; i < pCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.5 + 1,
            color: Math.random() > 0.5 ? "rgba(56, 189, 248, 0.4)" : "rgba(16, 185, 129, 0.4)",
            vx: (Math.random() - 0.5) * 0.4,
            vy: -Math.random() * 0.6 - 0.2
        });
    }

    function renderLoop() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.y < 0) {
                p.y = height;
                p.x = Math.random() * width;
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.fill();
        });
        requestAnimationFrame(renderLoop);
    }
    renderLoop();
}

// ============================================================
// 22. WINDOW ONLOAD BOOTSTRAP & DEFENSIVE STARTUP
// ============================================================

function initGameStartup() {
    const savedData = safeGetStorage("TUTIEN_V4_SAVE");
    const btnContinue = document.getElementById("btn-continue-game");
    const introScreen = document.getElementById("intro-awakening-screen");

    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            if (btnContinue && parsed && parsed.name) {
                const realmName = (RANKS && RANKS[parsed.rankIdx]) ? RANKS[parsed.rankIdx].name : "Tu Sĩ";
                const subName = (SUB_STAGES && SUB_STAGES[parsed.subStageIdx]) ? SUB_STAGES[parsed.subStageIdx].name : "";
                btnContinue.classList.remove("hidden");
                btnContinue.innerHTML = `💾 Tiếp Tục Tu Hành (${parsed.name} • ${realmName} ${subName})`;
            }

            // Nếu người chơi đã có bản lưu hoàn chỉnh và đã chọn Bản Mệnh Cổ: Ẩn intro screen và nạp game
            if (parsed && Array.isArray(parsed.guInventory) && parsed.guInventory.length > 0) {
                loadGame();
                if (introScreen) introScreen.classList.add("hidden");
                return;
            }
        } catch (e) {
            console.warn("Lỗi kiểm tra bản lưu cũ:", e);
            if (btnContinue) btnContinue.classList.add("hidden");
        }
    } else {
        if (btnContinue) btnContinue.classList.add("hidden");
    }

    // Nếu là người mới hoặc chưa chọn Cổ: Hiển thị Trang Mở Đầu Toàn Cảnh tại Step 1
    if (introScreen) {
        introScreen.classList.remove("hidden");
        switchIntroStep(1);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    initQiParticleCanvas();
    updateSidebarUI();
    renderCurrentLocationStage();
    initGameStartup();
});
