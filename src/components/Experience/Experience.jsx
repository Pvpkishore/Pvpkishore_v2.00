import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchText from "../Effects/Glitch";

const Experience = () => {
	const [activeTabId, setActiveTabId] = useState(0);
	const tabs = useRef([]);
	const panels = useRef([]);
	const sectionRef = useRef(null);
	const headingRef = useRef(null);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top 90%",
				end: "top 78%",
				scrub: true,
				markers: false, // for debug, remove in production
			},
		});

		tl.fromTo(
			sectionRef.current,
			{ opacity: 0, y: 50 },
			{ opacity: 1, y: 0, duration: 1, ease: "power2.out" }
		);
		tl.fromTo(
			headingRef.current,
			{ opacity: 0, y: 50 },
			{ opacity: 1, y: 0, duration: 1, ease: "power2.out" },
			"<" // ensures heading animation starts immediately after section animation starts
		);
		data.forEach((job, index) => {
			tl.fromTo(
				tabs.current[index],
				{ opacity: 0, y: 20 },
				{
					opacity: 1, y: 0, duration: 0.5,
					ease: "power2.out"
				},
				"-=0.4"
			);
		});

		return () => tl.kill();
	}, []);

	const onTabClicked = (index) => {
		if (index !== activeTabId) {
			animatePanelOut(activeTabId);
			setActiveTabId(index);
			animatePanelIn(index);
		}
	};

	const animatePanelIn = (index) => {
		gsap.fromTo(
			panels.current[index],
			{ opacity: 0, y: 20 },
			{ opacity: 1, y: 0, duration: 1, ease: "power3.out" }
		);
	};

	const animatePanelOut = (index) => {
		gsap.to(panels.current[index], {
			opacity: 0,
			y: -20,
			duration: 1,
			ease: "power3.out",
		});
	};

	const data = [
		{
			company: "Prodigy Infotech",
			title: "Full Stack Developer Intern",
			url: "https://prodigyinfotech.dev/",
			range: "Nov 2024 - Dec 2024",
			html: `
  <ul className="list-disc">
    <li>• Built a Bookstore MERN project with user-friendly interfaces for browsing and managing books, leveraging React.js for frontend and MongoDB for data storage.</li>
    <li>• Learned and implemented login authentication using bcrypt to ensure secure user access.</li>
    <li>• Accessed and managed data from MongoDB efficiently for CRUD operations.</li>
    <li>• Styled applications using Tailwind CSS and React.js for a modern and responsive design.</li>
    <li>• Built a Stopwatch Web Application featuring advanced time-tracking functionality and lap recording capabilities.</li>
    <li>• Created an Interactive Tic-Tac-Toe Game with engaging winning animations and an AI opponent for challenging gameplay.</li>
  </ul>
      `,
			buttonText: "Prodigy Infotech",
		},
		{
			company: "Afame Technologies",
			title: "Web Developer Intern",
			url: "https://afame.in/web-development/",
			range: "Oct 2024 - Nov 2024",
			html: `
  <ul className="list-disc">
    <li>• Developed a responsive personal portfolio website using React.js, Tailwind CSS, and GSAP, showcasing skills, projects, and contact information.</li>
    <li>• Designed and implemented a visually appealing landing page with a structured layout, focusing on responsive design and effective use of HTML and CSS.</li>
    <li>• Built an interactive calculator with advanced arithmetic functionalities using JavaScript, React.js, and Tailwind CSS.</li>
    <li>• Gained expertise in creating dynamic and responsive web pages adhering to beginner-to-intermediate web development principles.</li>
    <li>• Enhanced skills in modern web technologies, including React.js, Tailwind CSS, GSAP, HTML, and JavaScript.</li>
    <li>• Learned the importance of clean code, effective debugging, and creating user-centric designs.</li>
  </ul>
`
			,
			buttonText: "Afametechnologies",
		},
	];

	return (
		<section
			id="experience"
			ref={sectionRef}
			className="flex flex-col p-3 py-8"
		>
			<h2 ref={headingRef} className="text-2xl md:text-3xl font-bold font-poppins text-gray-100 mb-8">
				<GlitchText ref={headingRef} text="Where I've Worked" />
			</h2>
			<div className="flex flex-col md:flex-row max-w-2xl">
				<div
					role="tablist"
					aria-label="Job tabs"
					className="flex flex-col md:mr-8 mb-6 md:mb-0"
				>
					{data.map((job, i) => (
						<button
							key={i}
							onClick={() => onTabClicked(i)}
							ref={(el) => (tabs.current[i] = el)}
							id={`tab-${i}`}
							role="tab"
							aria-selected={activeTabId === i ? true : false}
							aria-controls={`panel-${i}`}
							tabIndex={activeTabId === i ? "0" : "-1"}
							className={`btn-square btn-ghost w-full text-left font-space text-slate-300 font-bold text-sm py-2 px-4 min-w-[150px] ${activeTabId === i
								? "border-l-4 border-t-0 border-b-0 border-r-0 border-[#858DFF] text-[#858DFF]"
								: "border-l-4 border-t-0 border-b-0 border-r-0 border-gray-400"
								}`}
						>
							{job.buttonText}
						</button>
					))}
				</div>

				<div className="relative w-full">
					{data.map((job, i) => (
						<div
							key={i}
							ref={(el) => (panels.current[i] = el)}
							className={`job-panel ${activeTabId === i ? "opacity-100" : "opacity-0 hidden"
								}`}
						>
							<h4 className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg text-slate-500 font-bold font-poppins mb-2">
								{job.title}
								<span className="text-[#858DFF] ">
									&nbsp;at&nbsp;
									<a
										href={job.url}
										target="_blank"
										rel="nofollow noopener noreferrer"
										className="underline"
									>
										{job.company}
									</a>
								</span>
							</h4>
							<h5 className="2xl:text-2xl xl:text-xl lg:text-lg md:text-base text-sm font-roboto font-bold text-gray-100 mb-4">
								{job.range}
							</h5>
							<div
								className="2xl:text-md xl:text-md lg:text-base md:text-sm text-sm font-roboto text-gray-100 text-justify"
								dangerouslySetInnerHTML={{ __html: job.html }}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Experience;
