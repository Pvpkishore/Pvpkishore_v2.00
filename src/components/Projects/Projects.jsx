import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchText from "../Effects/Glitch";
import AvengersGlyph from "../Effects/AvengersGlyph";

const Projects = () => {
	const [showMore, setShowMore] = useState(false);
	const projectsRef = useRef(null);
	const titleRef = useRef(null);
	const revealProjects = useRef([]);

	const GRID_LIMIT = 3; // Maximum projects to show initially
	const projects = [
		// {
		// 	frontmatter: {
		// 		title: "AI talking Chatbot",
		// 		html: "<p>The AI Talking Bot App is an intelligent chatbot built using Express.js, React.js, and OpenAI. It engages users in natural, dynamic conversations powered by AI, offering responses based on advanced language models. The backend handles API requests with Express.js, while the frontend, developed in React.js</p>",
		// 		tech: ["Express.js", "React.js", "Open AI"],
		// 	},
		// 	github: "https://github.com/Pvpkishore/Keeper-App",
		// 	external: "",
		// },
		{
			frontmatter: {
				title: "Lets chat",
				html: "<p>The Real-Time Chat App, built using Node.js, JavaScript, and WebSocket.io, enables instant messaging between users. It supports real-time communication with smooth, interactive chat features, allowing users to send and receive messages instantly.</p>",
				tech: ["Express.js", "Javascript", "socket.io"],
			},
			github: "https://github.com/Pvpkishore/Lets-chat",
			external: "https://github.com/Pvpkishore/Lets-chat",
		},
		{
			frontmatter: {
				title: "GitHub profile Finder",
				html: "<p>The GitHub Profile Finder project uses the GitHub API, HTML, CSS, and JavaScript to search for GitHub users by their username. It retrieves and displays information such as the user's profile picture, bio, repositories, followers, and following count.</p>",
				tech: ["Javascript","API","Html/Tailwind css"],
			},
			github: "https://github.com/Pvpkishore/Github-profile-finder",
			external: "https://github-profile-finder-kishore.vercel.app/",
		},
		{
			frontmatter: {
				title: "WeatherX",
				html: "<p>WeatherX is a JavaScript-based web application that fetches real-time weather details for any city using a weather API. Built with HTML, CSS, and JavaScript, the app provides a clean interface to display temperature, conditions, and other weather data, offering a user-friendly experience.</p>",
				tech: [
					"Javascript",
					"Rapid API",
					"HTML/CSS",
				],
			},
			github: "https://github.com/Pvpkishore/Wheather-Api",
			external: "https://wheather-api-kishores.vercel.app/",
		},
		{
			frontmatter: {
				title: "MusicX",
				html: "<p>MusicX is a web application built using JavaScript, HTML, and CSS, designed to offer users a seamless music streaming experience. The app features a sleek interface where users can browse, play, and manage their favorite tracks, highlighting my skills in frontend development and interactive media applications</p>",
				tech: ["Javascript", "HTML/CSS"],
			},
			github: "https://github.com/Pvpkishore/Music-App",
			external: "https://pvpkishore.github.io/Music-App/",
		},
		{
			frontmatter: {
				title: "Project web",
				html: "<p>Project Web is a sleek and responsive portfolio platform that showcases all of my development projects in one place.Each project includes descriptions, and links to GitHub repositories or live demos. It's designed to give users a clear overview of my skills I've worked on, from web apps to AI-powered solutions.</p>",
				tech: ["Javascript", "HTML/Tailwind CSS", "Gsap"],
			},
			github: "https://github.com/Pvpkishore/Projects_List",
			external: "https://my-projects-kishore.vercel.app/",
		},

	];

	const projectsToShow = showMore ? projects : projects.slice(0, GRID_LIMIT);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: projectsRef.current,
				start: "top 90%",
				end: "top 78%",
				scrub: true,
				markers: false,
			},
		});

		tl.fromTo(
			projectsRef.current,
			{ opacity: 0, y: 50 },
			{ opacity: 1, y: 0, duration: 1, ease: "power2.out" }
		);

		tl.fromTo(
			titleRef.current,
			{ opacity: 0, y: 50 },
			{ opacity: 1, y: 0, duration: 1, ease: "power2.out" },
			"<"
		);

		revealProjects.current.forEach((item, index) => {
			tl.fromTo(
				item,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
				`<${index * 0.2}`
			);
		});
	}, []);

	return (
		<section className="py-4 p-4 hud-projects premium-surface rounded-2xl">
			<h2
				ref={titleRef}
				className="text-2xl md:text-4xl font-bold avengers-title mb-8"
			>
              <GlitchText ref={titleRef} text="Other Projects" />
			</h2>
			<div ref={projectsRef} className="container md:mx-auto px-1 md:px-2">
				<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{projectsToShow.map(({ frontmatter, github,external }, i) => (
						<div
							key={i}
							ref={(el) => (revealProjects.current[i] = el)}
							className="p-4 md:p-5 premium-surface border border-amber-300/20 rounded-xl shadow-[0_12px_28px_rgba(2,8,22,0.4)] transition-transform duration-300 hover:-translate-y-1"
						>
							<div className="flex justify-between items-center mb-3">
								<div className="flex items-center gap-2">
									<AvengersGlyph size={20} />
									<span className="text-xs tracking-wide uppercase text-amber-200/90">Mission Log</span>
								</div>
								<div className="flex items-center gap-2">
								{github && (
									<a
										className="assistant-control text-[11px]"
										href={github}
										target="_blank"
										rel="noopener noreferrer"
									>
										<div className="flex items-center gap-1">
											<AvengersGlyph size={13} />
											<span>Code</span>
										</div>
									</a>
								)}
								{external && (
									<a
										className="assistant-control text-[11px]"
										href={external}
										target="_blank"
										rel="noopener noreferrer"
									>
										<div className="flex items-center gap-1">
											<AvengersGlyph size={13} />
											<span>Visit</span>
										</div>
									</a>
								)}
								</div>
							</div>
							<div className="flex">
								{external ? (
									<a
										href={external}
										target="_blank"
										rel="nofollow noopener noreferrer"
										className="text-slate-100 font-semibold text-xl hover:text-amber-200 transition-colors"
									>
										{frontmatter.title}
									</a>
								) : (
									<span className="text-slate-100 font-semibold text-xl">
										{frontmatter.title}
									</span>
								)}
							</div>
							<div
								className="text-sm md:text-base leading-relaxed mb-4 text-slate-200/95 text-justify"
								dangerouslySetInnerHTML={{ __html: frontmatter.html }}
							/>
							{frontmatter.tech && (
								<ul className="flex flex-wrap gap-2 mb-2">
									{frontmatter.tech.map((item, i) => (
										<li
											key={i}
											className="text-xs md:text-sm font-semibold text-amber-100 border border-amber-300/20 rounded-full px-2.5 py-1 bg-slate-900/30 flex items-center gap-1"
										>
											<AvengersGlyph size={12} />
											{item}
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>

				<button
					onClick={() => setShowMore(!showMore)}
					className="premium-btn btn-md font-poppins mt-8 mx-auto block"
				>
					Show {showMore ? "Less" : "More"}
				</button>
			</div>
		</section>
	);
};

export default Projects;
