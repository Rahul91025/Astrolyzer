import { useEffect } from 'react';

// Pure vanilla JS cursor – zero React re-renders, GPU-composited via translate3d
const CustomCursor = () => {
    useEffect(() => {
        // Touch check
        if ('ontouchstart' in window) return;

        const dot = document.createElement('div');
        const ring = document.createElement('div');

        dot.style.cssText = `
            position: fixed; top: 0; left: 0; 
            width: 6px; height: 6px;
            background: #ffffff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            will-change: transform;
            transition: width 0.3s, height 0.3s;
        `;

        ring.style.cssText = `
            position: fixed; top: 0; left: 0;
            width: 36px; height: 36px;
            border: 1px solid rgba(255,255,255,0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            mix-blend-mode: difference;
            will-change: transform;
            transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                        height 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                        background 0.35s, border 0.35s;
        `;

        document.body.appendChild(dot);
        document.body.appendChild(ring);

        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;
        let rafId;
        let isHovered = false;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const onMouseOver = (e) => {
            const el = e.target;
            const interactive = el.tagName === 'BUTTON' || el.tagName === 'A' ||
                el.closest('button') || el.closest('a') ||
                el.classList.contains('magnetic') || el.closest('.magnetic') ||
                el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ||
                el.tagName === 'SELECT';

            if (interactive && !isHovered) {
                isHovered = true;
                ring.style.width = '56px';
                ring.style.height = '56px';
                ring.style.background = 'rgba(229, 192, 123, 0.15)';
                ring.style.border = '1px solid rgba(229, 192, 123, 0.8)';
                dot.style.width = '4px';
                dot.style.height = '4px';
                dot.style.background = '#E5C07B';
            } else if (!interactive && isHovered) {
                isHovered = false;
                ring.style.width = '36px';
                ring.style.height = '36px';
                ring.style.background = 'transparent';
                ring.style.border = '1px solid rgba(255,255,255,0.6)';
                dot.style.width = '6px';
                dot.style.height = '6px';
                dot.style.background = '#ffffff';
            }
        };

        const lerp = (a, b, t) => a + (b - a) * t;

        const tick = () => {
            // dot follows closely
            dotX = lerp(dotX, mouseX - 3, 0.75);
            dotY = lerp(dotY, mouseY - 3, 0.75);

            // ring trails behind
            ringX = lerp(ringX, mouseX - (isHovered ? 28 : 18), 0.12);
            ringY = lerp(ringY, mouseY - (isHovered ? 28 : 18), 0.12);

            dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

            rafId = requestAnimationFrame(tick);
        };

        tick();

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', onMouseOver, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            if (dot.parentNode) dot.parentNode.removeChild(dot);
            if (ring.parentNode) ring.parentNode.removeChild(ring);
        };
    }, []);

    return null; // No React DOM overhead at all
};

export default CustomCursor;
