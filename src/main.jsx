import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar/Navbar";
import BodyCont from "./components/Body/Body";
import Socials from "./components/Socials/Socials";
import EmailCont from "./components/Email/Email";
import "./index.css";

const AppRoot = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1300);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		let prevY = window.scrollY;
		let prevT = performance.now();

		const updateBoost = () => {
			const now = performance.now();
			const y = window.scrollY;
			const dy = Math.abs(y - prevY);
			const dt = Math.max(16, now - prevT);
			const speed = dy / dt;
			const boost = Math.min(1, speed * 1.8);
			document.documentElement.style.setProperty("--reactor-boost", boost.toFixed(3));
			prevY = y;
			prevT = now;
		};

		window.addEventListener("scroll", updateBoost, { passive: true });
		return () => window.removeEventListener("scroll", updateBoost);
	}, []);

	useEffect(() => {
		const handleMove = (e) => {
			const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
			const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;
			document.documentElement.style.setProperty("--parallax-x", xNorm.toFixed(3));
			document.documentElement.style.setProperty("--parallax-y", yNorm.toFixed(3));
		};

		window.addEventListener("mousemove", handleMove, { passive: true });
		return () => window.removeEventListener("mousemove", handleMove);
	}, []);

	return (
		<>
			{loading && (
				<div className="preloader-screen">
					<div className="preloader-core" />
				</div>
			)}
			<div className="app-bg" />
			<div className="arc-reactor" />
			<div className="hud-overlay" />
			<div className="app-shell">
				<div className="w-full m-auto relative z-50 mt-4 md:mt-5 rounded-full glass-panel">
					<Navbar />
				</div>
			</div>
			<div className="flex flex-row app-shell pt-16">
				<div className="fixed top-0 left-0 h-full z-0 hidden md:block">
					<Socials />
				</div>
				<div className="flex-1">
					<BodyCont />
				</div>
				<div className="fixed top-0 right-0 h-full z-0 hidden md:block">
					<EmailCont />
				</div>
			</div>
			<Analytics />
		</>
	);
};

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AppRoot />
	</React.StrictMode>
);
