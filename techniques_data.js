/**
 * TECHNIQUES_DATA.JS (Phiên Bản v5.0 - Toàn Thư Công Pháp 9 Đại Cảnh Giới)
 * Hệ thống Công Pháp Thượng Thừa lấy cảm hứng từ Phàm Nhân Tu Tiên & Cổ Chân Nhân
 * Quy chuẩn tương đương 9 Chuyển = 9 Đại Cảnh Giới (Luyện Khí -> Chân Tiên)
 * Đầy đủ yêu cầu Cảnh giới, Linh Căn, Ngộ Tính, Chân Nguyên / Tiên Nguyên và 4 Cấp Độ Thành Thạo
 */

window.TECHNIQUES_DATABASE = [
    // ========================================================
    // TẦNG 1: RANK 1 (NHẤT CHUYỂN • LUYỆN KHÍ KỲ)
    // ========================================================
    {
        id: "truong_xuan_cong",
        name: "Trường Xuân Công",
        rank: 1,
        dao: "Mộc Đạo",
        reqRealm: "Nhất Chuyển • Luyện Khí Sơ Kỳ",
        reqRank: 1,
        reqComprehension: 10,
        mpCost: 15,
        desc: "Công pháp dưỡng sinh mộc hệ nhập môn của Thất Huyền Môn do Mặc Cư Nhân truyền thừa. Chân khí tích lũy ôn hòa dồi dào, dưỡng sinh kéo dài thọ nguyên, tạo nền tảng vững chắc để chuyển tu bất kỳ công pháp thượng thừa nào.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+15 Chân Nguyên, +10% Tốc độ tu luyện", hpBonus: 10, mpBonus: 15, rateBoost: 0.10 },
            { stage: "Tiểu Thành", expReq: 60, buffText: "+35 Chân Nguyên, +20% Tốc độ tu luyện, tự hồi 5 Khí Huyết/ngày", hpBonus: 25, mpBonus: 35, rateBoost: 0.20 },
            { stage: "Trung Thành", expReq: 180, buffText: "+80 Chân Nguyên, +35% Tốc độ tu luyện, +15 Thọ Nguyên", hpBonus: 50, mpBonus: 80, rateBoost: 0.35, maxAgeBonus: 15 },
            { stage: "Đại Thành", expReq: 450, buffText: "+160 Chân Nguyên, +50% Tu luyện, +30 Thọ Nguyên, Mở bí thuật: Mộc Khí Hồi Xuân", hpBonus: 100, mpBonus: 160, rateBoost: 0.50, maxAgeBonus: 30 }
        ],
        skill: {
            name: "Mộc Khí Hồi Xuân",
            desc: "Dẫn mộc linh khí ôn dưỡng kinh mạch, hồi phục ngay 40% Khí Huyết và tiêu trừ mệt mỏi.",
            mpCost: 35,
            effectType: "heal",
            healPercent: 40
        }
    },
    {
        id: "tay_tuy_quyet",
        name: "Tẩy Tủy Quyết",
        rank: 1,
        dao: "Đan Đạo",
        reqRealm: "Nhất Chuyển • Luyện Khí Trung Kỳ",
        reqRank: 1,
        reqComprehension: 12,
        mpCost: 20,
        desc: "Bí pháp thượng thừa phối hợp dược lực và pháp lực để gột rửa tủy kinh, loại bỏ tạp chất huyết nhục phàm nhân, hồi phục Căn Cốt tổn thương do đột phá thất bại.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+20 Khí Huyết, giảm 10% Thể Lực tiêu hao khi tu luyện", hpBonus: 20, mpBonus: 10, staminaSave: 0.10 },
            { stage: "Tiểu Thành", expReq: 80, buffText: "+50 Khí Huyết, hồi 10% Căn Cốt tổn thương, giảm 15% Thể Lực tiêu hao", hpBonus: 50, mpBonus: 20, staminaSave: 0.15 },
            { stage: "Trung Thành", expReq: 220, buffText: "+100 Khí Huyết, hồi 25% Căn Cốt tổn thương, giảm 20% Thể Lực tiêu hao", hpBonus: 100, mpBonus: 40, staminaSave: 0.20 },
            { stage: "Đại Thành", expReq: 500, buffText: "+200 Khí Huyết, chữa lành 50% Căn Cốt, tăng 10% Tỷ lệ đột phá cảnh giới", hpBonus: 200, mpBonus: 80, staminaSave: 0.25, canCotBuff: 50 }
        ],
        skill: {
            name: "Dược Lực Tẩy Kinh",
            desc: "Thanh lọc độc tố trong không khiếu, lập tức khôi phục 20 điểm Căn Cốt và 30 Thể Lực.",
            mpCost: 40,
            effectType: "restore_cancot",
            canCotAmount: 20
        }
    },
    {
        id: "trat_nhan_kiem_phap",
        name: "Trát Nhãn Kiếm Pháp",
        rank: 1,
        dao: "Kiếm Đạo",
        reqRealm: "Nhất Chuyển • Luyện Khí Sơ Kỳ",
        reqRank: 1,
        reqComprehension: 11,
        mpCost: 15,
        desc: "Võ học thế tục cận chiến đỉnh cao do Lệ Phi Vũ trao đổi. Rèn luyện tốc độ rút kiếm cực nhanh trong chớp mắt, chuyên công kích tử huyệt kẻ thù, không tốn pháp lực mà sát phạt chí mạng.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+15 Uy Lực Tấn Công, +5 Thân Pháp", atkBonus: 15, speedBonus: 5 },
            { stage: "Tiểu Thành", expReq: 70, buffText: "+35 Uy Lực, 15% Tỷ lệ bộc phát bạo kích cận chiến", atkBonus: 35, critRate: 0.15 },
            { stage: "Trung Thành", expReq: 200, buffText: "+80 Uy Lực, miễu sát yêu thú cấp thấp", atkBonus: 80, critRate: 0.25 },
            { stage: "Đại Thành", expReq: 480, buffText: "+160 Uy Lực, Mở bí thuật: Nhất Kiếm Đoạt Mệnh", atkBonus: 160, critRate: 0.35 }
        ],
        skill: {
            name: "Nhất Kiếm Đoạt Mệnh",
            desc: "Rút kiếm trong tích tắc xé rách yết hầu đối phương, gây sát thương vật lý gấp 3 lần bình thường.",
            mpCost: 20,
            effectType: "critical_slash",
            damage: 120
        }
    },

    // ========================================================
    // TẦNG 2: RANK 2 (NHỊ CHUYỂN • TRÚC CƠ KỲ)
    // ========================================================
    {
        id: "thanh_nguyen_kiem_quyet",
        name: "Thanh Nguyên Kiếm Quyết",
        rank: 2,
        dao: "Kiếm Đạo",
        reqRealm: "Nhị Chuyển • Trúc Cơ Sơ Kỳ",
        reqRank: 2,
        reqComprehension: 15,
        mpCost: 35,
        desc: "Kiếm quyết tâm pháp trấn phái của Hoàng Phong Cốc (9 tầng đầu Nhân Giới). Ngưng luyện kiếm mang sắc bén, phóng kiếm khí vô hình chém địch từ xa, tiền đề thi triển Đại Canh Kiếm Trận.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+30 Lực công kích, ngưng tụ Thanh Nguyên kiếm mang", atkBonus: 30 },
            { stage: "Tiểu Thành", expReq: 100, buffText: "+75 Lực công kích, kích hoạt Hộ Thể Kiếm Thuẫn", atkBonus: 75, defBonus: 30 },
            { stage: "Trung Thành", expReq: 300, buffText: "+160 Lực công kích, Kiếm Khí Thấu Thể xuyên giáp 30%", atkBonus: 160, defBonus: 60 },
            { stage: "Đại Thành", expReq: 750, buffText: "+320 Lực công kích, Mở bí thuật: Hộ Thể Kiếm Thuẫn", atkBonus: 320, defBonus: 120 }
        ],
        skill: {
            name: "Hộ Thể Kiếm Thuẫn",
            desc: "Kiếm mang xoay tròn quanh thân tạo thành thuẫn khí, giảm 50% sát thương nhận vào trong 3 hiệp.",
            mpCost: 50,
            effectType: "shield",
            shieldReduction: 0.50
        }
    },
    {
        id: "tam_chuyen_trong_nguyen",
        name: "Tam Chuyển Trọng Nguyên Công",
        rank: 2,
        dao: "Trụ Đạo",
        reqRealm: "Nhị Chuyển • Trúc Cơ Viên Mãn",
        reqRank: 2,
        reqComprehension: 16,
        mpCost: 40,
        desc: "Bí pháp phụ trợ nén chân nguyên khắc trên kim trang đi kèm Thanh Nguyên Kiếm Quyết. Ba lần chủ động tán công trùng tu giúp nén chặt chân nguyên, phá vỡ bình cảnh Kết Đan cho người mang ngụy linh căn.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+50 Chân Nguyên tối đa, nén 10% chân nguyên", mpBonus: 50 },
            { stage: "Tiểu Thành", expReq: 120, buffText: "+120 Chân Nguyên, tăng 10% Tỷ lệ đột phá đại cảnh giới", mpBonus: 120, breakthroughBuff: 10 },
            { stage: "Trung Thành", expReq: 350, buffText: "+260 Chân Nguyên, tăng 20% Tỷ lệ đột phá", mpBonus: 260, breakthroughBuff: 20 },
            { stage: "Đại Thành", expReq: 850, buffText: "+500 Chân Nguyên, Hoàn tất Tam Chuyển: Pháp lực tinh thuần vượt cấp 50%", mpBonus: 500, breakthroughBuff: 35 }
        ],
        skill: {
            name: "Trọng Nguyên Ngưng Tụ",
            desc: "Nén chặt toàn bộ chân nguyên trong đan điền, bộc phát đòn đánh kế tiếp tăng 80% sát thương.",
            mpCost: 60,
            effectType: "burst_buff"
        }
    },
    {
        id: "to_nu_luan_hoi_cong",
        name: "Tố Nữ Luân Hồi Công",
        rank: 2,
        dao: "Âm Dương Đạo",
        reqRealm: "Nhị Chuyển • Trúc Cơ Trung Kỳ",
        reqRank: 2,
        reqComprehension: 16,
        mpCost: 35,
        desc: "Tuyệt học truyền thừa của Yểm Nguyệt Tông do Nam Cung Uyển tu luyện. Mỗi chu kỳ luân hồi tự phong tu vi để tôi luyện tâm cảnh, sau khi phục hồi pháp lực tăng trưởng đột biến.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+30 Khí Huyết, +30 Chân Nguyên", hpBonus: 30, mpBonus: 30 },
            { stage: "Tiểu Thành", expReq: 110, buffText: "+80 Khí Huyết, +80 Chân Nguyên, tăng 20% tốc độ tu luyện", hpBonus: 80, mpBonus: 80, rateBoost: 0.20 },
            { stage: "Trung Thành", expReq: 320, buffText: "+180 Khí Huyết, +180 Chân Nguyên, tâm cảnh thanh tịnh", hpBonus: 180, mpBonus: 180, rateBoost: 0.35 },
            { stage: "Đại Thành", expReq: 800, buffText: "+400 Khí Huyết, Luân Hồi Niết Bàn: Tự động hồi phục khi nguy kịch", hpBonus: 400, mpBonus: 400, rateBoost: 0.50 }
        ],
        skill: {
            name: "Tố Nữ Băng Phong Chú",
            desc: "Đóng băng toàn bộ khí tức bản thân, hồi phục 50% HP và miễn nhiễm mọi sát thương trong 1 hiệp.",
            mpCost: 70,
            effectType: "invulnerable_heal"
        }
    },

    // ========================================================
    // TẦNG 3: RANK 3 (TAM CHUYỂN • KẾT ĐAN KỲ)
    // ========================================================
    {
        id: "dai_dien_quyet",
        name: "Đại Diễn Quyết",
        rank: 3,
        dao: "Trí Đạo",
        reqRealm: "Tam Chuyển • Kết Đan Sơ Kỳ",
        reqRank: 3,
        reqComprehension: 18,
        mpCost: 45,
        desc: "Bí pháp huyền môn rèn luyện Thần Thức của Đại Diễn Thần Quân. Cho phép phân thần hóa niệm, nhất tâm đa dụng, khống chế hàng ngàn khôi lỗi và bầy Phệ Kim Trùng.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+30 Thần Thức, +25 Tinh Thần Lực", senseBonus: 30, spiritBonus: 25 },
            { stage: "Tiểu Thành", expReq: 130, buffText: "+75 Thần Thức, phân thần điều khiển đồng thời 2 Cổ Trùng", senseBonus: 75, spiritBonus: 60 },
            { stage: "Trung Thành", expReq: 380, buffText: "+160 Thần Thức, giảm 30% chân nguyên khi dùng cổ trùng", senseBonus: 160, spiritBonus: 120 },
            { stage: "Đại Thành", expReq: 900, buffText: "+350 Thần Thức, Mở bí thuật: Kinh Thần Thứ", senseBonus: 350, spiritBonus: 250 }
        ],
        skill: {
            name: "Kinh Thần Thứ",
            desc: "Ngưng tụ thần niệm thành mũi châm vô hình đâm thẳng vào thức hải địch, gây sát thương tinh thần và làm choáng 1 hiệp.",
            mpCost: 65,
            effectType: "stun_damage",
            damage: 220
        }
    },
    {
        id: "minh_vuong_quyet",
        name: "Minh Vương Quyết",
        rank: 3,
        dao: "Lực Đạo",
        reqRealm: "Tam Chuyển • Kết Đan Sơ Kỳ",
        reqRank: 3,
        reqComprehension: 17,
        mpCost: 50,
        desc: "Công pháp thể tu Phật môn tìm thấy tại Phùng Gia Mê Quật. Dẫn sát khí rèn đúc xương cốt da thịt, tạo thành Kim Cương Thân sơ bộ, hóa giải sát khí xâm thực tâm trí.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+100 Khí Huyết, +30 Thể Lực tối đa", hpBonus: 100, maxStaminaBonus: 30 },
            { stage: "Tiểu Thành", expReq: 140, buffText: "+250 Khí Huyết, +60 Thể Lực, phòng ngự tăng 50", hpBonus: 250, maxStaminaBonus: 60, defBonus: 50 },
            { stage: "Trung Thành", expReq: 420, buffText: "+550 Khí Huyết, +100 Thể Lực, da thịt như kim cang", hpBonus: 550, maxStaminaBonus: 100, defBonus: 110 },
            { stage: "Đại Thành", expReq: 1000, buffText: "+1200 Khí Huyết, mở bí thuật: Minh Vương Hàng Ma Kình", hpBonus: 1200, maxStaminaBonus: 180, defBonus: 240 }
        ],
        skill: {
            name: "Minh Vương Hàng Ma Kình",
            desc: "Bộc phát toàn bộ sát khí thể xác, tung cú đấm mang sức nặng vạn cân bài sơn đảo hải.",
            mpCost: 80,
            effectType: "heavy_physical",
            damage: 380
        }
    },
    {
        id: "thac_thien_ma_cong",
        name: "Thác Thiên Ma Công",
        rank: 3,
        dao: "Thổ Đạo",
        reqRealm: "Tam Chuyển • Kết Đan Trung Kỳ",
        reqRank: 3,
        reqComprehension: 18,
        mpCost: 55,
        desc: "Tuyệt học ma đạo đệ nhất phòng ngự Loạn Tinh Hải của Man Hồ Tử. Rèn luyện ma khí kết hợp thân thể, khi đại thành phủ kín lớp lân giáp màu vàng kim, khóa chặt nguyên thần chống sưu hồn.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+60 Phòng Ngự, giảm 15% sát thương vật lý", defBonus: 60 },
            { stage: "Tiểu Thành", expReq: 150, buffText: "+140 Phòng Ngự, mọc hoàng kim lân giáp sơ bộ", defBonus: 140, hpBonus: 200 },
            { stage: "Trung Thành", expReq: 450, buffText: "+300 Phòng Ngự, miễn nhiễm sưu hồn và độc tố", defBonus: 300, hpBonus: 500 },
            { stage: "Đại Thành", expReq: 1100, buffText: "+650 Phòng Ngự, Hoàng Kim Ma Lân Giáp bất hoại", defBonus: 650, hpBonus: 1200 }
        ],
        skill: {
            name: "Hoàng Kim Ma Thân",
            desc: "Vảy vàng bộc phát toàn thân, giảm 70% toàn bộ sát thương nhận vào trong 2 hiệp.",
            mpCost: 85,
            effectType: "super_shield"
        }
    },
    {
        id: "bach_mach_luyen_bao",
        name: "Bách Mạch Luyện Bảo Quyết",
        rank: 3,
        dao: "Luyện Đạo",
        reqRealm: "Tam Chuyển • Kết Đan Sơ Kỳ",
        reqRank: 3,
        reqComprehension: 18,
        mpCost: 45,
        desc: "Bí quyết khắc trên Ngân Khoa Văn của Kim Khuyết Ngọc Thư (Bách Tạo Sơn). Đả thông bách mạch, dùng cơ thể tế luyện bảo vật, tăng 30% uy lực pháp bảo và hợp luyện cổ trùng.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+15% Tỷ lệ thành công khi hợp luyện cổ trùng", refineRate: 0.15 },
            { stage: "Tiểu Thành", expReq: 120, buffText: "+25% Tỷ lệ hợp luyện, giảm 20% chân nguyên luyện cổ", refineRate: 0.25 },
            { stage: "Trung Thành", expReq: 360, buffText: "+40% Tỷ lệ hợp luyện, có cơ hội thăng hoa phẩm chất cổ", refineRate: 0.40 },
            { stage: "Đại Thành", expReq: 900, buffText: "+60% Tỷ lệ hợp luyện cổ trùng, mở khóa công thức Tiên Cổ", refineRate: 0.60 }
        ],
        skill: {
            name: "Thiên Địa Luyện Hóa Thuật",
            desc: "Mượn thiên địa linh khí cưỡng ép luyện hóa cổ trùng hung tợn, tăng 50% độ thuần phục tức thì.",
            mpCost: 70,
            effectType: "tame_boost"
        }
    },
    {
        id: "huyen_am_kinh",
        name: "Huyền Âm Kinh",
        rank: 3,
        dao: "Ám Đạo",
        reqRealm: "Tam Chuyển • Kết Đan Cao Giai",
        reqRank: 3,
        reqComprehension: 19,
        mpCost: 60,
        desc: "Ma công trấn phái của Huyền Cốt Thượng Nhân và Cực Âm Tổ Sư. Chứa đựng kho tàng bí thuật ám sát, cải trang (Hoán Hình Quyết), sửa đổi ký ức (Mộng Dẫn Thuật) và Âm Ma Trảm.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+40 Sát thương hắc ám, đòn đánh ăn mòn kinh mạch", darkAtk: 40 },
            { stage: "Tiểu Thành", expReq: 160, buffText: "+90 Sát thương hắc ám, làm chậm chân nguyên hồi phục của địch", darkAtk: 90 },
            { stage: "Trung Thành", expReq: 460, buffText: "+200 Sát thương hắc ám, phong tỏa 25% MP đối phương", darkAtk: 200 },
            { stage: "Đại Thành", expReq: 1100, buffText: "+450 Sát thương hắc ám, Mở bí thuật: Âm Ma Trảm", darkAtk: 450 }
        ],
        skill: {
            name: "Âm Ma Trảm",
            desc: "Tia chém vô hình xuyên thấu thẳng vào nguyên thần và không khiếu địch, bỏ qua toàn bộ phòng ngự.",
            mpCost: 95,
            effectType: "true_damage",
            damage: 320
        }
    },

    // ========================================================
    // TẦNG 4: RANK 4 (TỨ CHUYỂN • NGUYÊN ANH KỲ)
    // ========================================================
    {
        id: "dai_canh_kiem_tran",
        name: "Đại Canh Kiếm Trận",
        rank: 4,
        dao: "Kiếm Đạo",
        reqRealm: "Tứ Chuyển • Nguyên Anh Sơ Kỳ",
        reqRank: 4,
        reqComprehension: 21,
        mpCost: 90,
        desc: "Thần thông kiếm trận tối thượng của Thanh Nguyên Kiếm Quyết tầng 10-13. Dung hợp Canh Tinh vào 72 thanh Thanh Trúc Phong Vân Kiếm, phóng ra vô số kiếm ti sắc bén giam cầm không gian chém giết cường địch.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+150 Uy lực công kích, ngưng tụ 36 đạo kiếm ti", atkBonus: 150 },
            { stage: "Tiểu Thành", expReq: 250, buffText: "+350 Uy lực, giam cầm không gian làm chậm đối thủ 30%", atkBonus: 350 },
            { stage: "Trung Thành", expReq: 700, buffText: "+800 Uy lực, kiếm ti Canh Kim cắt nát pháp bảo", atkBonus: 800 },
            { stage: "Đại Thành", expReq: 1800, buffText: "+1800 Uy lực, Vô Kiên Bất Tồi: Trảm sát Nguyên Anh Hậu Kỳ", atkBonus: 1800 }
        ],
        skill: {
            name: "Canh Kim Kiếm Ti Giảo Sát",
            desc: "Vô số sợi kiếm ti Canh Kim đan thành thiên la địa võng siết chặt, gây sát thương diện rộng hủy diệt.",
            mpCost: 160,
            effectType: "aoe_shred",
            damage: 850
        }
    },
    {
        id: "nguyen_tu_than_quang",
        name: "Nguyên Từ Thần Quang",
        rank: 4,
        dao: "Ngũ Hành Đạo",
        reqRealm: "Tứ Chuyển • Nguyên Anh Hậu Kỳ",
        reqRank: 4,
        reqComprehension: 23,
        mpCost: 100,
        desc: "Thần thông chuẩn Hóa Thần của Tinh Cung. Đòi hỏi thân thể hội tụ đủ Ngũ Hành Linh Căn để luyện hóa Nguyên Từ Thần Sơn, khắc chế tuyệt đối mọi công pháp pháp bảo ngũ hành trong thiên hạ.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+80 Khí Huyết, hấp thu 20% sát thương Ngũ Hành", hpBonus: 80, elemAbsorb: 0.20 },
            { stage: "Tiểu Thành", expReq: 300, buffText: "+200 Khí Huyết, chuyển hóa sát thương ngũ hành thành chân nguyên", hpBonus: 200, elemAbsorb: 0.35 },
            { stage: "Trung Thành", expReq: 850, buffText: "+500 Khí Huyết, vô hiệu hóa pháp bảo ngũ hành của đối thủ", hpBonus: 500, elemAbsorb: 0.55 },
            { stage: "Đại Thành", expReq: 2100, buffText: "+1200 Khí Huyết, Ngũ Hành Miễn Dịch: Đột phá Hóa Thần dễ dàng", hpBonus: 1200, elemAbsorb: 0.80, breakthroughBuff: 40 }
        ],
        skill: {
            name: "Nguyên Từ Hóa Kình",
            desc: "Phóng thích dải quang hà nguyên từ hút cạn đòn công kích ngũ hành của địch, chuyển thành 100 MP.",
            mpCost: 120,
            effectType: "absorb_mp"
        }
    },

    // ========================================================
    // TẦNG 5: RANK 5 (NGŨ CHUYỂN • HÓA THẦN KỲ)
    // ========================================================
    {
        id: "phan_thanh_chan_ma_cong",
        name: "Phạn Thánh Chân Ma Công",
        rank: 5,
        dao: "Biến Hóa Đạo",
        reqRealm: "Ngũ Chuyển • Hóa Thần Sơ Kỳ",
        reqRank: 5,
        reqComprehension: 25,
        mpCost: 130,
        desc: "Tuyệt học Pháp Thể Song Tu tối cao dung hợp từ 3 mảnh ghép: Minh Vương Quyết (Phật) + Thác Thiên Ma Công (Ma) + Phạn Thánh Yêu Công. Đạt tới Niết Bàn Thánh Thể Ba Đầu Sáu Tay cầm 6 trọng bảo.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+400 Khí Huyết, +250 Uy lực công kích", hpBonus: 400, atkBonus: 250 },
            { stage: "Tiểu Thành", expReq: 400, buffText: "+1000 Khí Huyết, +600 Uy lực, Niết Bàn Tam Biến sơ bộ", hpBonus: 1000, atkBonus: 600 },
            { stage: "Trung Thành", expReq: 1100, buffText: "+2500 Khí Huyết, +1400 Uy lực, hiện Kim Thân Ba Đầu Sáu Tay", hpBonus: 2500, atkBonus: 1400 },
            { stage: "Đại Thành", expReq: 2800, buffText: "+6000 Khí Huyết, +3200 Uy lực, cứng rắn chống lại Chân Tiên", hpBonus: 6000, atkBonus: 3200 }
        ],
        skill: {
            name: "Động Tuyền Ma Quang",
            desc: "Pháp tướng ba đầu sáu tay phóng ma quang nuốt chửng linh lực đối thủ, gây sát thương khủng khiếp.",
            mpCost: 220,
            effectType: "heavy_drain_aoe",
            damage: 1500
        }
    },
    {
        id: "kinh_trap_thap_nhi_bien",
        name: "Kinh Trập Thập Nhị Biến",
        rank: 5,
        dao: "Biến Hóa Đạo",
        reqRealm: "Ngũ Chuyển • Hóa Thần Sơ Kỳ",
        reqRank: 5,
        reqComprehension: 25,
        mpCost: 140,
        desc: "Thần thông luyện thể và biến hóa huyết mạch do Hồng Vân Đại Trưởng Lão sáng tạo. Thôn phệ Chân Huyết 12 Thượng Cổ Thiên Địa Chân Linh (Sơn Nhạc Cự Viên, Chân Long, Thiên Phượng, Côn Bằng...).",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+300 Uy Lực, hóa thân Sơn Nhạc Cự Viên", atkBonus: 300 },
            { stage: "Tiểu Thành", expReq: 380, buffText: "+750 Uy Lực, Thiên Phượng Niết Bàn tự hồi phục sinh mệnh", atkBonus: 750, hpRegenDaily: 25 },
            { stage: "Trung Thành", expReq: 1050, buffText: "+1800 Uy Lực, Côn Bằng xé rách không gian thuấn di", atkBonus: 1800 },
            { stage: "Đại Thành", expReq: 2600, buffText: "+4200 Uy Lực, Thập Nhị Biến Hợp Nhất toái không diệt thế", atkBonus: 4200 }
        ],
        skill: {
            name: "Chân Long Bạt Sơn Quyền",
            desc: "Dồn sức mạnh 12 chân linh thượng cổ giáng một quyền xé rách không gian, nghiền nát đối thủ.",
            mpCost: 260,
            effectType: "ultimate_aoe",
            damage: 1800
        }
    },

    // ========================================================
    // TẦNG 6: RANK 6 (LỤC CHUYỂN • LUYỆN HƯ KỲ - HẠ VỊ CỔ TIÊN)
    // ========================================================
    {
        id: "tieu_bac_dau_tinh_nguyen",
        name: "Tiểu Bắc Đẩu Tinh Nguyên Công",
        rank: 6,
        dao: "Tinh Đạo",
        reqRealm: "Lục Chuyển • Luyện Hư Kỳ",
        reqRank: 6,
        reqComprehension: 24,
        mpCost: 200,
        desc: "Bí pháp luyện thể Tiên Giới do Lãnh Diễm Lão Tổ truyền xuống. Hấp thu tinh thần chi lực đả thông 7 đại huyền khiếu Bắc Đẩu (Thiên Xu, Thiên Tuyền, Thiên Cơ...), ngưng tụ Chân Cực Chi Khu ngang ngửa Huyền Tiên.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+1200 Khí Huyết, +600 Chân Nguyên, đả thông Thiên Xu Khiếu", hpBonus: 1200, mpBonus: 600 },
            { stage: "Tiểu Thành", expReq: 600, buffText: "+3000 Khí Huyết, +1500 Chân Nguyên, đả thông 4 đại huyền khiếu", hpBonus: 3000, mpBonus: 1500 },
            { stage: "Trung Thành", expReq: 1800, buffText: "+7500 Khí Huyết, +3800 Chân Nguyên, đả thông 7 huyền khiếu", hpBonus: 7500, mpBonus: 3800 },
            { stage: "Đại Thành", expReq: 4500, buffText: "+18000 Khí Huyết, Chân Cực Chi Khu: Tay không xé rách không gian", hpBonus: 18000, mpBonus: 9000, defBonus: 1500 }
        ],
        skill: {
            name: "Chân Cực Bắc Đẩu Quyền",
            desc: "7 đại huyền khiếu đồng thời phát sáng như tinh tú rực rỡ, phát xuất quyền kình chấn vỡ hư không.",
            mpCost: 350,
            effectType: "heavy_space_damage",
            damage: 3200
        }
    },
    {
        id: "tan_thanh_nguyen_kiem_quyet",
        name: "Tân Thanh Nguyên Kiếm Quyết (18 Tầng)",
        rank: 6,
        dao: "Kiếm Đạo",
        reqRealm: "Lục Chuyển • Luyện Hư Kỳ",
        reqRank: 6,
        reqComprehension: 26,
        mpCost: 220,
        desc: "Bản hoàn chỉnh 18 tầng do Thanh Nguyên Tử truyền lại tại Minh Hà Chi Địa. Bổ sung Kim Lôi Trúc Chủng Kiếm Chi Pháp cùng hai đại kiếm trận kinh thế: Xuân Lê Kiếm Trận và Thanh Bàn Kiếm Trận vây khốn Đại Thừa.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+600 Lực công kích, khai mở Kiếm Linh Hóa Hư", atkBonus: 600 },
            { stage: "Tiểu Thành", expReq: 700, buffText: "+1500 Lực công kích, Xuân Lê Kiếm Trận trói buộc vạn ma", atkBonus: 1500 },
            { stage: "Trung Thành", expReq: 2100, buffText: "+3800 Lực công kích, phóng Tịch Tà Thần Lôi diệt sát tà đạo", atkBonus: 3800 },
            { stage: "Đại Thành", expReq: 5200, buffText: "+9000 Lực công kích, Thanh Bàn Kiếm Trận vây khốn cường giả Đại Thừa", atkBonus: 9000 }
        ],
        skill: {
            name: "Thanh Bàn Kiếm Trận Khốn Ma",
            desc: "Bày ra đại kiếm trận bao phủ vạn dặm, giam cầm đối thủ và phóng thích hàng ngàn đạo Tịch Tà Thần Lôi.",
            mpCost: 400,
            effectType: "boss_seal_damage",
            damage: 4500
        }
    },

    // ========================================================
    // TẦNG 7: RANK 7 (THẤT CHUYỂN • HỢP THỂ KỲ - TRUNG VỊ CỔ TIÊN)
    // ========================================================
    {
        id: "dai_chu_thien_tinh_nguyen",
        name: "Đại Chu Thiên Tinh Nguyên Công",
        rank: 7,
        dao: "Tinh Đạo",
        reqRealm: "Thất Chuyển • Hợp Thể Kỳ",
        reqRank: 7,
        reqComprehension: 27,
        mpCost: 350,
        desc: "Bản gốc hoàn chỉnh của Tiểu Bắc Đẩu Tinh Nguyên Công tại Tiên Giới. Dẫn tinh thần chi lực đả thông đủ 36 xứ tiên khiếu nền tảng trên toàn cơ thể, dung hợp thần hồn và nhục thân thành Pháp Tướng chân thân.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+4000 Khí Huyết, +2000 Chân Nguyên, khai mở 12 tiên khiếu", hpBonus: 4000, mpBonus: 2000 },
            { stage: "Tiểu Thành", expReq: 1000, buffText: "+10000 Khí Huyết, +5000 Chân Nguyên, khai mở 24 tiên khiếu", hpBonus: 10000, mpBonus: 5000 },
            { stage: "Trung Thành", expReq: 3000, buffText: "+25000 Khí Huyết, +12000 Chân Nguyên, đả thông đủ 36 tiên khiếu", hpBonus: 25000, mpBonus: 12000 },
            { stage: "Đại Thành", expReq: 7500, buffText: "+60000 Khí Huyết, Pháp Thể Kim Thân bất tử chi khu", hpBonus: 60000, mpBonus: 30000, defBonus: 4500 }
        ],
        skill: {
            name: "36 Tiên Khiếu Tinh Hà Bạo",
            desc: "36 tiên khiếu cộng hưởng như 36 vì tinh tú giáng thế, sát thương hủy thiên diệt địa.",
            mpCost: 600,
            effectType: "galaxy_burst",
            damage: 9500
        }
    },
    {
        id: "chan_ngon_hoa_luan_kinh",
        name: "Chân Ngôn Hóa Luân Kinh",
        rank: 7,
        dao: "Trụ Đạo",
        reqRealm: "Thất Chuyển • Hợp Thể Kỳ",
        reqRank: 7,
        reqComprehension: 28,
        mpCost: 400,
        desc: "Tuyệt học Thời Gian Pháp Tắc của Di La Lão Tổ (Chân Ngôn Môn). Tham ngộ thời gian ngưng tụ Thời Gian Đạo Văn và Chân Ngôn Bảo Luân, làm chậm dòng chảy thời gian của đối thủ, nhìn thấu chân tướng vạn vật.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+800 Uy lực, ngưng tụ 6 đoàn Thời Gian Đạo Văn", atkBonus: 800 },
            { stage: "Tiểu Thành", expReq: 1200, buffText: "+2200 Uy lực, ngưng tụ Chân Ngôn Bảo Luân sơ cấp", atkBonus: 2200 },
            { stage: "Trung Thành", expReq: 3600, buffText: "+5500 Uy lực, Nghịch Chuyển Chân Luân: Hồi phục trạng thái", atkBonus: 5500 },
            { stage: "Đại Thành", expReq: 9000, buffText: "+14000 Uy lực, Pháp Ngôn Thiên Địa làm chậm 70% thời gian địch", atkBonus: 14000 }
        ],
        skill: {
            name: "Chân Ngôn Bảo Luân Hãm Thời Gian",
            desc: "Phóng xuất Chân Ngôn Bảo Luân sau lưng, ngưng đọng thời gian quanh kẻ địch khiến chúng không thể né tránh.",
            mpCost: 750,
            effectType: "time_slow_heavy",
            damage: 13000
        }
    },

    // ========================================================
    // TẦNG 8: RANK 8 (BÁT CHUYỂN • ĐẠI THỪA KỲ - THƯỢNG VỊ CỔ TIÊN)
    // ========================================================
    {
        id: "thien_sat_tran_nguc_cong",
        name: "Thiên Sát Trấn Ngục Công",
        rank: 8,
        dao: "Lực Đạo",
        reqRealm: "Bát Chuyển • Đại Thừa Kỳ (Độ Kiếp)",
        reqRank: 8,
        reqComprehension: 29,
        mpCost: 650,
        desc: "Tuyệt học luyện thể tối thượng của Ma Vực gồm 12 tầng. Mượn sức mạnh 12 loại Chân Linh huyết mạch đả thông tổng cộng 1.800 huyền khiếu, biến nhục thân thành vũ khí cấp Đạo Tổ, tái tạo dù hóa thành tro bụi.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+15000 Khí Huyết, khai mở 360 huyền khiếu", hpBonus: 15000 },
            { stage: "Tiểu Thành", expReq: 2500, buffText: "+40000 Khí Huyết, khai mở 720 huyền khiếu, trấn ngục sát khí", hpBonus: 40000, defBonus: 3500 },
            { stage: "Trung Thành", expReq: 7000, buffText: "+100000 Khí Huyết, khai mở 1200 huyền khiếu, tay không nát tiên khí", hpBonus: 100000, defBonus: 9000 },
            { stage: "Đại Thành", expReq: 18000, buffText: "+250000 Khí Huyết, Đả thông 1.800 Huyền Khiếu cực hạn", hpBonus: 250000, defBonus: 25000 }
        ],
        skill: {
            name: "1800 Huyền Khiếu Trấn Ngục Kình",
            desc: "1.800 huyền khiếu bộc phát Trấn Ngục Sát Khí, áp chế toàn bộ linh lực đối thủ và tung đòn hủy diệt.",
            mpCost: 1200,
            effectType: "domain_annihilation",
            damage: 35000
        }
    },
    {
        id: "luyen_than_thuat",
        name: "Luyện Thần Thuật (7 Tầng)",
        rank: 8,
        dao: "Hồn Đạo",
        reqRealm: "Bát Chuyển • Đại Thừa Kỳ",
        reqRank: 8,
        reqComprehension: 30,
        mpCost: 700,
        desc: "Cấm thuật tu luyện nguyên thần đệ nhất Tam Giới do Luân Hồi Điện Chủ sáng tạo. Ngưng tụ Thần Đan giúp nguyên thần bất diệt, thi triển thần niệm trảm kích vô hình, chống lại mọi đòn tấn công tinh thần.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+1500 Thần Thức, ngưng tụ Thần Đan sơ bộ", senseBonus: 1500 },
            { stage: "Tiểu Thành", expReq: 3000, buffText: "+4000 Thần Thức, miễn nhiễm mọi ảo thuật và sưu hồn", senseBonus: 4000 },
            { stage: "Trung Thành", expReq: 8000, buffText: "+10000 Thần Thức, Thần Niệm Hóa Kiếm trảm sát thần hồn", senseBonus: 10000 },
            { stage: "Đại Thành", expReq: 20000, buffText: "+25000 Thần Thức, Nguyên Thần Bất Diệt chi cảnh", senseBonus: 25000 }
        ],
        skill: {
            name: "Thần Niệm Trảm Hồn Kích",
            desc: "Phóng thích thanh cự kiếm thần niệm vô hình chém thẳng vào linh hồn kẻ địch, xóa sổ nguyên thần.",
            mpCost: 1400,
            effectType: "soul_annihilation",
            damage: 42000
        }
    },

    // ========================================================
    // TẦNG 9: RANK 9 (CỬU CHUYỂN • CHÂN TIÊN CẢNH - CỔ TÔN VÔ THƯỢNG)
    // ========================================================
    {
        id: "dai_ngu_hanh_huyen_the_quyet",
        name: "Đại Ngũ Hành Huyễn Thế Quyết",
        rank: 9,
        dao: "Trụ Đạo",
        reqRealm: "Cửu Chuyển • Chân Tiên Cảnh",
        reqRank: 9,
        reqComprehension: 35,
        mpCost: 1500,
        desc: "Chí tôn công pháp Thời Gian Pháp Tắc đệ nhất Tam Giới của Di La Lão Tổ hợp thành từ Chân Ngôn Hóa Luân Kinh, Huyễn Thần Bảo Điển và 5 quyển Kim Mộc Thủy Hỏa Thổ. Khống chế tuyệt đối dòng chảy thời gian, nghịch chuyển càn khôn, chứng đạo Thời Gian Đạo Tổ.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+5000 Uy lực, diễn hóa Ngũ Hành Thời Gian tuần hoàn", atkBonus: 5000 },
            { stage: "Tiểu Thành", expReq: 5000, buffText: "+15000 Uy lực, tước đoạt thọ nguyên và tu vi kẻ địch", atkBonus: 15000 },
            { stage: "Trung Thành", expReq: 15000, buffText: "+40000 Uy lực, Định Thân Thuật phong ấn vạn vật", atkBonus: 40000 },
            { stage: "Đại Thành", expReq: 40000, buffText: "+100000 Uy lực, Ngũ Hành Huyễn Thế: Nghịch chuyển dòng sông Thời Gian", atkBonus: 100000 }
        ],
        skill: {
            name: "Ngũ Hành Huyễn Thế Đại Nghịch Chuyển",
            desc: "Kích hoạt toàn bộ sức mạnh Chí Tôn Thời Gian Pháp Tắc, xóa sổ thực tại đối thủ và phục hồi bản thân 100% Khí Huyết.",
            mpCost: 3000,
            effectType: "time_god_ultimate",
            damage: 150000,
            healPercent: 100
        }
    }
];
