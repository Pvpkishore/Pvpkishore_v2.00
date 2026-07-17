import { useEffect, useRef } from "react";
import picture from "../../assets/images/My Avatar1.svg";
import leetcode from "../../assets/icons-white/icons8-Leetcode-white.png";
import linkedin from "../../assets/icons-white/icons8-linkedin-white.png";
import github from "../../assets/icons-white/github-white-icon.png";
import TypedAnimation from "../Typed/Typed";
import { gsap } from "gsap";
import resume from "../../assets/resume/pvpkishore_ResumeDel.pdf";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlitchText from "../Effects/Glitch";
import RippleButton from "../Effects/RippleEffect";
import TiltImage from "../Effects/imagetilt";

gsap.registerPlugin(ScrollTrigger);

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
		<div className="flex flex-col md:flex-row items-center p-3 lg:py-6 py-3 mt-10 ">
			<div className="md:w-4/6 lg:w-2/3 mt-10 md:mt-0 sm:mt-0">
				<h4
					ref={hiRef}
					className="2xl:text-3xl text-2xl font-semibold text-gray-300 font-poppins text-left mb-2"
				>
					Hi, my name is
				</h4>
				<h1
                    ref={nameRef}
					className="2xl:text-8xl cursor-default lg:text-7xl text-5xl avengers-title font-poppins font-bold text-left mb-2"
				>
					<GlitchText ref={nameRef} text="PVP Kishore."/>
				</h1>
				<h4
					ref={typedTextRef}
					className="2xl:text-7xl lg:text-5xl text-2xl font-bold text-gray-400 font-poppins text-left mb-3"
				>
					<TypedAnimation />
				</h4>
				<p
					ref={descriptionRef}
					className="2xl:text-3xl lg:text-lg text-sm text-slate-100 font-roboto md:text-justify mb-5"
				>
					A recent B.Tech graduate from{" "}
					<a
						href="https://nitc.ac.in/"
						className="text-teal-200  font-bold font-roboto"
						target="_blank"
						rel="noopener noreferrer"
					>
						NIT Calicut
					</a>
					. I am passionate about building impactful digital products and scalable web applications, with a strong interest in full-stack development and modern web technologies.
				</p>
				<ul className="flex flex-wrap">
					<li className="m-3">
						<a href="https://www.linkedin.com/in/ponnala-venkata-padma-kishor-76679326a/" target="_blank">
							<img
								ref={(el) => (logosRef.current[0] = el)}
								src={linkedin}
								alt="LinkedIn"
								className="lg:w-12 lg:h-12 md:w-10 md:h-10 h-8 w-8 hover:scale-110 hover:drop-shadow-[0px_0px_10px_rgba(255,255,255,0.5)]"
							/>
						</a>
					</li>
					<li className="m-3">
						<a href="https://github.com/Pvpkishore" target="_blank">
							<img
								ref={(el) => (logosRef.current[1] = el)}
								src={github}
								alt="GitHub"
								className="lg:w-12 lg:h-12 md:w-10 md:h-10 h-8 w-8 fill-white hover:scale-110 hover:drop-shadow-[0px_0px_10px_rgba(255,255,255,0.5)]"
							/>
						</a>
					</li>
					<li className="m-3">
						<a href="https://leetcode.com/u/PONNALA-VENKATA-PADMA-KISHORE/" target="_blank">
							<img
								ref={(el) => (logosRef.current[2] = el)}
								src={leetcode}
								alt="LeetCode"
								className="lg:w-12 lg:h-12 md:w-10 md:h-10 h-8 w-8 hover:scale-110 hover:drop-shadow-[0px_0px_10px_rgba(255,255,255,0.5)]"
							/>
						</a>
					</li>
					<li className="m-3 my-auto">
						<a href={resume} target="_blank">
				
							<RippleButton ref={(el) => (logosRef.current[3] = el)} 
							className="premium-btn font-poppins">
                                      Resume
                           </RippleButton>
						</a>
					</li>
				</ul>
			</div>
			<div ref={picRef} className="md:w-2/6 lg:w-1/3 flex items-center justify-center py-12 md:py-0">
				<div className="hero-avatar-frame" style={{ width: 240, height: 240 }}>
					{/* Rings */}
					<div className="hero-ring-outer" />
					<div className="hero-ring-mid" />
					<div className="hero-ring-inner" />
					{/* Ambient glow */}
					<div className="hero-avatar-glow" />
					{/* Scan line */}
					<div className="hero-scan-wrap" />
					{/* HUD corner brackets */}
					<span className="hero-corner hero-corner-tl" />
					<span className="hero-corner hero-corner-tr" />
					<span className="hero-corner hero-corner-bl" />
					<span className="hero-corner hero-corner-br" />
					{/* Avatar image with 3D tilt */}
					<div style={{ position: "relative", zIndex: 1 }}>
						<TiltImage
							src={picture}
							alt="PVP Kishore"
							width={240}
							height={240}
						/>
					</div>
					{/* Online status dot */}
					<div className="hero-status-dot" />
				</div>
			</div>
		</div>
	);
};

export default AboutSection;
