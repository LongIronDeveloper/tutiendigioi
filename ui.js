/**
 * UI.JS - Giao Diện & Tương Tác Cổ Giới Tu Tiên Ký: Nghịch Mệnh Chuyển
 * Chuẩn: Awesome Design Skills, Taste-Skill Anti-Slop & UI/UX Pro Max
 * Chức năng: Toast Notifications, Responsive Drawer, Keyboard Shortcuts, Polyfill
 */

(function() {
    'use strict';

    // =========================================================
    // 1. RUNTIME DEFENSIVE POLYFILLS (Khắc phục lỗi trước khi game.js tải)
    // =========================================================
    if (typeof window.claimDailyCheckin === 'undefined') {
        window.claimDailyCheckin = function() {
            if (typeof window.claimCheckin === 'function') {
                return window.claimCheckin();
            } else if (typeof claimCheckin === 'function') {
                return claimCheckin();
            } else {
                console.warn('[UI.JS] claimCheckin function not found yet.');
            }
        };
    }

    // =========================================================
    // 2. XIANXIA CUSTOM TOAST NOTIFICATION SYSTEM (Thay thế window.alert)
    // =========================================================
    function getToastContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'xianxia-toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    function showToast(message, type = 'info', duration = 2800) {
        if (!message) return;
        const container = getToastContainer();

        const toast = document.createElement('div');
        toast.className = `xianxia-toast toast-${type}`;
        
        let icon = '⚡';
        if (message.includes('🎉') || message.includes('thành công') || message.includes('chúc mừng')) {
            icon = '✨';
            toast.classList.add('toast-success');
        } else if (message.includes('thất bại') || message.includes('tổn hại') || message.includes('không đủ') || message.includes('chưa đạt')) {
            icon = '⚠️';
            toast.classList.add('toast-warning');
        } else if (message.includes('💾') || message.includes('lưu game')) {
            icon = '💾';
            toast.classList.add('toast-save');
        } else if (message.includes('💊') || message.includes('đan dược') || message.includes('hồi phục')) {
            icon = '💊';
            toast.classList.add('toast-heal');
        }

        // Tạo cấu trúc toast
        toast.innerHTML = `
            <div class="toast-indicator"></div>
            <span class="toast-icon">${icon}</span>
            <div class="toast-content">${message.replace(/^[🎉⚠️💾💊✨]\s*/, '')}</div>
            <button class="toast-close" aria-label="Đóng thông báo">✕</button>
        `;

        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dismissToast(toast);
            });
        }

        container.appendChild(toast);

        // Hiệu ứng xuất hiện
        requestAnimationFrame(() => {
            toast.classList.add('toast-visible');
        });

        // Tự động đóng sau duration
        const timer = setTimeout(() => {
            dismissToast(toast);
        }, duration);

        toast.addEventListener('mouseenter', () => clearTimeout(timer));
    }

    function dismissToast(toast) {
        if (!toast || toast.dataset.dismissed) return;
        toast.dataset.dismissed = 'true';
        toast.classList.remove('toast-visible');
        toast.classList.add('toast-hiding');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    // Intercept window.alert để chuyển hướng toàn bộ thông báo hệ thống sang Toast non-blocking
    const _nativeAlert = window.alert;
    window.alert = function(msg) {
        showToast(String(msg));
    };

    // Public API
    window.showToast = showToast;

    // =========================================================
    // 3. RESPONSIVE SIDEBAR DRAWER & OVERLAY (Mobile & Tablet)
    // =========================================================
    function initSidebarDrawer() {
        const sidebar = document.querySelector('.sidebar-apocalyptic');
        const toggleBtn = document.getElementById('btn-toggle-sidebar');
        const mobileMenuBtn = document.getElementById('btn-mobile-menu');
        
        // Tạo backdrop cho mobile drawer nếu chưa có
        let backdrop = document.getElementById('sidebar-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'sidebar-backdrop';
            backdrop.className = 'sidebar-backdrop';
            document.body.appendChild(backdrop);
        }

        function openSidebar() {
            if (sidebar) sidebar.classList.add('sidebar-open');
            if (backdrop) backdrop.classList.add('active');
            document.body.classList.add('sidebar-active');
        }

        function closeSidebar() {
            if (sidebar) sidebar.classList.remove('sidebar-open');
            if (backdrop) backdrop.classList.remove('active');
            document.body.classList.remove('sidebar-active');
        }

        function toggleSidebar() {
            if (!sidebar) return;
            const isOpen = sidebar.classList.contains('sidebar-open');
            if (isOpen) {
                closeSidebar();
            } else {
                openSidebar();
            }
        }

        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Trên desktop: thu gọn mini sidebar
                if (window.innerWidth >= 1024) {
                    sidebar.classList.toggle('sidebar-collapsed');
                    const isCollapsed = sidebar.classList.contains('sidebar-collapsed');
                    toggleBtn.textContent = isCollapsed ? '❯' : '❮';
                    toggleBtn.title = isCollapsed ? 'Mở rộng Sidebar' : 'Thu gọn Sidebar';
                } else {
                    toggleSidebar();
                }
            });
        }

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleSidebar();
            });
        }

        backdrop.addEventListener('click', () => {
            closeSidebar();
        });

        // Tự động đóng drawer khi click vào nút Dock trên mobile
        const dockBtns = document.querySelectorAll('.sidebar-icon-dock .dock-btn, .btn-sidebar-system-card');
        dockBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (window.innerWidth < 1024) {
                    closeSidebar();
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                closeSidebar();
            }
        });
    }

    // =========================================================
    // 4. SIDEBAR BODY TAB SWITCHER (Ngăn ngừa tràn chiều cao 1122px)
    // =========================================================
    function initSidebarTabs() {
        const statsBox = document.querySelector('.stats-panel-box');
        const currBox = document.querySelector('.currency-card');
        const staminaBox = document.querySelector('.stamina-quick-strip');
        
        if (!statsBox || !currBox) return;

        // Bọc các panel phụ thành cấu trúc tab mượt mà
        let tabHeader = document.getElementById('sidebar-tab-header');
        if (!tabHeader) {
            tabHeader = document.createElement('div');
            tabHeader.id = 'sidebar-tab-header';
            tabHeader.className = 'sidebar-tab-nav';
            tabHeader.innerHTML = `
                <button type="button" class="sb-tab-btn active" data-tab="stats" aria-label="Xem Thuộc Tính Đạo Cơ">📜 Đạo Cơ</button>
                <button type="button" class="sb-tab-btn" data-tab="assets" aria-label="Xem Tài Sản và Thể Lực">💎 Tài Sản</button>
            `;

            // Chèn trước statsBox
            statsBox.parentNode.insertBefore(tabHeader, statsBox);

            // Gói statsBox vào tab-content-stats
            statsBox.classList.add('sb-tab-panel', 'active');
            statsBox.id = 'sb-panel-stats';

            // Gói currBox và staminaBox vào container assets
            let assetsPanel = document.getElementById('sb-panel-assets');
            if (!assetsPanel) {
                assetsPanel = document.createElement('div');
                assetsPanel.id = 'sb-panel-assets';
                assetsPanel.className = 'sb-tab-panel';
                currBox.parentNode.insertBefore(assetsPanel, currBox);
                assetsPanel.appendChild(currBox);
                if (staminaBox) assetsPanel.appendChild(staminaBox);
            }

            const tabBtns = tabHeader.querySelectorAll('.sb-tab-btn');
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const target = btn.dataset.tab;
                    tabBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    if (target === 'stats') {
                        statsBox.classList.add('active');
                        assetsPanel.classList.remove('active');
                    } else {
                        statsBox.classList.remove('active');
                        assetsPanel.classList.add('active');
                    }
                });
            });
        }
    }

    // =========================================================
    // 5. KEYBOARD ACCESSIBILITY & GAMING SHORTCUTS
    // =========================================================
    function initKeyboardShortcuts() {
        window.addEventListener('keydown', (e) => {
            // Không nhận phím tắt nếu đang gõ trong ô nhập liệu
            const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
                return;
            }

            const key = e.key.toUpperCase();

            // Phím Esc: Đóng toàn bộ Modals
            if (e.key === 'Escape') {
                const openModals = document.querySelectorAll('.modal-overlay:not(.hidden)');
                openModals.forEach(m => m.classList.add('hidden'));
                return;
            }

            // Phím B hoặc H: Mở/Đóng Bảng Hệ Thống
            if (key === 'B' || key === 'H') {
                const btnSys = document.getElementById('btn-open-system') || document.getElementById('btn-sidebar-system');
                if (btnSys) {
                    e.preventDefault();
                    btnSys.click();
                }
            }

            // Phím I: Mở Túi Trữ Vật
            if (key === 'I') {
                const btnInv = document.getElementById('btn-open-inventory');
                if (btnInv) {
                    e.preventDefault();
                    btnInv.click();
                }
            }

            // Phím C: Mở Bảng Cổ Trùng
            if (key === 'C') {
                const btnGu = document.getElementById('btn-open-gus');
                if (btnGu) {
                    e.preventDefault();
                    btnGu.click();
                }
            }

            // Phím K: Mở Bảng Công Pháp
            if (key === 'K') {
                const btnTech = document.getElementById('btn-open-techniques');
                if (btnTech) {
                    e.preventDefault();
                    btnTech.click();
                }
            }

            // Phím L: Mở Nhật Ký
            if (key === 'L') {
                const btnLog = document.getElementById('btn-open-log');
                if (btnLog) {
                    e.preventDefault();
                    btnLog.click();
                }
            }
        });
    }

    // =========================================================
    // 6. BOTTOM NAVIGATION BAR FOR MOBILE (Thumb Zone)
    // =========================================================
    function initMobileBottomNav() {
        if (document.getElementById('mobile-bottom-nav')) return;

        const bottomNav = document.createElement('nav');
        bottomNav.id = 'mobile-bottom-nav';
        bottomNav.className = 'mobile-bottom-nav';
        bottomNav.setAttribute('aria-label', 'Thanh điều hướng di động');
        bottomNav.innerHTML = `
            <button class="mb-nav-btn" id="mb-btn-system" title="Hệ Thống" data-testid="mobile-btn-system">
                <span class="mb-icon">🌟</span>
                <span class="mb-label">Hệ Thống</span>
            </button>
            <button class="mb-nav-btn" id="mb-btn-inventory" title="Túi Đồ" data-testid="mobile-btn-inventory">
                <span class="mb-icon">🎒</span>
                <span class="mb-label">Túi Đồ</span>
            </button>
            <button class="mb-nav-btn" id="mb-btn-gus" title="Cổ Trùng" data-testid="mobile-btn-gus">
                <span class="mb-icon">🐛</span>
                <span class="mb-label">Cổ Trùng</span>
            </button>
            <button class="mb-nav-btn" id="mb-btn-techs" title="Công Pháp" data-testid="mobile-btn-techs">
                <span class="mb-icon">📜</span>
                <span class="mb-label">Công Pháp</span>
            </button>
            <button class="mb-nav-btn" id="mb-btn-menu" title="Menu HUD" data-testid="mobile-btn-menu">
                <span class="mb-icon">☰</span>
                <span class="mb-label">Chỉ Số</span>
            </button>
        `;

        document.body.appendChild(bottomNav);

        // Bind events tương ứng
        const bind = (id, targetId) => {
            const btn = document.getElementById(id);
            const target = document.getElementById(targetId);
            if (btn && target) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    target.click();
                });
            }
        };

        bind('mb-btn-system', 'btn-open-system');
        bind('mb-btn-inventory', 'btn-open-inventory');
        bind('mb-btn-gus', 'btn-open-gus');
        bind('mb-btn-techs', 'btn-open-techniques');

        const menuBtn = document.getElementById('mb-btn-menu');
        const mobileMenuTop = document.getElementById('btn-mobile-menu');
        if (menuBtn && mobileMenuTop) {
            menuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                mobileMenuTop.click();
            });
        }
    }

    // =========================================================
    // 7. CHỈ SỐ BAY NỔI (FLOATING INDICATORS FX)
    // =========================================================
    function showFloatingIndicator(text, type = 'gold', sourceEl = null) {
        if (!text) return;
        const indicator = document.createElement('span');
        indicator.className = `xianxia-float-indicator float-${type}`;
        indicator.textContent = text;

        let left = window.innerWidth / 2;
        let top = window.innerHeight / 2;

        if (sourceEl && sourceEl.getBoundingClientRect) {
            const rect = sourceEl.getBoundingClientRect();
            left = rect.left + rect.width / 2;
            top = rect.top;
        } else if (sourceEl && typeof sourceEl.clientX === 'number') {
            left = sourceEl.clientX;
            top = sourceEl.clientY;
        }

        indicator.style.left = `${left}px`;
        indicator.style.top = `${top}px`;

        document.body.appendChild(indicator);

        indicator.addEventListener('animationend', () => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        });

        // Backup cleanup
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 1200);
    }

    // =========================================================
    // 8. TRỰC QUAN HÓA SÓNG NƯỚC CHÂN NGUYÊN HẢI (PRIMEVAL SEA WAVE)
    // =========================================================
    const RANK_PRIMEVAL_CONFIG = [
        { rank: 1, name: "Thanh Đồng Chân Nguyên", colorClass: "wave-rank-1" },
        { rank: 2, name: "Xích Thiết Chân Nguyên", colorClass: "wave-rank-2" },
        { rank: 3, name: "Bạch Ngân Chân Nguyên", colorClass: "wave-rank-3" },
        { rank: 4, name: "Hoàng Kim Chân Nguyên", colorClass: "wave-rank-4" },
        { rank: 5, name: "Tử Tinh Chân Nguyên",   colorClass: "wave-rank-5" },
        { rank: 6, name: "Tiên Nguyên Lục Quang",  colorClass: "wave-rank-6" }
    ];

    function renderPrimevalSeaWave(customContainer = null) {
        const container = customContainer || document.getElementById('aperture-visual-container');
        if (!container) return;

        let rank = 1;
        let percent = 75;
        let vitalGuIcon = "🐛";
        let vitalGuName = "Bản Mệnh Cổ";

        if (window.player) {
            if (window.player.realm && typeof window.player.realm.rank === 'number') {
                rank = window.player.realm.rank;
            }
            if (typeof window.player.mp === 'number' && typeof window.player.maxMp === 'number' && window.player.maxMp > 0) {
                percent = Math.max(5, Math.min(100, Math.round((window.player.mp / window.player.maxMp) * 100)));
            }
            if (window.player.starterGu) {
                vitalGuName = window.player.starterGu.name || vitalGuName;
            }
        }

        const config = RANK_PRIMEVAL_CONFIG[Math.min(rank - 1, RANK_PRIMEVAL_CONFIG.length - 1)] || RANK_PRIMEVAL_CONFIG[0];

        // y position for wave baseline
        const yPos = 200 - Math.round((percent / 100) * 150);

        container.className = `aperture-visual-container primeval-wave-container ${config.colorClass}`;
        container.innerHTML = `
            <div class="primeval-wave-overlay-info">
                <span class="primeval-wave-title">🌊 ${config.name} (${rank} Chuyển)</span>
                <span class="primeval-wave-percent">${percent}% Dung Lượng</span>
            </div>

            <div class="primeval-core-vital" title="${vitalGuName} (${vitalGuIcon}) trấn giữ Không Khiếu">
                ${vitalGuIcon}
            </div>

            <svg class="primeval-wave-svg" viewBox="0 0 2000 200" preserveAspectRatio="none">
                <!-- Sóng tầng sau -->
                <path class="wave-layer-back wave-fill-back" d="
                    M 0 ${yPos + 8}
                    Q 250 ${yPos - 12} 500 ${yPos + 8}
                    T 1000 ${yPos + 8}
                    T 1500 ${yPos + 8}
                    T 2000 ${yPos + 8}
                    L 2000 200 L 0 200 Z
                "/>
                <!-- Sóng tầng trước -->
                <path class="wave-layer-front wave-fill-front" d="
                    M 0 ${yPos}
                    Q 250 ${yPos + 14} 500 ${yPos}
                    T 1000 ${yPos}
                    T 1500 ${yPos}
                    T 2000 ${yPos}
                    L 2000 200 L 0 200 Z
                "/>
            </svg>
        `;
    }

    // =========================================================
    // 9. FLOATING XIANXIA TOOLTIP SYSTEM
    // =========================================================
    function initXianxiaTooltips() {
        let tooltip = document.getElementById('xianxia-floating-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'xianxia-floating-tooltip';
            tooltip.className = 'xianxia-floating-tooltip hidden';
            document.body.appendChild(tooltip);
        }

        function showTooltip(el, e) {
            const title = el.dataset.tooltipTitle || el.getAttribute('title') || el.dataset.name;
            if (!title) return;

            // Xóa tạm title native để tránh tooltip mặc định màu vàng của browser
            if (el.getAttribute('title')) {
                el.dataset.storedTitle = el.getAttribute('title');
                el.removeAttribute('title');
            }

            const desc = el.dataset.tooltipDesc || el.dataset.desc || '';
            const rank = el.dataset.tooltipRank || el.dataset.rank || '';
            const rarity = el.dataset.tooltipRarity || 'rarity-0';
            const cost = el.dataset.tooltipCost || '';
            const hint = el.dataset.tooltipHint || 'Nhấp để tương tác';

            tooltip.className = `xianxia-floating-tooltip ${rarity}`;
            tooltip.innerHTML = `
                <div class="tooltip-header">
                    <strong class="tooltip-title">${title}</strong>
                    ${rank ? `<span class="tooltip-rank-badge">${rank}</span>` : ''}
                </div>
                ${desc ? `<div class="tooltip-desc">${desc}</div>` : ''}
                ${cost ? `<div class="tooltip-meta-row"><span>Tiêu hao:</span><strong style="color:#fbbf24;">${cost}</strong></div>` : ''}
                <div class="tooltip-action-hint">✦ ${hint}</div>
            `;

            tooltip.classList.remove('hidden');

            positionTooltip(e);
        }

        function positionTooltip(e) {
            if (tooltip.classList.contains('hidden')) return;
            const pad = 14;
            const w = tooltip.offsetWidth || 260;
            const h = tooltip.offsetHeight || 120;
            let left = e.clientX + pad;
            let top = e.clientY + pad;

            if (left + w > window.innerWidth - 10) {
                left = e.clientX - w - pad;
            }
            if (top + h > window.innerHeight - 10) {
                top = e.clientY - h - pad;
            }

            tooltip.style.left = `${Math.max(10, left)}px`;
            tooltip.style.top = `${Math.max(10, top)}px`;
        }

        function hideTooltip(el) {
            tooltip.classList.add('hidden');
            if (el && el.dataset.storedTitle) {
                el.setAttribute('title', el.dataset.storedTitle);
                delete el.dataset.storedTitle;
            }
        }

        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('[data-tooltip-title], .rpg-slot-item, [data-tooltip-desc]');
            if (target) {
                showTooltip(target, e);
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!tooltip.classList.contains('hidden')) {
                positionTooltip(e);
            }
        });

        document.addEventListener('mouseout', (e) => {
            const target = e.target.closest('[data-tooltip-title], .rpg-slot-item, [data-tooltip-desc]');
            if (target) {
                hideTooltip(target);
            }
        });
    }

    // =========================================================
    // 10. 3D TILT HOVER CHO ACTION CARDS 16:9
    // =========================================================
    function initCardTilt() {
        document.addEventListener('mousemove', (e) => {
            const card = e.target.closest('.action-card-16-9');
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            card.style.transform = `perspective(800px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) scale3d(1.025, 1.025, 1.025)`;
        });

        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.action-card-16-9');
            if (card && (!e.relatedTarget || !card.contains(e.relatedTarget))) {
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            }
        });
    }

    // =========================================================
    // 11. NOTIFICATION BADGE MANAGER (Chấm đỏ nhắc nhở)
    // =========================================================
    function updateNotificationBadges() {
        // 1. Kiểm tra điểm danh hôm nay
        const checkinBtn = document.getElementById('btn-claim-checkin');
        let needsCheckin = false;
        if (window.player && window.player.checkinClaimedToday === false) {
            needsCheckin = true;
        } else if (checkinBtn && !checkinBtn.disabled) {
            needsCheckin = true;
        }

        const sysNavBtns = [
            document.getElementById('btn-sidebar-system'),
            document.getElementById('top-tab-system'),
            document.getElementById('mb-btn-system')
        ];

        sysNavBtns.forEach(btn => {
            if (!btn) return;
            if (needsCheckin) {
                btn.classList.add('has-badge');
            } else {
                btn.classList.remove('has-badge');
            }
        });

        // 2. Kiểm tra đột phá sẵn sàng
        const breakBtn = document.getElementById('btn-breakthrough');
        if (breakBtn) {
            if (!breakBtn.disabled) {
                breakBtn.classList.add('has-badge');
            } else {
                breakBtn.classList.remove('has-badge');
            }
        }
    }

    // =========================================================
    // 12. GẮN FLOATING INDICATORS CHO CÁC HÀNH ĐỘNG NHANH
    // =========================================================
    function initFloatingActionHooks() {
        const bindFloat = (id, text, type) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    showFloatingIndicator(text, type, btn);
                    setTimeout(updateNotificationBadges, 200);
                });
            }
        };

        bindFloat('btn-stamina-pill', '+40 Thể Lực', 'cyan');
        bindFloat('btn-stamina-rest', '+25 Thể Lực', 'cyan');
        bindFloat('btn-stamina-sleep', '+100% Thể Lực', 'green');
        bindFloat('btn-quick-meditate-day', '+Tu Vi', 'gold');
        bindFloat('btn-claim-checkin', '+Thất Nhật Bảo Vật', 'gold');
        bindFloat('btn-breakthrough', '⚡ Đột Phá Khí Hải', 'purple');

        // Lắng nghe khi tab Không Khiếu được mở
        document.addEventListener('click', (e) => {
            const sysTab = e.target.closest('[data-systab="systab-aperture"]');
            if (sysTab) {
                setTimeout(() => renderPrimevalSeaWave(), 50);
            }
        });
    }

    // =========================================================
    // 13. TEST HELPERS & PUBLIC API HOOKS
    // =========================================================
    window.UI = {
        showToast: showToast,
        showFloatingIndicator: showFloatingIndicator,
        renderPrimevalSeaWave: renderPrimevalSeaWave,
        updateNotificationBadges: updateNotificationBadges,
        initXianxiaTooltips: initXianxiaTooltips,
        initCardTilt: initCardTilt
    };

    window.__TEST_HELPERS__ = {
        showToast: showToast,
        showFloatingIndicator: showFloatingIndicator,
        renderPrimevalSeaWave: renderPrimevalSeaWave,
        updateNotificationBadges: updateNotificationBadges,
        isSidebarOpen: () => {
            const sb = document.querySelector('.sidebar-apocalyptic');
            return sb ? sb.classList.contains('sidebar-open') : false;
        },
        getActiveSidebarTab: () => {
            const active = document.querySelector('.sidebar-tab-nav .sb-tab-btn.active');
            return active ? active.dataset.tab : null;
        },
        clickElement: (selector) => {
            const el = document.querySelector(selector);
            if (el) el.click();
            return !!el;
        }
    };

    // =========================================================
    // 14. TỰ ĐỘNG KHỞI TẠO KHI TẢI XONG DOM
    // =========================================================
    function onDOMLoaded() {
        initSidebarDrawer();
        initSidebarTabs();
        initKeyboardShortcuts();
        initMobileBottomNav();
        initXianxiaTooltips();
        initCardTilt();
        initFloatingActionHooks();
        updateNotificationBadges();

        // Tự động cập nhật sóng nước và badge theo chu kỳ
        setInterval(updateNotificationBadges, 3000);

        console.log('[UI.JS] Xianxia Modern UI & HUD Layer v5.4 Initialized Successfully.');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDOMLoaded);
    } else {
        onDOMLoaded();
    }
})();
