import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";

const ABOUT_TEXT = `
PVP Kishore is a Programmer, Web Developer, and C++ Developer currently in his 3rd year of Civil Engineering at NIT Calicut. He is highly interested in technology, web development, video editing, and building practical projects.

CONTACT:
- Email: pvpkishore09@gmail.com
- Profiles: LinkedIn, GitHub, LeetCode

INTERNSHIPS / EXPERIENCE:
1. Full Stack Developer Intern - Prodigy Infotech (Nov 2024 - Dec 2024)
   - Built a complete Bookstore MERN application with secure user authentication (bcrypt).
   - Created modern, responsive UI using React.js and Tailwind CSS.
   - Implemented CRUD operations using MongoDB.
   - Built a Stopwatch Web App with lap tracking and smooth UI.
   - Developed an Interactive Tic-Tac-Toe game with animations and an AI opponent.

2. Web Developer - Afametechnologies

SKILLS:
- Programming Languages: C, C++, Python, JavaScript
- Frontend: React.js, Next.js, Tailwind CSS, Bootstrap, Material UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Tools & Services: VS Code, Git, REST APIs, Postman, RapidAPI
- Additional: Video Editing

PROJECTS:
1. PassOP (Password Manager)
2. Book Store (MERN)
3. GitHub Glazer
4. Bittree (Linktree Clone)
5. DevChronicles (Portfolio)
6. Real-Time Chat App
7. GitHub Profile Finder
8. WeatherX
`;

const PROJECT_QUERY_REGEX = /(project|passop|book store|github glazer|bittree|devchronicles|weatherx|tech stack|built)/i;

const SUGGESTED_QUESTIONS = [
  "Who is Kishore?",
  "What are his core skills?",
  "Explain PassOP project",
  "Tell me about Book Store project",
  "Where did he intern?",
  "Share contact details"
];

const BotAvatar = ({ size = 34 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      background: "linear-gradient(145deg, #f59e0b, #ef4444)",
      display: "grid",
      placeItems: "center",
      boxShadow: "0 8px 22px rgba(239,68,68,0.35)",
      border: "1px solid rgba(251,191,36,0.6)",
      fontSize: 12,
      fontWeight: 700,
      color: "#fff",
      letterSpacing: 0.5,
    }}
  >
    AI
  </div>
);

const TypingDots = () => (
  <div style={{ display: "inline-flex", gap: 5 }}>
    <span style={dotStyle(0)} />
    <span style={dotStyle(120)} />
    <span style={dotStyle(240)} />
    <style>{`
      @keyframes avxDot {
        0% { transform: translateY(0); opacity: .5; }
        40% { transform: translateY(-4px); opacity: 1; }
        100% { transform: translateY(0); opacity: .5; }
      }
    `}</style>
  </div>
);

function dotStyle(delay) {
  return {
    width: 7,
    height: 7,
    borderRadius: 7,
    background: "#fbbf24",
    animation: `avxDot .9s ${delay}ms infinite`,
  };
}

function limitWords(text, maxWords) {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return `${words.slice(0, maxWords).join(" ")}...`;
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hey, I am JARVIS for Kishore. Ask me anything.",
      createdAt: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const getScreenSize = () => {
    const w = window.innerWidth;
    if (w < 640) return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  };

  const [screenSize, setScreenSize] = useState(getScreenSize);

  const [pos, setPos] = useState(() => ({
    x: Math.max(8, window.innerWidth - 556),
    y: 68,
  }));

  const wrapRef = useRef(null);
  const scrollRef = useRef(null);
  const fabRef = useRef(null);
  const dragRef = useRef({ active: false, offsetX: 0, offsetY: 0 });

  const wrapperStyle = useMemo(() => {
    if (screenSize === "mobile") {
      return {
        width: "100vw",
        height: "90vh",
        left: 0,
        bottom: 0,
        top: "auto",
        borderRadius: "1.25rem 1.25rem 0 0",
      };
    }
    if (screenSize === "tablet") {
      return {
        width: "min(94vw, 560px)",
        height: "88vh",
        left: "50%",
        top: "5vh",
        transform: "translateX(-50%)",
      };
    }
    return {
      width: 540,
      height: "calc(100vh - 80px)",
      maxHeight: 820,
      left: pos.x,
      top: pos.y,
    };
  }, [screenSize, pos]);

  useEffect(() => {
    const onResize = () => setScreenSize(getScreenSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && wrapRef.current) {
      gsap.fromTo(wrapRef.current, { opacity: 0, y: 14, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.26 });
    }
  }, [open]);

  useEffect(() => {
    const tween = gsap.to(fabRef.current, {
      y: -6,
      duration: 1.1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
    return () => tween.kill();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
        setMinimized(false);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const startDrag = (e) => {
    if (screenSize !== "desktop") return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    dragRef.current = { active: true, offsetX: x - pos.x, offsetY: y - pos.y };
  };

  const onDrag = (e) => {
    if (screenSize !== "desktop" || !dragRef.current.active) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const y = e.clientY ?? e.touches?.[0]?.clientY;

    setPos({
      x: Math.max(8, Math.min(x - dragRef.current.offsetX, window.innerWidth - 548)),
      y: Math.max(8, Math.min(y - dragRef.current.offsetY, window.innerHeight - 200)),
    });
  };

  const endDrag = () => {
    dragRef.current.active = false;
  };

    // Global drag — works even when cursor leaves the panel
    useEffect(() => {
      const handleMove = (e) => {
        if (!dragRef.current.active) return;
        const x = e.clientX ?? e.touches?.[0]?.clientX;
        const y = e.clientY ?? e.touches?.[0]?.clientY;
        if (x == null || y == null) return;
        setPos({
          x: Math.max(8, Math.min(x - dragRef.current.offsetX, window.innerWidth - 548)),
          y: Math.max(8, Math.min(y - dragRef.current.offsetY, window.innerHeight - 200)),
        });
      };
      const handleUp = () => { dragRef.current.active = false; };
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchmove", handleMove, { passive: true });
      window.addEventListener("touchend", handleUp);
      return () => {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleUp);
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleUp);
      };
    }, []);

  const appendBotTyping = () => {
    setMessages((prev) => [...prev, { id: "typing", sender: "bot", typing: true, createdAt: Date.now() }]);
  };

  const removeBotTyping = () => {
    setMessages((prev) => prev.filter((item) => item.id !== "typing"));
  };

  const typeReply = async (fullText) => {
    const replyId = `bot-${Date.now()}`;
    setMessages((prev) => [...prev, { id: replyId, sender: "bot", text: "", createdAt: Date.now() }]);

    return new Promise((resolve) => {
      let idx = 0;
      const timer = setInterval(() => {
        idx += 1;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === replyId ? { ...m, text: `${fullText.slice(0, idx)}${idx < fullText.length ? "|" : ""}` } : m
          )
        );

        if (idx >= fullText.length) {
          clearInterval(timer);
          setMessages((prev) => prev.map((m) => (m.id === replyId ? { ...m, text: fullText } : m)));
          resolve();
        }
      }, 10);
    });
  };

  const sendMessage = async (forcedText) => {
    const q = (forcedText ?? input).trim();
    if (!q) return;

    const greeting = /^(hi|hii|hello|hey|yo|hola)$/i.test(q);
    if (greeting) {
      setMessages((prev) => [
        ...prev,
        { id: `u-${Date.now()}`, sender: "user", text: q, createdAt: Date.now() },
        {
          id: `b-${Date.now() + 1}`,
          sender: "bot",
          text: "Hi. Ask about skills, projects, internships, or contact and I will keep it short.",
          createdAt: Date.now(),
        },
      ]);
      setInput("");
      return;
    }

    const userMessage = { id: `u-${Date.now()}`, sender: "user", text: q, createdAt: Date.now() };
    setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, userMessage]);
    appendBotTyping();

    try {
      const briefLimit = PROJECT_QUERY_REGEX.test(q) ? 100 : 50;
      const history = [...messages, userMessage]
        .filter((m) => m.sender && m.text)
        .slice(-8)
        .map((m) => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text.replace(/\|$/, "") }));

        const requestMessages = [
        {
          role: "system",
          content:
            "You are Kishore's personal AI assistant in JARVIS style: professional, warm, and direct. Use ONLY facts from ABOUT. If user asks non-profile info, say it is not in profile. Keep most replies under 50 words. For project-related questions, keep under 100 words. No hallucinations. Prefer short clear sentences.",
        },
        { role: "system", content: `ABOUT:\n${ABOUT_TEXT}` },
        ...history,
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: requestMessages }),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}));
        throw new Error(error || `Request failed (${res.status})`);
      }

      const data = await res.json();
      const raw = data?.choices?.[0]?.message?.content || "I could not generate an answer.";
      const cleaned = limitWords(raw.replace(/\n{3,}/g, "\n\n"), briefLimit);

      removeBotTyping();
      await typeReply(cleaned);
    } catch (err) {
      removeBotTyping();
      setMessages((prev) => [
        ...prev,
        { id: `e-${Date.now()}`, sender: "bot", text: `Error: ${err.message}`, createdAt: Date.now() },
      ]);
    }

    setLoading(false);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `c-${Date.now()}`,
        sender: "bot",
        text: "Memory reset complete. Ready for your next query.",
        createdAt: Date.now(),
      },
    ]);
  };

  const regenerateReply = async () => {
    if (loading) return;
    const lastUser = [...messages].reverse().find((m) => m.sender === "user");
    if (lastUser?.text) {
      await sendMessage(lastUser.text);
    }
  };

  const copyLastAnswer = async () => {
    const lastBot = [...messages].reverse().find((m) => m.sender === "bot" && m.text && !m.typing);
    if (!lastBot) return;
    await navigator.clipboard.writeText(lastBot.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const renderMessage = (m) => {
    const isUser = m.sender === "user";
    const clock = new Date(m.createdAt || Date.now()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <motion.div
        key={m.id}
        className="mb-4 flex"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{ justifyContent: isUser ? "flex-end" : "flex-start" }}
      >
        {!isUser && <BotAvatar />}

        <div
          className="relative max-w-[78%] px-4 py-3 rounded-2xl"
          style={{
            marginLeft: isUser ? 0 : 10,
            marginRight: isUser ? 10 : 0,
            background: isUser
              ? "linear-gradient(120deg, rgba(37,99,235,.95), rgba(220,38,38,.95))"
              : "linear-gradient(160deg, rgba(17,24,39,.92), rgba(30,41,59,.92))",
            color: "#f8fafc",
            border: "1px solid rgba(148,163,184,.25)",
            boxShadow: "0 14px 30px rgba(2,6,23,.32)",
            whiteSpace: "pre-wrap",
          }}
        >
          {m.typing ? <TypingDots /> : m.text}
          {!m.typing ? <div style={{ fontSize: 10, opacity: 0.65, marginTop: 7 }}>{clock}</div> : null}
        </div>

        {isUser ? (
          <div className="w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center">
            <span className="font-bold text-black text-xs">PK</span>
          </div>
        ) : null}
      </motion.div>
    );
  };

  return (
    <>
      {!open || minimized ? (
        <motion.button
          ref={fabRef}
          onClick={() => {
            setOpen(true);
            setMinimized(false);
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`fixed ${screenSize === "mobile" ? "bottom-4 right-4 w-12 h-12 text-2xl" : "bottom-6 right-6 w-16 h-16 text-3xl"} z-[9999] text-white rounded-full`}
          style={{
            background: "conic-gradient(from 120deg, #dc2626, #2563eb, #f59e0b, #dc2626)",
            border: "1px solid rgba(251,191,36,.65)",
            boxShadow: "0 18px 35px rgba(220,38,38,.35)",
            fontFamily: "Orbitron, sans-serif",
          }}
          aria-label="Open assistant"
        >
          A
        </motion.button>
      ) : null}

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={wrapRef}
            initial={{ opacity: 0, y: screenSize === "mobile" ? 60 : 26, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: minimized
                ? "auto"
                : screenSize === "mobile"
                ? "90vh"
                : screenSize === "tablet"
                ? "88vh"
                : "calc(100vh - 80px)",
            }}
            exit={{
              opacity: 0,
              y: screenSize === "mobile" ? 60 : 20,
              scale: 0.98,
            }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed z-[9998] shadow-2xl overflow-hidden border flex flex-col"
            style={{
              ...wrapperStyle,
              height: undefined,
              maxHeight: minimized ? undefined : screenSize === "desktop" ? 820 : undefined,
              position: "fixed",
              background: "linear-gradient(180deg, rgba(2,6,23,0.97), rgba(15,23,42,0.97))",
              borderColor: "rgba(248,113,113,.32)",
              borderRadius: screenSize === "mobile" ? "1.25rem 1.25rem 0 0" : "1rem",
            }}
          >
            <div
              onMouseDown={startDrag}
              onTouchStart={startDrag}
              className="px-3 py-2 text-white flex-shrink-0"
              style={{
                cursor: screenSize === "desktop" ? "grab" : "default",
                background: "linear-gradient(90deg, rgba(30,64,175,.45), rgba(185,28,28,.45))",
                borderBottom: "1px solid rgba(251,191,36,.28)",
              }}
            >
              {/* Mobile: drag handle bar */}
              {screenSize === "mobile" && (
                <div className="flex justify-center mb-2">
                  <div style={{ width: 40, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.25)" }} />
                </div>
              )}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    style={{
                      flexShrink: 0,
                      width: screenSize === "mobile" ? 28 : 34,
                      height: screenSize === "mobile" ? 28 : 34,
                      borderRadius: 999,
                      border: "2px solid rgba(251,191,36,.8)",
                      boxShadow: "inset 0 0 0 3px rgba(29,78,216,.45)",
                    }}
                  />
                  <div className="min-w-0">
                    <div
                      className="font-bold tracking-wide avengers-title truncate"
                      style={{ fontSize: screenSize === "mobile" ? 12 : 14 }}
                    >
                      JARVIS // KISHORE OS
                    </div>
                    {screenSize !== "mobile" && (
                      <div className="text-[11px] opacity-70">Profile Intelligence • Ctrl/Cmd + K</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {screenSize !== "mobile" && (
                    <button onClick={clearChat} className="assistant-control">Clear</button>
                  )}
                  <button onClick={copyLastAnswer} className="assistant-control">{copied ? "✓" : "Copy"}</button>
                  {screenSize !== "mobile" && (
                    <button onClick={regenerateReply} className="assistant-control">Retry</button>
                  )}
                  <button
                    onClick={() => setMinimized((v) => !v)}
                    className="assistant-control"
                    title={minimized ? "Expand" : "Collapse"}
                    style={{ fontSize: 14, padding: "0.2rem 0.55rem", lineHeight: 1 }}
                  >
                    <motion.span
                      animate={{ rotate: minimized ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ display: "inline-block" }}
                    >
                      ▲
                    </motion.span>
                  </button>
                  <button onClick={() => setOpen(false)} className="assistant-control">✕</button>
                </div>
              </div>
            </div>

            {!minimized && (
              <>
                <div
                  ref={scrollRef}
                  className="p-5 overflow-y-auto"
                  style={{
                    flex: "1 1 0",
                    minHeight: 0,
                    background:
                      "radial-gradient(circle at 20% 18%, rgba(37,99,235,.18), transparent 30%), radial-gradient(circle at 80% 8%, rgba(220,38,38,.18), transparent 32%), rgba(2,6,23,.55)",
                  }}
                >
                  {messages.map((m) => renderMessage(m))}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    padding: "10px 14px",
                    borderTop: "1px solid rgba(148,163,184,.2)",
                    borderBottom: "1px solid rgba(148,163,184,.2)",
                    background: "rgba(15,23,42,.86)",
                  }}
                >
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="assistant-control"
                      style={{ fontSize: 12, padding: "0.42rem 0.72rem" }}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <div className="p-3" style={{ background: "rgba(2,6,23,.94)" }}>
                  <div className="flex gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Ask profile, projects, or internship details..."
                      className={`flex-1 px-3 ${screenSize === "mobile" ? "py-3" : "py-2"} rounded-lg outline-none bg-slate-800 text-slate-50 font-medium caret-amber-400 placeholder:text-slate-500 border border-slate-500 focus:border-amber-400/70 transition-colors`}
                    />
                    <button onClick={sendMessage} disabled={loading} className="premium-btn px-4 py-2">
                      {loading ? "..." : "Send"}
                    </button>
                  </div>
                  {screenSize !== "mobile" && (
                    <div className="text-xs mt-2 opacity-70 text-slate-300 flex items-center justify-between">
                      <span>OpenAI powered - concise mode</span>
                      <span>50 words default | 100 for projects</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
