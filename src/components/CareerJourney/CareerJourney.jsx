import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CareerJourney = () => {
	const sectionRef = useRef(null);
	const headingRef = useRef(null);
	const cardRef = useRef(null);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top 90%",
				end: "top 78%",
				scrub: true,
				markers: false,
			},
		});

		tl.fromTo(
			sectionRef.current,
			{ opacity: 0, y: 44 },
			{ opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
		);
		tl.fromTo(
			headingRef.current,
			{ opacity: 0, y: 24 },
			{ opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
			"<"
		);
		tl.fromTo(
			cardRef.current,
			{ opacity: 0, y: 24, scale: 0.985 },
			{ opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "power2.out" },
			"-=0.35"
		);

		return () => tl.kill();
	}, []);

	return (
		<section
			id="career-journey"
			ref={sectionRef}
			className="flex flex-col p-4 md:p-5 py-10 rounded-2xl hud-career premium-surface"
		>
			<h2 ref={headingRef} className="text-2xl md:text-4xl font-bold font-poppins mb-8 avengers-title">
				🚀 Career Journey
			</h2>

			<div className="w-full max-w-3xl">
				<div
					ref={cardRef}
					className="group rounded-2xl border border-amber-300/15 bg-slate-900/30 p-5 md:p-6 shadow-[0_12px_28px_rgba(2,8,22,0.4)] transition-transform duration-300 hover:-translate-y-1 hover:border-amber-300/30"
				>
					<div className="flex flex-col gap-5 sm:flex-row sm:items-start">
						<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-slate-950/55 shadow-[0_10px_24px_rgba(2,8,22,0.35)] overflow-hidden">
							<svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
								<rect x="6" y="6" width="18" height="18" rx="3" fill="#86bc25" />
								<circle cx="53" cy="53" r="4" fill="#86bc25" />
								<text x="30" y="39" fill="#eaf2ff" fontSize="16" fontFamily="Arial, sans-serif" fontWeight="700">d</text>
							</svg>
						</div>

						<div className="min-w-0 flex-1">
							<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
								<div className="min-w-0">
									<p className="text-sm uppercase tracking-[0.28em] text-amber-200/75">
										Current Position
									</p>
									<h3 className="mt-2 text-xl md:text-2xl font-bold text-slate-100">
										Incoming Analyst
									</h3>
									<p className="mt-1 text-lg font-semibold text-amber-200/90">
										Deloitte USI
									</p>
									<p className="mt-1 text-sm md:text-base text-blue-300/90">
										Hyderabad, India
									</p>
								</div>

								<span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200">
									Present
								</span>
							</div>

							<p className="mt-5 max-w-2xl text-sm md:text-base leading-relaxed text-slate-200/95">
								Starting my professional software engineering journey by working on enterprise-scale solutions, collaborating with global teams, and continuously learning modern technologies.
							</p>

							<div className="mt-5 inline-flex items-center rounded-full border border-amber-300/15 bg-slate-950/40 px-3 py-1.5 text-xs md:text-sm font-semibold tracking-[0.12em] text-amber-100/90">
								Building, Learning, Growing.
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CareerJourney;