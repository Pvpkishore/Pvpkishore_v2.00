import { useEffect, useRef, useState } from "react";

const useScrollDirection = () => {
	const [scrollDirection, setScrollDirection] = useState(null);
	const lastScrollY = useRef(0);
	const ticking = useRef(false);

	useEffect(() => {
		lastScrollY.current = window.pageYOffset;

		const updateScrollDirection = () => {
			const currentScrollY = window.pageYOffset;
			const delta = currentScrollY - lastScrollY.current;
			const threshold = 10;

			if (Math.abs(delta) < threshold) {
				ticking.current = false;
				return;
			}

			const direction = delta > 0 ? "down" : "up";

			setScrollDirection((currentDirection) =>
				currentDirection === direction ? currentDirection : direction
			);
			lastScrollY.current = currentScrollY > 0 ? currentScrollY : 0;
			ticking.current = false;
		};

		const onScroll = () => {
			if (!ticking.current) {
				window.requestAnimationFrame(updateScrollDirection);
				ticking.current = true;
			}
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	return scrollDirection;
};

export default useScrollDirection;
