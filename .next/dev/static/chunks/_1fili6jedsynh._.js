(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/match-ai-app.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MatchAiApp",
    ()=>MatchAiApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/match-ai.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$custom$2f$deriv$2d$ws$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/custom/deriv-ws-provider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const DERIV_WS_URL = `wss://ws.derivws.com/websockets/v3?app_id=${("TURBOPACK compile-time value", "1089") || 1089}`;
const MAX_DIGITS = 300;
const TARGET_DIGIT = 8;
const ACCENT_COLORS = [
    [
        'Blue',
        '#2563eb'
    ],
    [
        'Purple',
        '#7c3aed'
    ],
    [
        'Green',
        '#059669'
    ],
    [
        'Orange',
        '#ea580c'
    ],
    [
        'Pink',
        '#db2777'
    ],
    [
        'Cyan',
        '#0891b2'
    ]
];
const MARKETS = [
    [
        'Volatility 10 Index',
        'R_10'
    ],
    [
        'Volatility 10 (1s)',
        '1HZ10V'
    ],
    [
        'Volatility 25 Index',
        'R_25'
    ],
    [
        'Volatility 25 (1s)',
        '1HZ25V'
    ],
    [
        'Volatility 50 Index',
        'R_50'
    ],
    [
        'Volatility 50 (1s)',
        '1HZ50V'
    ],
    [
        'Volatility 75 Index',
        'R_75'
    ],
    [
        'Volatility 75 (1s)',
        '1HZ75V'
    ],
    [
        'Volatility 100 Index',
        'R_100'
    ],
    [
        'Volatility 100 (1s)',
        '1HZ100V'
    ]
];
const STRATEGIES = [
    'Over/Under',
    'Even/Odd',
    'Rise/Fall',
    'Matches',
    'Differs',
    'High/Low',
    'Touch/No Touch',
    'Asian',
    'Barrier'
];
function MatchAiApp() {
    _s();
    const [symbol, setSymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('R_10');
    const [strategy, setStrategy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Matches');
    const [accentColor, setAccentColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('#2563eb');
    const [livePrice, setLivePrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [prices, setPrices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [digits, setDigits] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [connected, setConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [clockNow, setClockNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [derivTimeOffset, setDerivTimeOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [feedError, setFeedError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [durationTicks, setDurationTicks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [threshold, setThreshold] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(5);
    const [manualSignal, setManualSignal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isScanning, setIsScanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scanResults, setScanResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [bestMarket, setBestMarket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [generatingSignal, setGeneratingSignal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scanFrames, setScanFrames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [countdownSeconds, setCountdownSeconds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [themeMode, setThemeMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dark');
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('English');
    const scannerSocketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const generationTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const historyPricesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const liveDigitsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const tickPipSizeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [loginStarting, setLoginStarting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { ws, isConnected: socketConnected, auth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$custom$2f$deriv$2d$ws$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDerivWSContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>{
            const savedColor = localStorage.getItem('ceo-hub-accent-color');
            if (savedColor && /^#[0-9a-f]{6}$/i.test(savedColor)) setAccentColor(savedColor);
            const savedTheme = localStorage.getItem('ceo-hub-theme-mode');
            if (savedTheme === 'light' || savedTheme === 'dark') setThemeMode(savedTheme);
            const savedLanguage = localStorage.getItem('ceo-hub-language');
            if (savedLanguage) setLanguage(savedLanguage);
        }
    }["MatchAiApp.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>{
            document.documentElement.classList.toggle('dark', themeMode === 'dark');
            document.documentElement.lang = language === 'French' ? 'fr' : language === 'Spanish' ? 'es' : language === 'Portuguese' ? 'pt' : 'en';
        }
    }["MatchAiApp.useEffect"], [
        themeMode,
        language
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>({
                "MatchAiApp.useEffect": ()=>scannerSocketRef.current?.close()
            })["MatchAiApp.useEffect"]
    }["MatchAiApp.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>{
            if (countdownSeconds <= 0) {
                setManualSignal(null);
                return;
            }
            const timer = window.setTimeout({
                "MatchAiApp.useEffect.timer": ()=>{
                    setCountdownSeconds({
                        "MatchAiApp.useEffect.timer": (current)=>Math.max(0, current - 1)
                    }["MatchAiApp.useEffect.timer"]);
                }
            }["MatchAiApp.useEffect.timer"], 1000);
            return ({
                "MatchAiApp.useEffect": ()=>window.clearTimeout(timer)
            })["MatchAiApp.useEffect"];
        }
    }["MatchAiApp.useEffect"], [
        countdownSeconds
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>({
                "MatchAiApp.useEffect": ()=>{
                    if (generationTimerRef.current) window.clearInterval(generationTimerRef.current);
                }
            })["MatchAiApp.useEffect"]
    }["MatchAiApp.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>{
            if (!connected) {
                setClockNow(null);
                setDerivTimeOffset(null);
                return;
            }
            setClockNow(Date.now());
            const timer = window.setInterval({
                "MatchAiApp.useEffect.timer": ()=>setClockNow(Date.now())
            }["MatchAiApp.useEffect.timer"], 1000);
            return ({
                "MatchAiApp.useEffect": ()=>window.clearInterval(timer)
            })["MatchAiApp.useEffect"];
        }
    }["MatchAiApp.useEffect"], [
        connected
    ]);
    const chooseAccentColor = (color)=>{
        setAccentColor(color);
        localStorage.setItem('ceo-hub-accent-color', color);
    };
    const chooseTheme = (mode)=>{
        setThemeMode(mode);
        localStorage.setItem('ceo-hub-theme-mode', mode);
        document.documentElement.classList.toggle('dark', mode === 'dark');
    };
    const chooseLanguage = (value)=>{
        setLanguage(value);
        localStorage.setItem('ceo-hub-language', value);
        document.documentElement.lang = value === 'French' ? 'fr' : value === 'Spanish' ? 'es' : 'en';
    };
    const loginForLiveTicks = async ()=>{
        setFeedError(null);
        setLoginStarting(true);
        try {
            await auth.login();
        } catch (error) {
            setFeedError(error instanceof Error ? error.message : 'Unable to start Deriv login.');
            setLoginStarting(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>{
            let disposed = false;
            let unsubscribe = null;
            historyPricesRef.current = [];
            tickPipSizeRef.current = null;
            setConnected(false);
            if (!ws || !socketConnected) {
                return ({
                    "MatchAiApp.useEffect": ()=>{
                        disposed = true;
                    }
                })["MatchAiApp.useEffect"];
            }
            const handleTick = {
                "MatchAiApp.useEffect.handleTick": (message)=>{
                    const tick = message.tick;
                    if (!tick) return;
                    const price = Number(tick.quote);
                    if (!Number.isFinite(price)) return;
                    if (typeof tick.pip_size === 'number' && Number.isInteger(tick.pip_size)) {
                        tickPipSizeRef.current = tick.pip_size;
                    }
                    const nextPrices = [
                        ...historyPricesRef.current,
                        price
                    ].slice(-MAX_DIGITS);
                    historyPricesRef.current = nextPrices;
                    setConnected(true);
                    setFeedError(null);
                    if (typeof tick.epoch === 'number' && Number.isFinite(tick.epoch)) {
                        setDerivTimeOffset(tick.epoch * 1000 - Date.now());
                    }
                    setLivePrice(price);
                    setPrices(nextPrices);
                    const pipSize = tickPipSizeRef.current;
                    let nextDigits;
                    if (pipSize !== null) {
                        nextDigits = nextPrices.map({
                            "MatchAiApp.useEffect.handleTick": (item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLastDigit"])(item, pipSize)
                        }["MatchAiApp.useEffect.handleTick"]).filter({
                            "MatchAiApp.useEffect.handleTick": (digit)=>digit !== null
                        }["MatchAiApp.useEffect.handleTick"]);
                    } else {
                        const digit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLastDigit"])(price);
                        nextDigits = digit === null ? liveDigitsRef.current : [
                            ...liveDigitsRef.current,
                            digit
                        ].slice(-MAX_DIGITS);
                    }
                    liveDigitsRef.current = nextDigits;
                    setDigits(nextDigits);
                }
            }["MatchAiApp.useEffect.handleTick"];
            const subscribeToTicks = {
                "MatchAiApp.useEffect.subscribeToTicks": async ()=>{
                    try {
                        const history = await ws.send({
                            ticks_history: symbol,
                            count: MAX_DIGITS,
                            end: 'latest',
                            style: 'ticks'
                        });
                        if (disposed) return;
                        const historyPrices = (history.history?.prices ?? []).filter({
                            "MatchAiApp.useEffect.subscribeToTicks.historyPrices": (price)=>Number.isFinite(price)
                        }["MatchAiApp.useEffect.subscribeToTicks.historyPrices"]);
                        historyPricesRef.current = historyPrices.slice(-MAX_DIGITS);
                        setPrices(historyPrices.slice(-MAX_DIGITS));
                        const historyDigits = historyPrices.map({
                            "MatchAiApp.useEffect.subscribeToTicks.historyDigits": (price)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLastDigit"])(price)
                        }["MatchAiApp.useEffect.subscribeToTicks.historyDigits"]).filter({
                            "MatchAiApp.useEffect.subscribeToTicks.historyDigits": (digit)=>digit !== null
                        }["MatchAiApp.useEffect.subscribeToTicks.historyDigits"]).slice(-MAX_DIGITS);
                        liveDigitsRef.current = historyDigits;
                        setDigits(historyDigits);
                        if (historyPrices.length) setLivePrice(historyPrices.at(-1));
                        const subscription = await ws.subscribe({
                            ticks: symbol
                        }, handleTick);
                        if (disposed) {
                            void subscription.unsubscribe();
                            return;
                        }
                        unsubscribe = subscription.unsubscribe;
                    } catch (error) {
                        if (disposed) return;
                        setConnected(false);
                        setFeedError(error instanceof Error ? error.message : 'Unable to load Deriv ticks.');
                    }
                }
            }["MatchAiApp.useEffect.subscribeToTicks"];
            void subscribeToTicks();
            return ({
                "MatchAiApp.useEffect": ()=>{
                    disposed = true;
                    if (unsubscribe) void unsubscribe();
                }
            })["MatchAiApp.useEffect"];
        }
    }["MatchAiApp.useEffect"], [
        socketConnected,
        symbol,
        ws
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>{
            setManualSignal(null);
            setScanFrames([]);
            if (generationTimerRef.current) window.clearInterval(generationTimerRef.current);
            generationTimerRef.current = null;
            setGeneratingSignal(false);
        }
    }["MatchAiApp.useEffect"], [
        strategy
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>{
            if (generationTimerRef.current) window.clearInterval(generationTimerRef.current);
            generationTimerRef.current = null;
            setGeneratingSignal(false);
            liveDigitsRef.current = [];
            setDigits([]);
            setPrices([]);
            setLivePrice(null);
            setManualSignal(null);
            setScanFrames([]);
        }
    }["MatchAiApp.useEffect"], [
        symbol
    ]);
    const matchResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchAiApp.useMemo[matchResult]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeMatchDigits"])(digits, 100)
    }["MatchAiApp.useMemo[matchResult]"], [
        digits
    ]);
    const analysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchAiApp.useMemo[analysis]": ()=>{
            const window1 = digits.slice(-100);
            const even = window1.filter({
                "MatchAiApp.useMemo[analysis]": (digit)=>digit % 2 === 0
            }["MatchAiApp.useMemo[analysis]"]).length;
            const over = window1.filter({
                "MatchAiApp.useMemo[analysis]": (digit)=>digit >= threshold
            }["MatchAiApp.useMemo[analysis]"]).length;
            const priceWindow = prices.slice(-100);
            const changes = priceWindow.slice(1).map({
                "MatchAiApp.useMemo[analysis].changes": (price, index)=>price - priceWindow[index]
            }["MatchAiApp.useMemo[analysis].changes"]);
            const risingChanges = changes.filter({
                "MatchAiApp.useMemo[analysis]": (change)=>change > 0
            }["MatchAiApp.useMemo[analysis]"]).length;
            const fallingChanges = changes.filter({
                "MatchAiApp.useMemo[analysis]": (change)=>change < 0
            }["MatchAiApp.useMemo[analysis]"]).length;
            const directionalChanges = risingChanges + fallingChanges;
            const evenProbability = window1.length ? even / window1.length * 100 : 0;
            const overProbability = window1.length ? over / window1.length * 100 : 0;
            const riseProbability = directionalChanges ? risingChanges / directionalChanges * 100 : 0;
            const fallProbability = directionalChanges ? fallingChanges / directionalChanges * 100 : 0;
            const bestMatchDigit = matchResult.best?.digit;
            const matchesCount = bestMatchDigit !== undefined ? window1.filter({
                "MatchAiApp.useMemo[analysis]": (digit)=>digit === bestMatchDigit
            }["MatchAiApp.useMemo[analysis]"]).length : 0;
            const matchesProbability = window1.length ? matchesCount / window1.length * 100 : 0;
            const differsProbability = window1.length ? 100 - matchesProbability : 0;
            return {
                evenProbability,
                overProbability,
                riseProbability,
                fallProbability,
                directionalChanges,
                matchSampleCount: window1.length,
                matchesCount,
                differsCount: window1.length - matchesCount,
                matchesProbability,
                differsProbability
            };
        }
    }["MatchAiApp.useMemo[analysis]"], [
        digits,
        matchResult.best,
        prices,
        threshold
    ]);
    const digitDistribution = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchAiApp.useMemo[digitDistribution]": ()=>{
            const window1 = digits.slice(-100);
            return Array.from({
                length: 10
            }, {
                "MatchAiApp.useMemo[digitDistribution]": (_, digit)=>({
                        digit,
                        count: window1.filter({
                            "MatchAiApp.useMemo[digitDistribution]": (value)=>value === digit
                        }["MatchAiApp.useMemo[digitDistribution]"]).length,
                        percentage: window1.length ? window1.filter({
                            "MatchAiApp.useMemo[digitDistribution]": (value)=>value === digit
                        }["MatchAiApp.useMemo[digitDistribution]"]).length / window1.length * 100 : 0
                    })
            }["MatchAiApp.useMemo[digitDistribution]"]);
        }
    }["MatchAiApp.useMemo[digitDistribution]"], [
        digits
    ]);
    const tickSequenceAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchAiApp.useMemo[tickSequenceAnalysis]": ()=>{
            const window1 = digits.slice(-100);
            const sequence = window1.slice(-3);
            const sequenceLength = Math.min(3, Math.max(1, window1.length >= 3 ? 3 : window1.length));
            const pattern = window1.slice(-sequenceLength);
            const follows = new Array(10).fill(0);
            if (window1.length > sequenceLength) {
                for(let index = sequenceLength; index < window1.length; index += 1){
                    const matchesPattern = window1.slice(index - sequenceLength, index).every({
                        "MatchAiApp.useMemo[tickSequenceAnalysis].matchesPattern": (digit, offset)=>digit === pattern[offset]
                    }["MatchAiApp.useMemo[tickSequenceAnalysis].matchesPattern"]);
                    if (matchesPattern) follows[window1[index]] += 1;
                }
            }
            const followTotal = follows.reduce({
                "MatchAiApp.useMemo[tickSequenceAnalysis].followTotal": (sum, count)=>sum + count
            }["MatchAiApp.useMemo[tickSequenceAnalysis].followTotal"], 0);
            let evenProbability;
            let oddProbability;
            if (followTotal > 0) {
                const evenFollows = follows.reduce({
                    "MatchAiApp.useMemo[tickSequenceAnalysis].evenFollows": (sum, count, digit)=>sum + (digit % 2 === 0 ? count : 0)
                }["MatchAiApp.useMemo[tickSequenceAnalysis].evenFollows"], 0);
                evenProbability = evenFollows / followTotal * 100;
                oddProbability = 100 - evenProbability;
            } else {
                const evenCount = window1.filter({
                    "MatchAiApp.useMemo[tickSequenceAnalysis]": (digit)=>digit % 2 === 0
                }["MatchAiApp.useMemo[tickSequenceAnalysis]"]).length;
                evenProbability = window1.length ? evenCount / window1.length * 100 : 0;
                oddProbability = 100 - evenProbability;
            }
            const gaps = digitDistribution.map({
                "MatchAiApp.useMemo[tickSequenceAnalysis].gaps": (item)=>{
                    let gap = window1.length;
                    for(let index = window1.length - 1; index >= 0; index -= 1){
                        if (window1[index] === item.digit) {
                            gap = window1.length - 1 - index;
                            break;
                        }
                    }
                    return {
                        digit: item.digit,
                        gap
                    };
                }
            }["MatchAiApp.useMemo[tickSequenceAnalysis].gaps"]);
            const overdueDigit = [
                ...gaps
            ].sort({
                "MatchAiApp.useMemo[tickSequenceAnalysis]": (a, b)=>b.gap - a.gap
            }["MatchAiApp.useMemo[tickSequenceAnalysis]"])[0]?.digit ?? null;
            const nextEven = evenProbability >= oddProbability;
            return {
                sequence,
                pattern,
                patternSamples: followTotal,
                evenProbability,
                oddProbability,
                nextEven,
                overdueDigit,
                overrepresentedDigit: digitDistribution.reduce({
                    "MatchAiApp.useMemo[tickSequenceAnalysis]": (best, item)=>item.count > best.count ? item : best
                }["MatchAiApp.useMemo[tickSequenceAnalysis]"], digitDistribution[0])
            };
        }
    }["MatchAiApp.useMemo[tickSequenceAnalysis]"], [
        digits,
        digitDistribution
    ]);
    const marketName = MARKETS.find(([, value])=>value === symbol)?.[0] ?? symbol;
    const lastDigit = digits.at(-1) ?? null;
    const predictedMatch = manualSignal?.label.match(/^MATCH (\d)$/);
    const predictedOutcomeDigit = strategy === 'Matches' && predictedMatch ? Number(predictedMatch[1]) : null;
    const hasPatternData = connected && digits.length >= 25;
    const autoPatterns = [
        {
            title: 'Even / Odd',
            signal: hasPatternData ? tickSequenceAnalysis.nextEven ? 'EVEN' : 'ODD' : 'WAIT',
            score: hasPatternData ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toLivePatternScore"])(tickSequenceAnalysis.nextEven ? tickSequenceAnalysis.evenProbability : tickSequenceAnalysis.oddProbability) : null,
            detail: hasPatternData ? `${tickSequenceAnalysis.patternSamples} sequence samples` : 'Waiting for 25 live ticks',
            strategy: 'Even/Odd'
        },
        {
            title: 'Over / Under',
            signal: hasPatternData ? analysis.overProbability >= 50 ? `OVER ${threshold}` : `UNDER ${threshold}` : 'WAIT',
            score: hasPatternData ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toLivePatternScore"])(analysis.overProbability >= 50 ? analysis.overProbability : 100 - analysis.overProbability) : null,
            detail: hasPatternData ? `${digits.slice(-100).length} recent digit samples` : 'Waiting for 25 live ticks',
            strategy: 'Over/Under'
        },
        {
            title: 'Rise / Fall',
            signal: hasPatternData && analysis.directionalChanges ? analysis.riseProbability >= 50 ? 'RISE' : 'FALL' : 'WAIT',
            score: hasPatternData && analysis.directionalChanges ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toLivePatternScore"])(analysis.riseProbability >= 50 ? analysis.riseProbability : analysis.fallProbability) : null,
            detail: hasPatternData && analysis.directionalChanges ? `${analysis.directionalChanges} directional price changes` : 'Waiting for directional price changes',
            strategy: 'Rise/Fall'
        }
    ];
    const calculateScanResult = (name, marketSymbol, prices, price)=>{
        const recentPrices = prices.slice(-100);
        const changes = recentPrices.slice(1).map((current, index)=>Math.abs(current - recentPrices[index]));
        const averagePrice = recentPrices.reduce((sum, current)=>sum + current, 0) / Math.max(recentPrices.length, 1);
        const averageChange = changes.reduce((sum, current)=>sum + current, 0) / Math.max(changes.length, 1);
        const movement = averagePrice > 0 ? averageChange / averagePrice * 10000 : 0;
        const counts = Array.from({
            length: 10
        }, ()=>0);
        recentPrices.forEach((current)=>{
            const digit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLastDigit"])(current);
            if (digit !== null) counts[digit] += 1;
        });
        const uniqueDigits = counts.filter((count)=>count > 0).length;
        const total = recentPrices.length;
        const entropy = counts.reduce((sum, count)=>{
            if (!count || !total) return sum;
            const probability = count / total;
            return sum - probability * Math.log(probability);
        }, 0);
        const entropyScore = entropy / Math.log(10);
        const score = Math.min(99, Math.max(1, Math.round(entropyScore * 45 + movement * 5 + uniqueDigits * 1.5)));
        return {
            name,
            symbol: marketSymbol,
            score,
            movement,
            uniqueDigits,
            price
        };
    };
    const stopScanner = ()=>{
        scannerSocketRef.current?.close();
        scannerSocketRef.current = null;
        setIsScanning(false);
    };
    const startScanner = ()=>{
        stopScanner();
        setIsScanning(true);
        setBestMarket(null);
        setScanResults(MARKETS.map(([name, marketSymbol])=>({
                name,
                symbol: marketSymbol,
                score: 0,
                movement: 0,
                uniqueDigits: 0,
                price: null
            })));
        const scanner = new WebSocket(DERIV_WS_URL);
        scannerSocketRef.current = scanner;
        const scanPrices = new Map();
        scanner.onopen = ()=>{
            MARKETS.forEach(([, marketSymbol])=>{
                scanPrices.set(marketSymbol, []);
                scanner.send(JSON.stringify({
                    ticks_history: marketSymbol,
                    count: 100,
                    end: 'latest',
                    style: 'ticks',
                    req_id: marketSymbol
                }));
                scanner.send(JSON.stringify({
                    ticks: marketSymbol,
                    subscribe: 1
                }));
            });
        };
        scanner.onmessage = (event)=>{
            const message = JSON.parse(event.data);
            if (message.error) return;
            const historyMarketSymbol = message.history?.prices ? message.req_id ?? message.echo_req?.req_id : undefined;
            if (message.history?.prices && historyMarketSymbol) {
                const marketSymbol = historyMarketSymbol;
                const market = MARKETS.find(([, value])=>value === marketSymbol);
                const historyPrices = message.history.prices.filter((price)=>Number.isFinite(price));
                scanPrices.set(marketSymbol, historyPrices.slice(-100));
                if (market) {
                    const result = calculateScanResult(market[0], marketSymbol, historyPrices, historyPrices.at(-1) ?? null);
                    setScanResults((current)=>{
                        const next = current.map((item)=>item.symbol === marketSymbol ? result : item);
                        const ranked = [
                            ...next
                        ].filter((item)=>item.score > 0).sort((a, b)=>b.score - a.score);
                        setBestMarket(ranked[0] ?? null);
                        return next;
                    });
                }
            }
            if (message.tick?.symbol) {
                const marketSymbol = message.tick.symbol;
                const market = MARKETS.find(([, value])=>value === marketSymbol);
                const price = Number(message.tick.quote);
                if (!market || !Number.isFinite(price)) return;
                const nextPrices = [
                    ...scanPrices.get(marketSymbol) ?? [],
                    price
                ].slice(-100);
                scanPrices.set(marketSymbol, nextPrices);
                const result = calculateScanResult(market[0], marketSymbol, nextPrices, price);
                setScanResults((current)=>{
                    const next = current.map((item)=>item.symbol === marketSymbol ? result : item);
                    const ranked = [
                        ...next
                    ].filter((item)=>item.score > 0).sort((a, b)=>b.score - a.score);
                    setBestMarket(ranked[0] ?? null);
                    return next;
                });
            }
        };
        scanner.onerror = ()=>setIsScanning(false);
        scanner.onclose = ()=>{
            if (scannerSocketRef.current === scanner) scannerSocketRef.current = null;
            setIsScanning(false);
        };
    };
    const selectScannedMarket = ()=>{
        if (!bestMarket) return;
        setSymbol(bestMarket.symbol);
        stopScanner();
    };
    const generateSignal = ()=>{
        if (!connected || digits.length < 25 || generatingSignal) return;
        if (generationTimerRef.current) window.clearInterval(generationTimerRef.current);
        setGeneratingSignal(true);
        setManualSignal(null);
        setScanFrames([]);
        setCountdownSeconds(0);
        let scanStep = 0;
        generationTimerRef.current = window.setInterval(()=>{
            scanStep += 1;
            const scanDigits = liveDigitsRef.current.slice(-100);
            if (scanDigits.length === 0) return;
            const sampleCount = Math.ceil(scanDigits.length * scanStep / 5);
            const sample = scanDigits.slice(-sampleCount);
            const frameAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeMatchDigits"])(sample, sample.length);
            const frameCandidate = frameAnalysis.best;
            if (frameCandidate) {
                setScanFrames((frames)=>[
                        ...frames,
                        {
                            step: scanStep,
                            digit: frameCandidate.digit,
                            patternScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toLivePatternScore"])(frameCandidate.percentage),
                            occurrenceCount: frameCandidate.count,
                            sampleCount
                        }
                    ]);
            }
            if (scanStep < 5) return;
            if (generationTimerRef.current) window.clearInterval(generationTimerRef.current);
            generationTimerRef.current = null;
            let label = 'WAIT';
            let confidence = 0;
            const latestDigits = liveDigitsRef.current.slice(-100);
            const durationWindow = latestDigits.slice(-Math.max(25, durationTicks * 25));
            const durationEven = durationWindow.filter((digit)=>digit % 2 === 0).length;
            const durationEvenProbability = durationWindow.length ? durationEven / durationWindow.length * 100 : 0;
            const scanResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeMatchDigits"])(latestDigits, 100);
            if (strategy === 'Matches') {
                if (scanResult.best && !scanResult.waiting) {
                    label = `MATCH ${scanResult.best.digit}`;
                    confidence = scanResult.confidence;
                }
            } else if (strategy === 'Differs') {
                const matchesCount = scanResult.best ? latestDigits.filter((digit)=>digit === scanResult.best?.digit).length : 0;
                const matchesProbability = latestDigits.length ? matchesCount / latestDigits.length * 100 : 0;
                label = `DIFFER FROM ${scanResult.best?.digit ?? TARGET_DIGIT}`;
                confidence = Math.round(100 - matchesProbability);
            } else if (strategy === 'Over/Under') {
                const over = durationWindow.filter((digit)=>digit >= threshold).length / Math.max(durationWindow.length, 1) * 100;
                label = over >= 50 ? `OVER ${threshold - 1}` : `UNDER ${threshold}`;
                confidence = Math.round(Math.max(over, 100 - over));
            } else if (strategy === 'Even/Odd') {
                label = durationEvenProbability >= 50 ? 'EVEN' : 'ODD';
                confidence = Math.round(Math.max(durationEvenProbability, 100 - durationEvenProbability));
            } else if (strategy === 'Rise/Fall') {
                const scanPrices = historyPricesRef.current.slice(-100);
                const changes = scanPrices.slice(1).map((price, index)=>price - scanPrices[index]);
                const risingChanges = changes.filter((change)=>change > 0).length;
                const fallingChanges = changes.filter((change)=>change < 0).length;
                const directionalChanges = risingChanges + fallingChanges;
                const riseProbability = directionalChanges ? risingChanges / directionalChanges * 100 : 0;
                label = riseProbability >= 50 ? 'RISE' : 'FALL';
                confidence = Math.round(Math.max(riseProbability, 100 - riseProbability));
            } else {
                label = strategy === 'High/Low' ? `HIGH - ABOVE ${threshold}` : strategy === 'Touch/No Touch' ? 'TOUCH' : strategy === 'Asian' ? durationWindow.reduce((sum, digit)=>sum + digit, 0) / Math.max(durationWindow.length, 1) >= 4.5 ? 'ASIAN HIGH' : 'ASIAN LOW' : `BARRIER ${threshold}`;
                confidence = Math.round(Math.max(durationEvenProbability, 100 - durationEvenProbability));
            }
            const durationConfidenceAdjustment = durationTicks === 1 ? 0 : (durationTicks - 1) * -1;
            setManualSignal({
                label,
                confidence: Math.min(95, Math.max(0, confidence + durationConfidenceAdjustment))
            });
            setGeneratingSignal(false);
            setCountdownSeconds(15);
        }, 1000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: `ceo-hub-page min-h-screen overflow-y-auto text-slate-100 ${themeMode === 'light' ? 'ceo-hub-light bg-[#edf2f8]' : 'bg-[#07101f]'}`,
        style: {
            '--accent': accentColor
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "jsx-fe9665299295552e" + " " + "mx-auto w-full max-w-5xl px-3 py-4 sm:px-6 sm:py-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    id: "fe9665299295552e",
                    children: '.ceo-hub-light [class*="bg-[#0d192b]"],.ceo-hub-light [class*="bg-[#111f33]"]{background-color:#fff!important}.ceo-hub-light [class*=border-white]{border-color:#dbe3ef!important}.ceo-hub-light [class*=text-white]{color:#0f172a!important}.ceo-hub-light [class*=text-slate-300],.ceo-hub-light [class*=text-slate-400],.ceo-hub-light [class*=text-slate-500]{color:#64748b!important}'
                }, void 0, false, void 0, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "jsx-fe9665299295552e" + " " + "flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-[#0d192b] px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.18)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: accentColor
                                    },
                                    className: "jsx-fe9665299295552e" + " " + "text-[10px] font-black uppercase tracking-[0.18em]",
                                    children: "CEO HUB Analysis"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 649,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-lg font-black tracking-tight text-white sm:text-xl",
                                    children: "Live Market Analysis"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 650,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 648,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "flex flex-wrap items-center justify-end gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "aria-label": "Choose preferred colour",
                                    className: "jsx-fe9665299295552e" + " " + "flex items-center gap-1",
                                    children: [
                                        ACCENT_COLORS.map(([name, color])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                title: name,
                                                "aria-label": `Use ${name}`,
                                                onClick: ()=>chooseAccentColor(color),
                                                style: {
                                                    backgroundColor: color,
                                                    outline: accentColor === color ? `2px solid ${color}` : undefined,
                                                    outlineOffset: 1
                                                },
                                                className: "jsx-fe9665299295552e" + " " + "h-6 w-6 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-200"
                                            }, color, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 655,
                                                columnNumber: 17
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            title: "Custom colour",
                                            className: "jsx-fe9665299295552e" + " " + "relative ml-1 flex h-7 w-7 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/[0.15] bg-[#111f33] shadow-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-fe9665299295552e" + " " + "text-sm font-black text-slate-300",
                                                    children: "+"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 666,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "color",
                                                    value: accentColor,
                                                    onChange: (event)=>chooseAccentColor(event.target.value),
                                                    "aria-label": "Choose custom colour",
                                                    className: "jsx-fe9665299295552e" + " " + "absolute inset-0 cursor-pointer opacity-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 667,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 665,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 653,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "flex items-center rounded-lg border border-white/[0.08] bg-[#111f33] p-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>chooseTheme('dark'),
                                            style: themeMode === 'dark' ? {
                                                backgroundColor: accentColor
                                            } : undefined,
                                            className: "jsx-fe9665299295552e" + " " + `rounded-md px-2 py-1 text-[10px] font-black ${themeMode === 'dark' ? 'text-white' : 'text-slate-400'}`,
                                            children: "Dark"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 677,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>chooseTheme('light'),
                                            style: themeMode === 'light' ? {
                                                backgroundColor: accentColor
                                            } : undefined,
                                            className: "jsx-fe9665299295552e" + " " + `rounded-md px-2 py-1 text-[10px] font-black ${themeMode === 'light' ? 'text-white' : 'text-slate-400'}`,
                                            children: "Light"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 685,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 676,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: language,
                                    onChange: (event)=>chooseLanguage(event.target.value),
                                    "aria-label": "Language",
                                    className: "jsx-fe9665299295552e" + " " + "rounded-lg border border-white/[0.08] bg-[#111f33] px-2 py-2 text-xs font-bold text-white outline-none",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            className: "jsx-fe9665299295552e",
                                            children: "English"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 700,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            className: "jsx-fe9665299295552e",
                                            children: "French"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 701,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            className: "jsx-fe9665299295552e",
                                            children: "Spanish"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 702,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            className: "jsx-fe9665299295552e",
                                            children: "Portuguese"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 703,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 694,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "market",
                                    className: "jsx-fe9665299295552e" + " " + "text-xs font-bold text-slate-400",
                                    children: "Market"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 705,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    id: "market",
                                    value: symbol,
                                    onChange: (event)=>setSymbol(event.target.value),
                                    className: "jsx-fe9665299295552e" + " " + "rounded-lg border border-white/[0.08] bg-[#111f33] px-3 py-2 text-sm font-bold text-white outline-none",
                                    children: MARKETS.map(([name, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: value,
                                            className: "jsx-fe9665299295552e",
                                            children: name
                                        }, value, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 712,
                                            columnNumber: 47
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 706,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 652,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 647,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d192b] shadow-[0_16px_40px_rgba(0,0,0,0.16)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "flex items-center justify-between border-b border-white/[0.08] px-4 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: accentColor
                                            },
                                            className: "jsx-fe9665299295552e" + " " + "text-[10px] font-black uppercase tracking-[0.18em]",
                                            children: "Recency Intelligence"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 720,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black uppercase tracking-[0.12em] text-white",
                                            children: "AI Tick Sequence & Pattern Recency Detector"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 721,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 719,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: connected && digits.length >= 25 ? {
                                        backgroundColor: accentColor
                                    } : undefined,
                                    className: "jsx-fe9665299295552e" + " " + `rounded-full px-3 py-1 text-[10px] font-black ${connected && digits.length >= 25 ? 'text-white' : 'bg-slate-700 text-slate-300'}`,
                                    children: connected && digits.length >= 25 ? `${tickSequenceAnalysis.patternSamples} SAMPLES` : 'WAIT - 0%'
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 723,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 718,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                            children: "Current Sequence"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 731,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-lg font-black tracking-[0.25em] text-white",
                                            children: connected && tickSequenceAnalysis.sequence.length > 0 ? tickSequenceAnalysis.sequence.join('  >  ') : 'WAIT'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 732,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 730,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                            children: "Detected Pattern"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 737,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-sm font-black text-white",
                                            children: connected && digits.length >= 25 ? `${tickSequenceAnalysis.pattern.join(' -> ')} Recency` : 'Collecting Sequence'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 738,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 736,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                            children: "Predicted Side"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 743,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: connected && digits.length >= 25 ? accentColor : undefined
                                            },
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-sm font-black",
                                            children: connected && digits.length >= 25 ? `${tickSequenceAnalysis.nextEven ? 'EVEN' : 'ODD'} - ${Math.round(Math.max(tickSequenceAnalysis.evenProbability, tickSequenceAnalysis.oddProbability))}%` : 'WAIT - 0%'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 744,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 742,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                            children: "Recency Status"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 751,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-sm font-black text-white",
                                            children: connected && digits.length >= 25 ? `Overdue ${tickSequenceAnalysis.overdueDigit} / Hot ${tickSequenceAnalysis.overrepresentedDigit.digit}` : 'STANDBY'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 752,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 750,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 729,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 717,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d192b] shadow-[0_16px_40px_rgba(0,0,0,0.16)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "flex items-center gap-3 border-b border-white/[0.08] px-4 py-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-fe9665299295552e" + " " + "relative flex h-2.5 w-2.5",
                                    children: [
                                        connected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                backgroundColor: accentColor
                                            },
                                            className: "jsx-fe9665299295552e" + " " + "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 764,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: connected ? {
                                                backgroundColor: accentColor
                                            } : undefined,
                                            className: "jsx-fe9665299295552e" + " " + `relative inline-flex h-2.5 w-2.5 rounded-full ${connected ? '' : 'bg-slate-500'}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 765,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 763,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-fe9665299295552e" + " " + "text-xs font-black uppercase tracking-[0.18em] text-white",
                                    children: "LIVE SPOT TICKER"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 767,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 762,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[10px] font-black uppercase tracking-[0.14em] text-slate-400",
                                            children: "Volatility in Use"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 771,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 truncate text-sm font-black text-white",
                                            children: marketName
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 772,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 770,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "sm:text-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "font-mono text-2xl font-black tabular-nums text-white sm:text-3xl",
                                            children: livePrice === null ? '--' : livePrice.toFixed(4)
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 775,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 flex gap-1.5 overflow-x-auto sm:justify-end",
                                            children: digits.slice(-12).map((digit, index, recentDigits)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: index === recentDigits.length - 1 ? {
                                                        backgroundColor: accentColor
                                                    } : undefined,
                                                    className: "jsx-fe9665299295552e" + " " + `flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-black ${index === recentDigits.length - 1 ? 'text-white' : 'bg-[#111f33] text-slate-300'}`,
                                                    children: digit
                                                }, `${digit}-${index}`, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 780,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 778,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 774,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 769,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 761,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.16)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "flex flex-wrap items-center justify-between gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[10px] font-black uppercase tracking-[0.16em] text-slate-400",
                                            children: "Live Volatility Scanner"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 798,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                            children: isScanning ? 'Scanning volatility markets...' : bestMarket ? 'Best volatility market found' : 'Scan all volatility markets'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 799,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 797,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: isScanning ? stopScanner : startScanner,
                                    style: {
                                        backgroundColor: isScanning ? '#64748b' : accentColor
                                    },
                                    className: "jsx-fe9665299295552e" + " " + "h-10 rounded-lg px-4 text-xs font-black text-white shadow-sm transition disabled:cursor-not-allowed disabled:bg-slate-600",
                                    children: isScanning ? 'Stop Scan' : 'Scan Best Volatility'
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 803,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 796,
                            columnNumber: 11
                        }, this),
                        bestMarket && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: selectScannedMarket,
                            style: {
                                borderColor: `${accentColor}55`,
                                backgroundColor: `${accentColor}12`
                            },
                            className: "jsx-fe9665299295552e" + " " + "mt-4 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: accentColor
                                            },
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-black uppercase tracking-[0.14em]",
                                            children: "Recommended Market"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 821,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                            children: bestMarket.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 822,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 820,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "text-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-lg font-black text-white",
                                            children: [
                                                bestMarket.score,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 825,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[10px] font-bold text-slate-400",
                                            children: "Scanner Score - Click to use"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 826,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 824,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 814,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5",
                            children: scanResults.map((result)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setSymbol(result.symbol);
                                        stopScanner();
                                    },
                                    disabled: result.score === 0,
                                    className: "jsx-fe9665299295552e" + " " + "rounded-lg border border-white/[0.08] bg-[#111f33] px-2 py-2 text-center disabled:opacity-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "truncate text-[9px] font-bold text-slate-400",
                                            children: result.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 843,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                            children: result.score ? `${result.score}%` : '--'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 844,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, result.symbol, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 833,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 831,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 795,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-3 flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#0d192b] px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.14)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "text-[10px] font-black uppercase tracking-[0.16em] text-slate-400",
                                    children: "Live Market"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 852,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-1 font-mono text-xl font-black tabular-nums text-white sm:text-2xl",
                                    children: livePrice === null ? '--' : livePrice.toFixed(5)
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 853,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 851,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "text-right",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "text-[10px] font-bold text-slate-400",
                                    children: marketName
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 858,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-xs font-black text-slate-300",
                                    children: [
                                        "Digit ",
                                        lastDigit ?? '-'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 859,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 857,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 850,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    role: "status",
                    "aria-live": "polite",
                    "aria-atomic": "true",
                    className: "jsx-fe9665299295552e" + " " + `mt-3 flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-black ${connected ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-slate-500/30 bg-slate-500/10 text-slate-400'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            "aria-hidden": "true",
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            className: "jsx-fe9665299295552e" + " " + `h-5 w-5 shrink-0 ${connected ? 'animate-pulse' : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: "3",
                                    y: "16",
                                    width: "3",
                                    height: "5",
                                    rx: "1",
                                    className: "jsx-fe9665299295552e"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 879,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: "8",
                                    y: "13",
                                    width: "3",
                                    height: "8",
                                    rx: "1",
                                    className: "jsx-fe9665299295552e"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 880,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: "13",
                                    y: "9",
                                    width: "3",
                                    height: "12",
                                    rx: "1",
                                    className: "jsx-fe9665299295552e"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 881,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: "18",
                                    y: "5",
                                    width: "3",
                                    height: "16",
                                    rx: "1",
                                    className: "jsx-fe9665299295552e"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 882,
                                    columnNumber: 13
                                }, this),
                                !connected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M4 4 20 20",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    className: "jsx-fe9665299295552e"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 884,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 873,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "jsx-fe9665299295552e",
                            children: connected ? 'Connected' : 'Not connected / Offline'
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 887,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 863,
                    columnNumber: 9
                }, this),
                !auth.wsUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-fe9665299295552e" + " " + "mt-2 flex flex-col items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: loginForLiveTicks,
                            disabled: loginStarting || auth.authState === 'authenticating',
                            style: {
                                backgroundColor: accentColor
                            },
                            className: "jsx-fe9665299295552e" + " " + "rounded-lg px-4 py-2 text-sm font-black text-white transition disabled:cursor-wait disabled:opacity-60",
                            children: loginStarting || auth.authState === 'authenticating' ? 'Connecting to Deriv...' : 'Log in to Deriv for live ticks'
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 892,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-fe9665299295552e" + " " + "text-center text-xs text-slate-400",
                            children: "Sign in to connect this dashboard to your Deriv account."
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 901,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 891,
                    columnNumber: 11
                }, this),
                feedError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    role: "alert",
                    className: "jsx-fe9665299295552e" + " " + "mt-2 text-center text-xs font-semibold text-rose-400",
                    children: feedError
                }, void 0, false, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 907,
                    columnNumber: 11
                }, this),
                connected && clockNow !== null && derivTimeOffset !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "aria-label": "Live clocks",
                    className: "jsx-fe9665299295552e" + " " + "mt-2 grid grid-cols-2 gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "rounded-lg border border-white/[0.08] bg-[#0d192b] px-3 py-2 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400",
                                    children: "Deriv Time (UTC)"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 915,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-1 block font-mono text-sm font-black tabular-nums text-white",
                                    children: new Date(clockNow + derivTimeOffset).toLocaleTimeString('en-GB', {
                                        timeZone: 'UTC',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 916,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 914,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "rounded-lg border border-white/[0.08] bg-[#0d192b] px-3 py-2 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400",
                                    children: "Local Time"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 926,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-1 block font-mono text-sm font-black tabular-nums text-white",
                                    children: new Date(clockNow).toLocaleTimeString(undefined, {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 927,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 925,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 913,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "flex flex-wrap items-baseline justify-between gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-fe9665299295552e" + " " + "text-sm font-black text-white",
                                    children: "Auto AI Patterns"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 940,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "text-[10px] font-semibold text-slate-400",
                                    children: "Live pattern score, not a win probability"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 941,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 939,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4",
                            children: [
                                autoPatterns.map(({ title, signal, score, detail, strategy: patternStrategy })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setStrategy(patternStrategy),
                                        title: "Pattern score is normalized from recent live-tick frequency; it is not the probability of a future outcome.",
                                        style: strategy === patternStrategy ? {
                                            borderColor: accentColor,
                                            backgroundColor: `${accentColor}18`,
                                            boxShadow: `0 0 0 2px ${accentColor}24`
                                        } : undefined,
                                        className: "jsx-fe9665299295552e" + " " + `rounded-xl border px-3 py-3 text-left transition ${strategy === patternStrategy ? 'ring-2' : 'border-white/[0.08] bg-[#111f33]'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-fe9665299295552e" + " " + "block text-[10px] font-bold uppercase tracking-wide text-slate-400",
                                                children: title
                                            }, void 0, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 955,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-fe9665299295552e" + " " + "mt-1 block text-sm font-black text-white",
                                                children: signal
                                            }, void 0, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 956,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-fe9665299295552e" + " " + "mt-1 block text-xs font-bold text-cyan-300",
                                                children: score === null ? 'WAIT' : `Pattern score ${score}%`
                                            }, void 0, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 957,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-fe9665299295552e" + " " + "mt-1 block text-[9px] leading-relaxed text-slate-500",
                                                children: detail
                                            }, void 0, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 960,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, title, true, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 945,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-xl border border-white/[0.08] bg-[#111f33] px-3 py-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-fe9665299295552e" + " " + "block text-[10px] font-bold uppercase tracking-wide text-slate-400",
                                            children: "Matches / Differs"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 964,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 grid grid-cols-2 gap-2",
                                            children: [
                                                {
                                                    label: 'Matches',
                                                    strategy: 'Matches',
                                                    observed: analysis.matchesProbability,
                                                    count: analysis.matchesCount
                                                },
                                                {
                                                    label: 'Differs',
                                                    strategy: 'Differs',
                                                    observed: analysis.differsProbability,
                                                    count: analysis.differsCount
                                                }
                                            ].map(({ label, strategy: outcomeStrategy, observed, count })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setStrategy(outcomeStrategy),
                                                    disabled: !hasPatternData,
                                                    "aria-pressed": strategy === outcomeStrategy,
                                                    title: "Score is derived from the observed frequency for this outcome in recent live ticks; it is not a win probability.",
                                                    style: strategy === outcomeStrategy ? {
                                                        borderColor: accentColor,
                                                        boxShadow: `0 0 0 2px ${accentColor}24`
                                                    } : undefined,
                                                    className: "jsx-fe9665299295552e" + " " + `rounded-lg border px-2 py-2 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${strategy === outcomeStrategy ? 'ring-2' : 'border-white/[0.08] bg-[#0d192b]'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-fe9665299295552e" + " " + "block text-[10px] font-black uppercase text-white",
                                                            children: label
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/match-ai-app.tsx",
                                                            lineNumber: 998,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-fe9665299295552e" + " " + "mt-1 block text-xs font-bold text-cyan-300",
                                                            children: hasPatternData ? `Score ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toLivePatternScore"])(observed)}%` : 'WAIT'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/match-ai-app.tsx",
                                                            lineNumber: 999,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-fe9665299295552e" + " " + "mt-1 block text-[9px] text-slate-500",
                                                            children: hasPatternData ? `${Math.round(observed)}% · ${count}/${analysis.matchSampleCount} ticks` : 'Need 25 ticks'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/match-ai-app.tsx",
                                                            lineNumber: 1002,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, label, true, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 982,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 967,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 963,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 943,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 938,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "jsx-fe9665299295552e" + " " + "text-sm font-black text-white",
                            children: "Strategy"
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1015,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mt-3 flex flex-wrap gap-2",
                            children: STRATEGIES.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setStrategy(item),
                                    style: strategy === item ? {
                                        backgroundColor: accentColor
                                    } : undefined,
                                    className: "jsx-fe9665299295552e" + " " + `rounded-lg px-3 py-2 text-xs font-black ${strategy === item ? 'text-white' : 'border border-white/[0.08] bg-[#111f33] text-slate-300'}`,
                                    children: item
                                }, item, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1018,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1016,
                            columnNumber: 11
                        }, this),
                        (strategy === 'Over/Under' || strategy === 'High/Low' || strategy === 'Barrier') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mt-4 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-fe9665299295552e" + " " + "text-xs font-bold text-slate-400",
                                    children: "Threshold"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1034,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: threshold,
                                    onChange: (event)=>setThreshold(Number(event.target.value)),
                                    className: "jsx-fe9665299295552e" + " " + "rounded-lg border border-white/[0.08] bg-[#111f33] px-2 py-1.5 text-sm font-black text-white",
                                    children: Array.from({
                                        length: 9
                                    }, (_, index)=>index + 1).map((value)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: value,
                                            className: "jsx-fe9665299295552e",
                                            children: value
                                        }, value, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1040,
                                            columnNumber: 84
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1035,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1033,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1014,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "flex flex-wrap items-center gap-x-2 gap-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-fe9665299295552e" + " " + "text-sm font-black text-white",
                                    children: "Duration (1 To 5 Ticks)"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1048,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        backgroundColor: `${accentColor}20`,
                                        color: accentColor
                                    },
                                    className: "jsx-fe9665299295552e" + " " + "rounded-md px-2 py-1 text-xs font-black",
                                    children: [
                                        durationTicks,
                                        " ",
                                        durationTicks === 1 ? 'Tick' : 'Ticks'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1049,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1047,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mt-3 grid grid-cols-5 gap-2",
                            children: [
                                1,
                                2,
                                3,
                                4,
                                5
                            ].map((ticks)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setDurationTicks(ticks);
                                        setManualSignal(null);
                                    },
                                    style: durationTicks === ticks ? {
                                        borderColor: accentColor,
                                        backgroundColor: accentColor
                                    } : undefined,
                                    "aria-pressed": durationTicks === ticks,
                                    className: "jsx-fe9665299295552e" + " " + `rounded-xl border px-2 py-3 text-center transition ${durationTicks === ticks ? 'text-white' : 'border-white/[0.08] bg-[#111f33] text-slate-300'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-fe9665299295552e" + " " + "block text-lg font-black",
                                            children: ticks
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1068,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 block text-[10px] font-bold",
                                            children: ticks === 1 ? '1 Tick' : `${ticks} Ticks`
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1069,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, ticks, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1055,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1053,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1046,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-fe9665299295552e" + " " + "text-sm font-black text-white",
                                    children: "Live Digits"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1077,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-fe9665299295552e" + " " + "text-xs font-bold text-slate-400",
                                    children: [
                                        digits.length,
                                        " ticks"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1078,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1076,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mt-3 flex gap-2 overflow-x-auto pb-2",
                            children: digits.slice(-30).map((digit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: index === digits.slice(-30).length - 1 ? {
                                        backgroundColor: accentColor
                                    } : undefined,
                                    className: "jsx-fe9665299295552e" + " " + `flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${index === digits.slice(-30).length - 1 ? 'text-white' : 'bg-[#111f33] text-slate-200'}`,
                                    children: digit
                                }, `${digit}-${index}`, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1082,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1080,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1075,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[10px] font-black uppercase tracking-[0.16em] text-slate-400",
                                            children: "Signal Generator"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1094,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-xs font-bold text-slate-300",
                                            children: generatingSignal ? 'Processing live tick analysis...' : connected ? `${strategy} analysis for ${durationTicks} ${durationTicks === 1 ? 'tick' : 'ticks'}` : 'Waiting for live market ticks...'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1095,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1093,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: generateSignal,
                                    disabled: !connected || digits.length < 25 || generatingSignal,
                                    style: !connected || digits.length < 25 || generatingSignal ? undefined : {
                                        backgroundColor: accentColor
                                    },
                                    className: "jsx-fe9665299295552e" + " " + "h-12 w-full shrink-0 rounded-xl text-sm font-black text-white shadow-sm transition disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-52",
                                    children: generatingSignal ? 'Running Analysis (5s)...' : 'Generate Signal'
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1103,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1092,
                            columnNumber: 11
                        }, this),
                        generatingSignal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mt-4 flex flex-col items-center gap-3 rounded-xl border border-dashed border-cyan-500/30 bg-cyan-950/10 p-5 text-cyan-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    className: "jsx-fe9665299295552e" + " " + "h-8 w-8 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1115,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "text-center text-xs font-bold uppercase tracking-widest",
                                    children: [
                                        "Analyzing tick snapshot... Frame ",
                                        scanFrames.length,
                                        "/5"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1116,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1114,
                            columnNumber: 13
                        }, this),
                        scanFrames.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mt-4 rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "mb-3 flex flex-wrap items-center justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[10px] font-black uppercase tracking-[0.14em] text-slate-300",
                                            children: generatingSignal ? 'Live Pattern Scan' : 'Completed Pattern Scan'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1124,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] text-slate-500",
                                            children: "Pattern index is not a win probability."
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1127,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1123,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "grid grid-cols-2 gap-2 sm:grid-cols-5",
                                    children: scanFrames.map((frame)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-fe9665299295552e" + " " + "rounded-lg border border-white/[0.06] bg-[#0d192b] p-2 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-wider text-slate-500",
                                                    children: [
                                                        "Frame ",
                                                        frame.step
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1132,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-lg font-black text-white",
                                                    children: [
                                                        "DIGIT ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: accentColor
                                                            },
                                                            className: "jsx-fe9665299295552e",
                                                            children: frame.digit
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/match-ai-app.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1133,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        color: accentColor
                                                    },
                                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-xs font-black",
                                                    children: [
                                                        "Pattern index ",
                                                        frame.patternScore,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1136,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-[9px] text-slate-500",
                                                    children: [
                                                        "Observed ",
                                                        frame.occurrenceCount,
                                                        "/",
                                                        frame.sampleCount
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1139,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, frame.step, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1131,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1129,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1122,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1091,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-5 text-center shadow-[0_16px_40px_rgba(0,0,0,0.16)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-fe9665299295552e" + " " + "text-xs font-black uppercase tracking-[0.18em] text-slate-400",
                            children: "Signal Result"
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1150,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-fe9665299295552e" + " " + "mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400",
                            children: "Recommended Signal"
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1151,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                color: accentColor
                            },
                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-3xl font-black",
                            children: manualSignal?.label ?? `${strategy.toUpperCase()} - WAIT`
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1152,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-sm font-black text-slate-200",
                            children: [
                                "Confidence: ",
                                manualSignal ? `${manualSignal.confidence}%` : '--'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1155,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-xs text-slate-400",
                            children: "Estimated from the selected recent tick sample; not a guarantee of outcome."
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1158,
                            columnNumber: 11
                        }, this),
                        manualSignal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                borderColor: `${accentColor}55`,
                                backgroundColor: countdownSeconds > 0 ? `${accentColor}18` : undefined
                            },
                            className: "jsx-fe9665299295552e" + " " + "mt-3 inline-flex min-w-32 items-center justify-center rounded-lg border px-4 py-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: countdownSeconds > 0 ? accentColor : undefined
                                },
                                className: "jsx-fe9665299295552e" + " " + "text-xs font-black uppercase tracking-[0.12em]",
                                children: countdownSeconds > 0 ? `Signal expires in ${countdownSeconds}s` : 'Analysis Ready'
                            }, void 0, false, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 1161,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1160,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1149,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "rounded-2xl border border-white/[0.08] bg-[#0d192b] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.16)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-fe9665299295552e",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "text-[10px] font-black uppercase tracking-[0.16em] text-slate-400",
                                                    children: "Digits Graph"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1172,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                                    children: "Last 100 Digits"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1173,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1171,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-fe9665299295552e" + " " + "text-xs font-bold text-slate-400",
                                            children: [
                                                digits.length,
                                                " samples"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1175,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1170,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-5 flex h-44 items-end gap-2 border-b border-white/[0.08] px-1",
                                    children: digitDistribution.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-fe9665299295552e" + " " + "flex h-full min-w-0 flex-1 flex-col justify-end text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-fe9665299295552e" + " " + "mb-1 text-[9px] font-bold text-slate-400",
                                                    children: [
                                                        item.percentage.toFixed(0),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1180,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        height: `${Math.max(4, item.percentage * 3.2)}%`,
                                                        backgroundColor: matchResult.best?.digit === item.digit ? accentColor : `${accentColor}55`
                                                    },
                                                    title: `Digit ${item.digit}: ${item.count} occurrences`,
                                                    className: "jsx-fe9665299295552e" + " " + "mx-auto w-full max-w-7 rounded-t-md transition-all duration-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1181,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-fe9665299295552e" + " " + "mt-2 text-xs font-black text-slate-300",
                                                    children: item.digit
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1189,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, item.digit, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1179,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1177,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1169,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "rounded-2xl border border-white/[0.08] bg-[#0d192b] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.16)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[10px] font-black uppercase tracking-[0.16em] text-slate-400",
                                            children: "AI Machine"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1197,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: connected ? {
                                                backgroundColor: accentColor
                                            } : undefined,
                                            className: "jsx-fe9665299295552e" + " " + `h-2 w-2 rounded-full ${connected ? 'animate-pulse' : 'bg-slate-500'}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1198,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1196,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-4 rounded-xl border border-white/[0.08] bg-[#111f33] p-4 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                boxShadow: `0 0 28px ${accentColor}40`,
                                                borderColor: `${accentColor}55`
                                            },
                                            className: "jsx-fe9665299295552e" + " " + "mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/[0.08]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    backgroundColor: accentColor
                                                },
                                                className: "jsx-fe9665299295552e" + " " + "flex h-14 w-14 items-center justify-center rounded-full text-lg font-black text-white",
                                                children: "AI"
                                            }, void 0, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 1205,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1201,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-3 text-sm font-black text-white",
                                            children: connected ? 'ENGINE ACTIVE' : 'ENGINE STANDBY'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1212,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-xs text-slate-400",
                                            children: digits.length >= 25 ? 'Pattern analysis ready' : 'Collecting market data'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1213,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1200,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-3 grid grid-cols-2 gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-fe9665299295552e" + " " + "rounded-lg bg-[#111f33] px-3 py-2 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase text-slate-500",
                                                    children: "Samples"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1217,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                                    children: digits.length
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1218,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1216,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-fe9665299295552e" + " " + "rounded-lg bg-[#111f33] px-3 py-2 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase text-slate-500",
                                                    children: "Confidence"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1221,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                                    children: [
                                                        manualSignal?.confidence ?? '--',
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1222,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1220,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1215,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1195,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1168,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d192b] shadow-[0_16px_40px_rgba(0,0,0,0.16)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "flex items-center justify-between border-b border-white/[0.08] px-4 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: accentColor
                                            },
                                            className: "jsx-fe9665299295552e" + " " + "text-[10px] font-black uppercase tracking-[0.18em]",
                                            children: "Final Processing Layer"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1231,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black uppercase tracking-[0.12em] text-white",
                                            children: "Neural Analysis Engine"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1232,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1230,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: connected && digits.length >= 25 ? {
                                        backgroundColor: accentColor
                                    } : undefined,
                                    className: "jsx-fe9665299295552e" + " " + `rounded-full px-3 py-1 text-[10px] font-black ${connected && digits.length >= 25 ? 'text-white' : 'bg-slate-700 text-slate-300'}`,
                                    children: connected && digits.length >= 25 ? 'ANALYZING' : 'STANDBY'
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1234,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1229,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                            children: "Active Market"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1242,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 truncate text-sm font-black text-white",
                                            children: marketName
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1243,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1241,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                            children: "Selected Strategy"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1246,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-sm font-black text-white",
                                            children: strategy
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1247,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1245,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                            children: "Signal Duration"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1250,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-sm font-black text-white",
                                            children: [
                                                durationTicks,
                                                " ",
                                                durationTicks === 1 ? 'Tick' : 'Ticks'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1251,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1249,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                            children: "Neural Confidence"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1254,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: accentColor
                                            },
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-sm font-black",
                                            children: manualSignal ? `${manualSignal.confidence}%` : 'Awaiting Signal'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1255,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1253,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1240,
                            columnNumber: 11
                        }, this),
                        predictedOutcomeDigit !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mx-4 mb-4 rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-fe9665299295552e" + " " + "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            backgroundColor: accentColor,
                                            boxShadow: `0 8px 24px ${accentColor}35`
                                        },
                                        className: "jsx-fe9665299295552e" + " " + "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-xl font-black text-white shadow-lg",
                                        children: predictedOutcomeDigit
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 1263,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-fe9665299295552e" + " " + "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-fe9665299295552e" + " " + "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            backgroundColor: accentColor
                                                        },
                                                        className: "jsx-fe9665299295552e" + " " + "flex h-5 w-5 items-center justify-center rounded-full text-xs font-black text-white",
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/match-ai-app.tsx",
                                                        lineNumber: 1271,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-fe9665299295552e" + " " + "text-[9px] font-black uppercase tracking-[0.14em] text-slate-400",
                                                        children: "Predicted Outcome"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/match-ai-app.tsx",
                                                        lineNumber: 1274,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 1270,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                                children: [
                                                    "Digit ",
                                                    predictedOutcomeDigit,
                                                    " is predicted to match the last tick"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 1276,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 1269,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 1262,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1261,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1228,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/match-ai-app.tsx",
            lineNumber: 629,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/match-ai-app.tsx",
        lineNumber: 625,
        columnNumber: 5
    }, this);
}
_s(MatchAiApp, "hI7hboga1ETw0YZ4ma3d8FcIC8s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$custom$2f$deriv$2d$ws$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDerivWSContext"]
    ];
});
_c = MatchAiApp;
var _c;
__turbopack_context__.k.register(_c, "MatchAiApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/match-ai.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeMatchDigits",
    ()=>analyzeMatchDigits,
    "parseLastDigit",
    ()=>parseLastDigit,
    "toLivePatternScore",
    ()=>toLivePatternScore
]);
function toLivePatternScore(observedShare) {
    const boundedShare = Math.min(100, Math.max(0, observedShare));
    return Math.round(68 + boundedShare / 100 * 32);
}
function parseLastDigit(price, pipSize) {
    if (typeof pipSize === 'number' && Number.isInteger(pipSize) && pipSize >= 0 && pipSize <= 20) {
        const formattedPrice = Number(price).toFixed(pipSize);
        const digit = Number.parseInt(formattedPrice.at(-1) ?? '', 10);
        return Number.isNaN(digit) ? null : digit;
    }
    const text = String(price);
    const digit = Number.parseInt(text.slice(-1), 10);
    return Number.isNaN(digit) ? null : digit;
}
function analyzeMatchDigits(digits, lookback) {
    const window = digits.slice(-lookback);
    const total = window.length;
    const ranked = Array.from({
        length: 10
    }, (_, digit)=>{
        let count = 0;
        for(let index = 0; index < window.length; index += 1){
            if (window[index] === digit) count += 1;
        }
        let gap = window.length;
        for(let index = window.length - 1; index >= 0; index -= 1){
            if (window[index] === digit) {
                gap = window.length - 1 - index;
                break;
            }
        }
        const percentage = total > 0 ? count / total * 100 : 0;
        const score = 10 - percentage + gap * 0.5;
        return {
            digit,
            count,
            percentage,
            gap,
            score
        };
    }).sort((a, b)=>b.score - a.score || a.digit - b.digit);
    const best = ranked[0] ?? null;
    if (!best || total === 0) {
        return {
            ranked,
            best: null,
            confidence: 0,
            risk: 'WAIT - NO SETUP',
            waiting: true
        };
    }
    const confidence = Math.min(95, 50 + best.gap * 1.2 + (10 - best.percentage) * 2);
    const stabilityBase = window.length >= 10 ? Math.floor(window.length / 2) : window.length;
    const firstHalf = window.slice(0, stabilityBase);
    const secondHalf = window.slice(stabilityBase);
    const firstCount = firstHalf.filter((digit)=>digit === best.digit).length;
    const secondCount = secondHalf.filter((digit)=>digit === best.digit).length;
    const stabilityBonus = Math.max(0, 8 - Math.abs(firstCount - secondCount) * 2);
    const roundedConfidence = Math.round(Math.min(95, confidence + stabilityBonus));
    const noDigitIsOverdue = ranked.every((item)=>item.gap < 15);
    let risk;
    if (noDigitIsOverdue) {
        risk = 'WAIT - NO SETUP';
    } else if (best.gap > 30 && best.percentage < 7) {
        risk = 'LOW RISK';
    } else if (best.gap >= 15 && best.gap <= 30) {
        risk = 'MEDIUM RISK';
    } else {
        risk = 'MEDIUM RISK';
    }
    return {
        ranked,
        best,
        confidence: roundedConfidence,
        risk,
        waiting: risk === 'WAIT - NO SETUP'
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=_1fili6jedsynh._.js.map