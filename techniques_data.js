/**
 * TECHNIQUES_DATA.JS
 * Hệ thống Công Pháp Thượng Thừa lấy cảm hứng từ Phàm Nhân Tu Tiên & Cổ Chân Nhân
 * Phân cấp theo Đẳng Cấp / Lưu Phái / Yêu Cầu Tu Vi & Ngộ Tính / 4 Cấp Độ Thành Thạo
 */

window.TECHNIQUES_DATABASE = [
    {
        id: "truong_xuan_cong",
        name: "Trường Xuân Công",
        rank: 1,
        dao: "Mộc Đạo",
        reqRealm: "Nhất Chuyển Sơ Giai",
        reqRank: 1,
        reqComprehension: 10,
        mpCost: 15,
        desc: "Công pháp dưỡng sinh mộc hệ nhập môn của Thất Huyền Môn. Chân khí tích lũy ôn hòa dồi dào, dưỡng sinh kéo dài thọ nguyên, tạo nền tảng vững chắc để chuyển tu bất kỳ công pháp thượng thừa nào.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+15 Chân Nguyên, +10% Tốc độ tu luyện", hpBonus: 10, mpBonus: 15, rateBoost: 0.10 },
            { stage: "Tiểu Thành", expReq: 50, buffText: "+35 Chân Nguyên, +20% Tốc độ tu luyện, tự hồi 5 Khí Huyết/ngày", hpBonus: 25, mpBonus: 35, rateBoost: 0.20 },
            { stage: "Trung Thành", expReq: 150, buffText: "+80 Chân Nguyên, +35% Tốc độ tu luyện, +15 Thọ Nguyên", hpBonus: 50, mpBonus: 80, rateBoost: 0.35, maxAgeBonus: 15 },
            { stage: "Đại Thành", expReq: 350, buffText: "+160 Chân Nguyên, +60% Tu luyện, +30 Thọ Nguyên, Mở bí thuật: Mộc Khí Hồi Xuân", hpBonus: 100, mpBonus: 160, rateBoost: 0.60, maxAgeBonus: 30 }
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
        reqRealm: "Nhất Chuyển Trung Giai",
        reqRank: 1,
        reqComprehension: 12,
        mpCost: 20,
        desc: "Bí pháp thượng thừa phối hợp dược lực và pháp lực để gột rửa tủy kinh, loại bỏ tạp chất huyết nhục phàm nhân, hồi phục Căn Cốt tổn thương do đột phá thất bại.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+20 Khí Huyết, giảm 10% Thể Lực tiêu hao khi tu luyện", hpBonus: 20, mpBonus: 10, staminaSave: 0.10 },
            { stage: "Tiểu Thành", expReq: 60, buffText: "+50 Khí Huyết, hồi 10% Căn Cốt tổn thương, giảm 15% Thể Lực tiêu hao", hpBonus: 50, mpBonus: 20, staminaSave: 0.15 },
            { stage: "Trung Thành", expReq: 180, buffText: "+100 Khí Huyết, hồi 25% Căn Cốt tổn thương, giảm 20% Thể Lực tiêu hao", hpBonus: 100, mpBonus: 40, staminaSave: 0.20 },
            { stage: "Đại Thành", expReq: 400, buffText: "+200 Khí Huyết, chữa lành 50% Căn Cốt, tăng 10% Tỷ lệ đột phá cảnh giới", hpBonus: 200, mpBonus: 80, staminaSave: 0.25, canCotBuff: 50 }
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
        id: "thanh_nguyen_kiem_quyet",
        name: "Thanh Nguyên Kiếm Quyết",
        rank: 2,
        dao: "Kiếm Đạo",
        reqRealm: "Nhị Chuyển Sơ Giai",
        reqRank: 2,
        reqComprehension: 15,
        mpCost: 35,
        desc: "Kiếm quyết tâm pháp trấn phái của Hoàng Phong Cốc. Ngưng luyện kim kiếm mang sắc bén, có thể phóng ra kiếm khí vô hình chém địch từ cự ly xa, tiền đề thi triển Đại Canh Kiếm Trận.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+25 Lực công kích, ngưng tụ Thanh Nguyên kiếm mang", atkBonus: 25 },
            { stage: "Tiểu Thành", expReq: 80, buffText: "+60 Lực công kích, kích hoạt Hộ Thể Kiếm Thuẫn", atkBonus: 60, defBonus: 25 },
            { stage: "Trung Thành", expReq: 240, buffText: "+140 Lực công kích, Kiếm Khí Thấu Thể xuyên giáp 30%", atkBonus: 140, defBonus: 50 },
            { stage: "Đại Thành", expReq: 600, buffText: "+300 Lực công kích, Mở bí thuật: Xuân Canh Kiếm Trận chém vạn vật", atkBonus: 300, defBonus: 100 }
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
        id: "dai_dien_quyet",
        name: "Đại Diễn Quyết",
        rank: 2,
        dao: "Trí Đạo",
        reqRealm: "Nhị Chuyển Cao Giai",
        reqRank: 2,
        reqComprehension: 17,
        mpCost: 40,
        desc: "Bí pháp huyền môn 12 tầng rèn luyện Thần Thức tới cảnh giới cực hạn, cho phép phân thần hóa niệm, nhất tâm đa dụng, đồng thời khống chế nhiều cổ trùng và khôi lỗi.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+25 Thần Thức, +20 Tinh Thần Lực", senseBonus: 25, spiritBonus: 20 },
            { stage: "Tiểu Thành", expReq: 100, buffText: "+60 Thần Thức, phân thần điều khiển đồng thời 2 Cổ Trùng", senseBonus: 60, spiritBonus: 50 },
            { stage: "Trung Thành", expReq: 300, buffText: "+130 Thần Thức, giảm 30% chân nguyên khi thúc giục cổ trùng", senseBonus: 130, spiritBonus: 100 },
            { stage: "Đại Thành", expReq: 750, buffText: "+280 Thần Thức, Mở bí thuật sát phạt: Kinh Thần Thứ", senseBonus: 280, spiritBonus: 200 }
        ],
        skill: {
            name: "Kinh Thần Thứ",
            desc: "Ngưng tụ thần niệm thành mũi châm vô hình đâm thẳng vào thức hải địch, gây sát thương tinh thần cực lớn và làm choáng 1 hiệp.",
            mpCost: 60,
            effectType: "stun_damage",
            damage: 180
        }
    },
    {
        id: "minh_vuong_quyet",
        name: "Minh Vương Quyết",
        rank: 3,
        dao: "Lực Đạo",
        reqRealm: "Tam Chuyển Sơ Giai",
        reqRank: 3,
        reqComprehension: 16,
        mpCost: 50,
        desc: "Công pháp thể tu ma phật bá đạo, dẫn minh sát chi khí rèn đúc xương cốt da thịt, tạo thành Kim Cang Bất Hoại chi thể sơ bộ, cử đỉnh bạt sơn, tay không bẻ gãy pháp bảo.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+80 Khí Huyết, +30 Thể Lực tối đa", hpBonus: 80, maxStaminaBonus: 30 },
            { stage: "Tiểu Thành", expReq: 120, buffText: "+200 Khí Huyết, +60 Thể Lực tối đa, da thịt cứng như thép", hpBonus: 200, maxStaminaBonus: 60, defBonus: 40 },
            { stage: "Trung Thành", expReq: 380, buffText: "+450 Khí Huyết, +100 Thể Lực tối đa, cận chiến vô địch", hpBonus: 450, maxStaminaBonus: 100, defBonus: 90 },
            { stage: "Đại Thành", expReq: 900, buffText: "+1000 Khí Huyết, Kim Cang Bất Hoại, mở bí thuật: Minh Vương Hàng Ma Kình", hpBonus: 1000, maxStaminaBonus: 180, defBonus: 200 }
        ],
        skill: {
            name: "Minh Vương Hàng Ma Kình",
            desc: "Bộc phát toàn bộ sát khí thể xác, tung cú đấm mang sức nặng vạn cân bài sơn đảo hải, sát thương vật lý cực hạn.",
            mpCost: 80,
            effectType: "heavy_physical",
            damage: 350
        }
    },
    {
        id: "bach_mach_luyen_bao",
        name: "Bách Mạch Luyện Bảo Quyết",
        rank: 3,
        dao: "Luyện Đạo",
        reqRealm: "Tam Chuyển Sơ Giai",
        reqRank: 3,
        reqComprehension: 18,
        mpCost: 45,
        desc: "Bí quyết của Bách Mạch Quan thượng cổ, cho phép phân tán thần niệm vào trăm đường kinh mạch để luyện hóa và điều khiển nhiều cổ trùng/pháp bảo cùng lúc mà không lo phản phệ.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+15% Tỷ lệ thành công khi hợp luyện cổ trùng", refineRate: 0.15 },
            { stage: "Tiểu Thành", expReq: 100, buffText: "+25% Tỷ lệ hợp luyện, giảm 20% chân nguyên luyện cổ", refineRate: 0.25 },
            { stage: "Trung Thành", expReq: 320, buffText: "+40% Tỷ lệ hợp luyện, có cơ hội thăng hoa phẩm chất cổ", refineRate: 0.40 },
            { stage: "Đại Thành", expReq: 800, buffText: "+60% Tỷ lệ hợp luyện cổ trùng, mở khóa công thức Tiên Cổ", refineRate: 0.60 }
        ],
        skill: {
            name: "Thiên Địa Luyện Hóa Thuật",
            desc: "Mượn thiên địa linh khí cưỡng ép luyện hóa cổ trùng hung tợn, tăng 50% độ thuần phục tức thì.",
            mpCost: 70,
            effectType: "tame_boost"
        }
    },
    {
        id: "phong_loi_duc_quyet",
        name: "Phong Lôi Dực Quyết",
        rank: 3,
        dao: "Phong Đạo",
        reqRealm: "Tam Chuyển Trung Giai",
        reqRank: 3,
        reqComprehension: 19,
        mpCost: 55,
        desc: "Thần thông phi hành độn thuật phong lôi hợp nhất, ngưng tụ phong lôi chi lực trên lưng, di chuyển nhanh như chớp giật xé rách hư không, né tránh đòn công kích trong tích tắc.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+25 Tốc độ di chuyển, +10% Né tránh", speedBonus: 25, dodgeBonus: 0.10 },
            { stage: "Tiểu Thành", expReq: 120, buffText: "+55 Tốc độ, +20% Né tránh, giảm 25% thời gian thám hiểm", speedBonus: 55, dodgeBonus: 0.20 },
            { stage: "Trung Thành", expReq: 350, buffText: "+120 Tốc độ, +35% Né tránh, Lôi Độn thoắt ẩn thoắt hiện", speedBonus: 120, dodgeBonus: 0.35 },
            { stage: "Đại Thành", expReq: 850, buffText: "+250 Tốc độ, mở bí thuật: Cửu Thiên Lôi Độn tức thời", speedBonus: 250, dodgeBonus: 0.50 }
        ],
        skill: {
            name: "Cửu Thiên Lôi Độn",
            desc: "Hóa thân thành tia sét biến mất tại chỗ, né tránh 100% đòn tấn công của địch trong lượt này.",
            mpCost: 75,
            effectType: "invulnerable_turn"
        }
    },
    {
        id: "huyen_am_kinh",
        name: "Huyền Âm Kinh",
        rank: 3,
        dao: "Ám Đạo",
        reqRealm: "Tam Chuyển Cao Giai",
        reqRank: 3,
        reqComprehension: 19,
        mpCost: 60,
        desc: "Ma công âm tà thượng thừa, tu luyện huyền âm sát khí cực hàn. Chiêu thức vô thanh vô tức, chuyên đánh vào nguyên thần và không khiếu đối phương.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+35 Sát thương hắc ám, đòn đánh kèm hiệu ứng ăn mòn", darkAtk: 35 },
            { stage: "Tiểu Thành", expReq: 140, buffText: "+80 Sát thương hắc ám, làm chậm chân nguyên hồi phục của địch", darkAtk: 80 },
            { stage: "Trung Thành", expReq: 400, buffText: "+180 Sát thương hắc ám, phong tỏa 20% MP của đối phương", darkAtk: 180 },
            { stage: "Đại Thành", expReq: 950, buffText: "+380 Sát thương hắc ám, mở bí thuật ám sát: Âm Ma Trảm", darkAtk: 380 }
        ],
        skill: {
            name: "Âm Ma Trảm",
            desc: "Tia chém vô hình chém thẳng vào nguyên thần và không khiếu địch, bỏ qua toàn bộ phòng ngự giáp xác.",
            mpCost: 90,
            effectType: "true_damage",
            damage: 280
        }
    },
    {
        id: "tieu_bac_dau_tinh_nguyen",
        name: "Tiểu Bắc Đẩu Tinh Nguyên Công",
        rank: 4,
        dao: "Tinh Đạo",
        reqRealm: "Tứ Chuyển Sơ Giai",
        reqRank: 4,
        reqComprehension: 22,
        mpCost: 80,
        desc: "Tiên gia bí điển dẫn lực thất tinh Bắc Đẩu thối luyện thân thể, khai mở 1800 tiên khiếu và huyền khiếu trên cơ thể, đạt tới Niết Bàn Thánh Thể bất hoại.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+300 Khí Huyết, +150 Chân Nguyên, thân thể lấp lánh tinh quang", hpBonus: 300, mpBonus: 150 },
            { stage: "Tiểu Thành", expReq: 200, buffText: "+700 Khí Huyết, +350 Chân Nguyên, khai mở 360 tiên khiếu", hpBonus: 700, mpBonus: 350 },
            { stage: "Trung Thành", expReq: 600, buffText: "+1600 Khí Huyết, +800 Chân Nguyên, khai mở 1080 tiên khiếu", hpBonus: 1600, mpBonus: 800 },
            { stage: "Đại Thành", expReq: 1500, buffText: "+3500 Khí Huyết, Niết Bàn Thánh Thể thành hình, miễn dịch chí mạng", hpBonus: 3500, mpBonus: 1800 }
        ],
        skill: {
            name: "Niết Bàn Thánh Thể Bạo Phát",
            desc: "Toàn bộ tiên khiếu phát sáng chói lọi, tăng gấp đôi uy lực tấn công và phòng ngự trong 3 hiệp.",
            mpCost: 150,
            effectType: "super_buff"
        }
    },
    {
        id: "kinh_trap_thap_nhi_bien",
        name: "Kinh Trập Thập Nhị Biến",
        rank: 5,
        dao: "Biến Hóa Đạo",
        reqRealm: "Ngũ Chuyển Sơ Giai",
        reqRank: 5,
        reqComprehension: 25,
        mpCost: 120,
        desc: "Bí thuật nghịch thiên dung luyện huyết mạch 12 loại Chân Linh thượng cổ (Sơn Nhạc Cự Viên, Chân Long, Thiên Phượng, Côn Bằng, Khổng Tước...), biến hóa tùy tâm với sức mạnh dời non lấp bể.",
        masteryStages: [
            { stage: "Nhập Môn", expReq: 0, buffText: "+400 Uy lực công kích, biến thân Sơn Nhạc Cự Viên", atkBonus: 400 },
            { stage: "Tiểu Thành", expReq: 300, buffText: "+900 Uy lực, biến thân Thiên Phượng Niết Bàn tái sinh", atkBonus: 900 },
            { stage: "Trung Thành", expReq: 800, buffText: "+2000 Uy lực, biến thân Du Thiên Côn Bằng xé rách không gian", atkBonus: 2000 },
            { stage: "Đại Thành", expReq: 2000, buffText: "+4500 Uy lực, Thập Nhị Biến Hợp Nhất Chân Long Biến cực hạn", atkBonus: 4500 }
        ],
        skill: {
            name: "Chân Long Bạt Sơn Quyền",
            desc: "Hóa thân chân long thần thánh, giáng một quyền xé rách không gian, tiêu diệt toàn bộ đối thủ trong chớp mắt.",
            mpCost: 250,
            effectType: "ultimate_aoe",
            damage: 1200
        }
    }
];
