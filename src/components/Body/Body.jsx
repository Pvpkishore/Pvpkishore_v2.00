import React, { lazy, Suspense, useEffect, useRef } from "react";
import Hero from "../Hero/Hero";
import Experience from "../Experience/Experience";
import CareerJourney from "../CareerJourney/CareerJourney";
import Footer from "../Footer/Footer";
import ChatAssistant from "../AIAssistant/ChatAssistant";  // <-- ADD THIS
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Stack = lazy(() => import("../Stack/Stack"));
const Featured = lazy(() => import("../MajorProjects/MajorProjects"));
const Projects = lazy(() => import("../Projects/Projects"));
const InterviewExperience = lazy(() => import("../InterviewExperience/InterviewExperience"));
const Contact = lazy(() => import("../Contact/Contact"));

const SectionFallback = () => <div className="h-24 md:h-32" aria-hidden="true" />;

const reveal = {
	hidden: { opacity: 0, y: 28 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

const BodyCont = () => {
	const sectionRefs = useRef([]);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const animations = sectionRefs.current.map((section) =>
			gsap.fromTo(
				section,
				{ opacity: 0.35, y: 36, scale: 0.98, filter: "blur(3px)" },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					filter: "blur(0px)",
					duration: 0.9,
					ease: "power3.out",
					scrollTrigger: {
						trigger: section,
						start: "top 80%",
						end: "top 52%",
						scrub: true,
					},
				}
			)
		);

		return () => {
			animations.forEach((anim) => anim.kill());
		};
	}, []);

	return (
		<div className="w-[95vw] md:w-[92vw] m-auto min-h-svh overflow-hidden premium-surface">
			<div className="w-[96%] md:w-11/12 m-auto py-2 md:py-4">
				<motion.div ref={(el) => (sectionRefs.current[0] = el)} className="cinematic-section" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
					<Hero />
				</motion.div>
				<motion.div ref={(el) => (sectionRefs.current[1] = el)} className="cinematic-section" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
					<Experience />
				</motion.div>
				<motion.div ref={(el) => (sectionRefs.current[2] = el)} className="cinematic-section" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
					<CareerJourney />
				</motion.div>
				<motion.div ref={(el) => (sectionRefs.current[3] = el)} className="cinematic-section" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
					<Suspense fallback={<SectionFallback />}>
						<Stack />
					</Suspense>
				</motion.div>
				<motion.div ref={(el) => (sectionRefs.current[4] = el)} className="cinematic-section" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
					<Suspense fallback={<SectionFallback />}>
						<Featured />
					</Suspense>
				</motion.div>
				<motion.div ref={(el) => (sectionRefs.current[5] = el)} className="cinematic-section" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
					<Suspense fallback={<SectionFallback />}>
						<Projects />
					</Suspense>
				</motion.div>
				<motion.div ref={(el) => (sectionRefs.current[6] = el)} className="cinematic-section" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
					<Suspense fallback={<SectionFallback />}>
						<InterviewExperience />
					</Suspense>
				</motion.div>
				<motion.div ref={(el) => (sectionRefs.current[7] = el)} className="cinematic-section" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
					<Suspense fallback={<SectionFallback />}>
						<Contact />
					</Suspense>
				</motion.div>
				<div className="avengers-divider my-4" />
				<Footer />
		        <ChatAssistant />
			</div>
		</div>
	);
};

export default BodyCont;
