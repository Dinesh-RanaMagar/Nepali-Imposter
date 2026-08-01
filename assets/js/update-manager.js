(() => {
    if (!window.AppUI) {
        return;
    }

    const ui = window.AppUI;
    const JUST_UPDATED_KEY = "nepali-imposter-just-updated";
    const LAST_SEEN_VERSION_KEY = "nepali-imposter-last-seen-version";

    let registration = null;
    let refreshTriggered = false;
    let pendingVersion = null;
    let updateDownloadActive = false;
    let broadcastChannel = null;

    function setInstallAvailability(options) {
        ui.setInstallState({
            available: Boolean(options.available),
            installed: Boolean(options.installed),
            text: options.text,
            badge: options.badge,
            tone: options.tone
        });
    }

    function getReleaseNotesAfter(version) {
        if (!version) {
            return [];
        }

        const releases = [];
        for (const entry of APP_META.releaseNotes) {
            if (entry.version === version) {
                break;
            }
            releases.push(entry);
        }
        return releases;
    }

    function handleWorkerMessage(event) {
        const data = event && event.data ? event.data : event;
        if (!data || !data.type) {
            return;
        }

        switch (data.type) {
            case "SW_INSTALLING":
                updateDownloadActive = true;
                ui.setDownloadState({
                    visible: true,
                    percentage: 0,
                    message: "Downloading version " + data.version + " in the background..."
                });
                ui.setUpdateStatus({
                    text: "Downloading version " + data.version + " in the background.",
                    badge: "Downloading",
                    tone: "working"
                });
                ui.setStatus("Updating", "A newer version is downloading quietly in the background.");
                break;

            case "DOWNLOAD_PROGRESS":
                updateDownloadActive = true;
                ui.setDownloadState({
                    visible: true,
                    percentage: data.percentage || 0,
                    message: "Downloaded " + data.completed + " of " + data.total + " offline files for version " + data.version + "."
                });
                break;

            case "UPDATE_READY":
                pendingVersion = data.version;
                updateDownloadActive = false;
                if (!navigator.serviceWorker.controller) {
                    ui.setDownloadState({ visible: false });
                    ui.setOfflineStatus({
                        text: "Offline support for version " + data.version + " is ready.",
                        badge: "Ready",
                        tone: "success"
                    });
                    ui.setUpdateStatus({
                        text: "You are running the current version.",
                        badge: "Current",
                        tone: "success"
                    });
                    ui.setStatus("Offline Ready", "Version " + data.version + " is installed and available offline.");
                    return;
                }
                ui.setDownloadState({
                    visible: true,
                    percentage: 100,
                    message: "Version " + data.version + " is ready to install."
                });
                ui.setUpdateStatus({
                    text: "Version " + data.version + " is ready to install.",
                    badge: "Ready",
                    tone: "success"
                });
                ui.setStatus("Update Ready", "Version " + data.version + " is ready. You can switch without a manual refresh.");
                ui.showUpdateDialog({
                    version: data.version,
                    title: "🎉 New Version Available",
                    text: "Version " + data.version + " is ready.\nUpdate now?",
                    percentage: 100,
                    message: "Background download complete."
                });
                break;

            case "UPDATE_FAILED":
                updateDownloadActive = false;
                ui.setDownloadState({ visible: false });
                ui.setUpdateStatus({
                    text: "Update failed. The current working version is still active.",
                    badge: "Safe",
                    tone: "warning"
                });
                ui.setStatus("Using Current Version", "The app kept the previous stable version because the update did not finish safely.");
                ui.showToast("Update failed. Continuing with the previous working version.");
                break;

            case "CACHE_CLEANUP_COMPLETE":
                updateDownloadActive = false;
                ui.setOfflineStatus({
                    text: "Offline files for version " + data.version + " are installed and old caches were removed.",
                    badge: "Ready",
                    tone: "success"
                });
                break;

            default:
                break;
        }
    }

    function attachRegistrationListeners(serviceWorkerRegistration) {
        serviceWorkerRegistration.addEventListener("updatefound", () => {
            const newWorker = serviceWorkerRegistration.installing;
            if (!newWorker) {
                return;
            }

            ui.setDownloadState({
                visible: true,
                percentage: 0,
                message: "Preparing a new version in the background..."
            });

            newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && !navigator.serviceWorker.controller) {
                    updateDownloadActive = false;
                    ui.setDownloadState({ visible: false });
                    ui.setOfflineStatus({
                        text: "Offline support for version " + APP_META.version + " is ready.",
                        badge: "Ready",
                        tone: "success"
                    });
                    ui.setUpdateStatus({
                        text: "You are running the current version.",
                        badge: "Current",
                        tone: "success"
                    });
                    ui.setStatus("Offline Ready", "Version " + APP_META.version + " is installed and available offline.");
                    ui.showToast("Offline support is ready.");
                }
            });
        });
    }

    async function checkForUpdates(manual) {
        if (!registration) {
            return;
        }

        if (!navigator.onLine) {
            ui.setUpdateStatus({
                text: "You are offline. The installed version still works, and update checks will resume online.",
                badge: "Offline",
                tone: "warning"
            });
            ui.showToast("Offline mode active. Using the installed version.");
            return;
        }

        try {
            ui.setUpdateStatus({
                text: "Checking for a newer version...",
                badge: "Checking",
                tone: "working"
            });
            ui.setStatus("Checking", "Looking for a newer version without interrupting the game.");
            await registration.update();
            window.setTimeout(() => {
                const readyWorker = registration.waiting;
                if (readyWorker || registration.installing || updateDownloadActive) {
                    return;
                }

                if (manual) {
                    ui.showToast("You already have the latest version.");
                }
                ui.setUpdateStatus({
                    text: "You are already on the latest version.",
                    badge: "Current",
                    tone: "success"
                });
                ui.setStatus("Ready", "Version " + APP_META.version + " is installed and available offline.");
            }, 900);
        } catch (error) {
            console.error("Update check failed.", error);
            ui.setUpdateStatus({
                text: "Update check failed. The installed version remains available offline.",
                badge: "Safe",
                tone: "warning"
            });
            ui.setStatus("Using Current Version", "Update check failed, so the app continues using the current stable version.");
            ui.showToast("Could not check for updates right now.");
        }
    }

    function applyUpdate() {
        if (!registration || !registration.waiting) {
            ui.showToast("No downloaded update is ready yet.");
            return;
        }

        ui.showUpdateDialog({
            version: pendingVersion || APP_META.version,
            title: "Applying Update",
            text: "Activating version " + (pendingVersion || APP_META.version) + " now.",
            percentage: 100,
            message: "Replacing the old version and reloading automatically...",
            disableApply: true
        });
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }

    function handleControllerChange() {
        if (refreshTriggered) {
            return;
        }
        refreshTriggered = true;
        sessionStorage.setItem(JUST_UPDATED_KEY, pendingVersion || APP_META.version);
        window.location.reload();
    }

    function showPostUpdateExperience() {
        const justUpdated = sessionStorage.getItem(JUST_UPDATED_KEY);
        const lastSeenVersion = localStorage.getItem(LAST_SEEN_VERSION_KEY);

        if (justUpdated) {
            sessionStorage.removeItem(JUST_UPDATED_KEY);
            ui.showToast("Updated successfully to version " + APP_META.version + ".");
            const notes = getReleaseNotesAfter(lastSeenVersion);
            if (notes.length > 0) {
                ui.showWhatsNew(notes);
            }
        } else if (lastSeenVersion && lastSeenVersion !== APP_META.version) {
            const notes = getReleaseNotesAfter(lastSeenVersion);
            if (notes.length > 0) {
                ui.showWhatsNew(notes);
            }
        }

        localStorage.setItem(LAST_SEEN_VERSION_KEY, APP_META.version);
    }

    function bindInstallPromptHandling() {
        // Install prompt handling is fully managed by install-manager.js.
        // update-manager.js only syncs the Settings UI text; it does not
        // intercept beforeinstallprompt or appinstalled events.

        if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
            setInstallAvailability({
                available: false,
                installed: true,
                text: "Nepali Imposter is already running as an installed app.",
                badge: "Installed",
                tone: "success"
            });
            return;
        }

        setInstallAvailability({
            available: false,
            installed: false,
            text: "The install button will appear when this browser exposes the PWA install prompt.",
            badge: "Checking",
            tone: "warning"
        });
    }

    async function registerServiceWorker() {
        if (!("serviceWorker" in navigator)) {
            ui.setOfflineStatus({
                text: "This browser does not support service workers, so offline mode is unavailable.",
                badge: "Unsupported",
                tone: "error"
            });
            ui.setUpdateStatus({
                text: "Automatic updates are not supported in this browser.",
                badge: "Unsupported",
                tone: "error"
            });
            return;
        }

        try {
            registration = await navigator.serviceWorker.register("./sw.js", {
                scope: "./",
                updateViaCache: "none"
            });

            attachRegistrationListeners(registration);
            navigator.serviceWorker.addEventListener("message", handleWorkerMessage);
            navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);

            if ("BroadcastChannel" in window) {
                broadcastChannel = new BroadcastChannel("nepali-imposter-updates");
                broadcastChannel.addEventListener("message", handleWorkerMessage);
            }

            ui.applyUpdateButton.addEventListener("click", applyUpdate);
            ui.checkUpdatesButton.addEventListener("click", () => checkForUpdates(true));

            const readyRegistration = await navigator.serviceWorker.ready;
            registration = readyRegistration;

            if (!navigator.serviceWorker.controller) {
                ui.setStatus("Installing", "Downloading the app shell so everything works offline after the first install.");
                ui.setOfflineStatus({
                    text: "Installing offline files for the first launch...",
                    badge: "Installing",
                    tone: "working"
                });
            } else {
                ui.setOfflineStatus({
                    text: "Offline files for version " + APP_META.version + " are ready.",
                    badge: "Ready",
                    tone: "success"
                });
            }

            await checkForUpdates(false);
            showPostUpdateExperience();
        } catch (error) {
            console.error("Service worker registration failed.", error);
            ui.setOfflineStatus({
                text: "Could not install offline support.",
                badge: "Error",
                tone: "error"
            });
            ui.setUpdateStatus({
                text: "Automatic updates could not start because service worker registration failed.",
                badge: "Error",
                tone: "error"
            });
        }
    }

    bindInstallPromptHandling();
    window.addEventListener("load", registerServiceWorker);
})();
