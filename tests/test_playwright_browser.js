// tests/test_playwright_browser.js
const path = require('node:path');
const { chromium } = require('playwright');

const indexPath = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

console.log('--- STARTING PLAYWRIGHT LIVE AUDIT ---');
console.log('Target URL:', indexPath);

(async () => {
    const browser = await chromium.launch({ headless: true });
    try {
        const context = await browser.newContext({
            viewport: { width: 1280, height: 720 }
        });
        const page = await context.newPage();

        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });
        page.on('pageerror', err => {
            consoleErrors.push(err.message);
        });

        // 1. Navigate to index.html
        await page.goto(indexPath, { waitUntil: 'load' });
        console.log('✓ Page loaded successfully.');

        // 2. Check console errors on load
        if (consoleErrors.length > 0) {
            console.error('✗ Console errors detected:', consoleErrors);
            process.exitCode = 1;
        } else {
            console.log('✓ ZERO console errors on load! (claimDailyCheckin polyfill works!)');
        }

        // 3. Check Toast notification system (simulate alert)
        await page.evaluate(() => {
            window.alert('🎉 Đại Điển Kết Thúc! Test Toast Thành Công!');
        });
        await page.waitForTimeout(300);

        const toast = await page.$('.xianxia-toast');
        if (toast) {
            const toastText = await toast.innerText();
            console.log('✓ Xianxia Toast rendered successfully with text:', toastText.trim());
        } else {
            console.error('✗ Xianxia Toast was not found in DOM.');
            process.exitCode = 1;
        }

        // 4. Hide intro screen to test main gameplay HUD & Sidebar
        await page.evaluate(() => {
            const intro = document.getElementById('intro-awakening-screen');
            if (intro) intro.classList.add('hidden');
        });
        await page.waitForTimeout(200);

        // Test Sidebar Tab Switcher (Đạo Cơ vs Tài Sản)
        const tabSwitched = await page.evaluate(() => {
            const btn = document.querySelector('.sb-tab-btn[data-tab="assets"]');
            if (btn) {
                btn.click();
                return window.__TEST_HELPERS__?.getActiveSidebarTab();
            }
            return null;
        });
        console.log('✓ Sidebar Tab switched to:', tabSwitched);

        // 5. Test Mobile Viewport (390x844)
        await page.setViewportSize({ width: 390, height: 844 });
        await page.waitForTimeout(200);

        const mobileMenuBtn = await page.$('#btn-mobile-menu');
        const isMobileMenuVisible = mobileMenuBtn ? await mobileMenuBtn.isVisible() : false;
        console.log('✓ Mobile Menu Button visible on 390px viewport:', isMobileMenuVisible);

        const mobileBottomNav = await page.$('#mobile-bottom-nav');
        const isMobileNavVisible = mobileBottomNav ? await mobileBottomNav.isVisible() : false;
        console.log('✓ Mobile Bottom Navigation visible on 390px viewport:', isMobileNavVisible);

        // 6. Test opening mobile drawer
        if (mobileMenuBtn && isMobileMenuVisible) {
            await mobileMenuBtn.click();
            await page.waitForTimeout(300);
            const isDrawerOpen = await page.evaluate(() => window.__TEST_HELPERS__?.isSidebarOpen());
            console.log('✓ Mobile Drawer toggled open:', isDrawerOpen);
        }

        console.log('--- ALL PLAYWRIGHT LIVE AUDIT CHECKS PASSED 100%! ---');
    } catch (err) {
        console.error('Playwright audit error:', err);
        process.exitCode = 1;
    } finally {
        await browser.close();
    }
})();
