'use client';

import { useEffect, useState } from 'react';

export type UpdateStatus = 'idle' | 'available' | 'downloading' | 'ready';

export function useServiceWorker() {
    const [updateStatus, setUpdateStatus] = useState<UpdateStatus>('idle');
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
            return;
        }

        // Register service worker and listen for updates
        navigator.serviceWorker.ready.then((reg) => {
            setRegistration(reg);

            // Check if there's already an update waiting
            if (reg.waiting) {
                setUpdateStatus('ready');
            }

            // Listen for new service worker installing
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                if (!newWorker) return;

                setUpdateStatus('downloading');

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker is installed and ready
                        setUpdateStatus('ready');
                    }
                });
            });
        });

        // Listen for controller change (when new SW takes over)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            // Reload to get the new version
            window.location.reload();
        });

        // Check for updates periodically (every 60 seconds)
        const interval = setInterval(() => {
            navigator.serviceWorker.ready.then((reg) => {
                reg.update();
            });
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const installUpdate = () => {
        if (!registration || !registration.waiting) return;

        // Tell the waiting service worker to skip waiting and become active
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });

        // Also try to activate it directly
        registration.waiting.postMessage('skipWaiting');
    };

    return {
        updateStatus,
        installUpdate,
    };
}
