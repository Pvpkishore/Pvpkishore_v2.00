import React from "react";
import Languages from "../Languages/Languages";
import Frameworks from "../Frameworks/Frameworks";
import Libraries from "../Libraries/Libraries";

const Stack = () => {
	return (
		<div id="skills" className="premium-surface mt-3 pt-3">
			<Languages />
			<div className="avengers-divider" />
			<Frameworks />
			<div className="avengers-divider" />
			<Libraries />
		</div>
	);
};

export default Stack;
