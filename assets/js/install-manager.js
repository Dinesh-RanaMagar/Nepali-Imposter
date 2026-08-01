/**
 * install-manager.js
 * Complete PWA Installation System for Nepali Imposter
 * Handles: floating button, custom dialog, success state,
 *          already-installed detection, browser-unsupported fallback,
 *          LocalStorage persistence, and Settings integration.
 */
(() => {
    /* ─────────────────────────────────────────────
       Constants
    ───────────────────────────────────────────── */
    const LS_INSTALLED_KEY = "nepali-imposter-pwa-installed";
    const LS_DISMISSED_KEY = "nepali-imposter-install-dismissed";

    /* ─────────────────────────────────────────────
       State
    ───────────────────────────────────────────── */
    let deferredPrompt = null;          // beforeinstallprompt event
    let installSupported = false;       // browser can install
    let isInstalled = false;            // already running as PWA / was installed
    let successAudioCtx = null;         // AudioContext for success sound

    /* ─────────────────────────────────────────────
       Element references (created dynamically or
       already in the DOM)
    ───────────────────────────────────────────── */
    function el(id) { return document.getElementById(id); }

    /* ─────────────────────────────────────────────
       Detect already-installed state
    ───────────────────────────────────────────── */
    function detectInstalledState() {
        // Running in standalone / fullscreen display mode → already installed
        const standaloneQuery = window.matchMedia("(display-mode: standalone)");
        const fullscreenQuery = window.matchMedia("(display-mode: fullscreen)");
        if (standaloneQuery.matches || fullscreenQuery.matches || window.navigator.standalone === true) {
            return true;
        }
        // Persisted via LocalStorage (set after appinstalled event)
        if (localStorage.getItem(LS_INSTALLED_KEY) === "1") {
            return true;
        }
        return false;
    }

    /* ─────────────────────────────────────────────
       Floating Install Button
    ───────────────────────────────────────────── */
    function createFloatingButton() {
        if (el("pwaFloatingInstallBtn")) return; // already exists

        const btn = document.createElement("button");
        btn.id = "pwaFloatingInstallBtn";
        btn.type = "button";
        btn.setAttribute("aria-label", "Install Nepali Imposter App");
        btn.innerHTML = `
            <span class="pwa-fab-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
                     stroke-linejoin="round" width="22" height="22">
                    <path d="M12 2v13M8 11l4 4 4-4"/>
                    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>
                </svg>
            </span>
            <span class="pwa-fab-label">⬇️ Install Nepali Imposter</span>
            <span class="pwa-fab-ripple" aria-hidden="true"></span>
        `;
        btn.addEventListener("click", onFloatingInstallClick);
        document.body.appendChild(btn);
    }

    function showFloatingButton() {
        const btn = el("pwaFloatingInstallBtn");
        if (!btn) return;
        btn.classList.remove("pwa-fab-hidden", "pwa-fab-exit");
        btn.classList.add("pwa-fab-visible");
    }

    function hideFloatingButton(animate) {
        const btn = el("pwaFloatingInstallBtn");
        if (!btn) return;
        if (animate) {
            btn.classList.add("pwa-fab-exit");
            setTimeout(() => {
                btn.classList.remove("pwa-fab-visible", "pwa-fab-exit");
                btn.classList.add("pwa-fab-hidden");
            }, 400);
        } else {
            btn.classList.remove("pwa-fab-visible", "pwa-fab-exit");
            btn.classList.add("pwa-fab-hidden");
        }
    }

    function onFloatingInstallClick(event) {
        // Ripple effect
        triggerRipple(event, el("pwaFloatingInstallBtn"));
        openInstallDialog();
    }

    function triggerRipple(event, button) {
        const ripple = button && button.querySelector(".pwa-fab-ripple");
        if (!ripple) return;
        ripple.classList.remove("pwa-ripple-active");
        // Force reflow
        void ripple.offsetWidth;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = (event.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
        const y = (event.clientY || rect.top + rect.height / 2) - rect.top - size / 2;
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
        ripple.classList.add("pwa-ripple-active");
    }

    /* ─────────────────────────────────────────────
       Custom Install Dialog
    ───────────────────────────────────────────── */
    function createInstallDialog() {
        if (el("pwaInstallDialogBackdrop")) return;

        const backdrop = document.createElement("div");
        backdrop.id = "pwaInstallDialogBackdrop";
        backdrop.className = "pwa-dialog-backdrop";
        backdrop.setAttribute("role", "dialog");
        backdrop.setAttribute("aria-modal", "true");
        backdrop.setAttribute("aria-labelledby", "pwaInstallDialogTitle");
        backdrop.hidden = true;
        backdrop.innerHTML = `
            <div class="pwa-dialog" id="pwaInstallDialog">
                <div class="pwa-dialog-icon-wrap" aria-hidden="true">
                    <img src="./assets/icons/icon-192.png"
                         alt="Nepali Imposter icon"
                         class="pwa-dialog-app-icon"
                         loading="lazy"
                         onerror="this.style.display='none'">
                    <div class="pwa-dialog-icon-glow" aria-hidden="true"></div>
                </div>
                <p class="pwa-dialog-eyebrow">Install App</p>
                <h2 class="pwa-dialog-title" id="pwaInstallDialogTitle">🎉 Install Nepali Imposter</h2>
                <p class="pwa-dialog-body">
                    Install this game on your device for a faster, full-screen experience.
                </p>
                <ul class="pwa-dialog-benefits" aria-label="Installation benefits">
                    <li><span class="pwa-benefit-check" aria-hidden="true">✅</span> Works Offline</li>
                    <li><span class="pwa-benefit-check" aria-hidden="true">✅</span> Faster Loading</li>
                    <li><span class="pwa-benefit-check" aria-hidden="true">✅</span> Full Screen</li>
                    <li><span class="pwa-benefit-check" aria-hidden="true">✅</span> No Browser Address Bar</li>
                </ul>
                <div class="pwa-dialog-offline-note" role="note">
                    <span aria-hidden="true">📶</span>
                    After installation and the first successful load, the game works completely offline.
                </div>
                <div class="pwa-dialog-actions">
                    <button class="pwa-btn pwa-btn-install" id="pwaDialogInstallBtn" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
                             stroke-linejoin="round" width="18" height="18" aria-hidden="true">
                            <path d="M12 2v13M8 11l4 4 4-4"/>
                            <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>
                        </svg>
                        Install Now
                    </button>
                    <button class="pwa-btn pwa-btn-later" id="pwaDialogLaterBtn" type="button">
                        Maybe Later
                    </button>
                </div>
            </div>
        `;

        // Close on backdrop click
        backdrop.addEventListener("click", (event) => {
            if (event.target === backdrop) closeInstallDialog();
        });

        document.body.appendChild(backdrop);

        el("pwaDialogInstallBtn").addEventListener("click", onDialogInstall);
        el("pwaDialogLaterBtn").addEventListener("click", () => {
            localStorage.setItem(LS_DISMISSED_KEY, "1");
            closeInstallDialog();
        });
    }

    function openInstallDialog() {
        const backdrop = el("pwaInstallDialogBackdrop");
        if (!backdrop) return;
        backdrop.hidden = false;
        document.body.classList.add("modal-open");
        // Animate in
        requestAnimationFrame(() => {
            backdrop.classList.add("pwa-dialog-open");
        });
    }

    function closeInstallDialog() {
        const backdrop = el("pwaInstallDialogBackdrop");
        if (!backdrop) return;
        backdrop.classList.remove("pwa-dialog-open");
        backdrop.classList.add("pwa-dialog-closing");
        setTimeout(() => {
            backdrop.hidden = true;
            backdrop.classList.remove("pwa-dialog-closing");
            document.body.classList.remove("modal-open");
        }, 280);
    }

    async function onDialogInstall() {
        if (!deferredPrompt) {
            closeInstallDialog();
            showUnsupportedMessage();
            return;
        }

        const prompt = deferredPrompt;
        deferredPrompt = null;

        // Disable button to prevent double-tap
        const installBtn = el("pwaDialogInstallBtn");
        if (installBtn) {
            installBtn.disabled = true;
            installBtn.textContent = "Opening install prompt…";
        }

        closeInstallDialog();

        try {
            prompt.prompt();
            const choice = await prompt.userChoice;
            if (choice.outcome === "accepted") {
                // appinstalled event fires separately — handled below
                // But trigger success immediately for good UX
                onInstallAccepted();
            } else {
                // Restore prompt availability for future attempt
                deferredPrompt = null;
                syncSettingsInstallUI();
            }
        } catch (err) {
            console.warn("[PWA Install] prompt() error:", err);
            syncSettingsInstallUI();
        }
    }

    /* ─────────────────────────────────────────────
       Success Overlay
    ───────────────────────────────────────────── */
    function createSuccessOverlay() {
        if (el("pwaSuccessOverlay")) return;

        const overlay = document.createElement("div");
        overlay.id = "pwaSuccessOverlay";
        overlay.className = "pwa-success-overlay";
        overlay.setAttribute("role", "alertdialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-label", "App Installed Successfully");
        overlay.hidden = true;
        overlay.innerHTML = `
            <div class="pwa-success-box">
                <div class="pwa-success-animation" aria-hidden="true">
                    <svg class="pwa-checkmark" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg"
                         role="img" aria-label="Success checkmark">
                        <circle class="pwa-checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                        <path class="pwa-checkmark-check" fill="none" d="M14 27l8 8 16-18"/>
                    </svg>
                    <div class="pwa-confetti-burst" aria-hidden="true">
                        <span></span><span></span><span></span><span></span>
                        <span></span><span></span><span></span><span></span>
                    </div>
                </div>
                <h2 class="pwa-success-title">🎉 App Installed Successfully</h2>
                <p class="pwa-success-body">Enjoy playing offline!</p>
            </div>
        `;

        document.body.appendChild(overlay);
    }

    function showSuccessOverlay() {
        const overlay = el("pwaSuccessOverlay");
        if (!overlay) return;
        overlay.hidden = false;
        requestAnimationFrame(() => {
            overlay.classList.add("pwa-success-visible");
        });
        playSuccessSound();
        // Auto-dismiss after 3.5 s
        setTimeout(() => {
            overlay.classList.remove("pwa-success-visible");
            setTimeout(() => { overlay.hidden = true; }, 500);
        }, 3500);
    }

    function playSuccessSound() {
        try {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            if (!Ctx) return;
            const ctx = new Ctx();
            const now = ctx.currentTime;
            const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
            notes.forEach((freq, index) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.value = freq;
                const start = now + index * 0.12;
                gain.gain.setValueAtTime(0.001, start);
                gain.gain.exponentialRampToValueAtTime(0.15, start + 0.04);
                gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(start);
                osc.stop(start + 0.3);
            });
        } catch (e) {
            // Audio not critical
        }

        if (navigator.vibrate) {
            navigator.vibrate([80, 40, 80, 40, 120]);
        }
    }

    /* ─────────────────────────────────────────────
       Already-installed / Unsupported UI
    ───────────────────────────────────────────── */
    function createAlreadyInstalledBadge() {
        if (el("pwaAlreadyInstalledBadge")) return;

        const badge = document.createElement("div");
        badge.id = "pwaAlreadyInstalledBadge";
        badge.className = "pwa-installed-badge pwa-installed-badge-hidden";
        badge.setAttribute("role", "status");
        badge.innerHTML = `<span aria-hidden="true">✅</span> Installed`;
        document.body.appendChild(badge);
    }

    function showAlreadyInstalledBadge() {
        const badge = el("pwaAlreadyInstalledBadge");
        if (!badge) return;
        badge.classList.remove("pwa-installed-badge-hidden");
        badge.classList.add("pwa-installed-badge-visible");
        // Auto-hide after 5 s
        setTimeout(() => {
            badge.classList.remove("pwa-installed-badge-visible");
            badge.classList.add("pwa-installed-badge-hidden");
        }, 5000);
    }

    function showUnsupportedMessage() {
        // Show as a toast via AppUI if available, else use our own
        const msg = "Install is not supported in this browser.";
        if (window.AppUI && typeof window.AppUI.showToast === "function") {
            window.AppUI.showToast(msg);
        } else {
            const toast = el("toast");
            if (toast) {
                toast.textContent = msg;
                toast.hidden = false;
                setTimeout(() => { toast.hidden = true; }, 4000);
            }
        }
    }

    /* ─────────────────────────────────────────────
       Settings panel sync
    ───────────────────────────────────────────── */
    function syncSettingsInstallUI() {
        const statusText = el("installStatusText");
        const statusBadge = el("installStatusBadge");
        const settingsBtn = el("settingsInstallBtn");
        const headerBtn = el("installAppBtn"); // original topbar button

        if (!statusText || !statusBadge) return;

        function setBadge(text, cls) {
            statusBadge.textContent = text;
            statusBadge.className = "status-pill" + (cls ? " " + cls : "");
        }

        if (isInstalled) {
            statusText.textContent = "Nepali Imposter is installed on this device.";
            setBadge("Installed", "success");
            if (settingsBtn) settingsBtn.hidden = true;
            if (headerBtn) headerBtn.hidden = true;
            // Show the Settings-section installed label
            syncSettingsInstalledSection(true);
            return;
        }

        if (!installSupported) {
            statusText.textContent = "Install is not supported in this browser.";
            setBadge("Unsupported", "");
            if (settingsBtn) settingsBtn.hidden = true;
            if (headerBtn) headerBtn.hidden = true;
            syncSettingsInstalledSection(false);
            return;
        }

        if (deferredPrompt) {
            statusText.textContent = "Tap Install App to add Nepali Imposter to your home screen.";
            setBadge("Ready", "success");
            if (settingsBtn) {
                settingsBtn.hidden = false;
                settingsBtn.textContent = "INSTALL APP";
            }
            if (headerBtn) headerBtn.hidden = true; // floating FAB handles this
            syncSettingsInstalledSection(false);
            return;
        }

        // Supported but prompt not yet available
        statusText.textContent = "The install button appears when this browser exposes the install prompt.";
        setBadge("Waiting", "warning");
        if (settingsBtn) settingsBtn.hidden = true;
        if (headerBtn) headerBtn.hidden = true;
        syncSettingsInstalledSection(false);
    }

    function syncSettingsInstalledSection(installed) {
        // The Settings screen has a status-pill next to "Installed"
        const settingsPill = document.querySelector("#screen5 .section-head .status-pill");
        if (!settingsPill) return;
        if (installed) {
            settingsPill.textContent = "Installed";
            settingsPill.className = "status-pill success";
        } else {
            settingsPill.textContent = "Not Installed";
            settingsPill.className = "status-pill warning";
        }
    }

    /* ─────────────────────────────────────────────
       Core install flow callbacks
    ───────────────────────────────────────────── */
    function onInstallAccepted() {
        isInstalled = true;
        localStorage.setItem(LS_INSTALLED_KEY, "1");
        hideFloatingButton(true);
        showSuccessOverlay();
        syncSettingsInstallUI();
    }

    /* ─────────────────────────────────────────────
       Event wiring
    ───────────────────────────────────────────── */
    function bindInstallEvents() {
        // Intercept & store the beforeinstallprompt
        window.addEventListener("beforeinstallprompt", (event) => {
            event.preventDefault();
            deferredPrompt = event;
            installSupported = true;

            // Don't show if already dismissed in this session
            if (isInstalled) return;

            createFloatingButton();
            showFloatingButton();
            syncSettingsInstallUI();

            // Wire the Settings INSTALL APP button
            const settingsBtn = el("settingsInstallBtn");
            if (settingsBtn) {
                settingsBtn.onclick = openInstallDialog;
            }
        });

        // App was installed (covers all paths including browser prompt)
        window.addEventListener("appinstalled", () => {
            onInstallAccepted();
            showAlreadyInstalledBadge();
        });

        // Settings INSTALL APP button (if prompt is already stored when settings opens)
        const settingsBtn = el("settingsInstallBtn");
        if (settingsBtn) {
            settingsBtn.onclick = openInstallDialog;
        }

        // Wire the original header install button to open our dialog too
        const headerBtn = el("installAppBtn");
        if (headerBtn) {
            headerBtn.onclick = openInstallDialog;
        }
    }

    function exposeInstallAPI() {
        // update-manager.js calls window.handlePwaInstall() — keep it working
        window.handlePwaInstall = function () {
            if (deferredPrompt) {
                openInstallDialog();
            } else if (isInstalled) {
                showAlreadyInstalledBadge();
            } else {
                showUnsupportedMessage();
            }
        };
    }

    /* ─────────────────────────────────────────────
       Initialise
    ───────────────────────────────────────────── */
    function init() {
        isInstalled = detectInstalledState();

        // Build DOM components
        createFloatingButton();
        createInstallDialog();
        createSuccessOverlay();
        createAlreadyInstalledBadge();

        if (isInstalled) {
            // Already installed — keep button hidden, update settings
            hideFloatingButton(false);
            syncSettingsInstallUI();
            // Optionally show the badge briefly to confirm
            // showAlreadyInstalledBadge();
        } else {
            hideFloatingButton(false); // hidden until beforeinstallprompt fires
            syncSettingsInstallUI();
        }

        bindInstallEvents();
        exposeInstallAPI();

        // Check display-mode changes (e.g. user installs from browser menu)
        if (window.matchMedia) {
            window.matchMedia("(display-mode: standalone)").addEventListener("change", (event) => {
                if (event.matches) {
                    isInstalled = true;
                    localStorage.setItem(LS_INSTALLED_KEY, "1");
                    hideFloatingButton(true);
                    syncSettingsInstallUI();
                }
            });
        }
    }

    // Run after DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
