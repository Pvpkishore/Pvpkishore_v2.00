// src/components/AIAssistant/ChatAssistant.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/*
 Premium Responsive Chat Assistant (Style C)
 - Desktop draggable
 - Mobile centered popup
 - Fixed input bar
 - Typing dots animation
 - Bubble tails
 - DeepSeek API via OpenRouter
*/

const ABOUT_TEXT = `
PVP Kishore is a Programmer, Web Developer, and C++ Developer currently in his 3rd year of Civil Engineering at NIT Calicut. He is highly interested in technology, web development, video editing, and building practical projects.

CONTACT:
- Email: pvpkishore09@gmail.com
- Profiles: LinkedIn, GitHub, LeetCode

INTERNSHIPS / EXPERIENCE:
1. Full Stack Developer Intern — Prodigy Infotech (Nov 2024 – Dec 2024)
   - Built a complete Bookstore MERN application with secure user authentication (bcrypt).
   - Created modern, responsive UI using React.js and Tailwind CSS.
   - Implemented CRUD operations using MongoDB.
   - Built a Stopwatch Web App with lap tracking and smooth UI.
   - Developed an Interactive Tic-Tac-Toe game with animations and an AI opponent.

2. Web Developer — Afametechnologies

SKILLS:
- Programming Languages: C, C++, Python, JavaScript
- Frontend: React.js, Next.js, Tailwind CSS, Bootstrap, Material UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Tools & Services: VS Code, Git, REST APIs, Postman, RapidAPI
- Additional: Video Editing

PROJECTS:

1. PassOP (Password Manager)
   - Secure storage for website URLs, usernames, and passwords.
   - Features create/edit/delete entries.
   - Tech: React.js, MongoDB, Node.js, Express.js, Tailwind CSS

2. Book Store (MERN)
   - Full MERN app with authentication and user profile management.
   - Smooth navigation, responsive design, scalable UI.
   - Tech: React, Node, Express, MongoDB, Tailwind

3. GitHub Glazer
   - Motivational tool generating words of encouragement for developers.
   - Tech: TypeScript, React on Vite, Tailwind, OpenAI

4. Bittree (Linktree Clone)
   - Customizable profile link-sharing platform.
   - Tech: Next.js, Express.js, Tailwind CSS

5. DevChronicles (Portfolio)
   - Portfolio showing JavaScript, React, backend, and full-stack work.
   - Features themes, categories, and smooth UI animations.
   - Tech: React.js, Tailwind, Material UI

6. Real-Time Chat App
   - A real-time messaging platform using WebSocket.io.
   - Tech: Node.js, Express.js, Socket.io

7. GitHub Profile Finder
   - Fetches GitHub user data using GitHub API.
   - Displays profile image, repositories, followers, etc.
   - Tech: HTML, CSS/Tailwind, JS

8. WeatherX
   - Weather app fetching real-time weather data using API.
   - Tech: HTML, CSS, JavaScript, RapidAPI

OTHER NOTES:
- Kishore loves building clean, responsive, and fast web apps.
- He enjoys exploring new technologies and working on creative coding projects.
- He is always open to discussing new opportunities, ideas, or collaborations.
`;

/* ---------------- BOT AVATAR ---------------- */
const BotAvatar = ({ size = 36 }) => (
    <div
        style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 18px rgba(16,24,40,0.06)",
        }}
    >
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#2563eb" />
            <circle cx="9" cy="10" r="1.25" fill="white" />
            <circle cx="15" cy="10" r="1.25" fill="white" />
            <rect x="8" y="13.5" width="8" height="1.6" rx="0.8" fill="white" />
        </svg>
    </div>
);

/* ---------------- TYPING DOTS ---------------- */
const TypingDots = ({ color = "#64748b" }) => (
    <div style={{ display: "inline-flex", gap: 6 }}>
        <span style={dotStyle(color, 0)} />
        <span style={dotStyle(color, 150)} />
        <span style={dotStyle(color, 300)} />
        <style>{`
      @keyframes dotBounce {
        0% { transform: translateY(0); opacity: .6; }
        30% { transform: translateY(-6px); opacity: 1; }
        60% { transform: translateY(0); opacity: .6; }
      }
    `}</style>
    </div>
);

function dotStyle(color, delay) {
    return {
        width: 8,
        height: 8,
        borderRadius: 8,
        background: color,
        animation: `dotBounce .9s ${delay}ms infinite`,
    };
}

/* ---------------- BUBBLE TAIL ---------------- */
const BubbleTail = ({ side, color }) => (
    <svg
        width="20"
        height="18"
        viewBox="0 0 24 24"
        style={{
            position: "absolute",
            bottom: -2,
            [side === "left" ? "left" : "right"]: -8,
            transform: side === "right" ? "scaleX(-1)" : "",
        }}
    >
        <path d="M5 20c4-3 7-5 10-5s6 2 8 5H5z" fill={color} />
    </svg>
);

/* -------------------------------------------------------- */
/* ---------------------- MAIN ---------------------------- */
/* -------------------------------------------------------- */
export default function ChatAssistant() {
    const [open, setOpen] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "bot",
            text: "Hello 👋 I’m Kishor’s AI Assistant. Ask me anything.",
            done: true,
        },
    ]);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const [pos, setPos] = useState({
        x: window.innerWidth - 360,
        y: window.innerHeight - 500,
    });

    const refWrapper = useRef(null);
    const refScroll = useRef(null);
    const drag = useRef({ active: false, offsetX: 0, offsetY: 0 });

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [dark, setDark] = useState(false);

    /* ---------------- DARK MODE DETECT ---------------- */
    useEffect(() => {
        const q = window.matchMedia("(prefers-color-scheme: dark)");
        setDark(q.matches);
        q.addEventListener("change", () => setDark(q.matches));
    }, []);

    /* ---------------- RESIZE DETECT ---------------- */
    useEffect(() => {
        const resize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    /* ---------------- GSAP OPEN ANIMATION ---------------- */
    useEffect(() => {
        if (open && refWrapper.current) {
            gsap.fromTo(
                refWrapper.current,
                { opacity: 0, y: 20, scale: 0.98 },
                { opacity: 1, y: 0, scale: 1, duration: 0.3 }
            );
        }
    }, [open]);

    /* ---------------- AUTOSCROLL ---------------- */
    useEffect(() => {
        if (refScroll.current) {
            refScroll.current.scrollTop = refScroll.current.scrollHeight;
        }
    }, [messages]);

    /* ---------------- TYPE EFFECT ---------------- */
    const typeText = async (text) =>
        new Promise((resolve) => {
            setMessages((m) => [...m, { id: "type", sender: "bot", text: "", done: false }]);
            let i = 0;
            const interval = setInterval(() => {
                i++;
                setMessages((m) =>
                    m.map((m) =>
                        m.id === "type" ? { ...m, text: text.slice(0, i) + "▌" } : m
                    )
                );
                if (i >= text.length) {
                    clearInterval(interval);
                    setMessages((m) =>
                        m.map((msg) =>
                            msg.id === "type"
                                ? { ...msg, text: text, done: true, id: Date.now() }
                                : msg
                        )
                    );
                    resolve();
                }
            }, 12);
        });

    /* ------------------------------------------------------- */
    /* 🔥 NEW — SEND MESSAGE USING DEEPSEEK (OPENROUTER)       */
    /* ------------------------------------------------------- */
    const sendMessage = async (forcedText) => {
        const q = (forcedText ?? input).trim();
        if (!q) return;

        // FIX: Local greeting handler to prevent DeepSeek blank responses
        const greetings = ["hi", "hii", "hello", "hey", "yo", "sup", "hlo", "hloo"];
        if (greetings.includes(q.toLowerCase())) {
            setMessages((m) => [
                ...m,
                { sender: "user", text: q, id: Date.now() },
                { sender: "bot", text: "Hi! 👋 How can I help you today?", id: Date.now() + 1 }
            ]);
            setInput("");
            return;
        }

        setInput("");
        setMessages((m) => [...m, { sender: "user", text: q, id: Date.now() }]);
        setMessages((m) => [...m, { sender: "bot", typingDots: true, id: "dots" }]);
        setLoading(true);

        try {
            const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

            const payload = {
                model: "deepseek/deepseek-r1:free",
                messages: [
                    {
                        role: "system",
                        content: `
You are Kishor's personal AI assistant.

BEHAVIOR RULES:
1. If the user sends a greeting (examples: "hi", "hello", "hey", "hii", "good morning", "what's up"), reply warmly and naturally. Do NOT restrict to ABOUT text for greetings.
2. If the user asks something ABOUT Kishor (projects, education, experience, skills, personal details, career, contact info), answer ONLY using the ABOUT section provided.
3. If the question is NOT found in the ABOUT section, politely say it is not in your profile and offer related info if helpful.
4. Never invent new facts about Kishor that are not in the ABOUT section.
5. Always respond in a friendly, conversational tone.

Follow these rules exactly.
`.trim()
                    }
                    ,
                    { role: "user", content: `ABOUT:\n${ABOUT_TEXT}` },
                    { role: "user", content: q },
                ],
                temperature: 0.2,
                max_tokens: 600,
            };

            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            const answer =
                data?.choices?.[0]?.message?.content ??
                data?.choices?.[0]?.text ??
                "I couldn't generate an answer.";

            // remove typing dots
            setMessages((m) => m.filter((x) => x.id !== "dots"));

            // type AI reply
            await typeText(answer);
        } catch (err) {
            setMessages((m) => [
                ...m.filter((x) => x.id !== "dots"),
                { sender: "bot", text: "Error: " + err.message, id: Date.now() },
            ]);
        }

        setLoading(false);
    };

    /* ---------------- CLEAR CHAT ---------------- */
    const clearChat = () =>
        setMessages([
            {
                sender: "bot",
                text: "Chat cleared! Ask me anything again.",
                id: Date.now(),
            },
        ]);

    /* ---------------- DRAG HANDLERS ---------------- */
    const startDrag = (e) => {
        if (isMobile) return;

        const x = e.clientX ?? e.touches?.[0]?.clientX;
        const y = e.clientY ?? e.touches?.[0]?.clientY;

        drag.current = {
            active: true,
            offsetX: x - pos.x,
            offsetY: y - pos.y,
        };
    };

    const duringDrag = (e) => {
        if (isMobile || !drag.current.active) return;

        const x = e.clientX ?? e.touches?.[0]?.clientX;
        const y = e.clientY ?? e.touches?.[0]?.clientY;

        setPos({
            x: Math.max(8, Math.min(x - drag.current.offsetX, window.innerWidth - 380)),
            y: Math.max(8, Math.min(y - drag.current.offsetY, window.innerHeight - 500)),
        });
    };

    const endDrag = () => {
        drag.current.active = false;
    };

    /* ---------------- RENDER SINGLE MESSAGE ---------------- */
    const renderMessage = (m) => {
        const isUser = m.sender === "user";

        return (
            <div
                key={m.id}
                className="mb-4 flex"
                style={{ justifyContent: isUser ? "flex-end" : "flex-start" }}
            >
                {!isUser && <BotAvatar />}

                <div
                    className="relative max-w-[75%] px-4 py-3 rounded-2xl shadow"
                    style={{
                        marginLeft: isUser ? 0 : 12,
                        marginRight: isUser ? 12 : 0,
                        background: isUser
                            ? "linear-gradient(90deg,#2563eb,#7c3aed)"
                            : dark
                                ? "#0b1220"
                                : "#fff",
                        color: isUser ? "#fff" : dark ? "#e4e7eb" : "#0f172a",
                    }}
                >
                    <BubbleTail
                        side={isUser ? "right" : "left"}
                        color={
                            isUser
                                ? "#2563eb"
                                : dark
                                    ? "#0b1220"
                                    : "#fff"
                        }
                    />

                    {m.typingDots ? <TypingDots /> : m.text}
                </div>

                {isUser && (
                    <div className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
                        <span className="font-bold text-black">PK</span>
                    </div>
                )}
            </div>
        );
    };

    /* ---------------- WRAPPER STYLE ---------------- */
    const wrapperStyle = isMobile
        ? {
            width: "92vw",
            height: "78vh",
            left: "4vw",
            top: "10vh",
        }
        : {
            width: 360,
            height: "75vh",
            left: pos.x,
            top: pos.y,
        };

    return (
        <>
            {/* FLOAT BUTTON */}
            {!open || minimized ? (
                <button
                    onClick={() => {
                        setOpen(true);
                        setMinimized(false);
                    }}
                    className="fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-blue-600 text-white text-3xl rounded-full shadow-xl hover:scale-110 transition"
                >
                    💬
                </button>
            ) : null}

            {/* CHAT WINDOW */}
            {open && (
                <div
                    ref={refWrapper}
                    onMouseMove={duringDrag}
                    onMouseUp={endDrag}
                    onTouchMove={duringDrag}
                    onTouchEnd={endDrag}
                    className="fixed z-[9998] rounded-2xl shadow-2xl overflow-hidden border"
                    style={{
                        ...wrapperStyle,
                        position: "fixed",
                        background: dark ? "#0b1220" : "#fff",
                        borderColor: dark ? "#1f2937" : "#e2e8f0",
                    }}
                >
                    {/* HEADER */}
                    <div
                        onMouseDown={startDrag}
                        onTouchStart={startDrag}
                        className={`px-4 py-3 flex justify-between items-center ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                        style={{ cursor: isMobile ? "default" : "grab" }}
                    >
                        <div className="flex items-center gap-3">
                            <BotAvatar />
                            <div>
                                <div className="font-bold text-sm">Kishor’s Assistant</div>
                                <div className="text-xs opacity-60">Answers from profile</div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={clearChat}>🧹</button>
                            <button onClick={() => setMinimized(true)}>—</button>
                            <button onClick={() => setOpen(false)}>✖</button>
                        </div>
                    </div>

                    {/* BODY */}
                    {!minimized ? (
                        <>
                            {/* messages */}
                            <div
                                ref={refScroll}
                                className="p-6 overflow-y-auto"
                                style={{
                                    height: "calc(100% - 220px)",
                                    background: dark ? "#071026" : "#f1f5f9",
                                }}
                            >
                                {messages.map((m) => renderMessage(m))}

                            </div>
                            {/* Suggested Questions */}
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 8,
                                    padding: "10px 14px",
                                    borderBottom: `1px solid ${dark ? "#0f1720" : "#eef2f7"}`,
                                    background: dark ? "#071026" : "#ffffff",
                                }}
                            >
                                {[
                                    "Tell about Kishor",
                                    "Who is Kishor?",
                                    "What skills does Kishor have?",
                                    "What projects has he built?",
                                    "Where did he work?",
                                    "Tell his contact information",
                                    "What is PassOP?",
                                    "Explain the Bookstore project",
                                ].map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => sendMessage(q)}
                                        style={{
                                            padding: "6px 12px",
                                            borderRadius: 20,
                                            fontSize: 12,
                                            border: "1px solid #3b82f6",
                                            background: "rgba(59,130,246,0.15)",
                                            color: "#3b82f6",
                                            cursor: "pointer",
                                            whiteSpace: "nowrap",
                                            transition: "0.2s",
                                        }}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>

                            {/* input */}
                            <div
                                className="p-3 border-t"
                                style={{
                                    background: dark ? "#0b1220" : "#fff",
                                    borderColor: dark ? "#1f2937" : "#e2e8f0",
                                }}
                            >
                                <div className="flex gap-2">
                                    <input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                        placeholder="Ask something..."
                                        className={`flex-1 px-3 py-2 rounded-lg outline-none ${dark
                                            ? "bg-gray-800 text-white border border-gray-700"
                                            : "bg-gray-100 text-gray-900 border border-gray-300"
                                            }`}
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={loading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        {loading ? "..." : "Send"}
                                    </button>
                                </div>

                                <div className="text-xs mt-2 opacity-60">
                                    Powered by DeepSeek (OpenRouter)
                                </div>
                            </div>
                        </>
                    ) : (
                        /* minimized bar */
                        <div className="p-3 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <BotAvatar />
                                <div>
                                    <div className="font-bold">Kishor’s Assistant</div>
                                    <div className="text-xs opacity-60">Minimized</div>
                                </div>
                            </div>
                            <button
                                className="px-3 py-1 bg-blue-600 text-white rounded"
                                onClick={() => setMinimized(false)}
                            >
                                Restore
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
