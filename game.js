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

    { id: 1, name: "Trung Giai", multiplier: 1.8 },

    { id: 2, name: "Cao Giai", multiplier: 3.2 },

    { id: 3, name: "Đỉnh Phong", multiplier: 5.2 },

    { id: 4, name: "Viên Mãn", multiplier: 8.0 },

    { id: 5, name: "Đại Viên Mãn", multiplier: 12.8 }

];



const RANKS = [

    { rank: 1, name: "Nhất Chuyển", immortalEquiv: "Luyện Khí Kỳ", guRankName: "Nhất Chuyển", daoRealmName: "Nhất Chuyển", baseExp: 450, maxHp: 220, maxMp: 160, maxAge: 120, expStepMult: 1.15, power: 30, staminaBonus: 0, wallName: "Màng Quang Thô Sơ", seaName: "Thanh Đồng Hải" },

    { rank: 2, name: "Nhị Chuyển", immortalEquiv: "Trúc Cơ Kỳ", guRankName: "Nhị Chuyển", daoRealmName: "Nhị Chuyển", baseExp: 1600, maxHp: 650, maxMp: 500, maxAge: 200, expStepMult: 1.25, power: 90, staminaBonus: 20, wallName: "Màng Ngọc Kiên Cố", seaName: "Xích Thiết Hải" },

    { rank: 3, name: "Tam Chuyển", immortalEquiv: "Kết Đan Kỳ", guRankName: "Tam Chuyển", daoRealmName: "Tam Chuyển", baseExp: 5000, maxHp: 1800, maxMp: 1400, maxAge: 500, expStepMult: 1.45, power: 280, staminaBonus: 40, wallName: "Màng Bạc Lấp Lánh", seaName: "Bạch Ngân Hải" },

    { rank: 4, name: "Tứ Chuyển", immortalEquiv: "Nguyên Anh Kỳ", guRankName: "Tứ Chuyển", daoRealmName: "Tứ Chuyển", baseExp: 15000, maxHp: 4800, maxMp: 3800, maxAge: 1200, expStepMult: 1.75, power: 950, staminaBonus: 60, wallName: "Màng Tinh Thạch Vàng", seaName: "Hoàng Kim Hải" },

    { rank: 5, name: "Ngũ Chuyển", immortalEquiv: "Hóa Thần Kỳ", guRankName: "Ngũ Chuyển", daoRealmName: "Ngũ Chuyển", baseExp: 45000, maxHp: 13000, maxMp: 10500, maxAge: 2500, expStepMult: 2.1, power: 3200, staminaBonus: 100, wallName: "Màng Tinh Thạch Tím", seaName: "Tử Tinh Hải" },

    { rank: 6, name: "Lục Chuyển (Cổ Tiên)", immortalEquiv: "Luyện Hư Kỳ", guRankName: "Lục Chuyển", daoRealmName: "Lục Chuyển", baseExp: 150000, maxHp: 40000, maxMp: 35000, maxAge: 5000, expStepMult: 2.5, power: 13000, staminaBonus: 999999, wallName: "Tiên Khiếu Phúc Địa", seaName: "Thanh Đề Tiên Nguyên" },

    { rank: 7, name: "Thất Chuyển (Cổ Tiên)", immortalEquiv: "Hợp Thể Kỳ", guRankName: "Thất Chuyển", daoRealmName: "Thất Chuyển", baseExp: 500000, maxHp: 120000, maxMp: 110000, maxAge: 10000, expStepMult: 3.0, power: 45000, staminaBonus: 999999, wallName: "Pháp Thể Kim Thân", seaName: "Hồng Táo Tiên Nguyên" },

    { rank: 8, name: "Bát Chuyển (Cổ Tiên)", immortalEquiv: "Đại Thừa Kỳ", guRankName: "Bát Chuyển", daoRealmName: "Bát Chuyển", baseExp: 1800000, maxHp: 380000, maxMp: 350000, maxAge: 30000, expStepMult: 3.6, power: 150000, staminaBonus: 999999, wallName: "Độ Kiếp Động Thiên", seaName: "Bạch Lệ Tiên Nguyên" },

    { rank: 9, name: "Cửu Chuyển (Cổ Tôn)", immortalEquiv: "Chân Tiên Cảnh", guRankName: "Cửu Chuyển", daoRealmName: "Cửu Chuyển", baseExp: 6500000, maxHp: 1200000, maxMp: 1100000, maxAge: 100000, expStepMult: 4.5, power: 500000, staminaBonus: 999999, wallName: "Chí Tôn Tiên Thai Khiếu", seaName: "Hoàng Hạnh Tiên Nguyên" }

];



const APTITUDES = {
    C: { rank: "C", name: "Đinh Đẳng (Hạng C)", rate: 0.70, seaPct: 0.25, color: "#94a3b8", desc: "Không khiếu u ám, chỉ chứa 2-3 phần chân nguyên, tu luyện chậm chạp." },
    B: { rank: "B", name: "Bính Đẳng (Hạng B)", rate: 1.00, seaPct: 0.45, color: "#60a5fa", desc: "Không khiếu sáng sủa, chứa 4-5 phần chân nguyên, tư chất trung bình gia tộc." },
    A: { rank: "A", name: "Ất Đẳng (Hạng A)", rate: 1.40, seaPct: 0.65, color: "#f59e0b", desc: "Không khiếu ánh bạc, chứa 6-7 phần chân nguyên, thiên tài gia tộc trọng vọng." },
    S: { rank: "S", name: "Giáp Đẳng (Hạng S)", rate: 1.70, seaPct: 0.85, color: "#10b981", desc: "Không khiếu kim quang chói lòa, chứa 8-9 phần chân nguyên, ngàn người có một!" }
};



const SPECIAL_PHYSIQUES = [

    { id: "none", name: "Phàm Thể", rateBoost: 0, desc: "Thân thể bình thường không có dị tượng.", specialTrait: "Đạo cơ vững chắc, không lo phản phệ nứt khiếu, tâm cảnh thanh tịnh." },

    { id: "thai_nhat", name: "Thái Nhật Dương Mãng Thể", rateBoost: 1.0, powerBonus: 30, hpBonus: 50, desc: "+100% Tốc độ tu luyện. Cực hạn Viêm Đạo & Lực Đạo, khí huyết như mặt trời chói chang.", specialTrait: "+30 Uy Lực, +50 Khí Huyết. Uy lực Viêm Đạo & Lực Đạo tăng 50%, giảm 30% Thể Lực tiêu hao khi chiến đấu." },

    { id: "co_nguyet", name: "Cổ Nguyệt Âm Hoang Thể", rateBoost: 1.0, mpBonus: 50, desc: "+100% Tốc độ tu luyện. Cực hạn Quang Đạo & Nguyệt Đạo, chân nguyên u lam tinh thuần vô song.", specialTrait: "+50 Chân Nguyên tối đa. Chân nguyên u lam tinh thuần, tốc độ hồi phục chân nguyên ban đêm tăng gấp 2." },

    { id: "bac_minh", name: "Bắc Minh Băng Phách Thể", rateBoost: 1.0, defBonus: 30, canCotBonus: 20, desc: "+100% Tốc độ tu luyện. Cực hạn Hàn Đạo & Băng Đạo, đông kết vạn vật sinh linh.", specialTrait: "+30 Phòng Ngự, +20 Căn Cốt. Hàn khí thấu cốt, sát thương Hàn Đạo tăng 60%, miễn nhiễm hàn độc." },

    { id: "sam_hai", name: "Sâm Hải Luân Hồi Thể", rateBoost: 1.0, maxAgeBonus: 50, hpRegenDaily: 10, desc: "+100% Tốc độ tu luyện. Cực hạn Mộc Đạo & Sinh Mệnh, tự hồi máu và gia tăng thọ nguyên.", specialTrait: "+50 Năm Thọ Nguyên, tự hồi phục 10 Khí Huyết mỗi ngày, tương thích tuyệt đối với Mộc Đạo." },

    { id: "viem_hoang", name: "Viêm Hoàng Lôi Trạch Thể", rateBoost: 1.0, powerBonus: 25, desc: "+100% Tốc độ tu luyện. Cực hạn Lôi Đạo & Viêm Đạo, sấm sét lôi đình bộc phát hủy diệt.", specialTrait: "+25 Uy Lực. 30% tỷ lệ kích hoạt Cuồng Bạo Lôi Đình gây gấp đôi sát thương khi thi triển chiêu thức." },

    { id: "van_kim", name: "Vạn Kim Diệu Hoa Thể", rateBoost: 1.0, hpBonus: 50, canCotBonus: 30, desc: "+100% Tốc độ tu luyện. Cực hạn Kim Đạo & Quang Đạo, thân thể bất hoại như thần kim.", specialTrait: "+50 Khí Huyết, +30 Căn Cốt. Kim thân bất hoại, giảm 30% mọi sát thương vật lý và chấn động gánh chịu." },

    { id: "dai_luc", name: "Đại Lực Chân Vũ Thể", rateBoost: 1.0, powerBonus: 40, staminaBonus: 30, desc: "+100% Tốc độ tu luyện. Cực hạn Lực Đạo thuần túy, cử đỉnh bạt sơn, cận chiến vô địch.", specialTrait: "+40 Uy Lực, +30 Thể Lực tối đa. Cử đỉnh bạt sơn, đòn đánh tay không hoặc Lực Đạo tăng 70% uy lực." },

    { id: "tieu_dieu", name: "Tiêu Diêu Trí Tâm Thể", rateBoost: 1.0, compBonus: 15, intelBonus: 10, desc: "+100% Tốc độ tu luyện. Cực hạn Trí Đạo, ngộ tính nghịch thiên, học công pháp tức thì.", specialTrait: "+15 Ngộ Tính, +10 Trí Mưu. Thất khiếu linh lung, tốc độ lĩnh ngộ công pháp và cổ phương tăng gấp đôi." },

    { id: "hon_quy", name: "Hồn Quy Thiến U Thể", rateBoost: 1.0, senseBonus: 20, spiritBonus: 20, desc: "+100% Tốc độ tu luyện. Cực hạn Hồn Đạo, thần thức vô lượng, nhiếp hồn đoạt phách.", specialTrait: "+20 Thần Thức, +20 Tinh Thần Lực. Hồn phách ngưng thực, tăng 20% tỷ lệ hợp luyện cổ trùng thành công." },

    { id: "khong_tuyet", name: "Không Tuyệt Không Thể", rateBoost: 1.0, speedBonus: 25, desc: "+100% Tốc độ tu luyện. Cực hạn Vũ Đạo / Không Gian, độn không vô ảnh, dịch chuyển tức thời.", specialTrait: "+25 Thân Pháp / Tốc Độ. Độn không vô ảnh, di chuyển tức thời không tốn thời gian, tránh né 40% đòn đánh." }

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

    { id: "kim", name: "Kim Đạo", desc: "Độ cứng và sắc bén của kim loại, khoáng thạch vô địch.", killerMove: "Kim Cương Bất Bại Thân" },

    { id: "thuc", name: "Thực Đạo", desc: "Quy tắc nuốt và tiêu hóa vạn vật, nền tảng chế biến cổ tài và đồ đằng sát chiêu.", killerMove: "Thôn Thiên Thực Địa Sát Chiêu" },

    { id: "van", name: "Vận Đạo", desc: "Thao túng biến số đối lập Túc Mệnh, chuyển hóa kiếp vận và hồng vận nghê thường.", killerMove: "Chúng Sinh Vận Hồng Sa" },

    { id: "thau", name: "Thâu Đạo", desc: "Cướp đoạt cổ trùng, thọ nguyên và đạo ngân thiên địa về tay mình.", killerMove: "Đại Đạo Quỷ Thủ" },

    { id: "mong", name: "Mộng Đạo", desc: "Thăm dò mộng cảnh hấp thụ chân ý, công kích vô phương phòng ngự.", killerMove: "Giải Mộng Thiên Hoa" },

    { id: "thien", name: "Thiên Đạo", desc: "Quy tắc tối cao 'Tổn hữu dư nhi bổ bất túc', điều khiển tai kiếp và che mắt thiên cơ.", killerMove: "Thiên Võng Khôi Khôi" },

    { id: "tin", name: "Tín Đạo", desc: "Khắc ấn đạo ngân minh ước ràng buộc sinh tử, truyền tin và khai sáng thiên cơ.", killerMove: "Thiên Cương Địa Thường" },

];



const DAO_LEVELS = [

    { level: 0, name: "Phổ Thông", reqMarks: 0, reqExp: 0, bonus: 0, desc: "Sơ nhập lưu phái, nắm vững kiến thức căn bản." },

    { level: 1, name: "Chuẩn Đại Sư", reqMarks: 300, reqExp: 300, bonus: 15, desc: "Cảm ứng đạo ngân, thao túng cổ trùng lưu phái thuần thục." },

    { level: 2, name: "Đại Sư", reqMarks: 1500, reqExp: 1500, bonus: 35, desc: "Khai sinh trực giác nghệ thuật, giảm tiêu hao chân nguyên 15%." },

    { level: 3, name: "Chuẩn Tông Sư", reqMarks: 5000, reqExp: 5000, bonus: 70, desc: "Thấu hiểu quy tắc lưu phái, liên thông một phần đạo ngân." },

    { level: 4, name: "Tông Sư", reqMarks: 15000, reqExp: 15000, bonus: 120, desc: "Lẫn lộn tương thông, mượn đạo phái khác bù đắp bản đạo." },

    { level: 5, name: "Chuẩn Đại Tông Sư", reqMarks: 50000, reqExp: 50000, bonus: 200, desc: "Cận kề bản nguyên thiên địa, uy lực sát chiêu tăng vọt." },

    { level: 6, name: "Đại Tông Sư (Sát Chiêu)", reqMarks: 150000, reqExp: 150000, bonus: 320, desc: "Thấu triệt tự nhiên, tự thân diễn biến sát chiêu thiên địa vô song (Cần: Đạo Ngân ≥ 150k, Ngộ Tính ≥ 30, Trí Mưu ≥ 25, Khí Vận ≥ 20)." },

    { level: 7, name: "Vô Thượng Đại Tông Sư", reqMarks: 500000, reqExp: 500000, bonus: 500, desc: "Vượt qua giới hạn thiên địa, sáng tạo đạo lý trước nay chưa từng có!" }

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



const SPIRITUAL_ROOTS = [];



const SYSTEM_SHOP_ITEMS = [
    {
        id: "dinh_khieu_dan",
        name: "Định Khiếu Đan",
        cost: 40,
        desc: "Đan dược cổ truyền giúp ổn định vách không khiếu, phục hồi 60% độ ổn định vách khiếu cho Thập Tuyệt Thể.",
        icon: "🪐",
        apply: () => {
            player.apertureStability = Math.min(100, (player.apertureStability || 100) + 60);
            safePlaySound("playSuccess");
            addLog("Đã dùng Định Khiếu Đan! Vách không khiếu được ổn định hoàn hảo, phục hồi +60% độ bền!", "special");
            alert("🪐 Đã dùng Định Khiếu Đan!\nVách không khiếu đã được gia cố kiên cố, xua tan nguy cơ nứt vỡ!");
            updateSidebarUI();
            if (typeof renderAperturePane === "function") renderAperturePane();
        }
    },

    { id: "shop_tay_tuy", name: "Tẩy Tủy Thần Đan", pts: 60, desc: "Chữa lành hoàn toàn 100% Căn Cốt tổn thương do đột phá thất bại.", type: "pill", canCotRestore: 100 },

    { id: "shop_the_luc", name: "Bổ Thể Kim Đan (x5)", pts: 30, desc: "Gói 5 viên đan dược hồi phục tức thì 50 Thể Lực mỗi viên.", type: "stamina", count: 5 },

    { id: "shop_ngung_khi", name: "Ngưng Khí Đan (x3)", pts: 40, desc: "Đan dược tinh thuần, uống vào tăng ngay 100 điểm Tu Vi.", type: "pill_exp", expGain: 100 },

    { id: "shop_dinh_nhan", name: "Định Nhan Thần Đan", pts: 50, desc: "Gia tăng thêm 50 năm tuổi thọ và dung mạo bất lão.", type: "age", ageAdd: 50 },

    
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

    // Hệ thống thuần túy Cổ Chân Nhân (Không có Linh Căn)

    cultivateMode: "gu",     // "dual": Kiêm tu, "gu": Thuần tu Cổ, "technique": Thuần tu Pháp



    // Lưu phái tu luyện (Tối đa 5/30 Đạo)

    activeDaos: ["quang"],

    mainDao: "quang",

    daoMarks: {

        quang: 20

    },

    daoLevels: {

        quang: { exp: 20, marks: 20, level: 0 }

    },

    devModeActive: false,
    vitalGuId: null,
    systemLevel: "1.0",
    checkinStreak: 1,
    apertureStability: 100,
    isDaoLord: false,
    immortalEssence: {
        thanhDe: 0,
        hongTao: 0,
        bachLe: 0,
        hoangHanh: 0
    },

    vitalGuId: null,

    isDaoLord: false,

    immortalEssence: {

        thanhDe: 0,

        hongTao: 0,

        bachLe: 0,

        hoangHanh: 0

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



    // Sát Chiêu Cổ Trùng & Cổ Bản Mệnh (Chuẩn Cổ Chân Nhân)
    vitalGuId: "gu_liquor_worm_1",
    mainPath: "Thực Đạo",
    killerMovesLearned: [
        {
            id: "km_nguyet_nhan_lien_xa",
            name: "Nguyệt Nhận Liên Xạ",
            path: "Quang Đạo",
            masteryExp: 30,
            masteryStage: "Nhập Môn"
        },
        {
            id: "km_bach_thi_the_phach",
            name: "Bạch Thỉ Thể Phách",
            path: "Lực Đạo",
            masteryExp: 50,
            masteryStage: "Nhập Môn"
        }
    ],
    activeKillerMoves: ["km_nguyet_nhan_lien_xa", "km_bach_thi_the_phach"],

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

        

        cultivateMode: "gu",



        activeDaos: ["moc"],

        mainDao: "Mộc Đạo",

        mainTechId: "truong_xuan_cong",

        daoMarks: {

            moc: 20,

            quang: 20

        },

        daoLevels: {

            moc: { exp: 20, marks: 20, level: 0 },

            quang: { exp: 20, marks: 20, level: 0 }

        },

        devModeActive: false,
    vitalGuId: null,
    systemLevel: "1.0",
    checkinStreak: 1,
    apertureStability: 100,
    isDaoLord: false,
    immortalEssence: {
        thanhDe: 0,
        hongTao: 0,
        bachLe: 0,
        hoangHanh: 0
    },

    vitalGuId: null,

    isDaoLord: false,

    immortalEssence: {

        thanhDe: 0,

        hongTao: 0,

        bachLe: 0,

        hoangHanh: 0

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

            } else {

                const foundPhys = SPECIAL_PHYSIQUES.find(p => p.id === player.specialPhysique.id);

                if (foundPhys) player.specialPhysique = Object.assign({}, foundPhys, player.specialPhysique);

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

    // 1. Thời gian & Thứ & Ngày (Định dạng chuẩn 24h HH:MM không bị tràn số thập phân)

    const weekdayName = WEEKDAYS[player.timeDay % 7];

    const totalMinutes = Math.round((player.timeHour || 8) * 60);

    const displayHours = Math.floor(totalMinutes / 60) % 24;

    const displayMinutes = totalMinutes % 60;

    const hourStr = `${displayHours.toString().padStart(2, "0")}:${displayMinutes.toString().padStart(2, "0")}`;

    

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



    // Cập nhật Tư Chất trên Sidebar

    const elAptitude = document.getElementById("sb-aptitude-text");

    if (elAptitude && player.aptitude) {

        elAptitude.textContent = `${player.aptitude.name} (${Math.round((player.aptitude.seaPct || 0.45) * 100)}%)`;

        elAptitude.style.color = player.aptitude.color || "#fbbf24";

    }



    // Cập nhật Tư Chất & Bản Mệnh Cổ trên Sidebar (Chuẩn Cổ Chân Nhân)
    const elApt = document.getElementById("sb-aptitude-text");
    if (elApt) {
        if (player.hasSpecialPhysique) {
            elApt.textContent = "Thập Tuyệt Thể (100%)";
            elApt.style.color = "#fbbf24";
        } else if (player.aptitude) {
            const aptPct = player.aptitudePercentage || Math.round(player.aptitude.seaPct * 100);
            elApt.textContent = `${player.aptitude.name.split(' ')[0]} (${aptPct}%)`;
            elApt.style.color = player.aptitude.color || "#60a5fa";
        }
    }
    const elVitalGu = document.getElementById("sb-vitalgu-text");
    if (elVitalGu) {
        let vName = "Chưa Ký Túc";
        if (player.guInventory && Array.isArray(player.guInventory)) {
            const vg = player.guInventory.find(g => g.isVital);
            if (vg) vName = vg.name;
        }
        if (vName === "Chưa Ký Túc" && player.vitalGuId) {
            if (window.GU_DATABASE) {
                const found = window.GU_DATABASE.find(g => g.id === player.vitalGuId || g.id === player.vitalGuId.replace('gu_', ''));
                if (found) vName = found.name;
            }
        }
        elVitalGu.textContent = vName;
    }



    // Cập nhật Thể Chất trên Sidebar

    const elPhysique = document.getElementById("sb-physique-text");

    if (elPhysique && player.specialPhysique) {

        elPhysique.textContent = player.specialPhysique.name;

        elPhysique.style.color = player.specialPhysique.id === "none" ? "#94a3b8" : "#a855f7";

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

            const rate = player.isDaiVienMan ? Math.round(95 * (player.canCot / 100)) : Math.round(65 * (player.canCot / 100));

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

    // Cộng thêm từ Thể Chất Đạo Thể

    if (player.specialPhysique && player.specialPhysique.powerBonus) {

        base += player.specialPhysique.powerBonus;

    }

    // Cộng thêm từ các công pháp đã học

    if (window.TECHNIQUES_DATABASE && player.techniquesLearned) {

        player.techniquesLearned.forEach(tl => {

            const db = window.TECHNIQUES_DATABASE.find(t => t.id === tl.id);

            if (db) {

                base += (db.rank * 15);

            }

        });

    }

    // Cộng thêm từ Cổ Trùng TẤN CÔNG trong không khiếu (Loại Hỗ Trợ/Tàng Trữ/Trị Liệu không có sức tấn công)

    if (player.guInventory) {

        player.guInventory.forEach(g => {

            if (g.type === "Tấn Công" || (g.power > 0 && g.type !== "Hỗ Trợ" && g.type !== "Tàng Trữ")) {

                base += (g.power || 0);

            }

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

            // Cân chỉnh tốc độ tu luyện chuẩn Cổ Chân Nhân (Đinh: 0.7, Bính: 1.0, Ất: 1.4, Giáp: 1.7, Thập Tuyệt: 2.0)
            const baseGain = 7 + ((player.comprehension || 10) * 0.2);
            let aptRate = 1.0;
            if (player.hasSpecialPhysique) {
                aptRate = 2.0; // Thập Tuyệt Thể
            } else if (player.aptitude && player.aptitude.rate) {
                aptRate = player.aptitude.rate;
            }
            const canCotRate = (player.canCot || 100) / 100;
            const expGained = Math.max(1, Math.round(baseGain * aptRate * canCotRate * locDensity));



            player.exp += expGained;

            // Hồi phục Chân Nguyên (x5)

            player.mp = Math.min(player.maxMp, player.mp + 25);



            // Thôn phệ Đạo Ngân thiên địa theo Lưu Phái và Cổ Trùng sở hữu

            const mainDaoId = player.mainDao || "moc";

            const daoMarksGained = Math.round(15 * locDensity);

            addDaoMarks(mainDaoId, daoMarksGained);



            if (player.guInventory && player.guInventory.length > 0) {

                const guDaoMap = {

                    "Quang Đạo": "quang", "Khí Đạo": "khi", "Thổ Đạo": "tho", "Mộc Đạo": "moc",

                    "Kim Đạo": "kim", "Huyết Đạo": "huyet", "Lực Đạo": "luc", "Hàn Đạo": "han",

                    "Viêm Đạo": "viem", "Lôi Đạo": "loi", "Ám Đạo": "am", "Phong Đạo": "phong",

                    "Hồn Đạo": "hon", "Trí Đạo": "tri", "Trận Đạo": "tran", "Luyện Đạo": "luyen",

                    "Kiếm Đạo": "kiem", "Đan Đạo": "dan", "Độc Đạo": "doc", "Nô Đạo": "no",

                    "Biến Hóa Đạo": "bien_hoa", "Trụ Đạo": "tru", "Vũ Đạo": "vu"

                };

                player.guInventory.forEach(g => {

                    const gDao = guDaoMap[g.path];

                    if (gDao && gDao !== mainDaoId) {

                        addDaoMarks(gDao, 5);

                    }

                });

            }



            checkExpThreshold();



            title = "🧘 Tọa Thiền Thổ Nạp Hoàn Tất";

            desc = `Ngươi ngồi xếp bằng đả tọa trong ${hoursCost} giờ, vận chuyển chân khí một vòng chu thiên. Linh khí đất trời cuồn cuộn đổ vào không khiếu ôn dưỡng đan điền, chuyển hóa thành Đạo Ngân bản mệnh!`;

            lootHtml = `

                <div class="loot-tag text-jade">+${expGained} Tu Vi</div>

                <div class="loot-tag text-cyan">+25 Chân Nguyên Hồi Phục</div>

                <div class="loot-tag text-gold">+${daoMarksGained} Đạo Ngân (${mainDaoId.toUpperCase()})</div>

                <div class="loot-tag text-orange">-${staminaCost} Thể Lực (${hoursCost} Giờ)</div>

            `;

            addLog(`Tọa thiền thổ nạp thu hoạch +${expGained} Tu Vi, hồi phục 25 Chân Nguyên, thôn phệ +${daoMarksGained} Đạo Ngân.`, "success");

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



                // Thôn phệ Đạo Ngân từ chiến đấu

                // v5.3: Bỏ đạo ngân khi diệt yêu thú phàm cấp theo đúng nguyên tác



                title = `🐺 Tiêu Diệt Thành Công ${beast.name}!`;

                desc = `Sau một hồi giao chiến kịch liệt, ngươi đã hạ gục ${beast.name}. Thu hoạch nội đan, da thịt và tích lũy thêm kinh nghiệm thực chiến! Hãy chọn phương án xử lý chiến lợi phẩm:`;

                lootHtml = `

                    <div class="loot-tag text-gold">+10 Điểm Hệ Thống</div>

                    <div class="loot-tag text-cyan">+20 Đạo Ngân Chiến Đấu</div>

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

            if (roll > 0.5) {

                const stones = Math.floor(Math.random() * 40) + 20;

                player.stoneLow += stones;

                const rareItems = [

                    { id: "huyen_thiet_tinh", name: "Huyền Thiết Tinh" },

                    { id: "huyet_tinh_thach", name: "Huyết Tinh Thạch" },

                    { id: "bang_tinh_khoang", name: "Băng Tinh Khoáng" },

                    { id: "loi_kich_moc", name: "Lôi Kích Mộc" }

                ];

                const pickedItem = rareItems[Math.floor(Math.random() * rareItems.length)];

                addItemToInventory(pickedItem.id, 1, pickedItem.name, "material");



                title = `✨ Khám Phá Thạch Động Cổ`;

                desc = `Trong góc hang động tiền bối viễn cổ, ngươi phát hiện một hòm ngọc mục nát chứa linh thạch và khoáng vật thượng cổ!`;

                lootHtml = `

                    <div class="loot-tag text-gold">+${stones} Linh Thạch Hạ</div>

                    <div class="loot-tag text-jade">+1 ${pickedItem.name} (Vật Phẩm Cổ Giới)</div>

                `;

                addLog(`Thám hiểm thạch động nhặt được ${stones} Linh Thạch Hạ và 1 ${pickedItem.name}!`, "success");

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

            if (typeof player.libraryCompGained !== "number") player.libraryCompGained = 0;

            if (typeof player.libraryIntelGained !== "number") player.libraryIntelGained = 0;

            if (typeof player.libraryStudyCount !== "number") player.libraryStudyCount = 0;



            player.libraryStudyCount += 1;

            const maxCap = 10;

            const canGainComp = player.libraryCompGained < maxCap;

            const canGainIntel = player.libraryIntelGained < maxCap;



            // Thôn phệ Đạo Ngân từ đọc sách

            addDaoMarks(player.mainDao || "moc", 10);



            title = `📚 Nghiên Cứu Điển Tịch Thượng Cổ`;



            if (!canGainComp && !canGainIntel) {

                desc = `Ngươi nghiền ngẫm những cuốn da dê và trúc giản cổ, tích lũy thêm +10 Đạo Ngân, nhưng tâm trí đã đạt tới giới hạn lĩnh hội tàng thư phàm trần (Đã nhận tối đa +10 Ngộ Tính, +10 Trí Mưu). Cần tìm sách cổ cao cấp hơn hoặc đột phá cảnh giới để nâng cao thêm!`;

                lootHtml = `

                    <div class="loot-tag text-gold">+10 Đạo Ngân Lưu Phái</div>

                    <div class="loot-tag text-slate">Đã Đạt Giới Hạn Tàng Thư (10/10)</div>

                    <div class="loot-tag text-jade">Tâm Trí Tĩnh Lặng</div>

                `;

                addLog(`Nghiên cứu điển tịch thôn phệ +10 Đạo Ngân (đã đạt giới hạn tri thức phàm trần +10 Ngộ Tính, +10 Trí Mưu).`, "info");

            } else {

                let gainDesc = "";

                // Xác suất: nếu cả 2 còn slot, random 50/50; nếu chỉ còn 1 bên thì tăng bên đó

                if (canGainComp && (!canGainIntel || Math.random() < 0.5)) {

                    player.comprehension += 1;

                    player.libraryCompGained += 1;

                    gainDesc = `+1 Ngộ Tính (${player.libraryCompGained}/${maxCap})`;

                } else {

                    player.intelligence += 1;

                    player.libraryIntelGained += 1;

                    gainDesc = `+1 Trí Mưu (${player.libraryIntelGained}/${maxCap})`;

                }



                desc = `Ngươi cẩn thận lật giở từng trang thư tịch cổ, ánh mắt sáng ngời khi đốn ngộ được một tầng đạo lý huyền ảo, gia tăng Đạo Ngân và mở rộng thức hải.`;

                lootHtml = `

                    <div class="loot-tag text-gold">${gainDesc}</div>

                    <div class="loot-tag text-cyan">+10 Đạo Ngân Bản Mệnh</div>

                    <div class="loot-tag text-jade">Thức Hải Khai Thông</div>

                    <div class="loot-tag text-orange">-${staminaCost} Thể Lực (${hoursCost} Giờ)</div>

                `;

                addLog(`Nghiên cứu điển tịch đốn ngộ nhận ${gainDesc} và +10 Đạo Ngân.`, "special");

                if (window.soundEngine) window.soundEngine.playSuccess();

            }

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

            const targetExpDaiVienMan = Math.round(player.maxExp * 1.6);

            if (player.exp >= targetExpDaiVienMan) {

                player.exp = targetExpDaiVienMan;

                player.isDaiVienMan = true;

                player.subStageIdx = 5; // Đại Viên Mãn

                addLog(`✨ LINH QUANG NGÚT TRỜI! Ngươi đã dày công nén tu vi tới cảnh giới ĐẠI VIÊN MÃN! Tỉ lệ đột phá đại cảnh giới tăng vọt lên 95%!`, "special");

                if (window.soundEngine) window.soundEngine.playSuccess();

            }

        } else if (player.isDaiVienMan) {

            const targetExpDaiVienMan = Math.round(player.maxExp * 1.6);

            player.exp = Math.min(player.exp, targetExpDaiVienMan);

        }

    }

}



function recalcMaxExp() {

    const curRank = RANKS[player.rankIdx] || RANKS[0];

    const curSub = SUB_STAGES[player.subStageIdx] || SUB_STAGES[0];

    // Thời gian tu luyện tăng dần lũy tiến theo từng Chuyển

    player.maxExp = Math.round(curRank.baseExp * curSub.multiplier * curRank.expStepMult);

}



function attemptBreakthrough() {

    if (player.subStageIdx < 4) {

        alert("Chưa đạt cảnh giới Viên Mãn để tiến hành đột phá!");

        return;

    }



    // Tỉ lệ thành công theo thiết lập v5: 65% ở Viên Mãn, 95% ở Đại Viên Mãn

    let baseRate = player.isDaiVienMan ? 95 : 65;

    // Căn cốt ảnh hưởng trực tiếp đến tỉ lệ đột phá

    let finalRate = Math.min(99, Math.round(baseRate * (player.canCot / 100)));



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

            addLog(`🎉 ĐỘT PHÁ THÀNH CÔNG! Ngươi đã phá vỡ gông cùm, bước vào cảnh giới ${nextRank.name}! Chân nguyên biến hóa thành ${nextRank.seaName}!`, "special");

            alert(`🎉 Chúc mừng! Ngươi đã đột phá thành công lên ${nextRank.name}!\n\n${nextRank.guRankName} (Cổ Sư) ⟷ ${nextRank.daoRealmName} (Tiên Đạo)`);

        } else {

            alert("Ngươi đã đạt cảnh giới tối cao trong thiên địa (Cửu Chuyển • Chân Tiên Cảnh)!");

        }

    } else {

        // ĐỘT PHÁ THẤT BẠI - TỔN THƯƠNG CĂN CỐT!

        const canCotLost = Math.floor(Math.random() * 15) + 10;

        player.canCot = Math.max(10, player.canCot - canCotLost);

        player.hp = Math.max(10, Math.round(player.hp * 0.5));

        

        if (window.soundEngine) window.soundEngine.playError();

        addLog(`💥 Đột phá thất bại! Nghịch chuyển kinh mạch, Căn Cốt bị tổn thương giảm -${canCotLost}%! (Căn cốt hiện tại: ${player.canCot}%). Tốc độ tu luyện và tỉ lệ đột phá sau này bị suy giảm!`, "danger");

        alert(`💥 Đột phá thất bại! Căn Cốt tổn thương -${canCotLost}%. Hãy dùng Tẩy Tủy Đan hoặc công pháp Tẩy Tủy Quyết để chữa lành!\n\n💡 Lời khuyên: Tu luyện lên [Đại Viên Mãn] trước khi đột phá để đạt 95% tỷ lệ thành công!`);

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

    if (targetPaneId === "systab-killer-moves" || targetPaneId === "systab-techniques") {
        renderKillerMovesPane();
        renderTechniquesSystemPane();
    }

    if (targetPaneId === "systab-daos") renderDaosPane();

    if (targetPaneId === "systab-stats") renderStatsAllocationPane();

    if (targetPaneId === "systab-shop") renderShopPane();

    if (targetPaneId === "systab-quests") renderQuestsPane();

    if (targetPaneId === "systab-dev") {

        const wrapper = document.getElementById("dev-controls-wrapper");

        const btnToggle = document.getElementById("btn-toggle-dev-mode");

        if (wrapper && btnToggle) {

            wrapper.style.display = player.devModeActive ? "grid" : "none";

            btnToggle.textContent = player.devModeActive ? "🛑 Tắt Chế Độ Nhà Phát Triển" : "Bật Chế Độ Nhà Phát Triển";

            btnToggle.style.background = player.devModeActive ? "#e11d48" : "#0284c7";

        }

    }

}



// Subtab 1: Thất Nhật Điểm Danh

function upgradeSystemLevel() {
    const curLevel = player.systemLevel || "1.0";
    if (curLevel === "1.0") {
        if (player.systemPoints < 150) {
            alert(`⚠️ Không đủ Điểm Hệ Thống để nâng cấp lên Hệ Thống 2.0! (Cần 150 Điểm, hiện có: ${player.systemPoints} Điểm)`);
            return;
        }
        player.systemPoints -= 150;
        player.systemLevel = "2.0";
        safePlaySound("playSuccess");
        addLog("🌟 Chúc mừng! Thiên Mệnh Hệ Thống đã thăng cấp lên phiên bản 2.0! Mở khóa 'Thiên Cơ Thám Trắc' (+15% tỷ lệ rơi đồ hoang dã)!", "special");
        alert("🎉 NÂNG CẤP THÀNH CÔNG HỆ THỐNG 2.0!\n\n✨ Quyền năng mở khóa: 'Thiên Cơ Thám Trắc'\n- Tăng +15% tỷ lệ nhặt linh dược, thú tài khi thám hiểm\n- Mở khóa thêm các mặt hàng mới trong Cửa Hàng Hệ Thống!");
    } else if (curLevel === "2.0") {
        if (player.systemPoints < 350) {
            alert(`⚠️ Không đủ Điểm Hệ Thống để nâng cấp lên Hệ Thống 3.0! (Cần 350 Điểm, hiện có: ${player.systemPoints} Điểm)`);
            return;
        }
        player.systemPoints -= 350;
        player.systemLevel = "3.0";
        safePlaySound("playSuccess");
        addLog("🌟 Thiên Mệnh Hệ Thống thăng cấp 3.0! Mở khóa 'Đại Đạo Cộng Hưởng' (+15% tốc độ tu vi đả tọa)!", "special");
        alert("🎉 NÂNG CẤP THÀNH CÔNG HỆ THỐNG 3.0!\n\n✨ Quyền năng mở khóa: 'Đại Đạo Cộng Hưởng'\n- Tăng +15% tốc độ hấp thu tu vi chân nguyên khi bế quan\n- Mở khóa Định Khiếu Đan bình ổn vách không khiếu!");
    } else if (curLevel === "3.0") {
        if (player.systemPoints < 700) {
            alert(`⚠️ Không đủ Điểm Hệ Thống để nâng cấp lên Hệ Thống 4.0! (Cần 700 Điểm, hiện có: ${player.systemPoints} Điểm)`);
            return;
        }
        player.systemPoints -= 700;
        player.systemLevel = "4.0";
        safePlaySound("playSuccess");
        addLog("🌟 Thiên Mệnh Hệ Thống thăng cấp 4.0 Vô Thượng! Mở khóa 'Vận Mệnh Thấu Thị' (+20% Khí Vận may mắn)!", "special");
        alert("🎉 NÂNG CẤP THÀNH CÔNG HỆ THỐNG 4.0!\n\n✨ Quyền năng mở khóa: 'Vận Mệnh Thấu Thị'\n- Tăng +20% Khí Vận may mắn trắc định và đổ thạch\n- Cực hạn quyền năng Thiên Mệnh Hệ Thống!");
    } else {
        alert("Thiên Mệnh Hệ Thống đã đạt cấp độ tối đa 4.0!");
        return;
    }
    updateSidebarUI();
    if (typeof renderCheckinPane === "function") renderCheckinPane();
}

function renderCheckinPane() {
    const grid = document.getElementById("checkin-grid");
    const statusEl = document.getElementById("checkin-status-text");
    const btnClaim = document.getElementById("btn-claim-checkin");
    if (!grid) return;

    const streak = player.checkinStreak || 1;
    const sysLvl = player.systemLevel || "1.0";

    if (statusEl) {
        statusEl.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div>
                    Chuỗi Điểm Danh: <strong class="text-gold">Ngày ${streak} / 7</strong>
                    <span style="color:#aaa; font-size:12px; margin-left:8px;">(Nhận Rương Thất Nhật Đại Thưởng vào ngày thứ 7)</span>
                </div>
                <div>
                    Cấp Hệ Thống: <strong class="text-cyan">${sysLvl}</strong>
                    <button class="btn-subtle" onclick="upgradeSystemLevel()" style="margin-left:8px; border-color:#38bdf8; color:#38bdf8; font-size:11px; padding:2px 8px;">⬆️ Nâng Cấp Hệ Thống</button>
                </div>
            </div>
        `;
    }

    grid.innerHTML = "";

    const checkinDays = [
        { day: 1, name: "15 Linh Thạch Hạ", icon: "💎", desc: "Nguyên thạch phàm phẩm", isGrand: false },
        { day: 2, name: "1 Tụ Khí Đan Phàm Cấp", icon: "💊", desc: "Tăng +30 Tu Vi", isGrand: false },
        { day: 3, name: "20 Linh Thạch Hạ", icon: "💎", desc: "Linh thạch duy trì tu luyện", isGrand: false },
        { day: 4, name: "1 Bồi Nguyên Đan", icon: "🍵", desc: "Hồi phục 30 Thể Lực", isGrand: false },
        { day: 5, name: "25 Linh Thạch Hạ", icon: "💎", desc: "Tích lũy tài nguyên", isGrand: false },
        { day: 6, name: "1 Tụ Khí Đan & 1 Bồi Nguyên Đan", icon: "🎁", desc: "Chuẩn bị đại thưởng", isGrand: false },
        { day: 7, name: "👑 RƯƠNG THẤT NHẬT ĐẠI THƯỞNG", icon: "🏆", desc: "150 Linh Thạch Hạ + 3 Tụ Khí Đan + 1 Cổ Phương Nhị Chuyển + 30 Điểm Hệ Thống", isGrand: true }
    ];

    checkinDays.forEach(rw => {
        const card = document.createElement("div");
        const isCurrent = (streak === rw.day);
        const isPassed = (streak > rw.day);
        card.className = `checkin-card ${isCurrent ? 'active' : ''} ${isPassed ? 'claimed' : ''}`;
        if (rw.isGrand) {
            card.style.borderColor = "#fbbf24";
            card.style.background = isCurrent ? "rgba(251, 191, 36, 0.15)" : "rgba(15, 23, 42, 0.9)";
        }

        card.innerHTML = `
            <div class="checkin-day">${rw.isGrand ? '⭐ NGÀY 7 (ĐẠI THƯỞNG)' : `Ngày ${rw.day}`}</div>
            <div class="checkin-icon" style="font-size:24px;">${rw.icon}</div>
            <div class="checkin-reward-name" style="font-weight:600; font-size:12px; color:${rw.isGrand ? '#fbbf24' : '#e2e8f0'};">${rw.name}</div>
            <small style="color:#94a3b8; font-size:10px;">${rw.desc}</small>
            <div class="checkin-status" style="margin-top:4px;">
                ${isPassed ? '<span style="color:#10b981;">✓ Đã qua</span>' : (isCurrent ? (player.checkinClaimedToday ? '<span style="color:#10b981;">✓ Đã nhận hôm nay</span>' : '<span style="color:#fbbf24;">⚡ Điểm danh ngay</span>') : '<span style="color:#64748b;">Chưa đến</span>')}
            </div>
        `;

        grid.appendChild(card);
    });

    if (btnClaim) {
        btnClaim.disabled = player.checkinClaimedToday;
        btnClaim.textContent = player.checkinClaimedToday 
            ? "✓ Hôm Nay Đã Điểm Danh" 
            : (streak === 7 ? "🏆 Nhận Rương Thất Nhật Đại Thưởng!" : `📅 Điểm Danh Ngày ${streak}`);
    }
}

function claimCheckin() {
    if (player.checkinClaimedToday) {
        alert("Hôm nay đạo hữu đã điểm danh rồi, hãy quay lại vào ngày mai!");
        return;
    }

    const streak = player.checkinStreak || 1;
    player.checkinClaimedToday = true;

    if (streak === 7) {
        player.stoneLow += 150;
        player.systemPoints += 30;
        addItemToInventory("bo_khi_dan", 3, "Tụ Khí Đan (Tăng 40 Tu Vi)", "pill_exp", { exp: 40 });
        addItemToInventory("co_phuong_bach_ngoc", 1, "Cổ Phương Bạch Ngọc Cổ (Nhị Chuyển)", "recipe");
        player.checkinStreak = 1;
        safePlaySound("playSuccess");
        addLog("🏆 Chúc mừng đạo hữu đã hoàn thành chu kỳ Thất Nhật Điểm Danh! Nhận Rương Thất Nhật Đại Thưởng: +150 Linh Thạch Hạ, 3 Tụ Khí Đan, Cổ Phương Bạch Ngọc Cổ & 30 Điểm Hệ Thống!", "special");
        alert("🏆 CHÚC MỪNG ĐẠO HỮU HOÀN THÀNH 7 NGÀY ĐIỂM DANH!\n\nPhần thưởng Rương Thất Nhật Đại Thưởng:\n- 150 viên Linh Thạch Hạ Phẩm\n- 3 viên Tụ Khí Đan (+120 Tu Vi)\n- 1 Cổ Phương Bạch Ngọc Cổ (Nhị Chuyển)\n- 30 Điểm Hệ Thống\n\nChu kỳ điểm danh đã tự động reset về Ngày 1!");
    } else {
        const dailyStone = 15;
        player.stoneLow += dailyStone;
        if (streak % 2 === 0) {
            addItemToInventory("bo_khi_dan", 1, "Tụ Khí Đan", "pill_exp", { exp: 40 });
        } else {
            addItemToInventory("boi_nguyen_dan", 1, "Bồi Nguyên Đan", "pill_stamina", { restore: 30 });
        }
        player.checkinStreak = streak + 1;
        safePlaySound("playCoins");
        addLog(`📅 Điểm danh Ngày ${streak} thành công: Nhận +${dailyStone} Linh Thạch Hạ Phẩm!`, "success");
        alert(`📅 Điểm danh Ngày ${streak} thành công!\n\nNhận được: ${dailyStone} Linh Thạch Hạ Phẩm & đan dược hỗ trợ.\nCòn ${7 - streak} ngày nữa sẽ nhận Rương Thất Nhật Đại Thưởng!`);
    }

    updateSidebarUI();
    renderCheckinPane();
}

function renderAperturePane() {
    const body = document.getElementById("sys-aperture-body");
    if (!body) return;

    const rank = RANKS[player.rankIdx];
    const subStage = SUB_STAGES[player.subStageIdx];
    const apt = player.aptitude || APTITUDES.B;
    const phys = player.specialPhysique || SPECIAL_PHYSIQUES[0];
    const isTuyetThe = phys.id !== "none";
    const stability = player.apertureStability !== undefined ? player.apertureStability : 100;
    const mainDaoObj = (typeof DAO_LIST !== 'undefined') ? DAO_LIST.find(d => d.id === player.mainDao) : null;
    const mainDaoName = mainDaoObj ? mainDaoObj.name : 'Chưa Định Hướng';
    const vitalGu = player.guInventory.find(g => g.id === player.vitalGuId);

    let vachKhiHtml = "Màng Quang Thô Sơ";
    if (player.rankIdx >= 4) vachKhiHtml = "Màng Pha Lê Tinh Thể (Ngũ Chuyển)";
    else if (player.rankIdx >= 2) vachKhiHtml = "Màng Bạch Ngọc Kiên Cố (Tam Chuyển)";
    else if (player.rankIdx >= 1) vachKhiHtml = "Màng Cốt Cứng Rắn (Nhị Chuyển)";

    const seaPercent = Math.min(100, Math.round((player.mp / player.maxMp) * 100));

    let html = `
        <div class="aperture-overview-grid">
            <!-- Card 1: THẺ HỒ SƠ NHÂN VẬT & ĐẠO CƠ TOÀN DIỆN -->
            <div class="aperture-card-box">
                <div class="aperture-card-header">
                    <h4>🪪 THẺ HỒ SƠ NHÂN VẬT & ĐẠO CƠ TOÀN DIỆN</h4>
                    <span class="recipe-rank-badge">${rank.name} • ${subStage.name}</span>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">📜 Công Pháp Chính:</span>
                    <strong style="color:#6ee7b7;">${player.mainTechniqueName || 'Chưa lĩnh ngộ'}</strong>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">⭐ Lưu Phái Chính:</span>
                    <strong style="color:#38bdf8;">${mainDaoName}</strong>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">🐛 Bản Mệnh Cổ:</span>
                    <strong style="color:#fbbf24;">${vitalGu ? vitalGu.name : 'Chưa có bản mệnh cổ'}</strong>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">⚔️ Chiến Lực Tổng Hợp:</span>
                    <strong style="color:#ef4444;">${player.power || 30} Điểm</strong>
                </div>
                <div class="aperture-stat-row" style="border-top:1px dashed #334155; padding-top:6px; margin-top:6px;">
                    <span style="color:#94a3b8;">Tư Chất Cổ Sư (Tư Chất Không Khiếu):</span>
                    <strong style="color:#fbbf24;">${apt.name} (${apt.rank} Đẳng)</strong>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">Cổ Bản Mệnh:</span>
                                <strong style="color:#fbbf24;">${(player.guInventory && player.guInventory.find(g => g.isVital)) ? player.guInventory.find(g => g.isVital).name : (player.vitalGuId || 'Tửu Trùng (Nhất Chuyển)')}</strong>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">Thể Chất Đạo Thể:</span>
                    <strong style="color:${isTuyetThe ? '#fbbf24' : '#94a3b8'};">${phys.name}</strong>
                </div>
            </div>

            <!-- Card 2: Vách Không Khiếu & Biển Chân Nguyên -->
            <div class="aperture-card-box">
                <div class="aperture-card-header">
                    <h4>🌌 Vách Không Khiếu & Biển Chân Nguyên</h4>
                    <span class="recipe-rank-badge">${rank.name}</span>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">Cấu Trúc Vách Khiếu:</span>
                    <strong style="color:#6ee7b7;">${vachKhiHtml}</strong>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">Độ Ổn Định Vách Khiếu:</span>
                    <strong style="color:${stability > 50 ? '#10b981' : (stability > 25 ? '#f59e0b' : '#ef4444')};">${stability}% ${stability <= 25 ? '⚠️ NGUY CƠ RẠN NỨT!' : ''}</strong>
                </div>
                <div style="margin: 8px 0 4px 0;">
                    <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:2px;">
                        <span>Biển Chân Nguyên: ${player.mp} / ${player.maxMp}</span>
                        <strong class="text-cyan">${seaPercent}%</strong>
                    </div>
                    <div class="bar-track-outer mini">
                        <div class="bar-fill-inner mp-fill" style="width: ${seaPercent}%"></div>
                    </div>
                </div>
                <div class="aperture-stat-row" style="border-top:1px dashed #334155; padding-top:6px; margin-top:6px;">
                    <span style="color:#94a3b8;">Định Hướng Tu Luyện:</span>
                    <strong style="color:#f59e0b;">${player.cultivateMode === "dual" ? '⚡ Kiêm Tu (Cổ Trùng + Công Pháp)' : (player.cultivateMode === "gu" ? '🐛 Thuần Tu Cổ Đạo' : '📖 Thuần Tu Tiên Pháp')}</strong>
                </div>
                ${isTuyetThe && player.rankIdx >= 0 ? `
                    <div style="font-size:11px; color:#fbbf24; margin-top:6px; background:rgba(251,191,36,0.1); padding:4px 8px; border-radius:4px;">
                        ⚠️ Thập Tuyệt Thể: Chân nguyên 10 phần gây áp lực lớn lên vách không khiếu khi tu vi tăng cao. Cần dùng <strong>Định Khiếu Đan</strong> để ổn định.
                    </div>
                ` : ''}
            </div>

            <!-- Card 3: Thuộc Tính Cơ Bản & Khí Huyết -->
            <div class="aperture-card-box">
                <div class="aperture-card-header">
                    <h4>💪 Thuộc Tính Cơ Bản & Khí Huyết</h4>
                    <span class="recipe-rank-badge" style="color:#10b981;">Sinh Mệnh Thể</span>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">Khí Huyết (Sinh Lực):</span>
                    <strong style="color:#ef4444;">${player.hp} / ${player.maxHp}</strong>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">Chân Nguyên (Pháp Lực):</span>
                    <strong style="color:#38bdf8;">${player.mp} / ${player.maxMp}</strong>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">Chiến Lực / Công Kích:</span>
                    <strong style="color:#f59e0b;">${player.power || 30}</strong>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">Thể Lực Hành Động:</span>
                    <strong style="color:#10b981;">${player.stamina} / 100</strong>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">Thọ Mệnh:</span>
                    <strong style="color:#e2e8f0;">${player.age || 16} / ${player.maxAge || 120} Tuổi</strong>
                </div>
            </div>

            <!-- Card 4: Thuộc Tính Đặc Biệt (Thiên Phú & Tinh Thần) -->
            <div class="aperture-card-box">
                <div class="aperture-card-header">
                    <h4>✨ Thuộc Tính Đặc Biệt (Thiên Phú & Tinh Thần)</h4>
                    <span class="recipe-rank-badge" style="color:#a855f7;">Đạo Vận</span>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">Ngộ Tính Bản Thân:</span>
                    <strong style="color:#a855f7;">${player.ngoTinh || 10} Điểm</strong>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">Khí Vận Thiên Mệnh:</span>
                    <strong style="color:#fbbf24;">${player.khiVan || 10} Điểm</strong>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">Trí Mưu Cổ Sư:</span>
                    <strong style="color:#06b6d4;">${player.triMuu || 10} Điểm</strong>
                </div>
                <div class="aperture-stat-row">
                    <span style="color:#94a3b8;">Đạo Ngân Tích Lũy:</span>
                    <strong style="color:#f43f5e;">${(player.daoMarks && player.daoMarks[player.mainDao]) || 0} Đạo Ngân (${mainDaoName})</strong>
                </div>
            </div>
        </div>

        <!-- Card 5: Cổ Trùng Bản Mệnh & Ôn Dưỡng Trong Không Khiếu -->
        <div class="aperture-card-box" style="margin-top:12px;">
            <div class="aperture-card-header">
                <h4>🐛 Cổ Trùng Đang Ôn Dưỡng Trong Không Khiếu (${player.guInventory.length} Con)</h4>
                <button class="btn-subtle" onclick="openModal('modal-gu-inventory')" style="font-size:11px; padding:3px 8px;">Quản Lý Cổ Trùng</button>
            </div>
            ${player.guInventory.length === 0 ? '<p style="color:#94a3b8; font-style:italic; font-size:12px;">Không khiếu trống rỗng, chưa luyện hóa cổ trùng nào vào trong.</p>' : `
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:8px;">
                    ${player.guInventory.map((g, idx) => `
                        <div style="background:rgba(15,23,42,0.8); border:1px solid ${player.vitalGuId === g.id ? '#fbbf24' : '#334155'}; border-radius:6px; padding:8px;">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <strong style="color:${player.vitalGuId === g.id ? '#fbbf24' : '#f8fafc'}; font-size:13px;">${g.name} ${player.vitalGuId === g.id ? '⭐ (Bản Mệnh)' : ''}</strong>
                                <span class="recipe-rank-badge" style="font-size:10px;">${g.rank} Chuyển</span>
                            </div>
                            <div style="font-size:11px; color:#94a3b8; margin-top:4px;">
                                Lưu phái: <strong style="color:#6ee7b7;">${g.path}</strong> • Uy lực: +${g.power || 30}
                            </div>
                        </div>
                    `).join("")}
                </div>
            `}
        </div>
    `;

    body.innerHTML = html;
}
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

    filtered.forEach(gu => {
        const card = document.createElement("div");
        card.className = "recipe-item-card";

        let matsHtml = "";
        if (gu.recipe && gu.recipe.materials) {
            matsHtml = gu.recipe.materials.map(m => `<li>${m.name}</li>`).join("");
        } else {
            matsHtml = `<li>Linh Thạch x30</li><li>Nguyên Liệu ${gu.path}</li>`;
        }

        const successRate = gu.recipe && gu.recipe.successRate ? gu.recipe.successRate : 80;
        const methodText = (gu.recipe && gu.recipe.method) ? `<div style="font-size:12px; color:#38bdf8; margin: 4px 0;">⚡ <strong>Phương pháp:</strong> ${gu.recipe.method}</div>` : "";
        const descText = (gu.recipe && gu.recipe.desc) ? `<div style="font-size:12px; color:#cbd5e1; margin-bottom: 6px; font-style:italic;">📜 <strong>Bí phương:</strong> ${gu.recipe.desc}</div>` : "";

        const canRefineGu = !(gu.recipe && gu.recipe.canRefine === false);
        const btnHtml = canRefineGu 
            ? `<button class="btn-primary btn-refine-gu" style="margin-top:auto;">⚡ Bắt Đầu Hợp Luyện</button>`
            : `<div class="cannot-refine-badge" style="margin-top:auto;">🌿 Cổ Tự Nhiên Dựng Dục<br><span style="color:#38bdf8; font-size:11px;">(Chỉ thu thập qua Tự Nhiên / Cơ Duyên / Đổ Thạch)</span></div>`;

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                <h4 style="margin:0; font-size:16px; color:#fbbf24;">${gu.name}</h4>
                <span class="recipe-rank-badge">${gu.rank} Chuyển • ${gu.path}</span>
            </div>
            <p style="font-size:13px; color:#94a3b8; line-height:1.4; margin-bottom:8px;">${gu.description || "Cổ trùng thần kỳ của trời đất."}</p>
            ${methodText}
            ${descText}
            <div class="recipe-mats-box" style="margin: 8px 0; background:rgba(15,23,42,0.6); padding:8px; border-radius:6px; font-size:12px;">
                <strong style="color:#e2e8f0;">Nguyên liệu phối hợp:</strong>
                <ul style="margin:4px 0 0 16px; color:#cbd5e1;">${matsHtml}</ul>
                <div style="margin-top:6px; font-size:11px; color:#94a3b8;">
                    Tỷ lệ thành công: <strong class="text-gold">${successRate}%</strong>
                </div>
            </div>
            ${btnHtml}
        `;

        if (canRefineGu) {
            const btn = card.querySelector(".btn-refine-gu");
            if (btn) {
                btn.addEventListener("click", () => refineGu(gu));
            }
        }

        grid.appendChild(card);
    });
}

function refineGu(gu) {
    // -1. Chặn Cổ Tự Nhiên không thể hợp luyện
    if (gu.recipe && gu.recipe.canRefine === false) {
        alert(`🌿 CỔ TRÙNG THIÊN ĐỊA TỰ NHIÊN DỰNG DỤC!\n\nCổ trùng "${gu.name}" là tinh hoa do quy tắc thiên địa ngưng tụ, không thể tạo ra bằng cổ phương nhân tạo!\n\n💡 Cách thu thập:\n- Khám phá hoang dã & hang động bí cảnh\n- Thử vận may tại Đổ Thạch Trường\n- Săn giết đối thủ hoặc đoạt truyền thừa tiền bối.`);
        return;
    }

    // 0. Kiểm tra Luật Duy Nhất Tuyệt Đối của Tiên Cổ (Rank 6+)
    if (gu.rank >= 6) {
        const alreadyOwned = (player.inventory && player.inventory.some(i => i.id === `gu_${gu.id}` || i.id === gu.id || (i.guData && i.guData.id === gu.id))) ||
                             (player.guInventory && player.guInventory.some(g => g.id === gu.id));
        if (alreadyOwned) {
            alert(`⚠️ QUY TẮC ĐẠI ĐẠO DUY NHẤT!\n\nTiên Cổ khắp thiên địa chỉ có duy nhất một cá thể! Đạo hữu đã nắm giữ Tiên Cổ "${gu.name}" (${gu.rank} Chuyển), không thể luyện ra con thứ hai!`);
            return;
        }
    }

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

    // 3. Kiểm tra Nguyên Liệu Hợp Luyện Nghiêm Ngặt (v5.3)
    let missingMats = [];
    let consumedInvIndices = [];

    if (gu.recipe && gu.recipe.materials && gu.recipe.materials.length > 0) {
        for (let m of gu.recipe.materials) {
            if (m.type === "currency") continue;
            const reqCount = m.count || 1;
            const mName = m.name.toLowerCase();

            let foundCount = 0;
            let itemIndices = [];
            player.inventory.forEach((it, idx) => {
                if (it && it.count > 0) {
                    const itName = it.name.toLowerCase();
                    const itId = it.id.toLowerCase();
                    if (itName.includes(mName) || mName.includes(itName) || itId.includes(mName.replace(" ", "_"))) {
                        foundCount += it.count;
                        itemIndices.push({ idx, count: it.count });
                    }
                }
            });

            if (m.type === "gu" || mName.includes("cổ") || mName.includes("trùng")) {
                if (player.guInventory) {
                    player.guInventory.forEach(g => {
                        if (g.name.toLowerCase().includes(mName) || mName.includes(g.name.toLowerCase())) {
                            foundCount += 1;
                        }
                    });
                }
            }

            if (foundCount < reqCount) {
                missingMats.push(`• ${m.name}: Cần ${reqCount} (Hiện có: ${foundCount})`);
            } else if (itemIndices.length > 0) {
                consumedInvIndices.push(itemIndices[0].idx);
            }
        }
    }

    let matIndex = -1;
    if (consumedInvIndices.length > 0) {
        matIndex = consumedInvIndices[0];
    } else {
        const pathKeyword = (gu.path || "").toLowerCase().replace(" đạo", "");
        matIndex = player.inventory.findIndex(i => {
            if (!i || i.count <= 0) return false;
            const iname = (i.name || "").toLowerCase();
            const iid = (i.id || "").toLowerCase();
            return iname.includes(pathKeyword) || iid.includes(pathKeyword) || iname.includes("nguyên liệu");
        });
    }

    if (missingMats.length > 0) {
        alert(`⚠️ THIẾU NGUYÊN LIỆU HỢP LUYỆN!\n\nĐể hợp luyện "${gu.name}" (${gu.rank} Chuyển • ${gu.path}), đạo hữu cần chuẩn bị đủ các nguyên liệu sau:\n\n${missingMats.join("\n")}\n\n💡 Hãy thu thập đủ nguyên liệu trước khi tiến hành!`);
        return;
    }

    if (matIndex === -1 && (!gu.recipe || !gu.recipe.materials || gu.recipe.materials.length === 0)) {
        alert(`⚠️ THIẾU NGUYÊN LIỆU HỢP LUYỆN!\n\nCần có ít nhất 1 nguyên liệu tương thích với ${gu.path} trong Túi Trữ Vật!`);
        return;
    }

    const matchedItem = matIndex >= 0 ? player.inventory[matIndex] : { name: "Nguyên Liệu Phối Hợp", count: 1 };

    // Tiêu hao tài nguyên ban đầu
    player.stoneLow -= reqStone;
    player.mp -= reqMp;

    // Tính toán tỷ lệ thành công cộng hưởng từ Đạo Ngân Luyện Đạo
    const baseRate = gu.recipe && gu.recipe.successRate ? gu.recipe.successRate : 75;
    const bonusRate = Math.min(20, Math.floor(player.spiritPower / 2));
    const bonusRefineMarks = Math.min(15, Math.floor(((player.daoMarks && player.daoMarks.luyen) || 0) / 100));
    const finalRate = Math.min(95, baseRate + bonusRate + bonusRefineMarks);

    const isVitalGu = (player.vitalGuId && (matchedItem.id === player.vitalGuId || matchedItem.id === `gu_${player.vitalGuId}` || (matchedItem.guData && matchedItem.guData.id === player.vitalGuId)));

    const roll = Math.random() * 100;
    if (roll <= finalRate) {
        matchedItem.count -= 1;
        if (matchedItem.count <= 0 && matIndex >= 0) {
            player.inventory.splice(matIndex, 1);
        }

        const newGu = {
            id: gu.id,
            name: gu.name,
            rank: gu.rank,
            path: gu.path,
            type: gu.type || "Hỗ Trợ",
            food: gu.food || "Các loại danh tửu, rượu ngon thế gian",
            power: (gu.type === "Tấn Công" ? (gu.power || 30) : 0),
            mpCost: gu.mpCost || 20,
            supportEffect: gu.supportEffect || ""
        };
        addItemToInventory(`gu_${gu.id}`, 1, `Cổ Trùng: ${gu.name} (${gu.rank} Chuyển)`, "gu_item", { guData: newGu });
        player.systemPoints += 15;
        safePlaySound("playSuccess");
        addLog(`🎉 Hợp luyện thành công! Ngươi tiêu hao 1 ${matchedItem.name} và ${reqStone} Linh Thạch, luyện xuất: ${gu.name} (${gu.rank} Chuyển). Đã cất vào Túi Trữ Vật!`, "special");
        alert(`🎉 Hợp luyện thành công!\n\nĐã tiêu hao 1 ${matchedItem.name} & ${reqStone} Linh Thạch.\nNhận được Cổ Trùng: ${gu.name} (${gu.rank} Chuyển • ${gu.path}) cất vào TÚI TRỮ VẬT!\n\n💡 Hãy mở Túi Trữ Vật để tiến hành Luyện Hóa đưa vào Không Khiếu.`);
    } else {
        if (isVitalGu) {
            player.hp = Math.max(1, Math.floor(player.hp * 0.75));
            player.mp = Math.max(0, Math.floor(player.mp * 0.5));
            safePlaySound("playError");
            addLog(`💥 Hợp luyện ${gu.name} thất bại! Nhờ có Bản Mệnh Cổ tương liên tâm huyết, cổ trùng được bảo toàn không chết, nhưng linh hồn đạo hữu bị chấn động mạnh!`, "danger");
            alert(`💥 Hợp luyện thất bại!\n\nMay nhờ có BẢN MỆNH CỔ tương liên tính mạng nên cổ trùng không bị tiêu tán, chỉ chuyển sang suy yếu!\nKhí huyết mất 25%, chân nguyên hao tổn 50% do phản phệ!`);
        } else {
            matchedItem.count -= 1;
            if (matchedItem.count <= 0 && matIndex >= 0) {
                player.inventory.splice(matIndex, 1);
            }
            safePlaySound("playError");
            addLog(`💥 Lò luyện nổ tung! Hợp luyện ${gu.name} thất bại, tiêu hao 1 ${matchedItem.name} và ${reqStone} Linh Thạch!`, "danger");
            alert(`💥 Hợp luyện thất bại!\n\nLò luyện chấn động nổ tung, tiêu hao 1 ${matchedItem.name} và ${reqStone} Linh Thạch làm tro bụi.`);
        }
    }

    updateSidebarUI();
    renderAperturePane();
}

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

                    <div class="tech-obtain-guide" style="background: rgba(15, 23, 42, 0.6); border: 1px dashed rgba(56, 189, 248, 0.4); border-radius: 6px; padding: 8px 12px; margin-top: 8px; font-size: 12px;">

                        <span style="color: #38bdf8; font-weight: 600;">📥 Nguồn Gốc Thu Thập Quyển Trục:</span>

                        <div style="color: #cbd5e1; margin-top: 4px; line-height: 1.4;">

                            ${tech.sourceDesc || 'Có thể đổi tại Tàng Thư Các, Cửa Hàng Hệ Thống hoặc Thám Hiểm Hang Động. Sau khi sở hữu, hãy mở Quyển Trục trong Túi Trữ Vật để Lĩnh Ngộ.'}

                        </div>

                    </div>

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

        }



        grid.appendChild(card);

    });

}



// Subtab 5: 30 Lưu Phái Đạo Cảnh & Sát Chiêu

function addDaoMarks(daoId, amount) {

    if (!daoId || amount <= 0) return;

    if (!player.daoMarks) player.daoMarks = {};

    if (!player.daoMarks[daoId]) player.daoMarks[daoId] = 0;

    player.daoMarks[daoId] += amount;



    if (!player.daoLevels) player.daoLevels = {};

    if (!player.daoLevels[daoId]) player.daoLevels[daoId] = { exp: 0, marks: 0, level: 0 };

    player.daoLevels[daoId].marks = player.daoMarks[daoId];

    player.daoLevels[daoId].exp = player.daoMarks[daoId];



    if (!player.activeDaos.includes(daoId) && player.activeDaos.length < 5) {

        player.activeDaos.push(daoId);

    }



    checkDaoLevelUp(daoId);

}





// ============================================================

// HỆ THỐNG ĐẠO NGÂN V5.2: KHUẾCH ĐẠI TUYẾN TÍNH & BÀI XÍCH ĐẠO NGÂN

// ============================================================



function getDaoMultiplier(daoId) {

    if (!daoId || !player.daoMarks) return 1.0;

    const cleanId = (daoId || "").toLowerCase().replace(" đạo", "");

    const marks = player.daoMarks[cleanId] || player.daoMarks[daoId] || 0;

    // Chuẩn nguyên tác chương 1155: Cứ 1000 Đạo Ngân tăng +100% (tức gấp đôi uy lực gốc)

    return 1 + (marks / 1000);

}



function getDaoConflictFactor(daoId) {

    // 1. Ngoại lệ Chí Tôn Tiên Thai: Miễn nhiễm hoàn toàn bài xích

    if (player.specialPhysique && (player.specialPhysique.id === "chi_ton_tien_thai" || (player.specialPhysique.name && player.specialPhysique.name.includes("Chí Tôn")))) {

        return 1.0;

    }



    // 2. Nếu là lưu phái chủ đạo: 100% uy lực

    const normalizedMain = (player.mainDao || "").toLowerCase().replace(" đạo", "");

    const normalizedTarget = (daoId || "").toLowerCase().replace(" đạo", "");

    if (normalizedMain === normalizedTarget) {

        return 1.0;

    }



    // 3. Nếu là dị đạo: Giảm uy lực dựa trên tỷ trọng đạo ngân cơ thể (tối thiểu 0.15)

    let totalMarks = 0;

    if (player.daoMarks) {

        Object.values(player.daoMarks).forEach(m => totalMarks += (m || 0));

    }

    if (totalMarks <= 0) return 1.0;



    const targetMarks = player.daoMarks ? (player.daoMarks[normalizedTarget] || player.daoMarks[daoId] || 0) : 0;

    const ratio = targetMarks / totalMarks;

    return Math.max(0.15, Math.min(1.0, ratio));

}



function checkDaoLordStatus() {

    const mainDaoId = (player.mainDao || "quang").toLowerCase().replace(" đạo", "");

    const marks = player.daoMarks ? (player.daoMarks[mainDaoId] || 0) : 0;

    const curLvl = (player.daoLevels && player.daoLevels[mainDaoId]) ? player.daoLevels[mainDaoId].level : 0;

    const isRank9 = (player.rankIdx >= 8); // Cửu Chuyển Cổ Tôn



    // 4 Điều kiện Thành Tôn & Đạo Chủ: (1) Cửu Chuyển, (2) >= 300k Đạo Ngân, (3) Vô Thượng Đại Tông Sư (lvl >= 7)

    if (isRank9 && marks >= 300000 && curLvl >= 7) {

        player.isDaoLord = true;

        return true;

    }

    player.isDaoLord = false;

    return false;

}



function setVitalGu(guId) {

    if (!guId) return;

    let foundGu = null;

    if (player.guInventory) {

        foundGu = player.guInventory.find(g => g.id === guId);

    }

    if (!foundGu && player.inventory) {

        const it = player.inventory.find(i => i.id === guId || i.id === `gu_${guId}` || (i.guData && i.guData.id === guId));

        if (it) foundGu = it.guData || it;

    }

    if (!foundGu) {

        alert("Không tìm thấy Cổ Trùng này trong Không Khiếu hoặc Túi Trữ Vật!");

        return;

    }

    const guName = foundGu.name || guId;

    player.vitalGuId = guId;

    safePlaySound("playSuccess");

    addLog(`⭐ Đã khắc ấn tâm huyết linh hồn, lập [${guName}] làm BẢN MỆNH CỔ tương liên sinh mệnh!`, "special");

    alert(`⭐ Khắc ấn Bản Mệnh Cổ thành công!\n\nTừ nay [${guName}] là Bản Mệnh Cổ của đạo hữu:\n- Tăng 20% uy lực khi sử dụng\n- Khi hợp luyện thất bại: Bản Mệnh Cổ ĐƯỢC BẢO TOÀN 100% KHÔNG BỊ HỦY DIỆT!`);

    updateSidebarUI();

    if (typeof renderGuModal === "function") renderGuModal();

    if (typeof renderAperturePane === "function") renderAperturePane();

}



function checkDaoLevelUp(daoId) {

    if (!player.daoLevels || !player.daoLevels[daoId]) return;

    const curMarks = player.daoMarks ? (player.daoMarks[daoId] || 0) : (player.daoLevels[daoId].exp || 0);

    const curLvl = player.daoLevels[daoId].level || 0;

    

    let targetLvl = 0;

    for (let i = DAO_LEVELS.length - 1; i >= 0; i--) {

        if (curMarks >= DAO_LEVELS[i].reqMarks) {

            targetLvl = i;

            break;

        }

    }



    if (targetLvl > curLvl) {

        player.daoLevels[daoId].level = targetLvl;

        const daoObj = DAO_LIST.find(d => d.id === daoId);

        const name = daoObj ? daoObj.name : daoId;

        const newLvlInfo = DAO_LEVELS[targetLvl];

        addLog(`🌟 Chúc mừng! Cảnh giới ${name} đã thăng hoa lên bậc ${newLvlInfo.name} (${curMarks.toLocaleString()} Đạo Ngân)!`, "special");



        if (targetLvl >= 6) {

            const hasKillerReqs = (curMarks >= 150000 && player.comprehension >= 30 && player.intelligence >= 25 && player.luck >= 20);

            if (hasKillerReqs) {

                addLog(`⚡ KỲ TÍCH THIÊN ĐỊA: Ngươi đã đạt Đại Tông Sư ${name} viên mãn thần thông! Khai sáng thành công Sát Chiêu: "${daoObj.killerMove}"!`, "special");

            } else {

                addLog(`📜 Ngươi đã tích tụ đủ 150.000 Đạo Ngân ${name}, nhưng thần thức chưa đủ (Cần: Ngộ Tính ≥ 30, Trí Mưu ≥ 25, Khí Vận ≥ 20) để khai sáng Sát Chiêu!`, "warning");

            }

        }

        if (window.soundEngine) window.soundEngine.playSuccess();

    }

}



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

                💡 <em>Hệ Thống Đạo Ngân:</em> Tích lũy Đạo Ngân thiên địa (khuếch đại tuyến tính +100% mỗi 1.000 Đạo Ngân).

                ${checkDaoLordStatus() ? '<div style="margin-top:8px; padding:6px 12px; background:linear-gradient(90deg, #f59e0b, #d97706); color:#fff; font-weight:bold; border-radius:6px; text-align:center; box-shadow:0 0 12px rgba(245,158,11,0.5);">👑 DANH VỊ ĐẠO CHỦ (DAO LORD) • THAO TÚNG ĐẠO NGÂN THIÊN ĐỊA HOÀN MỸ</div>' : ''}

                ${player.rankIdx >= 5 ? `<div style="margin-top:6px; font-size:11px; color:#67e8f9;">✨ Tiên Nguyên Khiếu Vận: Thanh Đề: ${(player.immortalEssence && player.immortalEssence.thanhDe) || 0} • Hồng Táo: ${(player.immortalEssence && player.immortalEssence.hongTao) || 0} • Bạch Lệ: ${(player.immortalEssence && player.immortalEssence.bachLe) || 0} • Hoàng Hạnh: ${(player.immortalEssence && player.immortalEssence.hoangHanh) || 0}</div>` : ''}

            </div>

        </div>

        <div style="font-size:13px; color:#ddd; margin-bottom:8px;">

            Lưu Phái Đang Kiêm Tu: <strong>${(player.activeDaos || []).map(d => {

                const found = DAO_LIST.find(x => x.id === d);

                const lvl = (player.daoLevels && player.daoLevels[d]) ? player.daoLevels[d].level : 0;

                const marks = player.daoMarks ? (player.daoMarks[d] || 0) : ((player.daoLevels && player.daoLevels[d]) ? (player.daoLevels[d].exp || 0) : 0);

                return `${found ? found.name : d} (${DAO_LEVELS[lvl].name} - ${marks.toLocaleString()} Đạo Ngân)`;

            }).join(", ") || 'Chưa kiêm tu'}</strong>

        </div>

    `;



    grid.innerHTML = "";



    DAO_LIST.forEach(dao => {

        const isMainDao = (dao.id === (player.mainDao || "Mộc Đạo"));

        const isActive = (player.activeDaos && player.activeDaos.includes(dao.id)) || isMainDao;

        const curMarks = player.daoMarks ? (player.daoMarks[dao.id] || 0) : ((player.daoLevels && player.daoLevels[dao.id]) ? (player.daoLevels[dao.id].exp || 0) : 0);

        const curLvl = (player.daoLevels && player.daoLevels[dao.id]) ? player.daoLevels[dao.id].level : 0;

        const lvlInfo = DAO_LEVELS[curLvl] || DAO_LEVELS[0];

        const nextLvlInfo = DAO_LEVELS[curLvl + 1];



        const daoMult = getDaoMultiplier(dao.id);

        const conflictFactor = getDaoConflictFactor(dao.id);

        const isConflictFree = (player.specialPhysique && (player.specialPhysique.id === "chi_ton_tien_thai" || (player.specialPhysique.name && player.specialPhysique.name.includes("Chí Tôn"))));



        const card = document.createElement("div");

        card.className = `dao-card ${isMainDao ? 'main-active-dao' : (isActive ? 'active-dao' : '')}`;

        if (isMainDao) {

            card.style.borderColor = "#fbbf24";

            card.style.boxShadow = "0 0 10px rgba(251, 191, 36, 0.2)";

        }



        const isGrandmaster = curLvl >= 6;

        const hasKillerReqs = (curMarks >= 150000 && player.comprehension >= 30 && player.intelligence >= 25 && player.luck >= 20);



        let killerStatusHtml = "";

        if (isGrandmaster && hasKillerReqs) {

            killerStatusHtml = `<small style="color:#10b981; font-weight:bold;">⚡ ĐÃ KHAI SÁNG & THI TRIỂN ĐƯỢC</small>`;

        } else if (isGrandmaster && !hasKillerReqs) {

            const missing = [];

            if (curMarks < 150000) missing.push(`Đạo Ngân ≥ 150k (${curMarks.toLocaleString()})`);

            if (player.comprehension < 30) missing.push(`Ngộ Tính ≥ 30 (${player.comprehension})`);

            if (player.intelligence < 25) missing.push(`Trí Mưu ≥ 25 (${player.intelligence})`);

            if (player.luck < 20) missing.push(`Khí Vận ≥ 20 (${player.luck})`);

            killerStatusHtml = `<small style="color:#f59e0b;">🔒 Thiếu điều kiện: ${missing.join(" • ")}</small>`;

        } else {

            killerStatusHtml = `<small style="color:#94a3b8;">🔒 Cần: Đại Tông Sư (≥ 150k Đạo Ngân), Ngộ Tính ≥ 30, Trí Mưu ≥ 25, Khí Vận ≥ 20</small>`;

        }



        const pct = nextLvlInfo ? Math.min(100, (curMarks / nextLvlInfo.reqMarks) * 100) : 100;



        card.innerHTML = `

            <div class="dao-card-header">

                <div>

                    <strong>${dao.name}</strong>

                    ${isMainDao ? `<span style="background:#fbbf24; color:#111; font-size:10px; padding:2px 6px; border-radius:4px; margin-left:6px; font-weight:bold;">⭐ LƯU PHÁI CHÍNH</span>` : ''}

                </div>

                <span class="dao-level-badge">${lvlInfo.name}</span>

            </div>

            <p class="dao-desc">${dao.desc}</p>

            <div class="dao-amplification-box" style="margin: 6px 0; font-size: 11px; background: rgba(0,0,0,0.3); padding: 4px 8px; border-radius: 4px;">

                <div style="display:flex; justify-content:space-between; margin-bottom:2px;">

                    <span style="color:#38bdf8;">⚡ Khuếch Đại Uy Lực:</span>

                    <strong style="color:#38bdf8;">+${((daoMult - 1) * 100).toFixed(1)}% (${daoMult.toFixed(2)}x)</strong>

                </div>

                <div style="display:flex; justify-content:space-between;">

                    <span style="color:${isConflictFree ? '#34d399' : (isMainDao ? '#fbbf24' : '#f87171')};">🌀 Quy Luật Bài Xích:</span>

                    <strong style="color:${isConflictFree ? '#34d399' : (isMainDao ? '#fbbf24' : '#f87171')};">

                        ${isConflictFree ? '0% (Chí Tôn Vô Khuyết)' : (isMainDao ? '0% (Lưu Phái Chủ Đạo)' : `Hiệu Quả ${(conflictFactor * 100).toFixed(0)}%`)}

                    </strong>

                </div>

            </div>

            <div class="dao-progress-box">

                <small>Đạo Ngân: <strong class="text-cyan">${curMarks.toLocaleString()}</strong> ${nextLvlInfo ? `/ ${nextLvlInfo.reqMarks.toLocaleString()} (${nextLvlInfo.name})` : '(Vô Thượng)'}</small>

                <div class="bar-track-outer mini">

                    <div class="bar-fill-inner exp-fill" style="width: ${pct}%"></div>

                </div>

            </div>

            <div class="dao-killer-move ${(isGrandmaster && hasKillerReqs) ? 'unlocked' : 'locked'}">

                <strong>Sát Chiêu Đạo Cảnh:</strong>

                <span>${dao.killerMove}</span>

                ${killerStatusHtml}

            </div>

        `;



        grid.appendChild(card);

    });

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

                    const stagedGu = {

                        id: guData.id,

                        name: guData.name,

                        rank: guData.rank,

                        path: guData.path,

                        type: guData.type || "Hỗ Trợ",

                        power: (guData.type === "Tấn Công" ? (guData.power || 30) : 0),

                        food: guData.food || "Các loại danh tửu, rượu ngon thế gian",

                        mpCost: guData.mpCost || 25,

                        supportEffect: guData.supportEffect || ""

                    };

                    addItemToInventory(`gu_${guData.id}`, 1, `Cổ Trùng: ${guData.name} (${guData.rank} Chuyển)`, "gu_item", { guData: stagedGu });

                    alert(`🎉 Đã mua Cổ Trùng: ${guData.name} (${guData.rank} Chuyển • ${guData.path}) và chuyển vào TÚI TRỮ VẬT!\n\n💡 Hãy mở Túi Trữ Vật để tiến hành Luyện Hóa đưa vào Không Khiếu.`);

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



// Subtab 9: Bảng Điều Khiển Nhà Phát Triển (Dev Mode Controls)

function toggleDevMode() {

    player.devModeActive = !player.devModeActive;

    const btnToggle = document.getElementById("btn-toggle-devmode") || document.getElementById("btn-toggle-dev-mode");

    const wrapper = document.getElementById("dev-console-actions") || document.getElementById("dev-controls-wrapper");

    if (wrapper) wrapper.style.display = player.devModeActive ? "grid" : "none";

    if (btnToggle) {

        btnToggle.textContent = player.devModeActive ? "🟢 Đang Bật" : "🔴 Đã Tắt";

        btnToggle.style.background = player.devModeActive ? "#10b981" : "#64748b";

    }

    if (player.devModeActive) {

        addLog("🛠️ Đã kích hoạt Chế Độ Nhà Phát Triển! Các quyền năng test game đã sẵn sàng.", "special");

    } else {

        addLog("Đã tắt Chế Độ Nhà Phát Triển.", "info");

    }

}



function devBreakthrough() {

    if (player.subStageIdx < 4) {

        player.subStageIdx += 1;

        player.exp = 0;

    } else if (player.subStageIdx === 4 && !player.isDaiVienMan) {

        player.isDaiVienMan = true;

        player.subStageIdx = 5;

        player.exp = 0;

    } else {

        if (player.rankIdx < RANKS.length - 1) {

            player.rankIdx += 1;

            player.subStageIdx = 0;

            player.isDaiVienMan = false;

            player.exp = 0;

            const r = RANKS[player.rankIdx];

            player.maxHp = r.maxHp;

            player.hp = r.maxHp;

            player.maxMp = r.maxMp;

            player.mp = r.maxMp;

            player.maxAge = r.maxAge;

        }

    }

    recalcMaxExp();

    updateSidebarUI();

    addLog(`🛠️ [DEV] Đột phá tức thời lên ${RANKS[player.rankIdx].name} • ${SUB_STAGES[player.subStageIdx].name}!`, "special");

    alert(`[DEV] Đột phá thành công!\nCảnh giới hiện tại: ${RANKS[player.rankIdx].name} • ${SUB_STAGES[player.subStageIdx].name}`);

}



function devSetDaiVienMan() {

    player.subStageIdx = 5;

    player.isDaiVienMan = true;

    player.exp = player.maxExp;

    updateSidebarUI();

    addLog("🛠️ [DEV] Cực hạn cảnh giới! Trạng thái Đại Viên Mãn đã kích hoạt (Tỷ lệ đột phá đại cảnh giới: 95%)!", "special");

    alert("[DEV] Đã kích hoạt trạng thái Đại Viên Mãn (95% tỷ lệ đột phá)!");

}



function devMaxRank() {

    player.rankIdx = 8;

    player.subStageIdx = 5;

    player.isDaiVienMan = true;

    const r = RANKS[8];

    player.maxHp = r.maxHp;

    player.hp = r.maxHp;

    player.maxMp = r.maxMp;

    player.mp = r.maxMp;

    player.maxAge = r.maxAge;

    recalcMaxExp();

    updateSidebarUI();

    addLog("🛠️ [DEV] Uy áp vô thượng! Ngươi đã thăng thẳng lên Cửu Chuyển Cổ Tôn (Đại Viên Mãn)!", "special");

    alert("[DEV] Đã thăng cấp lên Cửu Chuyển Cổ Tôn Vô Thượng!");

}



function devFullStats() {

    player.hp = player.maxHp;

    player.mp = player.maxMp;

    player.stamina = player.maxStamina;

    player.canCot = 100;

    updateSidebarUI();

    addLog("🛠️ [DEV] Trạng thái Khí Huyết, Chân Nguyên, Thể Lực & Căn Cốt hồi phục 100% viên mãn!", "special");

    alert("[DEV] Đã hồi phục đầy toàn bộ chỉ số sinh mệnh & thể lực!");

}



function devAddMoney() {

    player.stoneLow += 100000;

    player.stoneHigh += 100;

    player.mortalGold += 10000;

    player.systemPoints += 1000;

    updateSidebarUI();

    addLog("🛠️ [DEV] Nhận +100.000 Linh Thạch Hạ, 100 Linh Thạch Thượng, 10.000 Lượng Vàng & 1.000 Điểm Hệ Thống!", "special");

    alert("[DEV] Đã thêm tài nguyên ngân lượng & linh thạch dồi dào!");

}



function devGiveScrolls() {

    if (window.TECHNIQUES_DATABASE) {

        window.TECHNIQUES_DATABASE.forEach(t => {

            addItemToInventory("scroll_" + t.id, 2, `Quyển Trục ${t.name}`, "scroll", { techId: t.id });

        });

    }

    updateSidebarUI();

    renderInventoryModal();

    addLog("🛠️ [DEV] Toàn bộ Quyển Trục Công Pháp Hàn Lập x2 đã được chuyển vào Túi Trữ Vật!", "special");

    alert("[DEV] Đã nhận trọn bộ Quyển Trục Công Pháp vào Túi Trữ Vật!");

}



function devGiveGu() {

    if (window.GU_DATABASE) {

        const rareGus = window.GU_DATABASE.filter(g => g.rank >= 6 || g.id.includes("dinh_tien") || g.id.includes("xuan_thien") || g.id.includes("van_nga"));

        rareGus.slice(0, 15).forEach(g => {

            const stagedGu = {

                id: g.id,

                name: g.name,

                rank: g.rank,

                path: g.path,

                type: g.type || "Hỗ Trợ",

                power: (g.type === "Tấn Công" ? (g.power || 50) : 0),

                food: g.food || "Linh tuyền",

                mpCost: g.mpCost || 25,

                supportEffect: g.supportEffect || ""

            };

            addItemToInventory(`gu_${g.id}`, 1, `Cổ Trùng: ${g.name} (${g.rank} Chuyển)`, "gu_item", { guData: stagedGu });

        });

    }

    updateSidebarUI();

    renderInventoryModal();

    addLog("🛠️ [DEV] Trọn bộ Tiên Cổ Thất Chuyển - Cửu Chuyển đã được chuyển vào Túi Trữ Vật!", "special");

    alert("[DEV] Đã nhận trọn bộ Tiên Cổ trân quý vào Túi Trữ Vật!");

}



function devAddDaoMarks() {

    const curDao = player.mainDao || "moc";

    player.comprehension = Math.max(player.comprehension, 35);

    player.intelligence = Math.max(player.intelligence, 30);

    player.luck = Math.max(player.luck, 25);

    addDaoMarks(curDao, 150000);

    updateSidebarUI();

    const daosPane = document.getElementById("sys-daos-pane");

    if (daosPane && !daosPane.classList.contains("hidden")) renderDaosPane();

    addLog(`🛠️ [DEV] Khắc sâu 150.000 Đạo Ngân ${curDao.toUpperCase()}, đạt Đại Tông Sư & khai sáng Sát Chiêu Thiên Địa!`, "special");

    alert(`[DEV] Đã cộng 150.000 Đạo Ngân vào lưu phái ${curDao.toUpperCase()} & đạt cảnh giới Đại Tông Sư!`);

}



function devAdvanceTime() {

    advanceTime(24 * 30);

    updateSidebarUI();

    addLog("🛠️ [DEV] Thời gian trôi qua như bóng câu qua cửa sổ: Đã tua nhanh 30 ngày!", "special");

    alert("[DEV] Đã tua nhanh 30 ngày!");

}



// Gắn toàn bộ quyền năng Dev vào window

window.toggleDevMode = toggleDevMode;

window.devBreakthrough = devBreakthrough;

window.devSetDaiVienMan = devSetDaiVienMan;

window.devMaxRank = devMaxRank;

window.devFullStats = devFullStats;

window.devAddMoney = devAddMoney;

window.devGiveScrolls = devGiveScrolls;

window.devGiveGu = devGiveGu;

window.devAddDaoMarks = devAddDaoMarks;

window.devAdvanceTime = devAdvanceTime;

window.getDaoMultiplier = getDaoMultiplier;

window.getDaoConflictFactor = getDaoConflictFactor;

window.checkDaoLordStatus = checkDaoLordStatus;

window.setVitalGu = setVitalGu;
window.upgradeSystemLevel = upgradeSystemLevel;



function setupDevModeControls() {

    const btnToggle = document.getElementById("btn-toggle-devmode") || document.getElementById("btn-toggle-dev-mode");

    if (btnToggle) {

        btnToggle.addEventListener("click", toggleDevMode);

    }

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

                    <strong>${g.name} ${(player.vitalGuId === g.id || (!player.vitalGuId && idx === 0)) ? '<span class="text-gold" style="font-weight:bold;">⭐ [BẢN MỆNH CỔ]</span>' : ''}</strong>

                    <span class="gu-rank-tag">${g.rank} Chuyển • ${g.path} • ${g.type || 'Hỗ Trợ'}</span>

                </div>

                <div class="my-gu-body">

                    <span>🌱 Thức ăn: <strong>${g.food || 'Linh tuyền'}</strong></span>

                    <span>🌀 Tiêu hao Chân Nguyên: <strong>${g.mpCost || 20}</strong></span>

                    <span>⚔️ Uy lực: <strong>+${g.power || 30}</strong></span>

                </div>

                ${(player.vitalGuId !== g.id && (player.vitalGuId || idx !== 0)) ? `<button class="btn-subtle btn-set-vital-gu" onclick="setVitalGu('${g.id}')" style="margin-right:6px; border-color:#fbbf24; color:#fbbf24;">⭐ Khắc Bản Mệnh</button>` : ''}

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



    // Thôn phệ Đạo Ngân theo lưu phái cổ trùng

    const guDaoMap = {

        "Quang Đạo": "quang", "Khí Đạo": "khi", "Thổ Đạo": "tho", "Mộc Đạo": "moc",

        "Kim Đạo": "kim", "Huyết Đạo": "huyet", "Lực Đạo": "luc", "Hàn Đạo": "han",

        "Viêm Đạo": "viem", "Lôi Đạo": "loi", "Ám Đạo": "am", "Phong Đạo": "phong",

        "Hồn Đạo": "hon", "Trí Đạo": "tri", "Trận Đạo": "tran", "Luyện Đạo": "luyen",

        "Kiếm Đạo": "kiem", "Đan Đạo": "dan", "Độc Đạo": "doc", "Nô Đạo": "no",

        "Biến Hóa Đạo": "bien_hoa", "Trụ Đạo": "tru", "Vũ Đạo": "vu"

    };

    const targetDao = guDaoMap[gu.path] || "quang";

    addDaoMarks(targetDao, 15);



    if (window.soundEngine) window.soundEngine.playCoins();

    addLog(`Đã rót chân nguyên và cung phụng thức ăn ôn dưỡng ${gu.name}. Thôn phệ thêm +15 Đạo Ngân ${gu.path}!`, "success");

    alert(`Đã ôn dưỡng thành công ${gu.name}!\nNhận được +15 Đạo Ngân (${gu.path}).`);

    updateSidebarUI();

}



function rewardRandomGu(rank = 1) {

    if (!window.GU_DATABASE) return;

    const pool = window.GU_DATABASE.filter(g => g.rank === rank);

    if (pool.length > 0) {

        const picked = pool[Math.floor(Math.random() * pool.length)];

        const stagedGu = {

            id: picked.id,

            name: picked.name,

            rank: picked.rank,

            path: picked.path,

            type: picked.type || "Hỗ Trợ",

            power: (picked.type === "Tấn Công" ? (picked.power || 30) : 0),

            food: picked.food || "Linh tuyền",

            mpCost: picked.mpCost || 20,

            supportEffect: picked.supportEffect || ""

        };

        addItemToInventory(`gu_${picked.id}`, 1, `Cổ Trùng: ${picked.name} (${picked.rank} Chuyển)`, "gu_item", { guData: stagedGu });

        addLog(`Thu hoạch được Cổ Trùng hoang dã: ${picked.name} (${picked.rank} Chuyển) cất vào Túi Trữ Vật!`, "special");

    }

}



// ============================================================

// 13. TÚI TRỮ VẬT & TIỆN ÍCH VẬT PHẨM

// ============================================================



function addItemToInventory(itemId, count = 1, name = "", type = "material", extra = {}) {

    if (!Array.isArray(player.inventory)) {

        player.inventory = [];

    }

    const existing = player.inventory.find(i => i.id === itemId);

    if (existing) {

        existing.count = (existing.count || 1) + count;

    } else {

        player.inventory.push({

            id: itemId,

            name: name || itemId,

            count: count,

            type: type,

            extra: extra

        });

    }

}



let pendingLearnTech = null;



function openConfirmLearnTechModal(item, invIdx) {
    closeModal("modal-inventory");

    const tid = (item.extra && item.extra.techId) || item.techId || item.id.replace("scroll_", "");
    const techObj = window.TECHNIQUES_DATABASE ? window.TECHNIQUES_DATABASE.find(t => t.id === tid) : null;
    if (!techObj) {
        alert("Không tìm thấy thông tin công pháp của quyển trục này!");
        return;
    }

    pendingLearnTech = { item, invIdx, techObj };

    const titleEl = document.getElementById("confirm-tech-title");
    const nameEl = document.getElementById("confirm-tech-name");
    const descEl = document.getElementById("confirm-tech-desc");
    const badgeEl = document.getElementById("confirm-tech-rank-badge");
    const reqsEl = document.getElementById("confirm-tech-requirements");
    const btnDo = document.getElementById("btn-do-learn-tech");

    if (titleEl) titleEl.textContent = `📜 XÁC NHẬN LĨNH NGỘ CÔNG PHÁP`;
    if (nameEl) nameEl.textContent = techObj.name;
    if (badgeEl) badgeEl.textContent = `${techObj.rank} Chuyển • ${techObj.dao}`;
    if (descEl) descEl.textContent = techObj.desc;

    const hasLearned = player.techniquesLearned.some(t => t.id === techObj.id);
    const hasLinhCan = !!player.linhCan;
    const enoughComp = player.comprehension >= (techObj.reqComprehension || 10);
    const enoughRank = (player.rankIdx + 1) >= (techObj.reqRank || 1);

    let reqsHtml = `
        <div style="margin-bottom:6px; color:#f8fafc; font-weight:600;">Điều kiện lĩnh ngộ:</div>
        <div style="display:flex; flex-direction:column; gap:6px;">
            <div style="color:${hasLearned ? '#ef4444' : '#10b981'};">
                ${hasLearned ? '❌ Đã từng lĩnh ngộ công pháp này rồi' : '✓ Chưa lĩnh ngộ (Hợp lệ)'}
            </div>
            <div style="color:${hasLinhCan ? '#10b981' : '#ef4444'};">
                ${hasLinhCan ? `✓ Linh Căn: ${player.linhCan.name} (Đủ tư chất dẫn khí)` : '❌ Cần có Linh Căn để hấp thụ thiên địa linh khí!'}
            </div>
            <div style="color:${enoughComp ? '#10b981' : '#ef4444'};">
                ${enoughComp ? `✓ Ngộ Tính: ${player.comprehension}/${techObj.reqComprehension || 10} (Đạt yêu cầu)` : `❌ Ngộ Tính: ${player.comprehension}/${techObj.reqComprehension || 10} (Thiếu ${(techObj.reqComprehension || 10) - player.comprehension} điểm)`}
            </div>
            <div style="color:${enoughRank ? '#10b981' : '#ef4444'};">
                ${enoughRank ? `✓ Cảnh Giới: ${RANKS[player.rankIdx].name} (Đủ ${techObj.reqRank || 1} Chuyển)` : `❌ Cảnh Giới: Mới đạt ${RANKS[player.rankIdx].name} (Yêu cầu tối thiểu ${techObj.reqRank || 1} Chuyển)`}
            </div>
        </div>
    `;

    if (reqsEl) reqsEl.innerHTML = reqsHtml;

    const canDo = !hasLearned && hasLinhCan && enoughComp && enoughRank;
    if (btnDo) {
        btnDo.disabled = !canDo;
        btnDo.style.opacity = canDo ? "1" : "0.5";
        btnDo.style.cursor = canDo ? "pointer" : "not-allowed";
    }

    openModal("modal-confirm-learn-tech");
}

function doConfirmLearnTech() {

    if (!pendingLearnTech) return;

    const { item, techObj } = pendingLearnTech;



    const hasLearned = player.techniquesLearned.some(t => t.id === techObj.id);

    if (hasLearned) {

        alert(`Đạo hữu đã lĩnh ngộ công pháp [${techObj.name}] trước đó rồi!`);

        closeModal("modal-confirm-learn-tech");

        return;

    }

    if (!player.linhCan) {

        alert("⚠️ CẦN CÓ LINH CĂN!\n\nTu tiên công pháp yêu cầu người tu phải có Linh Căn.");

        return;

    }

    if (player.comprehension < techObj.reqComprehension) {

        alert(`⚠️ THIẾU NGỘ TÍNH!\n\nCông pháp này yêu cầu Ngộ Tính tối thiểu ${techObj.reqComprehension} (Hiện có: ${player.comprehension}).`);

        return;

    }

    if ((player.rankIdx + 1) < techObj.reqRank) {

        alert(`⚠️ TU VI CHƯA ĐỦ!\n\nCần đạt tối thiểu ${techObj.reqRank} Chuyển.`);

        return;

    }



    // Tiêu hao 1 quyển trục

    item.count -= 1;

    if (item.count <= 0) {

        const idx = player.inventory.indexOf(item);

        if (idx !== -1) player.inventory.splice(idx, 1);

    }



    learnTechnique(techObj);

    closeModal("modal-confirm-learn-tech");

    pendingLearnTech = null;



    updateSidebarUI();

    renderInventoryModal();

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

        const isGuItem = item.type === "gu_item" || (item.extra && item.extra.guData);

        const isStaminaPill = item.type === "pill_stamina" || item.id === "boi_nguyen_dan" || item.id === "bo_the_kim_dan";

        const isExpPill = item.type === "pill_exp" || item.id === "bo_khi_dan" || item.id === "ngung_khi_dan";

        const isCanCotPill = item.type === "pill_cancot" || item.id === "tay_tuy_dan";

        const isAgePill = item.type === "pill_age" || item.id === "dinh_nhan_dan";

        const isRerollPill = item.type === "pill_reroll" || item.id === "tay_linh_dan";

        const isScroll = item.type === "scroll" || item.id.startsWith("scroll_");

        const isRecipe = item.type === "recipe" || item.id.startsWith("recipe_");



        if (isGuItem) {

            const gData = item.extra ? item.extra.guData : null;

            const reqRank = gData ? gData.rank : 1;

            const reqMp = gData ? gData.mpCost : 20;

            useBtnHtml = `<button class="btn-subtle btn-use-inv btn-refine-inv-gu" data-idx="${idx}" style="background:rgba(52,211,153,0.15); border:1px solid #10b981; color:#6ee7b7;">🐛 Luyện Hóa Cổ (Cần Rank ${reqRank}, ${reqMp} MP)</button>`;

        } else if (isStaminaPill) {

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



                if (isGuItem) {

                    const gData = item.extra ? item.extra.guData : null;

                    const reqRank = gData ? gData.rank : 1;

                    const reqMp = gData ? gData.mpCost : 20;



                    if ((player.rankIdx + 1) < reqRank) {

                        alert(`⚠️ TU VI CHƯA ĐỦ ĐỂ ÁP CHẾ!\n\nĐể luyện hóa Cổ Trùng ${reqRank} Chuyển, đạo hữu cần đạt cảnh giới tối thiểu ${reqRank} Chuyển (hiện tại mới là ${player.rankIdx + 1} Chuyển).\n\nNếu cưỡng ép luyện hóa sẽ bị nứt Không Khiếu phản phệ nguy kịch!`);

                        return;

                    }

                    if (player.mp < reqMp) {

                        alert(`⚠️ CHÂN NGUYÊN KHÔNG ĐỦ!\n\nCần ít nhất ${reqMp} điểm Chân Nguyên để áp chế ý chí hoang dã của cổ trùng.`);

                        return;

                    }



                    // Tiến hành luyện hóa thành công

                    player.mp -= reqMp;

                    item.count -= 1;

                    player.guInventory.push(gData);

                    safePlaySound("playSuccess");

                    addLog(`✨ Đã luyện hóa thành công [${gData.name}] (${gData.rank} Chuyển) đưa vào Không Khiếu ôn dưỡng!`, "special");

                    alert(`✨ Luyện hóa thành công ${gData.name} (${gData.rank} Chuyển)!\n\nCổ trùng đã chính thức ngụ cư trong Không Khiếu.`);

                } else if (isStaminaPill) {

                    item.count -= 1;

                    const addVal = item.restore || (item.id === "bo_the_kim_dan" ? 50 : 40);

                    player.stamina = Math.min(player.maxStamina, player.stamina + addVal);

                    addLog(`Đã dùng 1 viên ${item.name}, hồi phục ${addVal} Thể Lực!`, "success");

                } else if (isExpPill) {

                    item.count -= 1;

                    const addExp = item.exp || item.expGain || (item.id === "ngung_khi_dan" ? 100 : 40);

                    player.exp += addExp;

                    checkExpThreshold();

                    addLog(`Đã dùng 1 viên ${item.name}, gia tăng +${addExp} Tu Vi!`, "success");

                } else if (isCanCotPill) {

                    item.count -= 1;

                    player.canCot = 100;

                    addLog(`Đã dùng 1 viên ${item.name}, Căn Cốt hồi phục 100% hoàn mỹ!`, "special");

                    alert("🎉 Đã dùng Tẩy Tủy Thần Đan, Căn Cốt của ngươi đã hồi phục 100% hoàn mỹ!");

                } else if (isAgePill) {

                    item.count -= 1;

                    player.maxAge += 50;

                    addLog(`Đã dùng 1 viên ${item.name}, kéo dài thêm +50 năm thọ nguyên (${player.maxAge} tuổi)!`, "special");

                    alert(`🌟 Đã dùng Định Nhan Thần Đan! Thọ nguyên tối đa tăng lên: ${player.maxAge} tuổi.`);

                } else if (isRerollPill) {

                    item.count -= 1;

                    player.linhCan = null;

                    linhCanRollsLeft = 10;

                    addLog("Đã tẩy rửa sạch sẽ toàn bộ tạp chất linh căn!", "special");

                    alert("🌊 Tẩy rửa linh căn thành công! Đạo hữu có thể chuyển sang Đo Linh Bàn (10 lượt rút) để trắc định lại linh căn mới.");

                    closeModal("modal-inventory");

                    openModal("modal-system");

                    switchToSystemTab("systab-aperture");

                } else if (isScroll) {

                    openConfirmLearnTechModal(item, idx);

                    return;

                } else if (isRecipe) {

                    item.count -= 1;

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

    // Nhất Chuyển

    { id: "recipe_tuu_trung", name: "Cổ Phương Tửu Trùng", rank: 1, price: 60, desc: "Phương pháp ngưng tụ Tửu Trùng (Khí Đạo Hỗ Trợ): Tử Kim Thạch + Linh Thạch x25. Tinh luyện chân nguyên nâng cao nửa tiểu cảnh giới." },

    { id: "recipe_nguyet_quang", name: "Cổ Phương Nguyệt Quang Cổ", rank: 1, price: 50, desc: "Bản vẽ phối chế Nguyệt Quang Cổ (Quang Đạo): Cánh hoa nguyệt lan + Linh Thạch x25. Phóng u lam nguyệt nhận 10m." },

    { id: "recipe_bach_thi", name: "Cổ Phương Bạch Thỉ Cổ", rank: 1, price: 50, desc: "Bản vẽ nuôi dưỡng Bạch Thỉ Cổ (Lực Đạo): Heo rừng trắng huyết nhục + Linh Thạch x25. Tăng vĩnh viễn nhất trư chi lực." },

    { id: "recipe_ngoc_bi", name: "Cổ Phương Ngọc Bì Cổ", rank: 1, price: 50, desc: "Bản vẽ ngưng tụ Ngọc Bì Cổ (Thổ/Ngọc Đạo): Bột ngọc thạch bích + Linh Thạch x30. Lớp sáng ngọc bích hộ thể." },



    // Nhị Chuyển

    { id: "recipe_bach_ngoc", name: "Cổ Phương Bạch Ngọc Cổ", rank: 2, price: 80, desc: "Bản vẽ hợp luyện Bạch Ngọc Cổ (Thổ/Ngọc Đạo): Ngọc Bì Cổ + Bạch Thỉ Cổ. Lớp giáp ngọc trắng trong suốt bất hoại." },

    { id: "recipe_thiet_bi", name: "Cổ Phương Thiết Bì Cổ", rank: 2, price: 80, desc: "Bản vẽ hợp luyện Thiết Bì Cổ (Kim Đạo Phòng Ngự): Heo sắt da giáp + Huyền thiết khoáng." },

    { id: "recipe_tu_vi_tuu_trung", name: "Cổ Phương Tứ Vị Tửu Trùng", rank: 2, price: 120, desc: "Bản vẽ hợp luyện Tứ Vị Tửu Trùng (Khí Đạo): Tửu Trùng x2 + Rượu Tứ Vị (Chua, Ngọt, Đắng, Cay). Tinh luyện Xích Thiết chân nguyên." },

    { id: "recipe_nguyet_ngan", name: "Cổ Phương Nguyệt Ngân Cổ", rank: 2, price: 90, desc: "Bản vẽ hợp luyện Nguyệt Ngân Cổ (Quang Đạo): Nguyệt Quang Cổ + Ngân Thạch Cổ. Tầm bắn vươn xa 20 mét." },

    { id: "recipe_nguyet_toan", name: "Cổ Phương Nguyệt Toàn Cổ", rank: 2, price: 90, desc: "Bản vẽ hợp luyện Nguyệt Toàn Cổ (Quang Đạo): Nguyệt Quang Cổ + Toàn Phong Cổ. Lưỡi đao trăng uốn lượn đường cong đánh lén." },

    { id: "recipe_nguyet_mang", name: "Cổ Phương Nguyệt Mang Cổ", rank: 2, price: 100, desc: "Bản vẽ hợp luyện Nguyệt Mang Cổ (Quang Đạo): Nguyệt Quang Cổ + Tiểu Quang Cổ. Tối đa hóa sắc bén và uy lực chém phá." },

    { id: "recipe_nguyet_nghe_thuong", name: "Cổ Phương Nguyệt Nghê Thường", rank: 2, price: 110, desc: "Bản vẽ hợp luyện Nguyệt Nghê Thường (Quang Đạo): Ngọc Bì Cổ + Nguyệt Quang Cổ. Dải lụa trăng che chắn bản thân và đồng đội." },

    { id: "recipe_hac_tong", name: "Cổ Phương Hắc Tông Cổ", rank: 2, price: 85, desc: "Bản vẽ hợp luyện Hắc Tông Cổ (Biến Hóa Đạo): Thanh Ti Cổ + Hắc Thỉ Cổ. Hộ giáp lông bờm đen kiên cố." },

    { id: "recipe_loa_toan_cot_thuong", name: "Cổ Phương Loa Toàn Cốt Thương", rank: 2, price: 95, desc: "Bản vẽ hợp luyện Loa Toàn Cốt Thương (Cốt Đạo): Cốt Thương Cổ + Xương Xoắn Ốc. Mũi giáo xoay tròn xuyên thủng giáp." },

    { id: "recipe_ai_sinh_ly", name: "Cổ Phương Ái Sinh Ly", rank: 2, price: 130, desc: "Bản vẽ hợp luyện Ái Sinh Ly (Độc Đạo): Sinh Tức Thảo + Quả Phụ Chu + Hồng Châm Hạt. Nhị chuyển đệ nhất độc." },



    // Tam Chuyển

    { id: "recipe_huyet_nguyet", name: "Cổ Phương Huyết Nguyệt Cổ", rank: 3, price: 160, desc: "Bản vẽ hợp luyện Huyết Nguyệt Cổ (Huyết Đạo): Nguyệt Mang Cổ + Huyết Khí/Tích Cổ. Huyết đao ăn mòn sinh lực." },

    { id: "recipe_thien_bong", name: "Cổ Phương Thiên Bồng Cổ", rank: 3, price: 180, desc: "Bản vẽ hợp luyện Thiên Bồng Cổ (Kim Đạo): Bạch Ngọc Cổ + Thủy Phòng Cổ. Áo giáp ánh sáng trắng tròn trịa hộ thể." },

    { id: "recipe_that_tinh_tuu_trung", name: "Cổ Phương Thất Tinh Tửu Trùng", rank: 3, price: 200, desc: "Bản vẽ hợp luyện Thất Tinh Tửu Trùng (Khí Đạo): Tứ Vị Tửu Trùng x2 + Thất Tinh Thảo + Rượu trăng sao." },

    { id: "recipe_kim_cuong", name: "Cổ Phương Kim Cương Cổ", rank: 3, price: 190, desc: "Bản vẽ hợp luyện Kim Cương Cổ (Kim Đạo): Đồng Bì Cổ + Kim Cương Tinh Thạch x3. Thân như thần kim bất hoại." },

    { id: "recipe_cuong_tong", name: "Cổ Phương Cương Tông Cổ", rank: 3, price: 175, desc: "Bản vẽ hợp luyện Cương Tông Cổ (Biến Hóa Đạo): Hắc Tông Cổ + Tinh Thiết Quặng x2. Lông thép đan giáp sắc bén." },

    { id: "recipe_cu_xi_kim_ngo", name: "Cổ Phương Cứ Xỉ Kim Ngô", rank: 3, price: 210, desc: "Bản vẽ phối chế Cứ Xỉ Kim Ngô (Kim Đạo): Kim Ngô Thân Thể + Cưa Răng Cổ. Rết vàng ngàn răng cưa xoay tròn cưa đứt mọi vật." },

    { id: "recipe_ngon_nhi_vo_tin", name: "Cổ Phương Ngôn Nhi Vô Tín Cổ", rank: 3, price: 250, desc: "Bí phương 3 bước Ngôn Nhi Vô Tín (Tín Đạo): A Thỉ Cổ + Đại Lực Cổ + Sư Hống Cổ + 3 Chỉ Hạc Cổ. Hóa giải hoàn toàn Độc Thệ Cổ." },

    { id: "recipe_thien_nguyen_bao_lien", name: "Cổ Phương Thiên Nguyên Bảo Liên", rank: 3, price: 300, desc: "Bản vẽ sáng tạo Nguyên Liên Tiên Tôn: Mạch Nguyên Tuyền + Mộc Linh Liên Hoa. Nguyên tuyền di động tự hồi chân nguyên." },

    { id: "recipe_xa_loi_3", name: "Cổ Phương Bạch Ngân Xá Lợi Cổ", rank: 3, price: 220, desc: "Bản vẽ luyện đan cổ tăng trực tiếp 1 tiểu cảnh giới Tam Chuyển." },



    // Tứ Chuyển

    { id: "recipe_cot_duc", name: "Cổ Phương Cốt Dực Cổ", rank: 4, price: 260, desc: "Bản vẽ hợp luyện Cốt Dực Cổ (Vũ Đạo): Vô Túc Điểu + Cửu Cung Hoa + Vấn Đỉnh Thạch + Kim Ô Lưu Tinh + Hàn Băng Thảo. Đôi cánh xương phi hành." },

    { id: "recipe_cuu_nhan_tuu_trung", name: "Cổ Phương Cửu Nhãn Tửu Trùng", rank: 4, price: 280, desc: "Bản vẽ hợp luyện Cửu Nhãn Tửu Trùng (Khí Đạo): Thất Hương Tửu Trùng x2 + Nhãn cầu 9 loài Bách Thú Vương. Tinh luyện Hoàng Kim chân nguyên." },

    { id: "recipe_hoanh_xung_truc_trang", name: "Cổ Phương Hoành Xung Trực Tráng", rank: 4, price: 250, desc: "Bản vẽ hợp luyện Hoành Xung Trực Tráng (Lực Đạo): Hoành Xung Cổ + Trực Tráng Cổ. Xung phong ngang dọc 200 bước." },

    { id: "recipe_huyet_lo", name: "Cổ Phương Huyết Lô Cổ", rank: 4, price: 320, desc: "Chân truyền Huyết Hải Ma Đạo: Máu tươi thân tộc cùng dòng máu x10 + Pha lê đầu lâu. Nâng tư chất lên Giáp Đẳng (90%+)." },

    { id: "recipe_kho_luc", name: "Cổ Phương Khổ Lực Cổ", rank: 4, price: 290, desc: "Bản vẽ khai mở Khổ Lực Cổ (Lực Đạo): Lão Nhân Thạch + Linh Thạch x250. Đau đớn càng lớn, sức mạnh bộc phát càng tăng vọt." },



    // Ngũ Chuyển

    { id: "recipe_thoi_boi_hoan_tran", name: "Cổ Phương Thôi Bôi Hoán Trản", rank: 5, price: 450, desc: "Bản vẽ Đạo Thiên Ma Tôn: Kim Bôi Ngân Trản + Bàng Thôi Trắc Dẫn + Di Bộ Hoán Hình. Trao đổi vật tư xuyên qua giới bích Ngũ Vực." },

    { id: "recipe_bach_chien_bat_dai", name: "Cổ Phương Bách Chiến Bất Đãi", rank: 5, price: 500, desc: "Bản vẽ Thượng Cổ Tín Vương (Luyện Đạo): Thượng Cổ Chiến Hồn + Luyện Đạo Chân Thạch. Cưỡng chế 100% tỷ lệ luyện cổ thành công." },

    { id: "recipe_tinh_mon", name: "Cổ Phương Tinh Môn Cổ", rank: 5, price: 480, desc: "Bản vẽ Phương Nguyên & Lang Gia (Vũ Đạo): Song Tinh Thạch x2 + Hắc Thiên Tinh Quang x3. Cánh cổng ánh sao xuyên không vạn dặm." },



    // Tiên Cổ Thần Thoại (Lục Chuyển -> Cửu Chuyển)

    { id: "recipe_dinh_tien_du", name: "Tiên Cổ Phương Định Tiên Du", rank: 6, price: 1200, desc: "Bí phương Nhân Tổ Truyện (Vũ Đạo): Thần Du Cổ + Định Tinh Cổ + Bích Không Cổ + Vinh Diệu Chi Quang + Tam Canh Cổ + Bách Chiến Bất Đãi. Dịch chuyển tức thời khắp thế gian." },

    { id: "recipe_van_nga", name: "Tiên Cổ Phương Vạn Ngã", rank: 7, price: 2500, desc: "Sát chiêu hóa cổ Phương Nguyên: Ẩm Đao Tửu + Phàm Phong Cổ + Tiền Hậu Thần Trở Châm + Phù Sinh Hỏa + Tự Lực Cánh Sinh + Toàn Lực Dĩ Phó. Vạn rết lực đạo phân thân." },

    { id: "recipe_tuu_trung_bat_chuyen", name: "Tiên Cổ Phương Bát Chuyển Tửu Trùng", rank: 8, price: 6000, desc: "Cổ phương truyền thuyết: Cửu Nhãn Tửu Trùng + Tam Hoàng Ngũ Đế Tửu (8 loại danh tửu). Đề thuần Bạch Lệ Tiên Nguyên thành Hoàng Hạnh Tiên Nguyên Cổ Tôn." },

    { id: "recipe_chi_ton_tien_thai", name: "Tiên Cổ Phương Chí Tôn Tiên Thai", rank: 9, price: 20000, desc: "Đại kế 10 vạn năm U Hồn Ma Tôn: Thập Tuyệt Tiên Cương Vô Sinh Đại Trận + 10 cá thể Thập Tuyệt Thể + 10 vạn năm tài nguyên. Thể chất vạn đạo không bài xích đạo ngân." }

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

                ${hasLearned ? '✓ Đã Lĩnh Ngộ' : 'Mua Quyển Trục'}

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



                player.stoneLow -= sc.price;

                addItemToInventory("scroll_" + sc.id, 1, sc.name, "scroll", { techId: sc.id });

                alert(`Đã mua thành công [${sc.name}] và chuyển vào Túi Trữ Vật!\n\n💡 Hãy mở Túi Trữ Vật và bấm "Lĩnh Ngộ Công Pháp" để tiến hành nhập môn.`);

                if (window.soundEngine) window.soundEngine.playCoins();

                updateSidebarUI();

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

            const stagedGu = {

                id: cg.id,

                name: cg.name,

                rank: cg.rank,

                path: cg.path,

                type: cg.type || "Hỗ Trợ",

                power: (cg.type.includes("Công") ? 35 : 0),

                food: "Linh tuyền",

                mpCost: 20

            };

            addItemToInventory(`gu_${cg.id}`, 1, `Cổ Trùng: ${cg.name} (${cg.rank} Chuyển)`, "gu_item", { guData: stagedGu });

            alert(`Đã đổi thành công ${cg.name} (${cg.rank} Chuyển) và cất vào Túi Trữ Vật!\n\n💡 Mở Túi Trữ Vật để Luyện Hóa đưa vào Không Khiếu.`);

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
    for (let i = 1; i <= 4; i++) {
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



function applyPhysiqueBonuses(physique) {

    if (!physique || physique.id === "none") return;

    if (physique.hpBonus) { player.maxHp += physique.hpBonus; player.hp += physique.hpBonus; }

    if (physique.mpBonus) { player.maxMp += physique.mpBonus; player.mp += physique.mpBonus; }

    if (physique.staminaBonus) { player.maxStamina += physique.staminaBonus; player.stamina += physique.staminaBonus; }

    if (physique.powerBonus) { player.power = (player.power || 30) + physique.powerBonus; }

    if (physique.compBonus) { player.comprehension = (player.comprehension || 15) + physique.compBonus; }

    if (physique.senseBonus) { player.mentalSense = (player.mentalSense || 14) + physique.senseBonus; }

    if (physique.spiritBonus) { player.spiritPower = (player.spiritPower || 15) + physique.spiritBonus; }

    if (physique.intelBonus) { player.intelligence = (player.intelligence || 17) + physique.intelBonus; }

    if (physique.maxAgeBonus) { player.maxAge = (player.maxAge || 100) + physique.maxAgeBonus; }

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

        applyPhysiqueBonuses(player.specialPhysique);



        if (physiqueBox) physiqueBox.classList.remove("hidden");

        if (physiqueNameEl) physiqueNameEl.textContent = player.specialPhysique.name;

        if (physiqueDescEl) {

            physiqueDescEl.innerHTML = `

                <div>${player.specialPhysique.desc}</div>

                <div style="margin-top:6px; color:#fbbf24; font-weight:600;">✨ Đặc Tính Bản Nguyên: ${player.specialPhysique.specialTrait}</div>

            `;

        }

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
    safeAddListener("btn-open-killer-moves", "click", () => {
        openModal("modal-system");
        switchToSystemTab("systab-killer-moves");
    });
    safeAddListener("btn-close-killer-moves", "click", () => closeModal("modal-killer-moves"));

    // btn-open-techniques & btn-close-techniques removed (chuyển sang Sát Chiêu)



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

    // btn-roll-linhcan removed

    // btn-lock-linhcan removed



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



    // Modal Xác Nhận Lĩnh Ngộ Công Pháp

    // modal-confirm-learn-tech removed

    // doConfirmLearnTech removed



    setupSystemSubtabs();

    setupDevModeControls();

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



// ========================================================
// HỆ THỐNG SÁT CHIÊU CỔ TRÙNG & BẢN MỆNH CỔ (MASTER CANONICAL)
// ========================================================

function getDaoKeyFromPath(pathName) {
    if (!pathName) return "moc";
    const p = pathName.toLowerCase();
    if (p.includes("lực")) return "luc";
    if (p.includes("quang")) return "quang";
    if (p.includes("thổ")) return "tho";
    if (p.includes("thủy")) return "thuy";
    if (p.includes("hỏa") || p.includes("viêm")) return "hoa";
    if (p.includes("phong")) return "phong";
    if (p.includes("lôi")) return "loi";
    if (p.includes("kim")) return "kim";
    if (p.includes("hồn")) return "hon";
    if (p.includes("huyết")) return "huyet";
    if (p.includes("kiếm")) return "kiem";
    if (p.includes("đao")) return "dao";
    if (p.includes("tinh")) return "tinh";
    if (p.includes("trí")) return "tri";
    if (p.includes("thực")) return "thuc";
    if (p.includes("vũ")) return "vu";
    if (p.includes("trụ")) return "tru";
    if (p.includes("mộng")) return "mong";
    if (p.includes("nhân")) return "nhan";
    if (p.includes("thiên")) return "thien";
    return "moc";
}

function setVitalGu(guId) {
    const gu = (window.GU_DATABASE || []).find(g => g.id === guId);
    if (!gu) return;
    player.vitalGuId = gu.id;
    player.mainPath = gu.path || "Lực Đạo";
    player.mainDao = player.mainPath;
    addLog(`Đã kết nối Bản Mệnh Cổ: [${gu.name}] (Lưu Phái Bản Mệnh: ${player.mainPath})!`);
}

function equipKillerMove(moveId) {
    if (!Array.isArray(player.activeKillerMoves)) {
        player.activeKillerMoves = [];
    }
    const idx = player.activeKillerMoves.indexOf(moveId);
    if (idx >= 0) {
        player.activeKillerMoves.splice(idx, 1);
        addLog(`Đã gỡ bỏ sát chiêu khỏi thanh xuất chiêu.`);
    } else {
        if (player.activeKillerMoves.length >= 4) {
            player.activeKillerMoves.shift();
        }
        player.activeKillerMoves.push(moveId);
        const km = (window.KILLER_MOVES_DATABASE || []).find(k => k.id === moveId);
        addLog(`Đã trang bị Sát Chiêu: [${km ? km.name : moveId}] vào thanh xuất chiến!`);
    }
}

function renderKillerMovesPane() {
    const grid = document.getElementById("sys-killer-moves-grid") || document.getElementById("sys-tech-list-grid");
    if (!grid) return;
    
    const db = window.KILLER_MOVES_DATABASE || [];
    grid.innerHTML = "";
    
    db.forEach(km => {
        const learned = (player.killerMovesLearned || []).find(k => k.id === km.id);
        const isEquipped = (player.activeKillerMoves || []).includes(km.id);
        
        const playerGuIds = new Set((player.guInventory || []).map(g => g.id));
        const coreGuStatus = (km.coreGu || []).map(id => {
            const guObj = (window.GU_DATABASE || []).find(g => g.id === id);
            const hasGu = playerGuIds.has(id);
            return { id, name: guObj ? guObj.name : id, has: hasGu };
        });
        const hasAllCore = coreGuStatus.every(c => c.has);
        
        const pathDaoKey = getDaoKeyFromPath(km.path);
        const playerMarks = (player.daoMarks && player.daoMarks[pathDaoKey]) || 0;
        const daoMultiplier = 1 + (playerMarks / 1000);
        const actualPower = Math.round((km.power || 0) * daoMultiplier);
        
        const card = document.createElement("div");
        card.className = `km-card-item ${learned ? 'learned' : ''} ${isEquipped ? 'active-equipped' : ''}`;
        
        let coreGuHtml = coreGuStatus.map(c => 
            `<span class="km-gu-tag core" style="${c.has ? 'border-color:#10b981; color:#a7f3d0;' : 'opacity:0.6;'}">
                ${c.has ? '✓' : '✗'} [Hạch Tâm] ${c.name}
            </span>`
        ).join("");

        let supportGuHtml = (km.supportGu || []).map(id => {
            const guObj = (window.GU_DATABASE || []).find(g => g.id === id);
            const hasGu = playerGuIds.has(id);
            return `<span class="km-gu-tag support" style="${hasGu ? 'border-color:#38bdf8;' : 'opacity:0.6;'}">
                ${hasGu ? '✓' : '○'} [Phụ] ${guObj ? guObj.name : id}
            </span>`;
        }).join("");

        card.innerHTML = `
            <div class="km-card-header">
                <div>
                    <h4 class="km-title">${km.name} ${isEquipped ? '<span style="background:#fbbf24; color:#111; font-size:10px; padding:2px 6px; border-radius:4px; margin-left:6px; font-weight:bold;">⚔️ ĐANG TRANG BỊ</span>' : ''}</h4>
                    <span class="km-rank-badge">${km.rank} Chuyển • ${km.path}</span>
                    <span class="km-type-tag" style="margin-left:6px;">${km.type}</span>
                </div>
                <span class="tech-status-tag" style="color:${learned ? '#10b981' : '#94a3b8'};">
                    ${learned ? `Đạt: ${learned.masteryStage || 'Thành Thạo'}` : 'Chưa Lĩnh Ngộ'}
                </span>
            </div>
            
            <p class="km-desc">${km.desc}</p>

            <div class="km-formula-box">
                <div class="km-formula-label">🧬 Tổ Hợp Cổ Trùng Yêu Cầu:</div>
                <div style="display:flex; flex-wrap:wrap;">${coreGuHtml} ${supportGuHtml}</div>
            </div>

            <div class="km-stats-row">
                <span>Uy Lực Gốc: <strong style="color:#fbbf24;">${km.power}</strong> ${playerMarks > 0 ? `<small style="color:#38bdf8;">(Đạo ngân +${Math.round((daoMultiplier-1)*100)}% ➔ ${actualPower})</small>` : ''}</span>
                <span>Tiêu Hao: <strong>${km.essenceCost ? km.essenceCost.amount + ' ' + km.essenceCost.type : '0'}</strong></span>
            </div>

            <div style="font-size:11px; color:#cbd5e1; margin-top:6px;">
                <span>Yêu Cầu Cảnh Giới: <strong style="color:#fcd34d;">${km.attainmentReq}</strong></span>
                <div style="color:#94a3b8; margin-top:2px;">Kỹ Pháp: <em>${km.comboMechanic || 'Thường quy'}</em></div>
            </div>

            <div class="km-actions-footer">
                ${learned ? `
                    <button class="btn-primary btn-equip-km" data-kmid="${km.id}" style="flex:1;">
                        ${isEquipped ? '✕ Tháo Khỏi Thanh Xuất Chiêu' : '⚔️ Trang Bị Sát Chiêu'}
                    </button>
                    <button class="btn-subtle btn-set-main-tech" data-techid="${km.id}" style="border:1px solid #d4af37; color:#fbbf24; background:rgba(212,175,55,0.15); padding:6px 12px; font-size:12px;">
                        ⚡ Vận Hành Làm Công Pháp Chính
                    </button>
                ` : `
                    <div class="tech-obtain-guide" style="width:100%; background:rgba(15, 23, 42, 0.6); border:1px dashed rgba(56, 189, 248, 0.4); border-radius:6px; padding:8px 12px; font-size:12px;">
                        <span style="color:#38bdf8; font-weight:600;">📥 Nguồn Gốc Thu Thập Sát Chiêu:</span>
                        <div style="color:#cbd5e1; margin-top:4px;">
                            ${hasAllCore ? '✨ Bạn ĐÃ ĐỦ Cổ Hạch Tâm trong Không Khiếu! Hãy vào Diễn Võ Đường để khai sáng hoặc mở Quyển Trục để Lĩnh Ngộ.' : '⚠️ Cần thu thập đủ Cổ Hạch Tâm trước khi có thể thi triển thực chiến.'}
                        </div>
                    </div>
                `}
            </div>
        `;
        
        if (learned) {
            const btnEquip = card.querySelector(".btn-equip-km");
            if (btnEquip) {
                btnEquip.addEventListener("click", () => {
                    equipKillerMove(km.id);
                    renderKillerMovesPane();
                });
            }
            const btnSetMain = card.querySelector(".btn-set-main-tech");
            if (btnSetMain) {
                btnSetMain.addEventListener("click", () => {
                    setMainTechnique(km.id);
                });
            }
        }
        
        grid.appendChild(card);
    });
}
