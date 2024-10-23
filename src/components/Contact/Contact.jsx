import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Languages = () => {
	const sectionRef = useRef(null);
	const mailRef = useRef(null);

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
			{ opacity: 0, y: 50 },
			{ opacity: 1, y: 0, duration: 1, ease: "power2.out" }
		);

		tl.fromTo(
			mailRef.current,
			{ opacity: 0, y: 50 },
			{ opacity: 1, y: 0, duration: 1, ease: "power2.out" },
			"<"
		);
	}, []);

	return (
		<section
			ref={sectionRef}
			id="contact"
			className="flex flex-col p-3 bg-base-100 min-h-[20vh]"
		>
			<h2 className="text-2xl md:text-3xl font-bold font-poppins text-primary mb-1">
				Reach me at
			</h2>
			<div className=" m-3 max-w-[70%]">
				<h1 className="text-secondary text-md md:text-xl font-poppins mt-2">
					Send me an email at
				</h1>
				<a
					ref={mailRef}
					href="mailto:pvpkishore09@gmail.com"
					className="text-lg md:text-2xl font-space font-bold text-primary hover:underline"
				>
					pvpkishore09@gmail.com
				</a>
				<h1 className="max-w-[100%] text-secondary text-md md:text-xl font-poppins ">
					and let's discuss how we can take over the world with sentient robot
					cats.
				</h1>
			</div>
		</section>
	);
};

export default Languages;
