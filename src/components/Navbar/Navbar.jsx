import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link, animateScroll as scroll } from "react-scroll";
import resume from "../../assets/resume/Resume_superset_updated.pdf";
import ElasticText from "../Effects/Elastic";

const NAV_SECTIONS = ["Experience", "Skills", "Projects", "Interview", "Contact"];

const Navbar = () => {
	const logoRef = useRef(null);
	const menuItemsRef = useRef([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsSticky(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		gsap.fromTo(
			logoRef.current,
			{ y: -50, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: "power3.out" }
		);
		gsap.fromTo(
			menuItemsRef.current,
			{ y: -50, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.15 }
		);
	}, []);

	const toggleMenu = () => setIsOpen(!isOpen);

	const scrollLinkProps = (index) => ({
		spy: true,
		smooth: true,
		offset: -70,
		duration: 600,
		easing: "easeInOutCubic",
		activeClass: "active-nav-link",
	});

	return (
		<div
			className={`top-0 navbar justify-center fixed w-full transition-all duration-300 ease-in-out px-2 md:px-4 ${
				isSticky ? "shadow-xl bg-opacity-100" : ""
			} z-50`}
			style={{
				background:
					"linear-gradient(100deg, rgba(10,18,40,0.97), rgba(18,30,66,0.95), rgba(74,20,28,0.9))",
				backdropFilter: "blur(16px)",
				borderBottom: "1px solid rgba(247, 195, 95, 0.48)",
				boxShadow:
					"0 2px 22px rgba(247, 195, 95, 0.09), 0 6px 32px rgba(0,0,0,0.65)",
			}}
		>
			<div className="navbar-start">
				<div className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost lg:hidden text-sm"
						onClick={toggleMenu}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="white"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className={`menu menu-sm dropdown-content rounded-box z-10 mt-3 w-52 p-2 shadow font-space font-semibold text-secondary ${
							isOpen ? "block" : "hidden"
						}`}
						style={{
							background:
								"linear-gradient(160deg, rgba(10,18,38,0.98), rgba(18,26,53,0.96))",
							border: "1px solid rgba(247,195,95,0.2)",
						}}
					>
						{NAV_SECTIONS.map((section, index) => (
							<li key={section}>
								<Link
									to={section.toLowerCase()}
									{...scrollLinkProps(index)}
									className="text-sm inline-block text-slate-100 hover:text-amber-200 transition-colors"
									onClick={toggleMenu}
								>
									{section}
								</Link>
							</li>
						))}
						<li>
							<a
								href={resume}
								target="_blank"
								rel="noopener noreferrer"
								className="premium-btn btn-md font-bold text-md"
								onClick={toggleMenu}
							>
								Resume
							</a>
						</li>
					</ul>
				</div>

				{/* Logo — click scrolls smoothly back to top */}
				<span
					onClick={() =>
						scroll.scrollToTop({ duration: 600, smooth: "easeInOutCubic" })
					}
					style={{ cursor: "pointer" }}
				>
					<ElasticText
						ref={logoRef}
						text="PvpKishore"
						className="text-2xl font-poppins font-bold ml-3 md:ml-5 avengers-title"
					/>
				</span>
			</div>

			<div className="navbar-center hidden lg:flex justify-center"></div>

			<div className="navbar-end">
				<ul className="menu menu-horizontal px-1 font-space font-semibold text-slate-200 hidden sm:flex rounded-full border border-amber-200/20 bg-slate-900/30">
					{NAV_SECTIONS.map((section, index) => (
						<li
							ref={(el) => (menuItemsRef.current[index] = el)}
							key={section}
						>
							<Link
								to={section.toLowerCase()}
								{...scrollLinkProps(index)}
								className="text-sm px-3 py-2 rounded-md transition-all duration-200 hover:bg-gradient-to-r hover:from-red-400/70 hover:via-amber-300/60 hover:to-blue-400/70 hover:text-slate-100"
								onClick={toggleMenu}
							>
								{section}
							</Link>
						</li>
					))}
					<li ref={(el) => (menuItemsRef.current[5] = el)} className="ml-2 mr-1">
						<a
							href={resume}
							target="_blank"
							rel="noopener noreferrer"
							className="premium-btn font-poppins text-sm"
						>
							Resume
						</a>
					</li>
				</ul>
			</div>

			{/* Active nav link highlight — add to your global CSS instead if preferred */}
			<style>{`
				.active-nav-link {
					color: rgb(252 211 77) !important;
				}
			`}</style>
		</div>
	);
};

export default Navbar;