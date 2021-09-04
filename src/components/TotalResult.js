import { useEffect, useState } from "react";
import "./TotalResult.css";

export default function Result({ totalPercentage }) {
	const [percentage, setPercentage] = useState(0);
	const styleRed = { backgroundColor: "pink" };
	const styleYellow = { backgroundColor: "rgb(223, 223, 41)" };
	const styleGreen = { backgroundColor: "green", color: "white" };

	useEffect(() => {
		setPercentage(totalPercentage);
	}, [totalPercentage]);

	const renderBackgorund = () => {
		if (percentage < 40) return styleRed;
		else if (percentage > 40 && percentage < 70) return styleYellow;
		else return styleGreen;
	};

	return (
		<div className="total-result" style={renderBackgorund()}>
			{percentage}%
		</div>
	);
}
