import React, { useEffect, useRef } from "react";
import picture from "../../assets/images/My Avatar1.svg";
import leetcode from "../../assets/logos/icons8-leetcode.png";
import linkedin from "../../assets/logos/icons8-linkedin.svg";
import github from "../../assets/logos/icons8-github.svg";
import TypedAnimation from "../Typed/Typed";
import { gsap } from "gsap";
import resume from "../../assets/resume/Pvpkishore_resume.pdf";

const AboutSection = () => {
	const hiRef = useRef(null);
	const picRef = useRef(null);
	const nameRef = useRef(null);
	const typedTextRef = useRef(null);
	const descriptionRef = useRef(null);
	const logosRef = useRef([]);

	useEffect(() => {
		gsap.fromTo(
			hiRef.current,
			{ y: 50, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
		);
		gsap.fromTo(
			nameRef.current,
			{ y: 50, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.4 }
		);
		gsap.fromTo(
			picRef.current,
			{ y: 50, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.4 }
		);
		gsap.fromTo(
			typedTextRef.current,
			{ y: 50, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.6 }
		);
		gsap.fromTo(
			descriptionRef.current,
			{ y: 50, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.8 }
		);
		gsap.fromTo(
			logosRef.current,
			{ y: 50, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 1,
				ease: "power2.out",
				delay: 0.9,
				stagger: 0.1,
			}
		);
	}, []);

	return (
		<div className="flex flex-col md:flex-row items-center p-3 lg:py-6 py-3">
			<div className="md:w-4/6 lg:w-2/3 mt-10 md:mt-0 sm:mt-0">
				<h4
					ref={hiRef}
					className="2xl:text-3xl text-2xl font-semibold text-primary-content font-poppins text-left mb-2"
				>
					Hi, my name is
				</h4>
				<h1
					ref={nameRef}
					className="2xl:text-8xl lg:text-7xl text-5xl font-poppins font-bold text-left mb-2"
				>
					PVP Kishore.
				</h1>
				<h4
					ref={typedTextRef}
					className="2xl:text-7xl lg:text-5xl text-2xl font-bold text-primary-content font-poppins text-left mb-3"
				>
					<TypedAnimation />
				</h4>
				<p
					ref={descriptionRef}
					className="2xl:text-3xl lg:text-lg text-sm text-primary font-roboto md:text-justify mb-5"
				>
					I am a year three student at{" "}
					<a
						href="https://nitc.ac.in/"
						className="text-accent font-bold font-roboto"
						target="_blank"
						rel="noopener noreferrer"
					>
						NIT Calicut
					</a>
					, doing Civil Engineering. Intrested in Tech and I build websites,C++ Developer
				     . I'm also a video Editor!
					Learn more about me at:
				</p>
				<ul className="flex flex-wrap">
					<li className="m-3">
						<a href="https://www.linkedin.com/in/ponnala-venkata-padma-kishor-76679326a/">
							<img
								ref={(el) => (logosRef.current[0] = el)}
								src={linkedin}
								alt="LinkedIn"
								className="lg:w-12 lg:h-12 md:w-10 md:h-10 h-8 w-8"
							/>
						</a>
					</li>
					<li className="m-3">
						<a href="https://github.com/Pvpkishore">
							<img
								ref={(el) => (logosRef.current[1] = el)}
								src={github}
								alt="GitHub"
								className="lg:w-12 lg:h-12 md:w-10 md:h-10 h-8 w-8"
							/>
						</a>
					</li>
					<li className="m-3">
						<a href="https://leetcode.com/u/PONNALA-VENKATA-PADMA-KISHORE/">
							<img
								ref={(el) => (logosRef.current[2] = el)}
								src={leetcode}
								alt="LeetCode"
								className="lg:w-12 lg:h-12 md:w-10 md:h-10 h-8 w-8"
							/>
						</a>
					</li>
					<li className="m-3 my-auto">
						<a href={resume} target="_blank">
							<button
								ref={(el) => (logosRef.current[3] = el)}
								className="btn btn-ghost btn-outline text-primary font-poppins"
							>
								Resume
							</button>
						</a>
					</li>
				</ul>
			</div>
			<div className="md:w-2/6 lg:w-1/3">
				<img
					ref={picRef}
					src={picture}
					alt="Profile"
				className="w-full md:max-w-xs lg:max-w-sm xl:max-w-md 2xl:max-w-lg m-auto p-8 md:p-9 h-auto "
				/>
			</div>
		</div>
	);
};

export default AboutSection;
