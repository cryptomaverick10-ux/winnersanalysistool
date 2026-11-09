(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/match-ai-app.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MatchAiApp",
    ()=>MatchAiApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/match-ai.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$config$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/config/urls.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$custom$2f$deriv$2d$ws$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/custom/deriv-ws-provider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
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
const EMPTY_MATCH_TRACKER = {
    active: false,
    attempts: [],
    pendingDigit: null,
    currentStreak: 0,
    bestStreak: 0
};
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
    const [isGeneratingSignal, setIsGeneratingSignal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [signalAnalysisProgress, setSignalAnalysisProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        completed: 0,
        total: 0,
        candidateDigit: null
    });
    const [strategyCountdown, setStrategyCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [strategyAlert, setStrategyAlert] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastStrategyOutcome, setLastStrategyOutcome] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [matchTracker, setMatchTracker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(EMPTY_MATCH_TRACKER);
    const [isScanning, setIsScanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scanResults, setScanResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [scanRunNumber, setScanRunNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [scannerError, setScannerError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [themeMode, setThemeMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dark');
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('English');
    const scannerSocketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const signalAnalysisIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const matchTrackerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(EMPTY_MATCH_TRACKER);
    const strategyAlertRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const strategyCandidateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const triggeredStrategyKeyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const historyPricesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const liveDigitsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const tickPipSizeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { ws, isConnected: socketConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$custom$2f$deriv$2d$ws$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDerivWSContext"])();
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
                    const tracker = matchTrackerRef.current;
                    const observedDigit = nextDigits.at(-1);
                    const currentAlert = strategyAlertRef.current;
                    if (currentAlert && observedDigit !== undefined) {
                        const matchedTicks = currentAlert.matchedTicks + Number(observedDigit === currentAlert.digit);
                        const remainingTicks = currentAlert.remainingTicks - 1;
                        if (remainingTicks <= 0) {
                            strategyAlertRef.current = null;
                            setStrategyAlert(null);
                            setLastStrategyOutcome({
                                name: currentAlert.name,
                                digit: currentAlert.digit,
                                matchedTicks,
                                totalTicks: currentAlert.validationTicks
                            });
                        } else {
                            const nextAlert = {
                                ...currentAlert,
                                matchedTicks,
                                remainingTicks
                            };
                            strategyAlertRef.current = nextAlert;
                            setStrategyAlert(nextAlert);
                        }
                    }
                    if (tracker.active && tracker.pendingDigit !== null && observedDigit !== undefined) {
                        const isWin = tracker.pendingDigit === observedDigit;
                        const attempts = [
                            ...tracker.attempts,
                            {
                                attempt: tracker.attempts.length + 1,
                                predictedDigit: tracker.pendingDigit,
                                actualDigit: observedDigit,
                                result: isWin ? 'WIN' : 'MISS',
                                epoch: typeof tick.epoch === 'number' && Number.isFinite(tick.epoch) ? tick.epoch : null
                            }
                        ];
                        const currentStreak = isWin ? tracker.currentStreak + 1 : 0;
                        const isComplete = attempts.length >= 20;
                        const nextCandidate = isComplete ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeMatchDigits"])(nextDigits, 100).best?.digit ?? null;
                        const nextTracker = {
                            active: !isComplete,
                            attempts,
                            pendingDigit: nextCandidate,
                            currentStreak,
                            bestStreak: Math.max(tracker.bestStreak, currentStreak)
                        };
                        matchTrackerRef.current = nextTracker;
                        setMatchTracker(nextTracker);
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
                        if (typeof history.pip_size === 'number' && Number.isInteger(history.pip_size)) {
                            tickPipSizeRef.current = history.pip_size;
                        }
                        historyPricesRef.current = historyPrices.slice(-MAX_DIGITS);
                        setPrices(historyPrices.slice(-MAX_DIGITS));
                        const pipSize = tickPipSizeRef.current;
                        const historyDigits = pipSize === null ? [] : historyPrices.map({
                            "MatchAiApp.useEffect.subscribeToTicks": (price)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLastDigit"])(price, pipSize)
                        }["MatchAiApp.useEffect.subscribeToTicks"]).filter({
                            "MatchAiApp.useEffect.subscribeToTicks": (digit)=>digit !== null
                        }["MatchAiApp.useEffect.subscribeToTicks"]).slice(-MAX_DIGITS);
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
            setIsGeneratingSignal(false);
            signalAnalysisIdRef.current += 1;
        }
    }["MatchAiApp.useEffect"], [
        strategy
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>{
            signalAnalysisIdRef.current += 1;
            setIsGeneratingSignal(false);
            matchTrackerRef.current = EMPTY_MATCH_TRACKER;
            setMatchTracker(EMPTY_MATCH_TRACKER);
            strategyAlertRef.current = null;
            strategyCandidateRef.current = null;
            triggeredStrategyKeyRef.current = null;
            setStrategyAlert(null);
            setStrategyCountdown(null);
            setLastStrategyOutcome(null);
            liveDigitsRef.current = [];
            setDigits([]);
            setPrices([]);
            setLivePrice(null);
        }
    }["MatchAiApp.useEffect"], [
        symbol
    ]);
    const matchResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchAiApp.useMemo[matchResult]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeMatchDigits"])(digits, 100)
    }["MatchAiApp.useMemo[matchResult]"], [
        digits
    ]);
    const liveMatchValidation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchAiApp.useMemo[liveMatchValidation]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluateLiveMatchValidation"])(digits)
    }["MatchAiApp.useMemo[liveMatchValidation]"], [
        digits
    ]);
    const validationEvidence = liveMatchValidation.sampleCount < 100 ? 'Need at least 100 test outcomes' : liveMatchValidation.confidenceInterval && liveMatchValidation.confidenceInterval.lower > liveMatchValidation.randomBaseline ? 'Potential edge above baseline' : 'No clear edge above baseline';
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
    const liveStrategyAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchAiApp.useMemo[liveStrategyAnalysis]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeLiveDigitStrategies"])(digits, prices, tickPipSizeRef.current)
    }["MatchAiApp.useMemo[liveStrategyAnalysis]"], [
        digits,
        prices
    ]);
    const activeStrategyCandidate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchAiApp.useMemo[activeStrategyCandidate]": ()=>{
            if (!connected) return null;
            if (liveStrategyAnalysis.exhaustion.ready && liveStrategyAnalysis.exhaustion.digit !== null) {
                return {
                    key: `exhaustion-${liveStrategyAnalysis.exhaustion.digit}`,
                    name: 'Exhaustion Reversal',
                    digit: liveStrategyAnalysis.exhaustion.digit,
                    validationTicks: 1
                };
            }
            if (liveStrategyAnalysis.momentum.ready && liveStrategyAnalysis.momentum.digit !== null) {
                return {
                    key: `momentum-${liveStrategyAnalysis.momentum.digit}`,
                    name: 'Micro-Cluster Momentum',
                    digit: liveStrategyAnalysis.momentum.digit,
                    validationTicks: 2
                };
            }
            if (liveStrategyAnalysis.divergence.ready && liveStrategyAnalysis.divergence.digit !== null) {
                return {
                    key: `divergence-${liveStrategyAnalysis.divergence.digit}`,
                    name: 'Dominant Gap-Divergence',
                    digit: liveStrategyAnalysis.divergence.digit,
                    validationTicks: 1
                };
            }
            return null;
        }
    }["MatchAiApp.useMemo[activeStrategyCandidate]"], [
        connected,
        liveStrategyAnalysis.exhaustion.ready,
        liveStrategyAnalysis.exhaustion.digit,
        liveStrategyAnalysis.momentum.ready,
        liveStrategyAnalysis.momentum.digit,
        liveStrategyAnalysis.divergence.ready,
        liveStrategyAnalysis.divergence.digit
    ]);
    strategyCandidateRef.current = activeStrategyCandidate;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>{
            if (!connected || !activeStrategyCandidate) {
                setStrategyCountdown(null);
                if (!strategyAlertRef.current) triggeredStrategyKeyRef.current = null;
                return;
            }
            if (strategyAlertRef.current || triggeredStrategyKeyRef.current === activeStrategyCandidate.key) {
                setStrategyCountdown(null);
                return;
            }
            const candidate = activeStrategyCandidate;
            const countdown = {
                candidate,
                endsAt: Date.now() + 10_000
            };
            setStrategyCountdown(countdown);
            const timeout = window.setTimeout({
                "MatchAiApp.useEffect.timeout": ()=>{
                    if (strategyCandidateRef.current?.key !== candidate.key) return;
                    const nextAlert = {
                        ...candidate,
                        remainingTicks: candidate.validationTicks,
                        matchedTicks: 0
                    };
                    triggeredStrategyKeyRef.current = candidate.key;
                    strategyAlertRef.current = nextAlert;
                    setStrategyAlert(nextAlert);
                    setStrategyCountdown(null);
                    setLastStrategyOutcome(null);
                }
            }["MatchAiApp.useEffect.timeout"], 10_000);
            return ({
                "MatchAiApp.useEffect": ()=>window.clearTimeout(timeout)
            })["MatchAiApp.useEffect"];
        }
    }["MatchAiApp.useEffect"], [
        activeStrategyCandidate,
        connected
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
    const distributionSampleCount = Math.min(digits.length, 100);
    const recentTicks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchAiApp.useMemo[recentTicks]": ()=>{
            const pipSize = tickPipSizeRef.current;
            if (pipSize === null) return [];
            return prices.slice(-10).reverse().map({
                "MatchAiApp.useMemo[recentTicks]": (price, index)=>({
                        tick: index + 1,
                        quote: price.toFixed(pipSize),
                        digit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLastDigit"])(price, pipSize)
                    })
            }["MatchAiApp.useMemo[recentTicks]"]);
        }
    }["MatchAiApp.useMemo[recentTicks]"], [
        prices
    ]);
    const tickSequenceAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchAiApp.useMemo[tickSequenceAnalysis]": ()=>{
            const window1 = digits.slice(-100);
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
            const nextEven = evenProbability >= oddProbability;
            return {
                patternSamples: followTotal,
                evenProbability,
                oddProbability,
                nextEven
            };
        }
    }["MatchAiApp.useMemo[tickSequenceAnalysis]"], [
        digits
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
    const calculateScanResult = (name, marketSymbol, prices, price, pipSize)=>{
        const recentPrices = prices.slice(-100);
        const changes = recentPrices.slice(1).map((current, index)=>Math.abs(current - recentPrices[index]));
        const averagePrice = recentPrices.reduce((sum, current)=>sum + current, 0) / Math.max(recentPrices.length, 1);
        const averageChange = changes.reduce((sum, current)=>sum + current, 0) / Math.max(changes.length, 1);
        const movement = averagePrice > 0 ? averageChange / averagePrice * 10000 : 0;
        const counts = Array.from({
            length: 10
        }, ()=>0);
        recentPrices.forEach((current)=>{
            const digit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLastDigit"])(current, pipSize);
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
        const score = total < 10 ? 0 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMarketActivityIndex"])(entropyScore, uniqueDigits / 10, movement / (movement + 1));
        return {
            name,
            symbol: marketSymbol,
            score,
            movement,
            uniqueDigits,
            price,
            sampleCount: total
        };
    };
    const stopScanner = ()=>{
        const scanner = scannerSocketRef.current;
        scannerSocketRef.current = null;
        if (scanner && scanner.readyState < WebSocket.CLOSING) scanner.close();
        setIsScanning(false);
    };
    const startScanner = ()=>{
        stopScanner();
        setScannerError(null);
        setIsScanning(true);
        setScanRunNumber((run)=>run + 1);
        setScanResults(MARKETS.map(([name, marketSymbol])=>({
                name,
                symbol: marketSymbol,
                score: 0,
                movement: 0,
                uniqueDigits: 0,
                price: null,
                sampleCount: 0
            })));
        let scanner;
        try {
            scanner = new WebSocket((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$config$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPublicWsUrl"])());
        } catch (error) {
            setIsScanning(false);
            setScannerError(error instanceof Error ? error.message : 'Unable to open the Deriv scanner connection.');
            return;
        }
        scannerSocketRef.current = scanner;
        const scanPrices = new Map();
        const scanPipSizes = new Map();
        const requestMarkets = new Map();
        scanner.onopen = ()=>{
            if (scannerSocketRef.current !== scanner) return;
            try {
                MARKETS.forEach(([, marketSymbol], index)=>{
                    const reqId = index + 1;
                    requestMarkets.set(reqId, marketSymbol);
                    scanPrices.set(marketSymbol, []);
                    scanner.send(JSON.stringify({
                        ticks_history: marketSymbol,
                        count: 100,
                        end: 'latest',
                        style: 'ticks',
                        req_id: reqId
                    }));
                    scanner.send(JSON.stringify({
                        ticks: marketSymbol,
                        subscribe: 1
                    }));
                });
            } catch (error) {
                setScannerError(error instanceof Error ? error.message : 'Unable to request volatility market data.');
                stopScanner();
            }
        };
        scanner.onmessage = (event)=>{
            if (scannerSocketRef.current !== scanner) return;
            let message;
            try {
                message = JSON.parse(event.data);
            } catch  {
                setScannerError('Received an unreadable response from the Deriv market feed.');
                return;
            }
            if (message.error) {
                const failedMarket = typeof message.req_id === 'number' ? requestMarkets.get(message.req_id) : message.echo_req?.ticks_history;
                setScannerError(`${failedMarket ? `${failedMarket}: ` : ''}${message.error.message ?? message.error.code ?? 'Deriv rejected a scanner request.'}`);
                return;
            }
            const historyMarketSymbol = message.history?.prices ? typeof message.req_id === 'number' ? requestMarkets.get(message.req_id) : message.echo_req?.ticks_history : undefined;
            if (message.history?.prices && historyMarketSymbol) {
                const marketSymbol = historyMarketSymbol;
                const market = MARKETS.find(([, value])=>value === marketSymbol);
                const historyPrices = message.history.prices.map(Number).filter((price)=>Number.isFinite(price));
                if (typeof message.pip_size === 'number' && Number.isInteger(message.pip_size)) {
                    scanPipSizes.set(marketSymbol, message.pip_size);
                }
                scanPrices.set(marketSymbol, historyPrices.slice(-100));
                if (market) {
                    const result = calculateScanResult(market[0], marketSymbol, historyPrices, historyPrices.at(-1) ?? null, scanPipSizes.get(marketSymbol));
                    setScanResults((current)=>{
                        return current.map((item)=>item.symbol === marketSymbol ? result : item);
                    });
                }
            }
            if (message.tick?.symbol) {
                const marketSymbol = message.tick.symbol;
                const market = MARKETS.find(([, value])=>value === marketSymbol);
                const price = Number(message.tick.quote);
                if (!market || !Number.isFinite(price)) return;
                if (typeof message.tick.pip_size === 'number' && Number.isInteger(message.tick.pip_size)) {
                    scanPipSizes.set(marketSymbol, message.tick.pip_size);
                }
                const nextPrices = [
                    ...scanPrices.get(marketSymbol) ?? [],
                    price
                ].slice(-100);
                scanPrices.set(marketSymbol, nextPrices);
                const result = calculateScanResult(market[0], marketSymbol, nextPrices, price, scanPipSizes.get(marketSymbol));
                setScanResults((current)=>{
                    return current.map((item)=>item.symbol === marketSymbol ? result : item);
                });
            }
        };
        scanner.onerror = ()=>{
            if (scannerSocketRef.current !== scanner) return;
            setScannerError('The Deriv scanner connection encountered a network error. Check the connection and try again.');
            scanner.close();
        };
        scanner.onclose = ()=>{
            if (scannerSocketRef.current === scanner) {
                scannerSocketRef.current = null;
                setIsScanning(false);
                setScannerError((current)=>current ?? 'The Deriv scanner connection closed. Start a new scan to reconnect.');
            }
        };
    };
    const selectScannedMarket = (market)=>{
        setSymbol(market.symbol);
        stopScanner();
    };
    const startMatchTracker = ()=>{
        const history = liveDigitsRef.current.slice(-100);
        if (!connected || history.length < 25) return;
        const pendingDigit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeMatchDigits"])(history, 100).best?.digit ?? null;
        if (pendingDigit === null) return;
        const nextTracker = {
            ...EMPTY_MATCH_TRACKER,
            active: true,
            pendingDigit
        };
        matchTrackerRef.current = nextTracker;
        setMatchTracker(nextTracker);
    };
    const stopMatchTracker = ()=>{
        const nextTracker = {
            ...matchTrackerRef.current,
            active: false,
            pendingDigit: null
        };
        matchTrackerRef.current = nextTracker;
        setMatchTracker(nextTracker);
    };
    const generateSignal = async ()=>{
        if (!connected || digits.length < 25 || isGeneratingSignal) return;
        const latestDigits = liveDigitsRef.current.slice(-100);
        if (latestDigits.length < 25) return;
        const analysisId = ++signalAnalysisIdRef.current;
        const firstWindowSize = 25;
        const totalWindows = latestDigits.length - firstWindowSize + 1;
        setSignalAnalysisProgress({
            completed: 0,
            total: totalWindows,
            candidateDigit: null
        });
        setIsGeneratingSignal(true);
        for(let sampleSize = firstWindowSize; sampleSize <= latestDigits.length; sampleSize += 1){
            if (analysisId !== signalAnalysisIdRef.current) return;
            const partialResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeMatchDigits"])(latestDigits.slice(0, sampleSize), 100);
            setSignalAnalysisProgress({
                completed: sampleSize - firstWindowSize + 1,
                total: totalWindows,
                candidateDigit: partialResult.best?.digit ?? null
            });
            await new Promise((resolve)=>window.setTimeout(resolve, 25));
        }
        if (analysisId !== signalAnalysisIdRef.current) return;
        let label = 'WAIT';
        let observedRate = 0;
        let sampleCount = latestDigits.length;
        const durationWindow = latestDigits.slice(-Math.max(25, durationTicks * 25));
        const scanResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeMatchDigits"])(latestDigits, 100);
        if (strategy === 'Matches') {
            if (!scanResult.best) {
                setIsGeneratingSignal(false);
                return;
            }
            label = `MATCH ${scanResult.best.digit}`;
            observedRate = scanResult.best.count / latestDigits.length * 100;
        } else if (strategy === 'Differs') {
            const target = scanResult.best?.digit ?? TARGET_DIGIT;
            const matchesCount = latestDigits.filter((digit)=>digit === target).length;
            label = `DIFFER FROM ${target}`;
            observedRate = (latestDigits.length - matchesCount) / latestDigits.length * 100;
        } else if (strategy === 'Over/Under') {
            sampleCount = durationWindow.length;
            const overCount = durationWindow.filter((digit)=>digit >= threshold).length;
            const overRate = overCount / durationWindow.length * 100;
            observedRate = Math.max(overRate, 100 - overRate);
            label = overRate >= 50 ? `OVER ${threshold - 1}` : `UNDER ${threshold}`;
        } else if (strategy === 'Even/Odd') {
            sampleCount = durationWindow.length;
            const evenCount = durationWindow.filter((digit)=>digit % 2 === 0).length;
            const evenRate = evenCount / durationWindow.length * 100;
            label = evenRate >= 50 ? 'EVEN' : 'ODD';
            observedRate = Math.max(evenRate, 100 - evenRate);
        } else if (strategy === 'Rise/Fall') {
            const scanPrices = historyPricesRef.current.slice(-100);
            const changes = scanPrices.slice(1).map((price, index)=>price - scanPrices[index]);
            const risingChanges = changes.filter((change)=>change > 0).length;
            const fallingChanges = changes.filter((change)=>change < 0).length;
            const directionalChanges = risingChanges + fallingChanges;
            sampleCount = directionalChanges;
            const riseRate = directionalChanges ? risingChanges / directionalChanges * 100 : 0;
            label = riseRate >= 50 ? 'RISE' : 'FALL';
            observedRate = directionalChanges ? Math.max(riseRate, 100 - riseRate) : 0;
        } else if (strategy === 'High/Low' || strategy === 'Barrier') {
            sampleCount = durationWindow.length;
            const highCount = durationWindow.filter((digit)=>digit >= threshold).length;
            const highRate = highCount / durationWindow.length * 100;
            label = highRate >= 50 ? `HIGH - ABOVE ${threshold - 1}` : `LOW - BELOW ${threshold}`;
            observedRate = Math.max(highRate, 100 - highRate);
        } else if (strategy === 'Asian') {
            sampleCount = durationWindow.length;
            const average = durationWindow.reduce((sum, digit)=>sum + digit, 0) / durationWindow.length;
            const highCount = durationWindow.filter((digit)=>digit >= 5).length;
            const highRate = highCount / durationWindow.length * 100;
            label = average >= 4.5 ? 'ASIAN HIGH' : 'ASIAN LOW';
            observedRate = average >= 4.5 ? highRate : 100 - highRate;
        } else {
            sampleCount = 0;
            label = 'WAIT - LIVE BARRIER DATA REQUIRED';
        }
        setManualSignal({
            label,
            observedRate: Math.round(observedRate),
            targetDigit: strategy === 'Matches' || strategy === 'Differs' ? scanResult.best?.digit ?? TARGET_DIGIT : strategy === 'Touch/No Touch' ? null : latestDigits.at(-1) ?? null,
            sampleCount
        });
        setIsGeneratingSignal(false);
    };
    const refreshSignalOutput = ()=>{
        if (isGeneratingSignal) return;
        setManualSignal(null);
    };
    const signalScore = manualSignal ? Math.min(99, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toLivePatternScore"])(manualSignal.observedRate)) : 0;
    const signalStrength = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSignalStrength"])(signalScore);
    const signalTier = !manualSignal ? {
        label: 'Awaiting Signal',
        cardClassName: 'border-slate-700 bg-[#0b1426]',
        badgeClassName: 'border-slate-700/60 bg-slate-800/40 text-slate-400',
        heroClassName: 'border-slate-800/60 bg-[#121b2d]',
        textClassName: 'text-white'
    } : signalStrength === 'STRONG SIGNAL' ? {
        label: signalStrength,
        cardClassName: 'border-emerald-500/40 bg-emerald-950/5',
        badgeClassName: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.15)]',
        heroClassName: 'border-emerald-500/30 bg-[#0d2224]',
        textClassName: 'scale-105 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.65)]'
    } : {
        label: signalStrength,
        cardClassName: 'border-amber-500/30 bg-amber-950/5',
        badgeClassName: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
        heroClassName: 'border-amber-500/30 bg-[#191c25]',
        textClassName: 'text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]'
    };
    const readyMarketCount = scanResults.filter((result)=>result.sampleCount >= 10).length;
    const rankedScanResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchAiApp.useMemo[rankedScanResults]": ()=>scanResults.filter({
                "MatchAiApp.useMemo[rankedScanResults]": (result)=>result.score > 0
            }["MatchAiApp.useMemo[rankedScanResults]"]).sort({
                "MatchAiApp.useMemo[rankedScanResults]": (a, b)=>b.score - a.score || b.sampleCount - a.sampleCount
            }["MatchAiApp.useMemo[rankedScanResults]"])
    }["MatchAiApp.useMemo[rankedScanResults]"], [
        scanResults
    ]);
    const recommendedMarkets = rankedScanResults.slice(0, 3);
    const featuredMarket = recommendedMarkets.length ? recommendedMarkets[(Math.max(1, scanRunNumber) - 1) % recommendedMarkets.length] : null;
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
                                    lineNumber: 983,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-lg font-black tracking-tight text-white sm:text-xl",
                                    children: "Live Market Analysis"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 984,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 982,
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
                                                lineNumber: 989,
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
                                                    lineNumber: 1000,
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
                                                    lineNumber: 1001,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 999,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 987,
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
                                            lineNumber: 1011,
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
                                            lineNumber: 1019,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1010,
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
                                            lineNumber: 1034,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            className: "jsx-fe9665299295552e",
                                            children: "French"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1035,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            className: "jsx-fe9665299295552e",
                                            children: "Spanish"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1036,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            className: "jsx-fe9665299295552e",
                                            children: "Portuguese"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1037,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1028,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "market",
                                    className: "jsx-fe9665299295552e" + " " + "text-xs font-bold text-slate-400",
                                    children: "Market"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1039,
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
                                            lineNumber: 1046,
                                            columnNumber: 47
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1040,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 986,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 981,
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
                                            children: "Live Signal Validation"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1054,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black uppercase tracking-[0.12em] text-white",
                                            children: "Rolling Out-of-Sample Results"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1055,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1053,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: liveMatchValidation.sampleCount > 0 ? {
                                        backgroundColor: accentColor
                                    } : undefined,
                                    className: "jsx-fe9665299295552e" + " " + `rounded-full px-3 py-1 text-[10px] font-black ${liveMatchValidation.sampleCount > 0 ? 'text-white' : 'bg-slate-700 text-slate-300'}`,
                                    children: liveMatchValidation.sampleCount > 0 ? `${liveMatchValidation.sampleCount} TESTS` : 'COLLECTING TICKS'
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1057,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1052,
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
                                            children: "Observed Hit Rate"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1067,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-lg font-black text-white",
                                            children: liveMatchValidation.accuracy === null ? '--' : `${liveMatchValidation.accuracy.toFixed(1)}%`
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1068,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1066,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                            children: "Correct Predictions"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1075,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-lg font-black text-white",
                                            children: [
                                                liveMatchValidation.correctPredictions,
                                                " / ",
                                                liveMatchValidation.sampleCount
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1076,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1074,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                            children: "Approx. 95% Wilson Interval"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1081,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-lg font-black text-white",
                                            children: liveMatchValidation.confidenceInterval ? `${liveMatchValidation.confidenceInterval.lower.toFixed(1)}-${liveMatchValidation.confidenceInterval.upper.toFixed(1)}%` : '--'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1082,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1080,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                            children: "Random-Choice Baseline"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1089,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-lg font-black text-white",
                                            children: [
                                                liveMatchValidation.randomBaseline,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1090,
                                            columnNumber: 15
                                        }, this),
                                        liveMatchValidation.edgeVsBaseline !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-xs font-semibold text-slate-400",
                                            children: [
                                                liveMatchValidation.edgeVsBaseline >= 0 ? '+' : '',
                                                liveMatchValidation.edgeVsBaseline.toFixed(1),
                                                " pts vs baseline"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1092,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1088,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1065,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-fe9665299295552e" + " " + "px-4 pb-2 text-xs font-bold text-slate-300",
                            children: [
                                "Evidence check: ",
                                validationEvidence
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1099,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-fe9665299295552e" + " " + "px-4 pb-4 text-xs leading-relaxed text-slate-400",
                            children: "Each historical pick uses only earlier live ticks and is checked against the next tick. The interval is approximate and assumes independent outcomes; consecutive ticks may be dependent. Results do not guarantee future outcomes or 100% accuracy."
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1102,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1051,
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
                                            lineNumber: 1112,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: connected ? {
                                                backgroundColor: accentColor
                                            } : undefined,
                                            className: "jsx-fe9665299295552e" + " " + `relative inline-flex h-2.5 w-2.5 rounded-full ${connected ? '' : 'bg-slate-500'}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1113,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1111,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-fe9665299295552e" + " " + "text-xs font-black uppercase tracking-[0.18em] text-white",
                                    children: "LIVE SPOT TICKER"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1115,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1110,
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
                                            lineNumber: 1119,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 truncate text-sm font-black text-white",
                                            children: marketName
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1120,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1118,
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
                                            lineNumber: 1123,
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
                                                    lineNumber: 1128,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1126,
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
                            lineNumber: 1117,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1109,
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
                                            lineNumber: 1146,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                            children: isScanning ? 'Scanning volatility markets...' : rankedScanResults.length ? 'Recommended markets to analyze' : 'Scan all volatility markets'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1147,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-xs text-slate-400",
                                            children: isScanning ? `${readyMarketCount}/${MARKETS.length} markets have enough live samples · ${scanResults.reduce((sum, result)=>sum + result.sampleCount, 0)} samples received` : 'Compares live tick activity across synthetic indices; this score is not a win probability.'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1150,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1145,
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
                                    lineNumber: 1156,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1144,
                            columnNumber: 11
                        }, this),
                        recommendedMarkets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400",
                                    children: "Top 3 live options · focus changes on each scan"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1168,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "grid gap-2 sm:grid-cols-3",
                                    children: recommendedMarkets.map((market)=>{
                                        const isFeatured = market.symbol === featuredMarket?.symbol;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>selectScannedMarket(market),
                                            style: {
                                                borderColor: isFeatured ? `${accentColor}aa` : 'rgba(255,255,255,0.08)',
                                                backgroundColor: isFeatured ? `${accentColor}18` : '#111f33'
                                            },
                                            title: `Use ${market.name} for live analysis`,
                                            className: "jsx-fe9665299295552e" + " " + "rounded-xl border p-3 text-left transition hover:brightness-110",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-fe9665299295552e" + " " + "flex items-start justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-fe9665299295552e",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "jsx-fe9665299295552e" + " " + "text-[9px] font-black uppercase tracking-[0.12em] text-slate-400",
                                                                    children: isFeatured ? `Scan ${scanRunNumber} focus` : 'Alternative'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                                    lineNumber: 1188,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                                                    children: market.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                                    lineNumber: 1191,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-[10px] font-semibold text-slate-400",
                                                                    children: [
                                                                        market.sampleCount,
                                                                        " ticks · ",
                                                                        market.uniqueDigits,
                                                                        "/10 digits · movement ",
                                                                        market.movement.toFixed(2),
                                                                        " bps"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                                    lineNumber: 1192,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/match-ai-app.tsx",
                                                            lineNumber: 1187,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: accentColor
                                                            },
                                                            className: "jsx-fe9665299295552e" + " " + "shrink-0 text-lg font-black",
                                                            children: [
                                                                market.score,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/match-ai-app.tsx",
                                                            lineNumber: 1196,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1186,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "mt-2 text-[9px] font-bold uppercase tracking-wide text-slate-500",
                                                    children: "Normalized activity rating · select market"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1200,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, market.symbol, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1175,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1171,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1167,
                            columnNumber: 13
                        }, this),
                        scannerError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            role: "alert",
                            className: "jsx-fe9665299295552e" + " " + "mt-3 rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs font-semibold text-rose-300",
                            children: scannerError
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1211,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5",
                            children: rankedScanResults.map((result)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setSymbol(result.symbol);
                                        stopScanner();
                                    },
                                    title: `${result.name}: ${result.sampleCount} live ticks sampled${result.price === null ? '' : `, latest price ${result.price}`}`,
                                    className: "jsx-fe9665299295552e" + " " + "rounded-lg border border-white/[0.08] bg-[#111f33] px-2 py-2 text-center disabled:opacity-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "truncate text-[9px] font-bold text-slate-400",
                                            children: result.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1228,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                            children: [
                                                result.score,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1229,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-[9px] text-slate-500",
                                            children: [
                                                result.sampleCount,
                                                " ticks"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1230,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, result.symbol, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1218,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1216,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1143,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 rounded-2xl border border-cyan-400/20 bg-[#0d192b] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.16)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "flex flex-wrap items-start justify-between gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300",
                                            children: "Live Strategy Advisor"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1239,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                            children: "Analytical Signals · Manual Review Only"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1240,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-xs text-slate-400",
                                            children: "Safe mode: no orders are placed. A signal is not a promise of a winning outcome."
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1241,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1238,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[9px] font-black uppercase tracking-wide text-emerald-300",
                                    children: "No Action Needed"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1243,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1237,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mt-4 grid gap-2 sm:grid-cols-3",
                            children: [
                                {
                                    name: 'Exhaustion Reversal',
                                    ready: liveStrategyAnalysis.exhaustion.ready,
                                    primed: liveStrategyAnalysis.exhaustion.primed,
                                    detail: liveStrategyAnalysis.exhaustion.digit === null ? 'Collecting live digit history' : `Digit ${liveStrategyAnalysis.exhaustion.digit} absent for ${liveStrategyAnalysis.exhaustion.gap} ticks · primes at 35, qualifies at 38`
                                },
                                {
                                    name: 'Micro-Cluster Momentum',
                                    ready: liveStrategyAnalysis.momentum.ready,
                                    primed: false,
                                    detail: liveStrategyAnalysis.momentum.digit === null ? 'Waiting for an 8-tick window' : `Digit ${liveStrategyAnalysis.momentum.digit}: ${liveStrategyAnalysis.momentum.count}/8 recent ticks · checks next 2 ticks`
                                },
                                {
                                    name: 'Dominant Gap-Divergence',
                                    ready: liveStrategyAnalysis.divergence.ready,
                                    primed: liveStrategyAnalysis.divergence.digit !== null,
                                    detail: liveStrategyAnalysis.divergence.digit === null ? 'Needs 18%+ in 200 ticks and 0 appearances in the latest 30' : `Digit ${liveStrategyAnalysis.divergence.digit}: ${(liveStrategyAnalysis.divergence.longShare * 100).toFixed(1)}% long share, absent in 30 · volatility must be <65 points`
                                }
                            ].map(({ name, ready, primed, detail })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-fe9665299295552e" + " " + "flex items-start justify-between gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "text-[10px] font-black uppercase tracking-wide text-slate-300",
                                                    children: name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1277,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-fe9665299295552e" + " " + `shrink-0 text-[8px] font-black uppercase ${ready ? 'text-emerald-300' : primed ? 'text-amber-300' : 'text-slate-500'}`,
                                                    children: ready ? 'Ready' : primed ? 'Primed' : 'Waiting'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1278,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1276,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-[10px] leading-relaxed text-slate-400",
                                            children: detail
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1282,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, name, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1275,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1248,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mt-3 rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "flex flex-wrap items-center justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-fe9665299295552e",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                                    children: "Pip-size volatility indicator"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1290,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                                    children: [
                                                        liveStrategyAnalysis.volatilityPoints === null ? 'Collecting 35 ticks' : `${liveStrategyAnalysis.volatilityPoints} points`,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-fe9665299295552e" + " " + "ml-2 text-[9px] font-bold text-slate-400",
                                                            children: liveStrategyAnalysis.stableVolatilityBaseline ? '64–65 baseline stable' : 'baseline not stable'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/match-ai-app.tsx",
                                                            lineNumber: 1295,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1291,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1289,
                                            columnNumber: 15
                                        }, this),
                                        strategyCountdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-sm font-black tabular-nums text-amber-300",
                                            children: [
                                                Math.max(0, Math.ceil((strategyCountdown.endsAt - (clockNow ?? Date.now())) / 1000)),
                                                "s"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1301,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1288,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-2 text-[9px] leading-relaxed text-slate-500",
                                    children: "Defined indicator: sum of absolute quote changes over the latest 30 tick intervals, divided by the displayed pip step and rounded. Exhaustion needs five consecutive rolling readings at 64–65 points; divergence uses a labeled safety filter below 65. This is a local calculation, not a Deriv-published volatility value."
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1306,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1287,
                            columnNumber: 11
                        }, this),
                        strategyCountdown ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            role: "status",
                            "aria-live": "polite",
                            className: "jsx-fe9665299295552e" + " " + "mt-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "text-xs font-black text-amber-200",
                                    children: [
                                        "Confirming ",
                                        strategyCountdown.candidate.name,
                                        " · Matches on digit ",
                                        strategyCountdown.candidate.digit,
                                        ' ',
                                        "· trigger check in ",
                                        Math.max(0, Math.ceil((strategyCountdown.endsAt - (clockNow ?? Date.now())) / 1000)),
                                        " seconds"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1313,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-[10px] text-slate-300",
                                    children: "The live conditions are rechecked before the signal appears; no trade will be submitted."
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1317,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1312,
                            columnNumber: 13
                        }, this) : strategyAlert ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            role: "alert",
                            "aria-live": "assertive",
                            className: "jsx-fe9665299295552e" + " " + "mt-3 animate-pulse rounded-xl border border-cyan-300/40 bg-cyan-300/10 p-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "text-sm font-black text-cyan-200",
                                    children: [
                                        "TRIGGER: ",
                                        strategyAlert.name,
                                        " · Matches on digit ",
                                        strategyAlert.digit
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1321,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-[10px] text-slate-300",
                                    children: [
                                        "Analytical signal only · observe the next ",
                                        strategyAlert.remainingTicks,
                                        " ",
                                        strategyAlert.remainingTicks === 1 ? 'tick' : 'ticks',
                                        " for validation · no order placed"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1324,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1320,
                            columnNumber: 13
                        }, this) : lastStrategyOutcome ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            role: "status",
                            className: "jsx-fe9665299295552e" + " " + "mt-3 rounded-xl border border-white/[0.08] bg-[#111f33] p-3 text-xs font-bold text-slate-300",
                            children: [
                                lastStrategyOutcome.name,
                                " · digit ",
                                lastStrategyOutcome.digit,
                                " matched ",
                                lastStrategyOutcome.matchedTicks,
                                " of ",
                                lastStrategyOutcome.totalTicks,
                                " validation ",
                                lastStrategyOutcome.totalTicks === 1 ? 'tick' : 'ticks',
                                "."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1329,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            role: "status",
                            className: "jsx-fe9665299295552e" + " " + "mt-3 rounded-xl border border-white/[0.08] bg-[#111f33] p-3 text-[10px] text-slate-400",
                            children: connected ? 'Waiting for strategy conditions to align with live tick data.' : 'Connect to the live Deriv feed to evaluate strategies.'
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1333,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1236,
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
                                    lineNumber: 1341,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-1 font-mono text-xl font-black tabular-nums text-white sm:text-2xl",
                                    children: livePrice === null ? '--' : livePrice.toFixed(5)
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1342,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1340,
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
                                    lineNumber: 1347,
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
                                    lineNumber: 1348,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1346,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1339,
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
                                    lineNumber: 1368,
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
                                    lineNumber: 1369,
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
                                    lineNumber: 1370,
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
                                    lineNumber: 1371,
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
                                    lineNumber: 1373,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1362,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "jsx-fe9665299295552e",
                            children: connected ? 'Connected' : 'Not connected / Offline'
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1376,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1352,
                    columnNumber: 9
                }, this),
                feedError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    role: "alert",
                    className: "jsx-fe9665299295552e" + " " + "mt-2 text-center text-xs font-semibold text-rose-400",
                    children: feedError
                }, void 0, false, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1380,
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
                                    lineNumber: 1388,
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
                                    lineNumber: 1389,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1387,
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
                                    lineNumber: 1399,
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
                                    lineNumber: 1400,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1398,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1386,
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
                                    lineNumber: 1413,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "text-[10px] font-semibold text-slate-400",
                                    children: "Live pattern score, not a win probability"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1414,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1412,
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
                                                lineNumber: 1428,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-fe9665299295552e" + " " + "mt-1 block text-sm font-black text-white",
                                                children: signal
                                            }, void 0, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 1429,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-fe9665299295552e" + " " + "mt-1 block text-xs font-bold text-cyan-300",
                                                children: score === null ? 'WAIT' : `Pattern score ${score}%`
                                            }, void 0, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 1430,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-fe9665299295552e" + " " + "mt-1 block text-[9px] leading-relaxed text-slate-500",
                                                children: detail
                                            }, void 0, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 1433,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, title, true, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 1418,
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
                                            lineNumber: 1437,
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
                                                            lineNumber: 1471,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-fe9665299295552e" + " " + "mt-1 block text-xs font-bold text-cyan-300",
                                                            children: hasPatternData ? `Score ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toLivePatternScore"])(observed)}%` : 'WAIT'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/match-ai-app.tsx",
                                                            lineNumber: 1472,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-fe9665299295552e" + " " + "mt-1 block text-[9px] text-slate-500",
                                                            children: hasPatternData ? `${Math.round(observed)}% · ${count}/${analysis.matchSampleCount} ticks` : 'Need 25 ticks'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/match-ai-app.tsx",
                                                            lineNumber: 1475,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, label, true, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1455,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1440,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1436,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1416,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1411,
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
                            lineNumber: 1488,
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
                                    lineNumber: 1491,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1489,
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
                                    lineNumber: 1507,
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
                                            lineNumber: 1513,
                                            columnNumber: 84
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1508,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1506,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1487,
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
                                    lineNumber: 1521,
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
                                    lineNumber: 1522,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1520,
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
                                            lineNumber: 1540,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 block text-[10px] font-bold",
                                            children: ticks === 1 ? '1 Tick' : `${ticks} Ticks`
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1541,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, ticks, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1528,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1526,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1519,
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
                                    lineNumber: 1549,
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
                                    lineNumber: 1550,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1548,
                            columnNumber: 11
                        }, this),
                        manualSignal?.targetDigit !== null && manualSignal?.targetDigit !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-[10px] font-bold text-emerald-300",
                            children: [
                                "Highlighted: signal digit ",
                                manualSignal.targetDigit
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1553,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mt-3 flex gap-2 overflow-x-auto pb-2",
                            children: digits.slice(-30).map((digit, index, visibleDigits)=>{
                                const isSignalDigit = manualSignal?.targetDigit === digit;
                                const isLatest = index === visibleDigits.length - 1;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-label": isSignalDigit ? `Digit ${digit}, matches current signal` : `Digit ${digit}`,
                                    title: isSignalDigit ? `Signal digit ${digit}` : `Live digit ${digit}`,
                                    style: !isSignalDigit && isLatest ? {
                                        backgroundColor: accentColor
                                    } : undefined,
                                    className: "jsx-fe9665299295552e" + " " + `flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${isSignalDigit ? 'border border-emerald-300 bg-emerald-500/25 text-emerald-200 ring-2 ring-emerald-400/70' : isLatest ? 'text-white' : 'bg-[#111f33] text-slate-200'}`,
                                    children: digit
                                }, `${digit}-${index}`, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1562,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1557,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1547,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#0d192b] shadow-[0_16px_40px_rgba(0,0,0,0.18)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300",
                                            children: "20-Tick Matches Tracker"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1585,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                            children: "Live prediction result ledger"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1588,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1584,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "flex gap-2",
                                    children: matchTracker.active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: stopMatchTracker,
                                        className: "jsx-fe9665299295552e" + " " + "rounded-lg border border-white/[0.12] px-3 py-2 text-xs font-black text-slate-300 transition hover:text-white",
                                        children: "Stop Tracker"
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 1592,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: startMatchTracker,
                                        disabled: !connected || digits.length < 25,
                                        style: {
                                            backgroundColor: accentColor
                                        },
                                        className: "jsx-fe9665299295552e" + " " + "rounded-lg px-4 py-2 text-xs font-black text-white transition disabled:cursor-not-allowed disabled:opacity-50",
                                        children: matchTracker.attempts.length ? 'Start New 20' : 'Start 20-Tick Tracker'
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 1600,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1590,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1583,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "grid grid-cols-2 gap-2 p-4 sm:grid-cols-4",
                            children: [
                                {
                                    label: 'Completed',
                                    value: `${matchTracker.attempts.length}/20`
                                },
                                {
                                    label: 'Actual Hits',
                                    value: matchTracker.attempts.filter((attempt)=>attempt.result === 'WIN').length
                                },
                                {
                                    label: 'Current Hit Streak',
                                    value: matchTracker.currentStreak
                                },
                                {
                                    label: 'Best Hit Streak',
                                    value: matchTracker.bestStreak
                                }
                            ].map(({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1621,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-lg font-black text-white",
                                            children: value
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1622,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, label, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1620,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1613,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "px-4 pb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-fe9665299295552e" + " " + "grid grid-cols-5 gap-2 sm:grid-cols-10",
                                children: Array.from({
                                    length: 20
                                }, (_, index)=>{
                                    const attempt = matchTracker.attempts[index];
                                    const isPending = matchTracker.active && index === matchTracker.attempts.length;
                                    const className = attempt?.result === 'WIN' ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300' : attempt?.result === 'MISS' ? 'border-rose-400/40 bg-rose-500/15 text-rose-300' : isPending ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-300 animate-pulse' : 'border-white/[0.08] bg-[#111f33] text-slate-500';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        title: attempt ? `Attempt ${attempt.attempt}: predicted ${attempt.predictedDigit}, actual ${attempt.actualDigit} (${attempt.result})` : isPending ? `Next live tick: checking digit ${matchTracker.pendingDigit}` : `Attempt ${index + 1}: waiting`,
                                        className: "jsx-fe9665299295552e" + " " + `min-w-0 rounded-lg border p-2 text-center ${className}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold",
                                                children: [
                                                    "#",
                                                    index + 1
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 1650,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black",
                                                children: attempt ? attempt.result === 'WIN' ? 'HIT' : 'MISS' : isPending ? matchTracker.pendingDigit : '—'
                                            }, void 0, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 1651,
                                                columnNumber: 21
                                            }, this),
                                            attempt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-fe9665299295552e" + " " + "mt-1 truncate text-[8px] font-semibold opacity-80",
                                                children: [
                                                    attempt.predictedDigit,
                                                    "→",
                                                    attempt.actualDigit
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 1655,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 1641,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 1628,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1627,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "border-t border-white/[0.08] px-4 py-3 text-xs leading-relaxed text-slate-400",
                            children: [
                                matchTracker.active ? `Next live tick settles digit ${matchTracker.pendingDigit}. After each result, the tracker evaluates a fresh candidate and continues until 20 actual outcomes are recorded.` : matchTracker.attempts.length === 20 ? '20 live outcomes recorded. Start a new tracker to begin another series.' : 'Predictions are checked only against future live ticks. Misses are recorded and the next candidate is generated from updated live history; this does not guarantee wins.',
                                ' ',
                                "One tick per attempt; hit/miss history resets when you switch markets."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1665,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1582,
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
                                        lineNumber: 1678,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-fe9665299295552e" + " " + "mt-1 text-xs font-bold text-slate-300",
                                        children: connected ? `${strategy} analysis from ${Math.min(digits.length, 100)} live ticks` : 'Waiting for live market ticks...'
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 1679,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 1677,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: generateSignal,
                                disabled: !connected || digits.length < 25 || isGeneratingSignal,
                                style: !connected || digits.length < 25 || isGeneratingSignal ? undefined : {
                                    backgroundColor: accentColor
                                },
                                className: "jsx-fe9665299295552e" + " " + "h-12 w-full shrink-0 rounded-xl text-sm font-black text-white shadow-sm transition disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-52",
                                children: isGeneratingSignal ? 'Analyzing Live Ticks...' : 'Generate Signal'
                            }, void 0, false, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 1685,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/match-ai-app.tsx",
                        lineNumber: 1676,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1675,
                    columnNumber: 9
                }, this),
                isGeneratingSignal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    role: "status",
                    "aria-live": "polite",
                    className: "jsx-fe9665299295552e" + " " + "mt-4 overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#0b1426] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.2)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-fe9665299295552e" + " " + "h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-cyan-400/25 border-t-cyan-300"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1706,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300",
                                            children: "Live Tick Analysis In Progress"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1708,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-xs text-slate-400",
                                            children: "Evaluating candidate matches across the captured Deriv tick history"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1711,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1707,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1705,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mt-5 flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#111f33] p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500",
                                            children: "Current Matches Candidate"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1719,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-xs font-semibold text-slate-300",
                                            children: [
                                                signalAnalysisProgress.completed,
                                                " of ",
                                                signalAnalysisProgress.total,
                                                " history windows evaluated"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1722,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1718,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-label": signalAnalysisProgress.candidateDigit === null ? 'Candidate not selected yet' : `Current candidate digit ${signalAnalysisProgress.candidateDigit}`,
                                    className: "jsx-fe9665299295552e" + " " + "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-2xl font-black text-cyan-300",
                                    children: signalAnalysisProgress.candidateDigit ?? '…'
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1726,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1717,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            role: "progressbar",
                            "aria-label": "Live tick analysis windows evaluated",
                            "aria-valuemin": 0,
                            "aria-valuemax": signalAnalysisProgress.total,
                            "aria-valuenow": signalAnalysisProgress.completed,
                            className: "jsx-fe9665299295552e" + " " + "mt-4 h-2 overflow-hidden rounded-full bg-slate-800",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: `${signalAnalysisProgress.total ? signalAnalysisProgress.completed / signalAnalysisProgress.total * 100 : 0}%`
                                },
                                className: "jsx-fe9665299295552e" + " " + "h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-400 to-emerald-400 transition-[width] duration-150 ease-out"
                            }, void 0, false, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 1744,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1736,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1700,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + `mx-auto mt-4 w-full max-w-sm rounded-3xl border p-6 font-sans text-white shadow-2xl transition-all duration-500 ${signalTier.cardClassName}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mb-6 flex items-center justify-between gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "text-[11px] font-bold uppercase tracking-widest text-slate-500",
                                    children: "Signal Output"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1758,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-fe9665299295552e" + " " + `rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${signalTier.badgeClassName}`,
                                    children: signalTier.label
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1759,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1757,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mb-6 flex justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-fe9665299295552e" + " " + `relative flex h-32 w-32 items-center justify-center rounded-2xl border shadow-inner transition-all duration-500 ${signalTier.heroClassName}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-label": connected ? 'Live data connected' : 'Live data disconnected',
                                        title: connected ? 'Live data connected' : 'Live data disconnected',
                                        className: "jsx-fe9665299295552e" + " " + `absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full border-2 border-[#0b1426] transition-all duration-500 ${connected ? signalStrength === 'STRONG SIGNAL' ? 'animate-ping bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,1)]' : 'animate-pulse bg-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.6)]' : 'bg-slate-600 opacity-60'}`
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 1766,
                                        columnNumber: 15
                                    }, this),
                                    connected && signalStrength === 'STRONG SIGNAL' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-fe9665299295552e" + " " + "absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full border-2 border-[#0b1426] bg-emerald-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 1778,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-fe9665299295552e" + " " + `text-6xl font-black tracking-tighter transition-all duration-500 ${signalTier.textClassName}`,
                                        children: manualSignal?.targetDigit ?? '—'
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 1780,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 1765,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1764,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-fe9665299295552e" + " " + "mb-6 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400",
                            children: manualSignal?.label ?? `${strategy} · Waiting for signal`
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1785,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "mb-6 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-500",
                                    children: "Signal Digit Range"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1790,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-2 flex justify-center gap-2",
                                    children: [
                                        digits.slice(-4).map((digit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-fe9665299295552e" + " " + "flex h-10 w-11 items-center justify-center rounded-xl border border-slate-800/40 bg-[#121b2d] text-sm font-bold text-slate-300 shadow-sm",
                                                children: digit
                                            }, `signal-range-${index}`, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 1793,
                                                columnNumber: 17
                                            }, this)),
                                        digits.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-fe9665299295552e" + " " + "text-xs text-slate-500",
                                            children: "Waiting for live ticks"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1800,
                                            columnNumber: 39
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1791,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1789,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "space-y-2.5 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "flex items-end justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[11px] font-bold uppercase tracking-widest text-slate-500",
                                            children: "Normalized Pattern Score"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1806,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + `font-mono text-3xl font-black tracking-tight tabular-nums transition-all duration-300 ${signalTier.textClassName}`,
                                            children: manualSignal ? `${signalScore}%` : '--'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1807,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1805,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    role: "progressbar",
                                    "aria-label": "Normalized pattern score based on observed Deriv tick data, not prediction accuracy",
                                    "aria-valuemin": 0,
                                    "aria-valuemax": 100,
                                    "aria-valuenow": signalScore,
                                    className: "jsx-fe9665299295552e" + " " + "mx-auto h-1.5 w-44 overflow-hidden rounded-full border border-slate-800/50 bg-slate-900",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: `${signalScore}%`
                                        },
                                        className: "jsx-fe9665299295552e" + " " + "h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 1819,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1811,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "pt-1 text-center text-[10px] text-slate-500",
                                    children: manualSignal ? `Live sample rate ${manualSignal.observedRate}% across ${manualSignal.sampleCount} feed samples` : 'Awaiting live tick analysis'
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1824,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1804,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1756,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mx-auto mt-4 w-full max-w-sm overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#0d192b] shadow-[0_16px_40px_rgba(0,0,0,0.18)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "flex items-start justify-between gap-3 border-b border-white/[0.08] px-4 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300",
                                            children: "AI Analysis Pipeline"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1836,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-xs text-slate-400",
                                            children: "Live-tick evidence summary"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1839,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1835,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "text-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                            children: "Confidence Level*"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1842,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + `mt-1 font-mono text-2xl font-black tabular-nums ${signalTier.textClassName}`,
                                            children: manualSignal ? `${signalScore}%` : '--'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1845,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1841,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1834,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-fe9665299295552e" + " " + "px-4 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    role: "progressbar",
                                    "aria-label": "Normalized signal pattern index, not prediction probability",
                                    "aria-valuemin": 0,
                                    "aria-valuemax": 100,
                                    "aria-valuenow": signalScore,
                                    className: "jsx-fe9665299295552e" + " " + "h-2 overflow-hidden rounded-full bg-slate-800",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: `${signalScore}%`
                                        },
                                        className: "jsx-fe9665299295552e" + " " + `h-full rounded-full transition-[width] duration-500 ${signalStrength === 'STRONG SIGNAL' ? 'bg-gradient-to-r from-emerald-500 to-emerald-300' : 'bg-gradient-to-r from-amber-500 to-yellow-300'}`
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 1860,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1852,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-4 grid grid-cols-3 gap-2",
                                    children: [
                                        {
                                            title: 'Live feed',
                                            value: manualSignal ? `${manualSignal.sampleCount} ticks` : connected ? `${digits.length} ticks` : 'Waiting',
                                            complete: connected && digits.length > 0
                                        },
                                        {
                                            title: 'Pattern scan',
                                            value: manualSignal ? `${strategy} ranked` : 'Not run',
                                            complete: Boolean(manualSignal)
                                        },
                                        {
                                            title: 'Candidate',
                                            value: manualSignal?.targetDigit === null || manualSignal?.targetDigit === undefined ? manualSignal ? manualSignal.label : 'Waiting' : `Digit ${manualSignal.targetDigit}`,
                                            complete: Boolean(manualSignal)
                                        }
                                    ].map(({ title, value, complete })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-fe9665299295552e" + " " + "rounded-lg border border-white/[0.08] bg-[#111f33] p-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "text-[8px] font-bold uppercase tracking-[0.1em] text-slate-500",
                                                    children: title
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1891,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + `mt-1 truncate text-[10px] font-black ${complete ? 'text-cyan-300' : 'text-slate-400'}`,
                                                    children: value
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1892,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, title, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1890,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1870,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-3 text-[10px] leading-relaxed text-slate-400",
                                    children: "Outcomes are derived from live Deriv tick quotes: the feed’s pip size preserves each market’s displayed precision, and the final displayed decimal digit is analyzed. For Matches, the system ranks digits from the latest 100 ticks by observed frequency and time since last appearance; other strategies use their corresponding historical tick rates. The 80–99% value is a normalized pattern score, not a calibrated chance of winning or a guarantee."
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1899,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1851,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1833,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-fe9665299295552e" + " " + "mt-4 flex justify-end",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: refreshSignalOutput,
                        disabled: !manualSignal || isGeneratingSignal,
                        className: "jsx-fe9665299295552e" + " " + "rounded-lg border border-white/[0.12] bg-[#0d192b] px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-50",
                        children: "Refresh Signal Output"
                    }, void 0, false, {
                        fileName: "[project]/components/match-ai-app.tsx",
                        lineNumber: 1906,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1905,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-fe9665299295552e" + " " + "mt-2 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]",
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
                                                    children: [
                                                        "Deriv Digit Distribution · ",
                                                        symbol
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1920,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                                    children: [
                                                        "Last ",
                                                        distributionSampleCount,
                                                        " Ticks"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1923,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1919,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-fe9665299295552e" + " " + "text-xs font-bold text-slate-400",
                                            children: [
                                                connected ? 'LIVE' : 'CONNECTING',
                                                " · ",
                                                distributionSampleCount,
                                                " samples"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1925,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1918,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-4 overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "jsx-fe9665299295552e" + " " + "w-full min-w-[320px] text-left text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "jsx-fe9665299295552e" + " " + "border-b border-white/[0.08]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            scope: "col",
                                                            className: "jsx-fe9665299295552e" + " " + "px-3 py-2",
                                                            children: "Last digit"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/match-ai-app.tsx",
                                                            lineNumber: 1933,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            scope: "col",
                                                            className: "jsx-fe9665299295552e" + " " + "px-3 py-2 text-right",
                                                            children: "Ticks"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/match-ai-app.tsx",
                                                            lineNumber: 1934,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            scope: "col",
                                                            className: "jsx-fe9665299295552e" + " " + "px-3 py-2 text-right",
                                                            children: "Distribution"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/match-ai-app.tsx",
                                                            lineNumber: 1935,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            scope: "col",
                                                            className: "jsx-fe9665299295552e" + " " + "px-3 py-2 text-right",
                                                            children: "Signal"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/match-ai-app.tsx",
                                                            lineNumber: 1936,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 1932,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 1931,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "jsx-fe9665299295552e",
                                                children: digitDistribution.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "jsx-fe9665299295552e" + " " + "border-b border-white/[0.05] last:border-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                scope: "row",
                                                                className: "jsx-fe9665299295552e" + " " + "px-3 py-2 font-black text-white",
                                                                children: item.digit
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/match-ai-app.tsx",
                                                                lineNumber: 1942,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "jsx-fe9665299295552e" + " " + "px-3 py-2 text-right font-bold text-slate-300",
                                                                children: item.count
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/match-ai-app.tsx",
                                                                lineNumber: 1943,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "jsx-fe9665299295552e" + " " + "px-3 py-2 text-right tabular-nums text-slate-300",
                                                                children: [
                                                                    item.percentage.toFixed(1),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/match-ai-app.tsx",
                                                                lineNumber: 1944,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "jsx-fe9665299295552e" + " " + "px-3 py-2 text-right font-bold",
                                                                children: matchResult.best?.digit === item.digit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: accentColor
                                                                    },
                                                                    className: "jsx-fe9665299295552e",
                                                                    children: "Selected"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                                    lineNumber: 1949,
                                                                    columnNumber: 29
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-fe9665299295552e" + " " + "text-slate-600",
                                                                    children: "—"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                                    lineNumber: 1950,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/match-ai-app.tsx",
                                                                lineNumber: 1947,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, item.digit, true, {
                                                        fileName: "[project]/components/match-ai-app.tsx",
                                                        lineNumber: 1941,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 1939,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 1930,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1929,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "mt-4 border-t border-white/[0.08] pt-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                            children: "Latest Deriv ticks · quote precision from pip size"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1958,
                                            columnNumber: 15
                                        }, this),
                                        recentTicks.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 overflow-x-auto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                className: "jsx-fe9665299295552e" + " " + "w-full min-w-[240px] text-left text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                        className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "jsx-fe9665299295552e" + " " + "border-b border-white/[0.08]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    scope: "col",
                                                                    className: "jsx-fe9665299295552e" + " " + "px-3 py-2",
                                                                    children: "Tick"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                                    lineNumber: 1966,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    scope: "col",
                                                                    className: "jsx-fe9665299295552e" + " " + "px-3 py-2 text-right",
                                                                    children: "Quote"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                                    lineNumber: 1967,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    scope: "col",
                                                                    className: "jsx-fe9665299295552e" + " " + "px-3 py-2 text-right",
                                                                    children: "Last digit"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                                    lineNumber: 1968,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/match-ai-app.tsx",
                                                            lineNumber: 1965,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/match-ai-app.tsx",
                                                        lineNumber: 1964,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        className: "jsx-fe9665299295552e",
                                                        children: recentTicks.map((tick)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                className: "jsx-fe9665299295552e" + " " + "border-b border-white/[0.05] last:border-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        scope: "row",
                                                                        className: "jsx-fe9665299295552e" + " " + "px-3 py-2 font-medium text-slate-400",
                                                                        children: tick.tick
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/match-ai-app.tsx",
                                                                        lineNumber: 1974,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "jsx-fe9665299295552e" + " " + "px-3 py-2 text-right font-mono tabular-nums text-slate-300",
                                                                        children: tick.quote
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/match-ai-app.tsx",
                                                                        lineNumber: 1975,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "jsx-fe9665299295552e" + " " + "px-3 py-2 text-right font-black text-white",
                                                                        children: tick.digit ?? '—'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/match-ai-app.tsx",
                                                                        lineNumber: 1976,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, tick.tick, true, {
                                                                fileName: "[project]/components/match-ai-app.tsx",
                                                                lineNumber: 1973,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/match-ai-app.tsx",
                                                        lineNumber: 1971,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 1963,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1962,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-[10px] text-slate-500",
                                            children: "Waiting for Deriv tick precision data."
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1983,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1957,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1917,
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
                                            lineNumber: 1990,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: connected ? {
                                                backgroundColor: accentColor
                                            } : undefined,
                                            className: "jsx-fe9665299295552e" + " " + `h-2 w-2 rounded-full ${connected ? 'animate-pulse' : 'bg-slate-500'}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1991,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1989,
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
                                                lineNumber: 1998,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 1994,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-3 text-sm font-black text-white",
                                            children: connected ? 'ENGINE ACTIVE' : 'ENGINE STANDBY'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 2005,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-xs text-slate-400",
                                            children: digits.length >= 25 ? 'Pattern analysis ready' : 'Collecting market data'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 2006,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 1993,
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
                                                    lineNumber: 2010,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                                    children: digits.length
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 2011,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 2009,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-fe9665299295552e" + " " + "rounded-lg bg-[#111f33] px-3 py-2 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase text-slate-500",
                                                    children: "Observed Rate"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 2014,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black text-white",
                                                    children: [
                                                        manualSignal?.observedRate ?? '--',
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/match-ai-app.tsx",
                                                    lineNumber: 2015,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 2013,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 2008,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 1988,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 1916,
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
                                            lineNumber: 2024,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-1 text-sm font-black uppercase tracking-[0.12em] text-white",
                                            children: "Neural Analysis Engine"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 2025,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 2023,
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
                                    lineNumber: 2027,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 2022,
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
                                            lineNumber: 2035,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 truncate text-sm font-black text-white",
                                            children: marketName
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 2036,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 2034,
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
                                            lineNumber: 2039,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-sm font-black text-white",
                                            children: strategy
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 2040,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 2038,
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
                                            lineNumber: 2043,
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
                                            lineNumber: 2044,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 2042,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-fe9665299295552e" + " " + "rounded-xl border border-white/[0.08] bg-[#111f33] p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-fe9665299295552e" + " " + "text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500",
                                            children: "Observed Tick Rate"
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 2047,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: accentColor
                                            },
                                            className: "jsx-fe9665299295552e" + " " + "mt-2 text-sm font-black",
                                            children: manualSignal ? `${manualSignal.observedRate}%` : 'Awaiting Signal'
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 2048,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 2046,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 2033,
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
                                        lineNumber: 2058,
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
                                                        lineNumber: 2066,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-fe9665299295552e" + " " + "text-[9px] font-black uppercase tracking-[0.14em] text-slate-400",
                                                        children: "Predicted Outcome"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/match-ai-app.tsx",
                                                        lineNumber: 2069,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 2065,
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
                                                lineNumber: 2071,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 2064,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 2057,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 2056,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 2021,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/match-ai-app.tsx",
            lineNumber: 963,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/match-ai-app.tsx",
        lineNumber: 959,
        columnNumber: 5
    }, this);
}
_s(MatchAiApp, "mXDZJd4VMnf6i0IaWBHgnO4owqM=", false, function() {
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
    "analyzeLiveDigitStrategies",
    ()=>analyzeLiveDigitStrategies,
    "analyzeMatchDigits",
    ()=>analyzeMatchDigits,
    "evaluateLiveMatchValidation",
    ()=>evaluateLiveMatchValidation,
    "getSignalStrength",
    ()=>getSignalStrength,
    "parseLastDigit",
    ()=>parseLastDigit,
    "toLivePatternScore",
    ()=>toLivePatternScore,
    "toMarketActivityIndex",
    ()=>toMarketActivityIndex
]);
const VOLATILITY_WINDOW_TICKS = 30;
const VOLATILITY_STABILITY_READINGS = 5;
const EXHAUSTION_PRIMED_GAP = 35;
const EXHAUSTION_TRIGGER_GAP = 38;
const VOLATILITY_BASELINE_MIN = 64;
const VOLATILITY_BASELINE_MAX = 65;
const DIVERGENCE_SAFETY_THRESHOLD = 65;
function getSignalStrength(observedRate) {
    if (observedRate >= 90) return 'STRONG SIGNAL';
    return 'MODERATE SIGNAL';
}
function toLivePatternScore(observedShare) {
    const boundedShare = Math.min(100, Math.max(0, observedShare));
    return Math.round(80 + boundedShare / 100 * 20);
}
function toMarketActivityIndex(entropyRatio, digitCoverage, movementRatio) {
    const boundedEntropy = Math.min(1, Math.max(0, entropyRatio));
    const boundedCoverage = Math.min(1, Math.max(0, digitCoverage));
    const boundedMovement = Math.min(1, Math.max(0, movementRatio));
    const marketQuality = boundedEntropy * 0.5 + boundedCoverage * 0.25 + boundedMovement * 0.25;
    return Math.round(69 + marketQuality * 31);
}
function analyzeLiveDigitStrategies(digits, prices, pipSize) {
    const pipStep = pipSize !== null && Number.isInteger(pipSize) && pipSize >= 0 && pipSize <= 20 ? 10 ** -pipSize : null;
    const volatilityReadings = [];
    if (pipStep !== null && prices.length >= VOLATILITY_WINDOW_TICKS + VOLATILITY_STABILITY_READINGS) {
        for(let end = prices.length - VOLATILITY_STABILITY_READINGS; end < prices.length; end += 1){
            const start = end - VOLATILITY_WINDOW_TICKS;
            let movementPoints = 0;
            for(let index = start + 1; index <= end; index += 1){
                movementPoints += Math.abs(prices[index] - prices[index - 1]) / pipStep;
            }
            volatilityReadings.push(Math.round(movementPoints));
        }
    }
    const volatilityPoints = volatilityReadings.at(-1) ?? null;
    const stableVolatilityBaseline = volatilityReadings.length === VOLATILITY_STABILITY_READINGS && volatilityReadings.every((points)=>points >= VOLATILITY_BASELINE_MIN && points <= VOLATILITY_BASELINE_MAX);
    const longWindow = digits.slice(-200);
    const shortWindow = digits.slice(-30);
    const gaps = Array.from({
        length: 10
    }, (_, digit)=>{
        let gap = 0;
        for(let index = longWindow.length - 1; index >= 0 && longWindow[index] !== digit; index -= 1){
            gap += 1;
        }
        return {
            digit,
            gap
        };
    }).sort((a, b)=>b.gap - a.gap || a.digit - b.digit);
    const mostExhausted = gaps[0];
    const exhaustion = {
        digit: longWindow.length ? mostExhausted.digit : null,
        gap: longWindow.length ? mostExhausted.gap : 0,
        primed: longWindow.length >= EXHAUSTION_PRIMED_GAP && mostExhausted.gap >= EXHAUSTION_PRIMED_GAP,
        ready: longWindow.length >= EXHAUSTION_TRIGGER_GAP && mostExhausted.gap >= EXHAUSTION_TRIGGER_GAP && stableVolatilityBaseline
    };
    const recentCluster = shortWindow.slice(-8);
    const clusterCounts = Array.from({
        length: 10
    }, (_, digit)=>({
            digit,
            count: recentCluster.filter((value)=>value === digit).length,
            lastIndex: recentCluster.lastIndexOf(digit)
        })).sort((a, b)=>b.count - a.count || b.lastIndex - a.lastIndex);
    const hottestCluster = clusterCounts[0];
    const momentum = {
        digit: recentCluster.length ? hottestCluster.digit : null,
        count: recentCluster.length ? hottestCluster.count : 0,
        ready: recentCluster.length === 8 && hottestCluster.count >= 3
    };
    const divergenceCandidates = Array.from({
        length: 10
    }, (_, digit)=>{
        const longCount = longWindow.filter((value)=>value === digit).length;
        return {
            digit,
            longShare: longWindow.length ? longCount / longWindow.length : 0,
            shortCount: shortWindow.filter((value)=>value === digit).length
        };
    }).filter((candidate)=>candidate.longShare >= 0.18 && candidate.shortCount === 0 && longWindow.length === 200 && shortWindow.length === 30).sort((a, b)=>b.longShare - a.longShare || a.digit - b.digit);
    const dominantGap = divergenceCandidates[0];
    const divergence = {
        digit: dominantGap?.digit ?? null,
        longShare: dominantGap?.longShare ?? 0,
        shortCount: dominantGap?.shortCount ?? 0,
        ready: Boolean(dominantGap && volatilityPoints !== null && volatilityPoints < DIVERGENCE_SAFETY_THRESHOLD)
    };
    return {
        volatilityPoints,
        stableVolatilityBaseline,
        exhaustion,
        momentum,
        divergence
    };
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
    const sequenceHash = window.reduce((hash, digit)=>Math.imul(hash ^ digit, 16777619) >>> 0, 2166136261);
    const tieBreakOffset = sequenceHash % 10;
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
    }).sort((a, b)=>{
        const scoreDifference = b.score - a.score;
        if (scoreDifference !== 0) return scoreDifference;
        return (a.digit - tieBreakOffset + 10) % 10 - (b.digit - tieBreakOffset + 10) % 10;
    });
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
function evaluateLiveMatchValidation(digits, lookback = 100, maxSamples = 100, minimumHistory = 25) {
    const validationWindow = digits.slice(-(lookback + maxSamples));
    const firstOutcomeIndex = Math.max(minimumHistory, validationWindow.length - maxSamples);
    let correctPredictions = 0;
    let sampleCount = 0;
    for(let outcomeIndex = firstOutcomeIndex; outcomeIndex < validationWindow.length; outcomeIndex += 1){
        const history = validationWindow.slice(Math.max(0, outcomeIndex - lookback), outcomeIndex);
        if (history.length < minimumHistory) continue;
        const predictedDigit = analyzeMatchDigits(history, lookback).best?.digit;
        if (predictedDigit === undefined) continue;
        if (predictedDigit === validationWindow[outcomeIndex]) correctPredictions += 1;
        sampleCount += 1;
    }
    const accuracy = sampleCount ? correctPredictions / sampleCount * 100 : null;
    const randomBaseline = 10;
    let confidenceInterval = null;
    if (sampleCount > 0) {
        const zScore = 1.96;
        const proportion = correctPredictions / sampleCount;
        const zSquared = zScore * zScore;
        const denominator = 1 + zSquared / sampleCount;
        const center = (proportion + zSquared / (2 * sampleCount)) / denominator;
        const margin = zScore * Math.sqrt(proportion * (1 - proportion) / sampleCount + zSquared / (4 * sampleCount * sampleCount)) / denominator;
        confidenceInterval = {
            lower: Math.max(0, (center - margin) * 100),
            upper: Math.min(100, (center + margin) * 100)
        };
    }
    return {
        correctPredictions,
        sampleCount,
        accuracy,
        confidenceInterval,
        randomBaseline,
        edgeVsBaseline: accuracy === null ? null : accuracy - randomBaseline
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=_1fili6jedsynh._.js.map