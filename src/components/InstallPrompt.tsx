"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
        );

        setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
        };
    }, []);

    if (isStandalone) {
        return null; // Don't show install button if already installed
    }

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") {
                setDeferredPrompt(null);
            }
        }
    };

    return (
        <>
            {deferredPrompt && (
                <button
                    onClick={handleInstallClick}
                    className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-black px-4 py-3 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                    <Download size={20} />
                    <span className="font-medium">Install App</span>
                </button>
            )}
            {isIOS && (
                <div className="fixed bottom-4 left-4 right-4 z-50 rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur-md border border-gray-200 text-sm text-gray-800">
                    <p>
                        To install this app on iOS, tap the share button and select "Add to
                        Home Screen".
                    </p>
                </div>
            )}
        </>
    );
}
