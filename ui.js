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
    // 7. TEST HELPERS & AUTOMATION HOOKS (Dành cho Playwright E2E)
    // =========================================================
    window.__TEST_HELPERS__ = {
        showToast: showToast,
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
    // 8. TỰ ĐỘNG KHỞI TẠO KHI TẢI XONG DOM
    // =========================================================
    function onDOMLoaded() {
        initSidebarDrawer();
        initSidebarTabs();
        initKeyboardShortcuts();
        initMobileBottomNav();
        console.log('[UI.JS] Xianxia Modern UI & HUD Layer Initialized Successfully.');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDOMLoaded);
    } else {
        onDOMLoaded();
    }
})();
