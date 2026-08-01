(() => {
    const CURRENT_VERSION = "v1.0.4";

    const APP_META = Object.freeze({
        appName: "Nepali Imposter",
        shortName: "Imposter",
        version: CURRENT_VERSION,
        cachePrefix: "nepali-imposter-shell",
        releaseDate: "2026-08-01",
        releaseNotes: [
            {
                version: "v1.0.4",
                title: "Category Selection Fix",
                date: "2026-08-01",
                changes: [
                    "Added Bible Characters, Bible Places, and Christian Songs categories to category select dropdown.",
                    "Added auto-sync so all JS categories are dynamically available in category select.",
                    "Fixed category name label and word entry for Christian Songs."
                ]
            },
            {
                version: "v1.0.3",
                title: "Discussion Timer",
                date: "2026-07-31",
                changes: [
                    "Added optional discussion timer on the guess screen.",
                    "Set timer on/off and duration (seconds) in setup.",
                    "Timer turns orange under 30s, red under 10s with tick sounds.",
                    "Timer expires with alarm sound and vibration.",
                    "Timer setting saved and restored with other setup fields."
                ]
            },
            {
                version: "v1.0.2",
                title: "Play Again Opens Setup",
                date: "2026-07-31",
                changes: [
                    "PLAY AGAIN now opens the setup screen pre-filled with all previous settings.",
                    "Change only what you want, then hit START — or just hit START immediately."
                ]
            },
            {
                version: "v1.0.1",
                title: "Settings Persistence & Bug Fixes",
                date: "2026-07-31",
                changes: [
                    "Game setup now auto-saves — player names, count, category, hint, sound, order.",
                    "PLAY AGAIN reuses all previous settings without re-typing.",
                    "Fixed PWA cache so code updates are always delivered.",
                    "Added Bible Characters and Bible Places categories.",
                    "Added Reset Saved Settings button."
                ]
            },
            {
                version: "v1.0.0",
                title: "Professional PWA Update System",
                date: "2026-07-31",
                changes: [
                    "Added a production-ready service worker with semantic versioned caches.",
                    "Introduced safe background updates with progress, install prompts, and automatic reload.",
                    "Added Settings/About version display, changelog support, and a manual Check for Updates action.",
                    "Guaranteed offline gameplay after first install with full app shell precaching."
                ]
            }
        ],
        offlineAssets: [
            "./",
            "./index.html",
            "./manifest.webmanifest",
            "./sw.js",
            "./assets/css/styles.css",
            "./assets/js/app-meta.js",
            "./assets/js/app.js",
            "./assets/js/update-manager.js",
            "./assets/js/install-manager.js",
            "./assets/icons/icon-192.png",
            "./assets/icons/icon-512.png",
            "./assets/icons/apple-touch-icon.png",
            "./assets/icons/favicon.png"
        ]
    });

    globalThis.APP_META = APP_META;
})();
