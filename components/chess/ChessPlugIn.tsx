'use client';

import './chess-plugin.css';
import { useRef, useState, useEffect, useCallback } from 'react';

// ============================================
// DATA
// ============================================

interface PieceData {
    id: string;
    symbol: string;
    label: string;
    title: string;
    description: string;
}

const pieces: PieceData[] = [
    {
        id: 'market',
        symbol: '♚',
        label: 'MARKET',
        title: 'Market',
        description:
            'Positioning, ICP, and competitive intelligence. I map the terrain so every move you make is deliberate — not reactive.',
    },
    {
        id: 'product',
        symbol: '♛',
        label: 'PRODUCT',
        title: 'Product',
        description:
            'UX, flows, onboarding, and activation. Designing experiences that turn first contact into lasting commitment.',
    },
    {
        id: 'ai',
        symbol: '♝',
        label: 'AI',
        title: 'AI',
        description:
            'LLMs, automation, recommendations, and generation. Embedding intelligence exactly where it creates unfair advantage.',
    },
    {
        id: 'distribution',
        symbol: '♞',
        label: 'DISTRIBUTION',
        title: 'Distribution',
        description:
            'Search, SEO, virality, and conversion. Getting your product in front of the right people — methodically, repeatably.',
    },
];

// ============================================
// COMPONENT
// ============================================

type PieceState = 'orbiting' | 'gliding' | 'crashing' | 'gone';

export default function ChessPlugIn() {
    const sectionRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const pieceRefs = useRef<(HTMLDivElement | null)[]>([]);
    const orbitAngleRef = useRef(0);
    const pieceStatesRef = useRef<PieceState[]>(['orbiting', 'orbiting', 'orbiting', 'orbiting']);
    const rafRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const [activePiece, setActivePiece] = useState<number | null>(null);
    const [cardVisible, setCardVisible] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [crashingIndex, setCrashingIndex] = useState<number | null>(null);
    const [shockwavePos, setShockwavePos] = useState<{ x: number; y: number } | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [initialized, setInitialized] = useState(false);

    // Responsive orbit dimensions
    const getOrbitDimensions = useCallback(() => {
        if (typeof window === 'undefined') return { rx: 220, ry: 120, stageW: 600, stageH: 520 };
        const w = window.innerWidth;
        if (w < 560) return { rx: 150, ry: 85, stageW: 360, stageH: 370 };
        if (w < 768) return { rx: 180, ry: 100, stageW: 440, stageH: 440 };
        return { rx: 220, ry: 120, stageW: 600, stageH: 520 };
    }, []);

    // Position a piece on the ellipse
    const positionPiece = useCallback(
        (index: number, angle: number) => {
            const el = pieceRefs.current[index];
            if (!el) return;
            const { rx, ry, stageW, stageH } = getOrbitDimensions();
            const cx = stageW / 2;
            const cy = stageH / 2;
            const offset = (index * Math.PI * 2) / 4;
            const a = angle + offset;
            const x = cx + rx * Math.cos(a);
            const y = cy + ry * Math.sin(a);
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
        },
        [getOrbitDimensions]
    );

    // Orbit loop
    useEffect(() => {
        const speed = (2 * Math.PI) / 13000; // one revolution per 13s

        // Initialize positions immediately (before first frame)
        for (let i = 0; i < 4; i++) {
            positionPiece(i, 0);
        }
        setInitialized(true);

        const loop = (time: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = time;
            const dt = time - lastTimeRef.current;
            lastTimeRef.current = time;
            orbitAngleRef.current += speed * dt;

            for (let i = 0; i < 4; i++) {
                if (pieceStatesRef.current[i] === 'orbiting') {
                    positionPiece(i, orbitAngleRef.current);
                }
            }
            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [positionPiece]);

    // Responsive handler
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 560);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // ---- Click handler ----
    const handlePieceClick = useCallback(
        (index: number) => {
            if (pieceStatesRef.current[index] !== 'orbiting') return;
            if (activePiece !== null) return;

            const el = pieceRefs.current[index];
            if (!el || !stageRef.current) return;

            // Phase 1: Glide to center
            pieceStatesRef.current[index] = 'gliding';
            const { stageW, stageH } = getOrbitDimensions();
            const cx = stageW / 2;
            const cy = stageH / 2;

            el.style.transition = 'left 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)';
            el.style.left = `${cx}px`;
            el.style.top = `${cy}px`;

            // Pause rocking on inner symbol
            const symbolEl = el.querySelector('.chess-symbol') as HTMLElement | null;
            if (symbolEl) symbolEl.style.animationPlayState = 'paused';

            const onGlideEnd = (e: TransitionEvent) => {
                if (e.propertyName !== 'left') return;
                el.removeEventListener('transitionend', onGlideEnd);
                el.style.transition = '';

                // Phase 2: Crash + shockwave
                pieceStatesRef.current[index] = 'crashing';
                setCrashingIndex(index);

                // Shockwave position relative to section
                if (sectionRef.current) {
                    const sRect = sectionRef.current.getBoundingClientRect();
                    const eRect = el.getBoundingClientRect();
                    setShockwavePos({
                        x: eRect.left + eRect.width / 2 - sRect.left,
                        y: eRect.top + eRect.height / 2 - sRect.top,
                    });
                }

                // After crash animation completes
                setTimeout(() => {
                    pieceStatesRef.current[index] = 'gone';
                    setCrashingIndex(null);
                    el.style.opacity = '0';
                    el.style.transform = 'translate(-50%, -50%) scale(0)';

                    // Phase 3: Card reveal
                    setTimeout(() => {
                        setActivePiece(index);
                        setOverlayVisible(true);
                        setTimeout(() => setCardVisible(true), 50);
                    }, 50);
                }, 850);
            };

            el.addEventListener('transitionend', onGlideEnd);
        },
        [activePiece, getOrbitDimensions]
    );

    // ---- Back button ----
    const handleBack = useCallback(() => {
        if (activePiece === null) return;
        const index = activePiece;

        setCardVisible(false);
        setTimeout(() => {
            setOverlayVisible(false);
        }, 200);

        setTimeout(() => {
            setActivePiece(null);
            const el = pieceRefs.current[index];
            if (!el) return;

            // Position it at the current orbit angle before showing
            positionPiece(index, orbitAngleRef.current);
            el.style.transform = 'translate(-50%, -50%) scale(1)';

            // Fade in
            requestAnimationFrame(() => {
                el.style.transition = 'opacity 0.4s ease';
                el.style.opacity = '1';

                const onFadeEnd = () => {
                    el.removeEventListener('transitionend', onFadeEnd);
                    el.style.transition = '';
                    pieceStatesRef.current[index] = 'orbiting';

                    // Resume rocking
                    const symbolEl = el.querySelector('.chess-symbol') as HTMLElement | null;
                    if (symbolEl) symbolEl.style.animationPlayState = 'running';
                };
                el.addEventListener('transitionend', onFadeEnd);
            });
        }, 460);
    }, [activePiece, positionPiece]);

    const { stageW, stageH, rx, ry } = getOrbitDimensions();
    const pieceFontSize = isMobile ? '74px' : '96px';

    return (
        <section
            ref={sectionRef}
            className="chess-plugin-section"
            data-header-theme="dark"
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '100vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Chessboard background */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    backgroundImage: `
            repeating-conic-gradient(#1c1b18 0% 25%, #ede7d4 25% 50%) 
          `,
                    backgroundSize: '400px 400px',
                }}
            />
            {/* Alternate approach for better browser support */}
            <div
                className="chess-board-bg"
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                }}
            />

            {/* Vignette overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    background:
                        'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.85) 100%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Content layer */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '60px 20px',
                }}
            >
                {/* Heading */}
                <h2 className="chess-heading">Where I Plug In</h2>

                {/* Subtitle */}
                <p className="chess-subtitle">— select a piece —</p>

                {/* Stage area */}
                <div
                    ref={stageRef}
                    style={{
                        position: 'relative',
                        width: `${stageW}px`,
                        height: `${stageH}px`,
                        maxWidth: '100%',
                        margin: '30px auto',
                    }}
                >
                    {/* Orbit ring hint */}
                    <div
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            width: `${rx * 2}px`,
                            height: `${ry * 2}px`,
                            transform: 'translate(-50%, -50%)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '50%',
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Chess pieces */}
                    {pieces.map((piece, index) => (
                        <div
                            key={piece.id}
                            ref={(el) => {
                                pieceRefs.current[index] = el;
                            }}
                            className="chess-piece-wrapper"
                            onClick={() => handlePieceClick(index)}
                            style={{
                                position: 'absolute',
                                transform: 'translate(-50%, -50%)',
                                cursor: 'pointer',
                                zIndex: 10,
                                textAlign: 'center',
                                opacity: initialized ? 1 : 0,
                                willChange: 'left, top',
                            }}
                        >
                            <span
                                className={`chess-symbol chess-rock-${index} ${crashingIndex === index ? 'chess-crash' : ''}`}
                                style={{
                                    display: 'block',
                                    fontSize: pieceFontSize,
                                    lineHeight: 1,
                                    color: '#fff',
                                    filter: 'drop-shadow(0 4px 20px rgba(255, 255, 255, 0.2))',
                                    perspective: '800px',
                                    transition: 'filter 0.3s ease',
                                }}
                            >
                                {piece.symbol}
                            </span>
                            <span className="chess-label">{piece.label}</span>
                        </div>
                    ))}
                </div>

                {/* Footer text */}
                <div className="chess-footer">
                    <span>Most teams only optimize one layer.</span>
                    <br />
                    <em className="chess-footer-emphasis">I connect all four into one system.</em>
                </div>
            </div>

            {/* Shockwave */}
            {shockwavePos && (
                <div
                    key={`shockwave-${Date.now()}`}
                    className="chess-shockwave"
                    style={{
                        position: 'absolute',
                        left: `${shockwavePos.x}px`,
                        top: `${shockwavePos.y}px`,
                        zIndex: 50,
                        pointerEvents: 'none',
                    }}
                    onAnimationEnd={() => setShockwavePos(null)}
                />
            )}

            {/* Overlay + Card */}
            {overlayVisible && (
                <div
                    className={`chess-overlay ${cardVisible ? 'chess-overlay-visible' : ''}`}
                    onClick={handleBack}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {activePiece !== null && (
                        <div
                            className={`chess-card ${cardVisible ? 'chess-card-visible' : ''}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Corner brackets */}
                            <div className="chess-card-corner chess-card-corner-tl" />
                            <div className="chess-card-corner chess-card-corner-br" />

                            {/* Card symbol */}
                            <span className={`chess-card-symbol ${cardVisible ? 'chess-card-symbol-pop' : ''}`}>
                                {pieces[activePiece].symbol}
                            </span>

                            {/* Card title */}
                            <h3 className="chess-card-title">{pieces[activePiece].title}</h3>

                            {/* Divider */}
                            <hr className="chess-card-divider" />

                            {/* Card body */}
                            <p className="chess-card-body">{pieces[activePiece].description}</p>

                            {/* Back button */}
                            <button className="chess-card-back" onClick={handleBack}>
                                ↩ Return to board
                            </button>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
