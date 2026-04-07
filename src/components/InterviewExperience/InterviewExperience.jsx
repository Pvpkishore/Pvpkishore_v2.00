import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import AvengersGlyph from "../Effects/AvengersGlyph";

const INTERVIEW_LOG = [
  {
    company: "SWISS RE",
    role: "Software Engineer Intern",
    date: "Jan 2026",
    round: "DSA Round",
    outcome: "Completed",
    takeaways: [
      "Focus on optimized graph traversal explanations.",
      "Communicate time-space tradeoffs early.",
      "Add test cases before coding each function."
    ]
  },
//   {
//     company: "Amazon (Mock)",
//     role: "Frontend Developer",
//     date: "Nov 2025",
//     round: "LLD + React",
//     outcome: "Completed",
//     takeaways: [
//       "Narrate component decomposition before implementation.",
//       "Prepare reusable hooks for pagination and filtering.",
//       "Discuss accessibility checkpoints while building UI."
//     ]
//   }
{
    company: "Infosys",
    role: "Specialist Programmer",
    date: "Oct 2025",
    round: "DSA Round",
    outcome: "Completed",
    takeaways: [
      "Most important Dsa and brush up dsa part"
    ]
  },
  {
    company: "Deloitte",
    role: "Analyst",
    date: "Oct 2025",
    round: "DSA Round",
    outcome: "Completed",
    takeaways: [
      "python and Sql are mandatory"
    ]
  }
];

const InterviewExperience = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "top 40%",
        scrub: true,
      },
    });

    tl.fromTo(
      sectionRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    );

    cardRefs.current.forEach((card, index) => {
      tl.fromTo(
        card,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        `<${index * 0.16}`
      );
    });
  }, []);

  return (
    <section id="interview" ref={sectionRef} className="py-6 px-3 premium-surface mt-3 hud-interview">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-5">
        <h2 className="text-2xl md:text-3xl font-poppins font-bold avengers-title">Interview Experience</h2>
        <p className="text-xs md:text-sm text-slate-300">
          Update the INTERVIEW_LOG array in this component to add future interviews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {INTERVIEW_LOG.map((item, index) => (
          <motion.article
            key={`${item.company}-${item.date}`}
            ref={(el) => (cardRefs.current[index] = el)}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-amber-300/25 bg-slate-900/65 p-4"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-start gap-2">
                <AvengersGlyph size={18} />
                <div>
                <h3 className="font-poppins text-lg text-slate-100">{item.company}</h3>
                <p className="text-sm text-slate-300">{item.role}</p>
                </div>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full border ${
                  item.outcome === "Completed"
                    ? "border-emerald-400/60 text-emerald-300"
                    : "border-amber-400/60 text-amber-300"
                }`}
              >
                {item.outcome}
              </span>
            </div>

            <div className="text-xs text-slate-400 mb-3">
              <span>{item.date}</span>
              <span className="mx-2">•</span>
              <span>{item.round}</span>
            </div>

            <ul className="space-y-1 text-sm text-slate-200">
              {item.takeaways.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1"><AvengersGlyph size={12} /></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default InterviewExperience;
