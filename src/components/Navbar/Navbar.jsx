import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-scroll";
import resume from "../../assets/resume/Pvpkishore_resume.pdf";

const Navbar = () => {
	const logoRef = useRef(null);
	const menuItemsRef = useRef([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		gsap.fromTo(
			logoRef.current,
			{ y: -30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: "power2.out" }
		);

		gsap.fromTo(
			menuItemsRef.current,
			{ y: -30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.1 }
		);
	}, []);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="navbar bg-base-100">
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
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
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
						className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-space font-semibold text-secondary ${
							isOpen ? "block" : "hidden"
						}`}
					>
						<li>
							<Link
								to="experience"
								spy={true}
								smooth={true}
								offset={-70}
								duration={500}
								className="text-sm"
								onClick={toggleMenu}
							>
								Experience
							</Link>
						</li>
						<li>
							<Link
								to="skills"
								spy={true}
								smooth={true}
								offset={-70}
								duration={600}
								className="text-sm"
								onClick={toggleMenu}
							>
								Skills
							</Link>
						</li>
						<li>
							<Link
								to="projects"
								spy={true}
								smooth={true}
								offset={-70}
								duration={700}
								className="text-sm"
								onClick={toggleMenu}
							>
								Projects
							</Link>
						</li>
						<li>
							<Link
								to="contact"
								spy={true}
								smooth={true}
								offset={-70}
								duration={950}
								className="text-sm"
								onClick={toggleMenu}
							>
								Contact
							</Link>
						</li>
						<li>
							<a
								href={resume}
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn-outline btn-md font-bold text-md text-secondary font-space"
								onClick={toggleMenu}
							>
								Resume
							</a>
						</li>
					</ul>
				</div>
				<a className=" text-xl font-poppins font-bold" ref={logoRef}>
					Pvp Kishore
				</a>
			</div>
			<div className="navbar-center hidden lg:flex"></div>
			<div className="navbar-end">
				<ul className="menu menu-horizontal px-1 font-space font-semibold text-secondary hidden sm:flex">
					 <li ref={(el) => (menuItemsRef.current[0] = el)} className="my-auto">
						<Link
							to="experience"
							spy={true}
							smooth={true}
							offset={-70}
							duration={500}
							className="text-sm"
							onClick={toggleMenu}
						>
							Experience 
						 </Link>
					</li>
					<li ref={(el) => (menuItemsRef.current[1] = el)} className="my-auto">
						<Link
							to="skills"
							spy={true}
							smooth={true}
							offset={-70}
							duration={600}
							className="text-sm"
							onClick={toggleMenu}
						>
							Skills
						</Link>
					</li>
					<li ref={(el) => (menuItemsRef.current[2] = el)} className="my-auto">
						<Link
							to="projects"
							spy={true}
							smooth={true}
							offset={-70}
							duration={700}
							className="text-sm"
							onClick={toggleMenu}
						>
							Projects
						</Link>
					</li>
					<li ref={(el) => (menuItemsRef.current[3] = el)} className="my-auto">
						<Link
							to="contact"
							spy={true}
							smooth={true}
							offset={-70}
							duration={1000}
							className="text-sm"
							onClick={toggleMenu}
						>
							Contact
						</Link>
					</li>
					<li ref={(el) => (menuItemsRef.current[4] = el)}>
						<a
							href={resume}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-outline font-poppins text-secondary text-sm"
						>
							Resume
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
