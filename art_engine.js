/**
 * ART_ENGINE.JS (v4.0)
 * Bộ máy tạo ảnh minh họa Vector Procedural Cinematic chuẩn phong cách Apocalyptic World
 * & Tích hợp Gemini 3.8 Flash AI Image/Scene Generator
 */

window.ArtEngine = {
    // 1. Kho ảnh minh họa Action Cards (Chuẩn tỉ lệ 16:9, độ nét cao, đậm chất Apocalyptic World & Tiên Hiệp)
    actionCards: {
        // --- NHÀ Ở SƠN TRẠI (CABIN / HOME) ---
        act_meditate: function() {
            return `
            <svg viewBox="0 0 400 225" class="card-action-svg" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bg_meditate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#0f172a"/>
                        <stop offset="100%" stop-color="#020617"/>
                    </linearGradient>
                    <radialGradient id="qi_glow" cx="50%" cy="55%" r="45%">
                        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
                        <stop offset="60%" stop-color="#0284c7" stop-opacity="0.2"/>
                        <stop offset="100%" stop-color="transparent"/>
                    </radialGradient>
                </defs>
                <rect width="400" height="225" fill="url(#bg_meditate)"/>
                <!-- Gian phòng gỗ mờ ảo với cửa sổ ánh trăng -->
                <rect x="20" y="30" width="80" height="120" rx="4" fill="#1e293b" opacity="0.6"/>
                <line x1="60" y1="30" x2="60" y2="150" stroke="#475569" stroke-width="2"/>
                <line x1="20" y1="90" x2="100" y2="90" stroke="#475569" stroke-width="2"/>
                <polygon points="60,90 280,225 180,225" fill="#38bdf8" opacity="0.12"/>
                <!-- Vòng xoáy linh khí thổ nạp -->
                <circle cx="230" cy="125" r="70" fill="url(#qi_glow)"/>
                <ellipse cx="230" cy="180" rx="45" ry="12" fill="#334155"/>
                <!-- Bóng tu sĩ tọa thiền -->
                <circle cx="230" cy="105" r="14" fill="#38bdf8" filter="drop-shadow(0 0 10px #38bdf8)"/>
                <path d="M210 135 Q230 115 250 135 L260 175 Q230 180 200 175 Z" fill="#0284c7"/>
                <ellipse cx="230" cy="172" rx="35" ry="10" fill="#0369a1"/>
                <!-- Các hạt quang điểm bồng bềnh -->
                <circle cx="190" cy="90" r="3" fill="#fff" filter="drop-shadow(0 0 5px #38bdf8)"/>
                <circle cx="270" cy="110" r="2.5" fill="#fff" filter="drop-shadow(0 0 5px #38bdf8)"/>
                <circle cx="220" cy="70" r="2" fill="#fff"/>
            </svg>`;
        },
        act_practice_technique: function() {
            return `
            <svg viewBox="0 0 400 225" class="card-action-svg" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bg_tech" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#064e3b"/>
                        <stop offset="100%" stop-color="#022c22"/>
                    </linearGradient>
                </defs>
                <rect width="400" height="225" fill="url(#bg_tech)"/>
                <!-- Thanh kiếm phát sáng & lá trúc bay lượn -->
                <path d="M120 180 L280 45" stroke="#34d399" stroke-width="6" stroke-linecap="round" filter="drop-shadow(0 0 15px #10b981)"/>
                <path d="M120 180 L280 45" stroke="#ffffff" stroke-width="2"/>
                <polygon points="280,45 295,35 290,55" fill="#ffffff"/>
                <!-- Kiếm khí xoay tròn -->
                <ellipse cx="200" cy="112" rx="90" ry="40" fill="none" stroke="#a7f3d0" stroke-width="2" stroke-dasharray="8,6" transform="rotate(-30 200 112)"/>
                <!-- Lá trúc mộc đạo -->
                <path d="M70 60 Q95 70 85 90 Q60 80 70 60" fill="#10b981" opacity="0.8"/>
                <path d="M310 140 Q335 150 325 170 Q300 160 310 140" fill="#059669" opacity="0.8"/>
                <circle cx="200" cy="112" r="6" fill="#fff" filter="drop-shadow(0 0 12px #34d399)"/>
            </svg>`;
        },
        act_feed_gu: function() {
            return `
            <svg viewBox="0 0 400 225" class="card-action-svg" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="aperture_glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#c084fc" stop-opacity="0.9"/>
                        <stop offset="70%" stop-color="#581c87" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="transparent"/>
                    </radialGradient>
                </defs>
                <rect width="400" height="225" fill="#1e1035"/>
                <!-- Không khiếu quang hải -->
                <circle cx="200" cy="112" r="85" fill="url(#aperture_glow)"/>
                <circle cx="200" cy="112" r="75" fill="none" stroke="#e879f9" stroke-width="2" stroke-dasharray="5,4"/>
                <!-- Con Tửu Trùng / Cổ trùng phát sáng -->
                <ellipse cx="200" cy="110" rx="32" ry="22" fill="#f8fafc" filter="drop-shadow(0 0 16px #38bdf8)"/>
                <ellipse cx="200" cy="110" rx="28" ry="18" fill="#38bdf8" opacity="0.85"/>
                <circle cx="185" cy="105" r="3" fill="#0f172a"/>
                <circle cx="185" cy="115" r="3" fill="#0f172a"/>
                <path d="M225 105 Q245 95 240 108" stroke="#38bdf8" stroke-width="2" fill="none"/>
                <!-- Chén ngọc đựng rượu / cánh hoa nuôi dưỡng -->
                <ellipse cx="200" cy="175" rx="50" ry="16" fill="#334155" stroke="#f59e0b" stroke-width="2"/>
                <ellipse cx="200" cy="172" rx="44" ry="12" fill="#fbbf24" opacity="0.85"/>
            </svg>`;
        },
        act_rest_tea: function() {
            return `
            <svg viewBox="0 0 400 225" class="card-action-svg" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="225" fill="#27180f"/>
                <!-- Bàn trà gỗ mộc -->
                <ellipse cx="200" cy="155" rx="140" ry="45" fill="#451a03" stroke="#78350f" stroke-width="3"/>
                <!-- Ấm trà đất nung tử sa -->
                <ellipse cx="160" cy="140" rx="25" ry="20" fill="#78350f" stroke="#9a3412" stroke-width="2"/>
                <path d="M135 140 Q120 135 125 145" stroke="#9a3412" stroke-width="4" fill="none"/>
                <!-- Chén trà nghi ngút khói -->
                <ellipse cx="235" cy="142" rx="18" ry="12" fill="#1c1917" stroke="#10b981" stroke-width="2"/>
                <ellipse cx="235" cy="140" rx="15" ry="9" fill="#059669"/>
                <!-- Làn khói trà thanh tao -->
                <path d="M235 130 Q225 105 240 85 T235 60" stroke="#f1f5f9" stroke-width="3" fill="none" opacity="0.6"/>
                <path d="M242 128 Q250 100 238 80" stroke="#f1f5f9" stroke-width="2" fill="none" opacity="0.4"/>
            </svg>`;
        },
        act_schedule: function() {
            return `
            <svg viewBox="0 0 400 225" class="card-action-svg" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="225" fill="#0f172a"/>
                <!-- Bánh xe đồng hồ cổ bát quái -->
                <circle cx="200" cy="112" r="75" fill="#1e293b" stroke="#f59e0b" stroke-width="3"/>
                <circle cx="200" cy="112" r="60" fill="none" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="6,4"/>
                <circle cx="200" cy="112" r="8" fill="#f59e0b"/>
                <line x1="200" y1="112" x2="200" y2="65" stroke="#fbbf24" stroke-width="4" stroke-linecap="round"/>
                <line x1="200" y1="112" x2="240" y2="112" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
                <!-- Biểu tượng ngày & giờ -->
                <text x="200" y="48" fill="#f59e0b" font-size="12" text-anchor="middle" font-family="'Cinzel', serif" font-weight="bold">NGÀY</text>
                <text x="270" y="116" fill="#38bdf8" font-size="12" font-family="'Cinzel', serif" font-weight="bold">GIỜ</text>
                <text x="200" y="180" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="'Be Vietnam Pro', sans-serif">BẾ QUAN LẬP LỊCH</text>
            </svg>`;
        },
        act_leave_home: function() {
            return `
            <svg viewBox="0 0 400 225" class="card-action-svg" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bg_gate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#1e293b"/>
                        <stop offset="100%" stop-color="#047857"/>
                    </linearGradient>
                </defs>
                <rect width="400" height="225" fill="url(#bg_gate)"/>
                <!-- Cổng trại Thanh Trúc bằng gỗ cổ xưa -->
                <rect x="70" y="40" width="25" height="185" fill="#1e1b18" stroke="#451a03" stroke-width="2"/>
                <rect x="305" y="40" width="25" height="185" fill="#1e1b18" stroke="#451a03" stroke-width="2"/>
                <polygon points="50,45 200,15 350,45 330,65 200,35 70,65" fill="#292524" stroke="#d97706" stroke-width="2"/>
                <!-- Con đường mòn dẫn vào rừng sâu mịt mùng -->
                <polygon points="175,225 225,225 210,130 190,130" fill="#78350f"/>
                <!-- Rừng trúc ngút ngàn hai bên -->
                <line x1="30" y1="225" x2="45" y2="80" stroke="#059669" stroke-width="3"/>
                <line x1="370" y1="225" x2="355" y2="80" stroke="#059669" stroke-width="3"/>
            </svg>`;
        },

        // --- HOANG VỰC NÚI RỪNG (ADVENTURE) ---
        act_hunt_beast: function() {
            return `
            <svg viewBox="0 0 400 225" class="card-action-svg" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="225" fill="#1c1917"/>
                <!-- Rừng rậm u ám với mắt sói đỏ rực -->
                <path d="M0 225 L80 110 L150 225 Z" fill="#0f172a"/>
                <path d="M250 225 L330 90 L400 225 Z" fill="#0f172a"/>
                <!-- Cặp mắt yêu thú sói hoang -->
                <circle cx="185" cy="115" r="6" fill="#ef4444" filter="drop-shadow(0 0 8px #ef4444)"/>
                <circle cx="215" cy="115" r="6" fill="#ef4444" filter="drop-shadow(0 0 8px #ef4444)"/>
                <!-- Răng nanh sắc nhọn và móng vuốt -->
                <polygon points="190,135 200,155 210,135" fill="#f8fafc"/>
                <path d="M120 180 Q140 160 160 175" stroke="#ef4444" stroke-width="3" fill="none"/>
                <path d="M240 175 Q260 160 280 180" stroke="#ef4444" stroke-width="3" fill="none"/>
            </svg>`;
        },
        act_gather_herbs: function() {
            return `
            <svg viewBox="0 0 400 225" class="card-action-svg" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="225" fill="#022c22"/>
                <!-- Bụi linh thảo phát quang rực rỡ bên vách đá -->
                <path d="M50 225 L100 120 L150 225" fill="#064e3b"/>
                <ellipse cx="200" cy="165" rx="35" ry="15" fill="#10b981" filter="drop-shadow(0 0 20px #34d399)"/>
                <path d="M200 165 Q180 120 160 100" stroke="#34d399" stroke-width="4" fill="none"/>
                <path d="M200 165 Q220 115 240 95" stroke="#34d399" stroke-width="4" fill="none"/>
                <circle cx="160" cy="100" r="10" fill="#a7f3d0" filter="drop-shadow(0 0 10px #34d399)"/>
                <circle cx="240" cy="95" r="12" fill="#a7f3d0" filter="drop-shadow(0 0 10px #34d399)"/>
            </svg>`;
        },
        act_explore_cave: function() {
            return `
            <svg viewBox="0 0 400 225" class="card-action-svg" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="225" fill="#030712"/>
                <!-- Nhũ đá hang động tiền bối di tích -->
                <polygon points="60,0 80,80 100,0" fill="#1f2937"/>
                <polygon points="180,0 200,105 220,0" fill="#374151"/>
                <polygon points="300,0 320,70 340,0" fill="#1f2937"/>
                <!-- Rương cổ vật / ngọc giản phát sáng bí ẩn -->
                <rect x="160" y="140" width="80" height="50" rx="4" fill="#3b0764" stroke="#c084fc" stroke-width="2" filter="drop-shadow(0 0 15px #a855f7)"/>
                <ellipse cx="200" cy="140" rx="40" ry="12" fill="#581c87"/>
                <circle cx="200" cy="155" r="6" fill="#fbbf24"/>
            </svg>`;
        },

        // --- PHƯỜNG THỊ & TIỀN TRANG (MARKET) ---
        act_exchange_money: function() {
            return `
            <svg viewBox="0 0 400 225" class="card-action-svg" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="225" fill="#291a03"/>
                <!-- Bàn cân đổi tiền & Thỏi vàng, thỏi bạc, linh thạch -->
                <polygon points="150,170 200,120 250,170" fill="#78350f"/>
                <circle cx="200" cy="115" r="10" fill="#fbbf24"/>
                <line x1="120" y1="115" x2="280" y2="115" stroke="#fbbf24" stroke-width="3"/>
                <!-- Đĩa cân trái: Đĩnh bạc -->
                <ellipse cx="120" cy="145" rx="30" ry="10" fill="#cbd5e1" stroke="#f8fafc" stroke-width="1.5"/>
                <!-- Đĩa cân phải: Linh thạch xanh ngọc -->
                <polygon points="280,125 295,145 280,165 265,145" fill="#38bdf8" filter="drop-shadow(0 0 12px #38bdf8)"/>
            </svg>`;
        },
        act_visit_market: function() {
            return `
            <svg viewBox="0 0 400 225" class="card-action-svg" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="225" fill="#1c1917"/>
                <!-- Dãy lồng đèn đỏ & sạp hàng cổ sư sầm uất -->
                <circle cx="100" cy="70" r="14" fill="#ef4444" filter="drop-shadow(0 0 12px #ef4444)"/>
                <circle cx="200" cy="60" r="16" fill="#f59e0b" filter="drop-shadow(0 0 15px #f59e0b)"/>
                <circle cx="300" cy="70" r="14" fill="#ef4444" filter="drop-shadow(0 0 12px #ef4444)"/>
                <!-- Mái hiên sạp hàng -->
                <polygon points="40,110 200,85 360,110 340,130 200,105 60,130" fill="#b45309" stroke="#f59e0b" stroke-width="1.5"/>
                <rect x="70" y="130" width="260" height="75" fill="#292524"/>
            </svg>`;
        },

        // --- DIỄN VÕ ĐẠI HỘI (TOURNAMENT) ---
        act_tournament_arena: function() {
            return `
            <svg viewBox="0 0 400 225" class="card-action-svg" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="225" fill="#1e1b24"/>
                <!-- Lôi đài cẩm thạch đá cổ -->
                <polygon points="50,185 350,185 380,225 20,225" fill="#334155" stroke="#fbbf24" stroke-width="2"/>
                <!-- Hai luồng khí kình đối đầu nảy lửa -->
                <circle cx="140" cy="140" r="18" fill="#38bdf8" filter="drop-shadow(0 0 20px #38bdf8)"/>
                <circle cx="260" cy="140" r="18" fill="#ef4444" filter="drop-shadow(0 0 20px #ef4444)"/>
                <path d="M160 140 Q200 110 240 140" stroke="#ffffff" stroke-width="4" fill="none" filter="drop-shadow(0 0 10px #fbbf24)"/>
            </svg>`;
        },

        // --- TÀNG THƯ CÁC (LIBRARY) ---
        act_study_library: function() {
            return `
            <svg viewBox="0 0 400 225" class="card-action-svg" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="225" fill="#13132e"/>
                <!-- Giá sách ngọc giản phát sáng -->
                <rect x="50" y="40" width="120" height="160" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
                <rect x="230" y="40" width="120" height="160" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
                <!-- Ngọc giản cổ tịch lơ lửng giữa không trung -->
                <polygon points="200,90 225,110 200,130 175,110" fill="#c084fc" filter="drop-shadow(0 0 18px #a855f7)"/>
                <line x1="200" y1="100" x2="200" y2="120" stroke="#ffffff" stroke-width="2"/>
            </svg>`;
        }
    },

    // 2. Dò Xét Không Khiếu (Visual Aperture Simulation)
    renderApertureVisual: function(player) {
        const rank = player.rankIdx + 1;
        // Màu chân nguyên theo nguyên tác Cổ Chân Nhân:
        // 1 Chuyển: Lục Đồng (Thanh Đồng)
        // 2 Chuyển: Xích Thiết (Sắt Đỏ)
        // 3 Chuyển: Bạch Ngân (Bạc Trắng)
        // 4 Chuyển: Hoàng Kim (Vàng Ròng)
        // 5 Chuyển: Tử Tinh (Tím Thạch Anh)
        // 6 Chuyển: Tiên Nguyên (Vô Sắc / Ngũ Sắc Hỗn Độn)
        const seaColors = [
            { top: "#15803d", bot: "#14532d", name: "Thanh Đồng Hải (Chân Nguyên Nhất Chuyển)" },
            { top: "#dc2626", bot: "#7f1d1d", name: "Xích Thiết Hải (Chân Nguyên Nhị Chuyển)" },
            { top: "#e2e8f0", bot: "#94a3b8", name: "Bạch Ngân Hải (Chân Nguyên Tam Chuyển)" },
            { top: "#f59e0b", bot: "#b45309", name: "Hoàng Kim Hải (Chân Nguyên Tứ Chuyển)" },
            { top: "#a855f7", bot: "#581c87", name: "Tử Tinh Hải (Chân Nguyên Ngũ Chuyển)" },
            { top: "#38bdf8", bot: "#0369a1", name: "Bạch Ngọc Tiên Nguyên (Lục Chuyển Cổ Tiên)" }
        ];
        const sc = seaColors[Math.min(rank - 1, seaColors.length - 1)];
        const mpPercent = Math.round((player.mp / player.maxMp) * 100);

        return `
        <svg viewBox="0 0 600 320" class="aperture-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
                    <stop offset="50%" stop-color="#0284c7" stop-opacity="0.4"/>
                    <stop offset="100%" stop-color="#0369a1" stop-opacity="0.8"/>
                </linearGradient>
                <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="${sc.top}"/>
                    <stop offset="100%" stop-color="${sc.bot}"/>
                </linearGradient>
                <radialGradient id="spaceDark" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#090d16"/>
                    <stop offset="100%" stop-color="#020408"/>
                </radialGradient>
            </defs>
            <rect width="600" height="320" fill="url(#spaceDark)"/>
            <!-- Vách Không Khiếu (Quang màng / Ngọc màng lấp lánh) -->
            <ellipse cx="300" cy="160" rx="260" ry="140" fill="none" stroke="url(#wallGrad)" stroke-width="4" filter="drop-shadow(0 0 15px rgba(56,189,248,0.6))"/>
            <ellipse cx="300" cy="160" rx="250" ry="130" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.6"/>

            <!-- Biển Chân Nguyên (Nguyên Hải) với mức dâng sóng -->
            <path d="M50 200 Q180 ${180 - mpPercent * 0.4} 300 200 T550 200 L550 290 Q300 305 50 290 Z" fill="url(#seaGrad)" opacity="0.85"/>
            <!-- Sóng chân nguyên lượn lờ -->
            <path d="M50 200 Q200 170 300 200 T550 200" stroke="#fff" stroke-width="2" fill="none" opacity="0.7"/>

            <!-- Cổ trùng cư ngụ lơ lửng trong không khiếu -->
            <g transform="translate(300, 120)">
                <ellipse cx="0" cy="0" rx="24" ry="16" fill="#fff" filter="drop-shadow(0 0 15px #38bdf8)"/>
                <ellipse cx="0" cy="0" rx="20" ry="12" fill="${sc.top}"/>
                <circle cx="-10" cy="-3" r="2.5" fill="#000"/>
                <circle cx="-10" cy="3" r="2.5" fill="#000"/>
            </g>

            <!-- Chú thích chi tiết Không Khiếu -->
            <text x="30" y="35" fill="#38bdf8" font-size="14" font-family="'Cinzel', serif" font-weight="bold">DÒ XÉT KHÔNG KHIẾU • NGUYÊN HẢI ĐAN ĐIỀN</text>
            <text x="30" y="58" fill="#94a3b8" font-size="12" font-family="'Be Vietnam Pro', sans-serif">Chân Nguyên Khí Tức: <tspan fill="${sc.top}" font-weight="bold">${sc.name}</tspan></text>
            <text x="30" y="80" fill="#94a3b8" font-size="12" font-family="'Be Vietnam Pro', sans-serif">Dung Lượng Không Khiếu: <tspan fill="#34d399" font-weight="bold">${mpPercent}%</tspan> (${player.mp} / ${player.maxMp} Chân Nguyên)</text>
            <text x="30" y="102" fill="#94a3b8" font-size="12" font-family="'Be Vietnam Pro', sans-serif">Vách Không Khiếu: <tspan fill="#fbbf24">${rank === 1 ? 'Màng Quang Thô Sơ' : (rank === 2 ? 'Màng Ngọc Kiên Cố' : 'Màng Tinh Thạch Đại Thành')}</tspan></text>
        </svg>`;
    },

    // 3. Render Background Toàn Cảnh (Thế Giới Phong Cách Apocalyptic World)
    renderSceneVisual: function(sceneType, containerId = "scene-illustration-card") {
        const container = document.getElementById(containerId);
        if (!container) return;

        const fn = this.actionCards[sceneType] || this.actionCards.act_meditate;
        container.innerHTML = fn();
    }
};