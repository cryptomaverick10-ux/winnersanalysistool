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
    const [countdownSeconds, setCountdownSeconds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [themeMode, setThemeMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dark');
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('English');
    const scannerSocketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
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
            if (countdownSeconds <= 0) return;
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
                    const digit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLastDigit"])(price);
                    setConnected(true);
                    setFeedError(null);
                    if (typeof tick.epoch === 'number' && Number.isFinite(tick.epoch)) {
                        setDerivTimeOffset(tick.epoch * 1000 - Date.now());
                    }
                    setLivePrice(price);
                    setPrices({
                        "MatchAiApp.useEffect.handleTick": (current)=>[
                                ...current,
                                price
                            ].slice(-MAX_DIGITS)
                    }["MatchAiApp.useEffect.handleTick"]);
                    if (digit !== null) {
                        setDigits({
                            "MatchAiApp.useEffect.handleTick": (current)=>[
                                    ...current,
                                    digit
                                ].slice(-MAX_DIGITS)
                        }["MatchAiApp.useEffect.handleTick"]);
                    }
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
                        setPrices(historyPrices.slice(-MAX_DIGITS));
                        setDigits(historyPrices.map({
                            "MatchAiApp.useEffect.subscribeToTicks": (price)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLastDigit"])(price)
                        }["MatchAiApp.useEffect.subscribeToTicks"]).filter({
                            "MatchAiApp.useEffect.subscribeToTicks": (digit)=>digit !== null
                        }["MatchAiApp.useEffect.subscribeToTicks"]).slice(-MAX_DIGITS));
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
        }
    }["MatchAiApp.useEffect"], [
        strategy
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>{
            setDigits([]);
            setPrices([]);
            setLivePrice(null);
            setManualSignal(null);
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
            const rises = prices.slice(-100).filter({
                "MatchAiApp.useMemo[analysis]": (price, index, values)=>index > 0 && price > values[index - 1]
            }["MatchAiApp.useMemo[analysis]"]).length;
            const evenProbability = window1.length ? even / window1.length * 100 : 0;
            const overProbability = window1.length ? over / window1.length * 100 : 0;
            const riseProbability = prices.length > 1 ? rises / Math.min(99, prices.slice(-100).length - 1) * 100 : 0;
            const matchesProbability = matchResult.best?.percentage ?? 0;
            const differsProbability = window1.length ? 100 - window1.filter({
                "MatchAiApp.useMemo[analysis]": (digit)=>digit === TARGET_DIGIT
            }["MatchAiApp.useMemo[analysis]"]).length / window1.length * 100 : 0;
            return {
                evenProbability,
                overProbability,
                riseProbability,
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
        if (!connected || digits.length < 25 || generatingSignal || countdownSeconds > 0) return;
        setGeneratingSignal(true);
        window.setTimeout(()=>{
            let label = 'WAIT';
            let confidence = 0;
            const durationWindow = digits.slice(-Math.max(25, durationTicks * 25));
            const durationEven = durationWindow.filter((digit)=>digit % 2 === 0).length;
            const durationEvenProbability = durationWindow.length ? durationEven / durationWindow.length * 100 : 0;
            if (strategy === 'Matches') {
                if (matchResult.best && !matchResult.waiting) {
                    label = `MATCH ${matchResult.best.digit}`;
                    confidence = matchResult.confidence;
                }
            } else if (strategy === 'Differs') {
                label = `DIFFER FROM ${TARGET_DIGIT}`;
                confidence = Math.round(analysis.differsProbability);
            } else if (strategy === 'Over/Under') {
                const over = durationWindow.filter((digit)=>digit >= threshold).length / Math.max(durationWindow.length, 1) * 100;
                label = over >= 50 ? `OVER ${threshold - 1}` : `UNDER ${threshold}`;
                confidence = Math.round(Math.max(over, 100 - over));
            } else if (strategy === 'Even/Odd') {
                label = durationEvenProbability >= 50 ? 'EVEN' : 'ODD';
                confidence = Math.round(Math.max(durationEvenProbability, 100 - durationEvenProbability));
            } else if (strategy === 'Rise/Fall') {
                label = analysis.riseProbability >= 50 ? 'RISE' : 'FALL';
                confidence = Math.round(Math.max(analysis.riseProbability, 100 - analysis.riseProbability));
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
            setCountdownSeconds(10);
        }, 450);
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
                                    lineNumber: 510,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-lg font-black tracking-tight text-white sm:text-xl",
                                    children: "Live Market Analysis"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 511,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 509,
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
                                                lineNumber: 516,
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
                                                    lineNumber: 527,
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
                                                    lineNumber: 528,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 526,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 514,
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
                                            lineNumber: 538,
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
                                            lineNumber: 546,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 537,
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
                                            lineNumber: 561,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            className: "jsx-fe9665299295552e",
                                            children: "French"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 562,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            className: "jsx-fe9665299295552e",
                                            children: "Spanish"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 563,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            className: "jsx-fe9665299295552e",
                                            children: "Portuguese"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 564,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 555,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "market",
                                    className: "jsx-fe9665299295552e" + " " + "text-xs font-bold text-slate-400",
                                    children: "Market"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 566,
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
                                            lineNumber: 573,
                                            columnNumber: 47
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 567,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 513,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 508,
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
                                            lineNumber: 581,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black uppercase tracking-[0.12em] text-white",
                                            children: "AI Tick Sequence & Pattern Recency Detector"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 582,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 580,
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
                                    lineNumber: 584,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 579,
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
                                            lineNumber: 592,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-lg font-black tracking-[0.25em] text-white",
                                            children: connected && tickSequenceAnalysis.sequence.length > 0 ? tickSequenceAnalysis.sequence.join('  >  ') : 'WAIT'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 593,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 591,
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
                                            lineNumber: 598,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-sm font-black text-white",
                                            children: connected && digits.length >= 25 ? `${tickSequenceAnalysis.pattern.join(' -> ')} Recency` : 'Collecting Sequence'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 599,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 597,
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
                                            lineNumber: 604,
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
                                            lineNumber: 605,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 603,
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
                                            lineNumber: 612,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-sm font-black text-white",
                                            children: connected && digits.length >= 25 ? `Overdue ${tickSequenceAnalysis.overdueDigit} / Hot ${tickSequenceAnalysis.overrepresentedDigit.digit}` : 'STANDBY'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 613,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 611,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 590,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 578,
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
                                            lineNumber: 625,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: connected ? {
                                                backgroundColor: accentColor
                                            } : undefined,
                                            className: "jsx-fe9665299295552e" + " " + `relative inline-flex h-2.5 w-2.5 rounded-full ${connected ? '' : 'bg-slate-500'}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 626,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 624,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-fe9665299295552e" + " " + "text-xs font-black uppercase tracking-[0.18em] text-white",
                                    children: "LIVE SPOT TICKER"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 628,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 623,
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
                                            lineNumber: 632,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 truncate text-sm font-black text-white",
                                            children: marketName
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 633,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 631,
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
                                            lineNumber: 636,
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
                                                    lineNumber: 641,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 639,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 635,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 630,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 622,
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
                                            lineNumber: 659,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                            children: isScanning ? 'Scanning volatility markets...' : bestMarket ? 'Best volatility market found' : 'Scan all volatility markets'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 660,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 658,
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
                                    lineNumber: 664,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 657,
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
                                            lineNumber: 682,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                            children: bestMarket.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 683,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 681,
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
                                            lineNumber: 686,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[10px] font-bold text-slate-400",
                                            children: "Scanner Score - Click to use"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 687,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 685,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 675,
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
                                            lineNumber: 704,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                            children: result.score ? `${result.score}%` : '--'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 705,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, result.symbol, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 694,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 692,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 656,
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
                                    lineNumber: 713,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-1 font-mono text-xl font-black tabular-nums text-white sm:text-2xl",
                                    children: livePrice === null ? '--' : livePrice.toFixed(5)
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 714,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 712,
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
                                    lineNumber: 719,
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
                                    lineNumber: 720,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 718,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 711,
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
                                    lineNumber: 740,
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
                                    lineNumber: 741,
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
                                    lineNumber: 742,
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
                                    lineNumber: 743,
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
                                    lineNumber: 745,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 734,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "jsx-fe9665299295552e",
                            children: connected ? 'Connected' : 'Not connected / Offline'
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 748,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 724,
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
                            lineNumber: 753,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-fe9665299295552e" + " " + "text-center text-xs text-slate-400",
                            children: "Sign in to connect this dashboard to your Deriv account."
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 762,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 752,
                    columnNumber: 11
                }, this),
                feedError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    role: "alert",
                    className: "jsx-fe9665299295552e" + " " + "mt-2 text-center text-xs font-semibold text-rose-400",
                    children: feedError
                }, void 0, false, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 768,
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
                                    lineNumber: 776,
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
                                    lineNumber: 777,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 775,
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
                                    lineNumber: 787,
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
                                    lineNumber: 788,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 786,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 774,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "jsx-fe9665299295552e" + " " + "text-sm font-black text-white",
                            children: "Auto AI Patterns"
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 800,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4",
                            children: [
                                [
                                    'Even / Odd',
                                    connected && digits.length >= 25 ? tickSequenceAnalysis.nextEven ? 'EVEN' : 'ODD' : 'WAIT',
                                    connected && digits.length >= 25 ? Math.round(Math.max(tickSequenceAnalysis.evenProbability, tickSequenceAnalysis.oddProbability)) : 0,
                                    'Even/Odd'
                                ],
                                [
                                    'Over / Under',
                                    connected && digits.length >= 25 ? analysis.overProbability >= 50 ? 'OVER' : 'UNDER' : 'WAIT',
                                    connected && digits.length >= 25 ? Math.round(Math.max(analysis.overProbability, 100 - analysis.overProbability)) : 0,
                                    'Over/Under'
                                ],
                                [
                                    'Rise / Fall',
                                    connected && digits.length >= 25 ? analysis.riseProbability >= 50 ? 'RISE' : 'FALL' : 'WAIT',
                                    connected && digits.length >= 25 ? Math.round(Math.max(analysis.riseProbability, 100 - analysis.riseProbability)) : 0,
                                    'Rise/Fall'
                                ],
                                [
                                    'Matches',
                                    connected && digits.length >= 25 && matchResult.best && !matchResult.waiting ? `DIGIT ${matchResult.best.digit}` : 'WAIT',
                                    connected && digits.length >= 25 ? Math.round(matchResult.confidence) : 0,
                                    'Matches'
                                ]
                            ].map(([title, signal, probability, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setStrategy(value),
                                    style: strategy === value ? {
                                        borderColor: accentColor,
                                        backgroundColor: `${accentColor}18`,
                                        boxShadow: `0 0 0 2px ${accentColor}24`
                                    } : undefined,
                                    className: "jsx-fe9665299295552e" + " " + `rounded-xl border px-3 py-3 text-left transition ${strategy === value ? 'ring-2' : 'border-white/[0.08] bg-[#111f33]'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-fe9665299295552e" + " " + "block text-[10px] font-bold uppercase tracking-wide text-slate-400",
                                            children: title
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 817,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 block text-sm font-black text-white",
                                            children: [
                                                String(signal),
                                                " - ",
                                                String(probability),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 818,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, title, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 808,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 801,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 799,
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
                            lineNumber: 825,
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
                                    lineNumber: 828,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 826,
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
                                    lineNumber: 844,
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
                                            lineNumber: 850,
                                            columnNumber: 84
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 845,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 843,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 824,
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
                                    lineNumber: 858,
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
                                    lineNumber: 859,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 857,
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
                                            lineNumber: 878,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 block text-[10px] font-bold",
                                            children: ticks === 1 ? '1 Tick' : `${ticks} Ticks`
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 879,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, ticks, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 865,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 863,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 856,
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
                                    lineNumber: 887,
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
                                    lineNumber: 888,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 886,
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
                                    lineNumber: 892,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 890,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 885,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        lineNumber: 904,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-fe9665299295552e" + " " + "mt-1 text-xs font-bold text-slate-300",
                                        children: connected ? `${strategy} analysis for ${durationTicks} ${durationTicks === 1 ? 'tick' : 'ticks'}` : 'Waiting for live market ticks...'
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 905,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 903,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: generateSignal,
                                disabled: !connected || digits.length < 25 || generatingSignal || countdownSeconds > 0,
                                style: !connected || digits.length < 25 || generatingSignal || countdownSeconds > 0 ? undefined : {
                                    backgroundColor: accentColor
                                },
                                className: "jsx-fe9665299295552e" + " " + "h-12 w-full shrink-0 rounded-xl text-sm font-black text-white shadow-sm transition disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-52",
                                children: generatingSignal ? 'Generating Signal...' : countdownSeconds > 0 ? `Cooldown - ${countdownSeconds}s` : 'Generate Signal'
                            }, void 0, false, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 909,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/match-ai-app.tsx",
                        lineNumber: 902,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 901,
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
                            lineNumber: 922,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-fe9665299295552e" + " " + "mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400",
                            children: "Recommended Signal"
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 923,
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
                            lineNumber: 924,
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
                            lineNumber: 927,
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
                                children: countdownSeconds > 0 ? `Next Signal: ${countdownSeconds}s` : 'Analysis Ready'
                            }, void 0, false, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 932,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 931,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 921,
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
                                                    lineNumber: 943,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                                    children: "Last 100 Digits"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 944,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 942,
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
                                            lineNumber: 946,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 941,
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
                                                    lineNumber: 951,
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
                                                    lineNumber: 952,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-fe9665299295552e" + " " + "mt-2 text-xs font-black text-slate-300",
                                                    children: item.digit
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 960,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, item.digit, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 950,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 948,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 940,
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
                                            lineNumber: 968,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: connected ? {
                                                backgroundColor: accentColor
                                            } : undefined,
                                            className: "jsx-fe9665299295552e" + " " + `h-2 w-2 rounded-full ${connected ? 'animate-pulse' : 'bg-slate-500'}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 969,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 967,
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
                                                lineNumber: 976,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 972,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-3 text-sm font-black text-white",
                                            children: connected ? 'ENGINE ACTIVE' : 'ENGINE STANDBY'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 983,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-xs text-slate-400",
                                            children: digits.length >= 25 ? 'Pattern analysis ready' : 'Collecting market data'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 984,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 971,
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
                                                    lineNumber: 988,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                                    children: digits.length
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 989,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 987,
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
                                                    lineNumber: 992,
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
                                                    lineNumber: 993,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 991,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 986,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 966,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 939,
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
                                            lineNumber: 1002,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black uppercase tracking-[0.12em] text-white",
                                            children: "Neural Analysis Engine"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1003,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1001,
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
                                    lineNumber: 1005,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1000,
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
                                            lineNumber: 1013,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 truncate text-sm font-black text-white",
                                            children: marketName
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1014,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1012,
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
                                            lineNumber: 1017,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-sm font-black text-white",
                                            children: strategy
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1018,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1016,
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
                                            lineNumber: 1021,
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
                                            lineNumber: 1022,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1020,
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
                                            lineNumber: 1025,
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
                                            lineNumber: 1026,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1024,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1011,
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
                                        lineNumber: 1034,
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
                                                        lineNumber: 1042,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-fe9665299295552e" + " " + "text-[9px] font-black uppercase tracking-[0.14em] text-slate-400",
                                                        children: "Predicted Outcome"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/match-ai-app.tsx",
                                                        lineNumber: 1045,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 1041,
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
                                                lineNumber: 1047,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 1040,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 1033,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1032,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 999,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/match-ai-app.tsx",
            lineNumber: 490,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/match-ai-app.tsx",
        lineNumber: 486,
        columnNumber: 5
    }, this);
}
_s(MatchAiApp, "b1q7hTI2E6XFCoJOYEctgVDQHBU=", false, function() {
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
    ()=>parseLastDigit
]);
function parseLastDigit(price) {
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