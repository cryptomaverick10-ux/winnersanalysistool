(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/match-ai-app.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MatchAiApp",
    ()=>MatchAiApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/match-ai.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const DERIV_WS_URL = 'wss://ws.derivws.com/websockets/v3?app_id=1089';
const MAX_DIGITS = 200;
const MARKETS = [
    [
        'Volatility 100 Index',
        'R_100'
    ],
    [
        'Volatility 75 Index',
        'R_75'
    ],
    [
        'Volatility 50 Index',
        'R_50'
    ],
    [
        'Volatility 25 Index',
        'R_25'
    ],
    [
        'Volatility 10 Index',
        'R_10'
    ],
    [
        'Volatility 100 (1s)',
        'RDB100'
    ],
    [
        'Volatility 75 (1s)',
        'RDB75'
    ],
    [
        'Volatility 50 (1s)',
        'RDB50'
    ],
    [
        'Volatility 25 (1s)',
        'RDB25'
    ],
    [
        'Volatility 10 (1s)',
        'RDB10'
    ],
    [
        'Boom 300',
        'BOOM300N'
    ],
    [
        'Boom 500',
        'BOOM500'
    ],
    [
        'Boom 1000',
        'BOOM1000'
    ],
    [
        'Crash 300',
        'CRASH300N'
    ],
    [
        'Crash 500',
        'CRASH500'
    ],
    [
        'Crash 1000',
        'CRASH1000'
    ],
    [
        'Jump 10',
        'JD10'
    ],
    [
        'Jump 25',
        'JD25'
    ],
    [
        'Jump 50',
        'JD50'
    ],
    [
        'Jump 75',
        'JD75'
    ],
    [
        'Jump 100',
        'JD100'
    ]
];
const LOOKBACKS = [
    25,
    50,
    100,
    200
];
function MatchAiApp() {
    _s();
    const [symbol, setSymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('R_100');
    const [livePrice, setLivePrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [digits, setDigits] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [connected, setConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        lookback: 100,
        stake: '10',
        sound: true,
        threshold: 75
    });
    const [flash, setFlash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const subscriptionIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reconnectTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastSignalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>{
            try {
                const saved = localStorage.getItem('match-ai-settings');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    setSettings({
                        "MatchAiApp.useEffect": (current)=>({
                                lookback: LOOKBACKS.includes(parsed.lookback) ? parsed.lookback : current.lookback,
                                stake: typeof parsed.stake === 'string' ? parsed.stake : current.stake,
                                sound: typeof parsed.sound === 'boolean' ? parsed.sound : current.sound,
                                threshold: typeof parsed.threshold === 'number' ? parsed.threshold : current.threshold
                            })
                    }["MatchAiApp.useEffect"]);
                }
            } catch  {
            // Keep defaults if stored settings are invalid.
            }
        }
    }["MatchAiApp.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>{
            localStorage.setItem('match-ai-settings', JSON.stringify(settings));
        }
    }["MatchAiApp.useEffect"], [
        settings
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>{
            let disposed = false;
            const connect = {
                "MatchAiApp.useEffect.connect": ()=>{
                    if (disposed) return;
                    setConnected(false);
                    const socket = new WebSocket(DERIV_WS_URL);
                    socketRef.current = socket;
                    subscriptionIdRef.current = null;
                    socket.onopen = ({
                        "MatchAiApp.useEffect.connect": ()=>{
                            setConnected(true);
                            socket.send(JSON.stringify({
                                ticks_history: symbol,
                                count: 200,
                                end: 'latest',
                                style: 'ticks'
                            }));
                        }
                    })["MatchAiApp.useEffect.connect"];
                    socket.onmessage = ({
                        "MatchAiApp.useEffect.connect": (event)=>{
                            const message = JSON.parse(event.data);
                            if (message.error) {
                                setConnected(false);
                                return;
                            }
                            if (message.history?.prices) {
                                const backfilled = message.history.prices.map({
                                    "MatchAiApp.useEffect.connect.backfilled": (price)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLastDigit"])(price)
                                }["MatchAiApp.useEffect.connect.backfilled"]).filter({
                                    "MatchAiApp.useEffect.connect.backfilled": (digit)=>digit !== null
                                }["MatchAiApp.useEffect.connect.backfilled"]);
                                setDigits(backfilled.slice(-MAX_DIGITS));
                                const latest = message.history.prices.at(-1);
                                if (typeof latest === 'number') setLivePrice(latest);
                                socket.send(JSON.stringify({
                                    ticks: symbol,
                                    subscribe: 1
                                }));
                            }
                            if (message.tick) {
                                subscriptionIdRef.current = message.tick.subscription_id ?? subscriptionIdRef.current;
                                const price = Number(message.tick.quote);
                                const digit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLastDigit"])(price);
                                if (digit !== null) {
                                    setLivePrice(price);
                                    setDigits({
                                        "MatchAiApp.useEffect.connect": (current)=>[
                                                ...current,
                                                digit
                                            ].slice(-MAX_DIGITS)
                                    }["MatchAiApp.useEffect.connect"]);
                                }
                            }
                        }
                    })["MatchAiApp.useEffect.connect"];
                    socket.onerror = ({
                        "MatchAiApp.useEffect.connect": ()=>setConnected(false)
                    })["MatchAiApp.useEffect.connect"];
                    socket.onclose = ({
                        "MatchAiApp.useEffect.connect": ()=>{
                            setConnected(false);
                            subscriptionIdRef.current = null;
                            if (!disposed) {
                                reconnectTimerRef.current = setTimeout(connect, 1500);
                            }
                        }
                    })["MatchAiApp.useEffect.connect"];
                }
            }["MatchAiApp.useEffect.connect"];
            connect();
            return ({
                "MatchAiApp.useEffect": ()=>{
                    disposed = true;
                    if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
                    const socket = socketRef.current;
                    if (socket?.readyState === WebSocket.OPEN && subscriptionIdRef.current !== null) {
                        socket.send(JSON.stringify({
                            forget: subscriptionIdRef.current
                        }));
                    }
                    socket?.close();
                    socketRef.current = null;
                }
            })["MatchAiApp.useEffect"];
        }
    }["MatchAiApp.useEffect"], [
        symbol
    ]);
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchAiApp.useMemo[result]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$match$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeMatchDigits"])(digits, settings.lookback)
    }["MatchAiApp.useMemo[result]"], [
        digits,
        settings.lookback
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchAiApp.useEffect": ()=>{
            if (!result.best || result.waiting || result.confidence <= settings.threshold) return;
            const signalKey = `${symbol}:${result.best.digit}:${result.confidence}`;
            if (lastSignalRef.current === signalKey) return;
            lastSignalRef.current = signalKey;
            setFlash(true);
            window.setTimeout({
                "MatchAiApp.useEffect": ()=>setFlash(false)
            }["MatchAiApp.useEffect"], 900);
            if (settings.sound) {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (AudioContextClass) {
                    const audio = new AudioContextClass();
                    const oscillator = audio.createOscillator();
                    const gain = audio.createGain();
                    oscillator.frequency.value = 880;
                    gain.gain.setValueAtTime(0.08, audio.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.18);
                    oscillator.connect(gain);
                    gain.connect(audio.destination);
                    oscillator.start();
                    oscillator.stop(audio.currentTime + 0.18);
                    oscillator.onended = ({
                        "MatchAiApp.useEffect": ()=>void audio.close()
                    })["MatchAiApp.useEffect"];
                }
            }
        }
    }["MatchAiApp.useEffect"], [
        result,
        settings.sound,
        settings.threshold,
        symbol
    ]);
    const marketName = MARKETS.find(([, value])=>value === symbol)?.[0] ?? symbol;
    const updateSetting = (key, value)=>{
        setSettings((current)=>({
                ...current,
                [key]: value
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: `min-h-screen bg-white text-slate-900 transition-colors ${flash ? 'ring-4 ring-inset ring-blue-400' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-3xl px-4 py-5 sm:px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "flex items-center justify-between gap-3 rounded-2xl bg-gray-100 p-4 shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-xl font-bold sm:text-2xl",
                                    children: "Match AI"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 198,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-500 sm:text-sm",
                                    children: "Matches only"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: symbol,
                                onChange: (event)=>setSymbol(event.target.value),
                                "aria-label": "Market",
                                className: "max-w-36 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-blue-500 sm:max-w-none",
                                children: MARKETS.map(([name, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: value,
                                        children: name
                                    }, value, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 209,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 201,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mt-4 flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3 shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold uppercase tracking-wide text-gray-400",
                                    children: marketName
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 217,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-lg font-bold tabular-nums",
                                    children: livePrice === null ? '--' : livePrice
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 216,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-sm font-semibold text-gray-600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `h-2.5 w-2.5 rounded-full bg-green-500 ${connected ? 'animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-gray-400'}`
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this),
                                connected ? 'LIVE' : 'RECONNECTING'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 215,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mt-4 rounded-2xl bg-gray-100 p-5 text-center shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-bold uppercase tracking-[0.2em] text-gray-500",
                            children: "AI Signal"
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this),
                        result.waiting || !result.best ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-3 text-3xl font-black text-gray-700",
                                    children: "WAIT"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 232,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto mt-4 h-3 max-w-md overflow-hidden rounded-full bg-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full w-0 rounded-full bg-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 234,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 233,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700",
                                    children: "WAIT - NO SETUP"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 236,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-sm text-gray-500",
                                    children: "No strong setup at the current tick gap."
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 239,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 231,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-2 text-5xl font-black text-blue-600",
                                    children: [
                                        "MATCH ",
                                        result.best.digit
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 243,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-lg font-bold text-slate-800",
                                    children: [
                                        result.confidence,
                                        "% Confidence"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 244,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto mt-4 h-3 max-w-md overflow-hidden rounded-full bg-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full rounded-full bg-blue-500 transition-all duration-300",
                                        style: {
                                            width: `${result.confidence}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 246,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 245,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${result.risk === 'LOW RISK' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`,
                                    children: result.risk
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 248,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-sm text-gray-600",
                                    children: [
                                        "Gap: ",
                                        result.best.gap,
                                        " ticks | Hit rate: ",
                                        result.best.percentage.toFixed(1),
                                        "% in last ",
                                        settings.lookback
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 255,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 242,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 228,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mt-4 rounded-2xl bg-gray-100 p-4 shadow-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-5 gap-2 sm:grid-cols-10",
                        children: result.ranked.map((item)=>{
                            const isBest = result.best?.digit === item.digit && !result.waiting;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `rounded-xl px-1 py-3 text-center shadow-sm ${isBest ? 'bg-blue-600 text-white ring-2 ring-blue-300' : 'bg-white text-slate-900'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-lg font-black",
                                        children: item.digit
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 273,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1 text-xs font-bold",
                                        children: [
                                            item.percentage.toFixed(1),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 274,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `text-[11px] ${isBest ? 'text-blue-100' : 'text-gray-500'}`,
                                        children: [
                                            "Gap ",
                                            item.gap
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 275,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, item.digit, true, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 267,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/match-ai-app.tsx",
                        lineNumber: 263,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 262,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mt-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-3 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-bold",
                                    children: "Last 20 digits"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-500",
                                    children: "Live"
                                }, void 0, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 285,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 283,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 overflow-x-auto pb-1",
                            children: digits.slice(-20).map((digit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold",
                                    children: digit
                                }, `${digit}-${index}`, false, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 289,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 287,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 282,
                    columnNumber: 9
                }, this),
                result.ranked.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mt-4 grid grid-cols-3 gap-2",
                    children: result.ranked.slice(0, 3).map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl bg-gray-100 px-3 py-2 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-bold text-gray-500",
                                    children: [
                                        "#",
                                        index + 1
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 300,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-black text-blue-600",
                                    children: [
                                        "MATCH ",
                                        item.digit
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/match-ai-app.tsx",
                                    lineNumber: 301,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, item.digit, true, {
                            fileName: "[project]/components/match-ai-app.tsx",
                            lineNumber: 299,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 297,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mt-4 rounded-2xl bg-gray-100 p-4 shadow-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 sm:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500",
                                        children: "Lookback"
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 310,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-4 gap-2",
                                        children: LOOKBACKS.map((value)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>updateSetting('lookback', value),
                                                className: `rounded-xl px-2 py-2 text-sm font-bold ${settings.lookback === value ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`,
                                                children: value
                                            }, value, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 313,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 311,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 309,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs font-bold text-gray-500",
                                        children: [
                                            "Stake",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: "0",
                                                value: settings.stake,
                                                onChange: (event)=>updateSetting('stake', event.target.value),
                                                className: "mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-900"
                                            }, void 0, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 327,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 325,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs font-bold text-gray-500",
                                        children: [
                                            "Confidence %",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: "0",
                                                max: "95",
                                                value: settings.threshold,
                                                onChange: (event)=>updateSetting('threshold', Math.max(0, Math.min(95, Number(event.target.value) || 0))),
                                                className: "mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-900"
                                            }, void 0, false, {
                                                fileName: "[project]/components/match-ai-app.tsx",
                                                lineNumber: 337,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 335,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 324,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm font-bold sm:col-span-2",
                                children: [
                                    "Sound alert",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        role: "switch",
                                        "aria-checked": settings.sound,
                                        onClick: ()=>updateSetting('sound', !settings.sound),
                                        className: `relative h-6 w-11 rounded-full transition-colors ${settings.sound ? 'bg-blue-600' : 'bg-gray-300'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${settings.sound ? 'left-6' : 'left-1'}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/match-ai-app.tsx",
                                            lineNumber: 356,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/match-ai-app.tsx",
                                        lineNumber: 349,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/match-ai-app.tsx",
                                lineNumber: 347,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/match-ai-app.tsx",
                        lineNumber: 308,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 307,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "py-6 text-center text-xs text-gray-400",
                    children: "Analysis only. Not financial advice."
                }, void 0, false, {
                    fileName: "[project]/components/match-ai-app.tsx",
                    lineNumber: 362,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/match-ai-app.tsx",
            lineNumber: 195,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/match-ai-app.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
_s(MatchAiApp, "LEfASLJTSPSyaFV5rqgGkZg2k7I=");
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
    const roundedConfidence = Math.round(confidence);
    const allDigitsHaveRecentHits = ranked.every((item)=>item.gap < 12);
    let risk;
    if (allDigitsHaveRecentHits) {
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