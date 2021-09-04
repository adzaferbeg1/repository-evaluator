import { useEffect, useState } from "react";
import "./TotalResult.css";

export default function Result({ totalPercentage }) {
	const [percentage, setPercentage] = useState();
	const styleRed = { backgroundColor: "pink" };
	const styleYellow = { backgroundColor: "rgb(223, 223, 41)" };
	const styleGreen = { backgroundColor: "green", color: "white" };
	const styleGray = { backgroundColor: "gray", color: "white" };

	useEffect(() => {
		setPercentage(totalPercentage);
	}, [totalPercentage]);

	const renderBackgorund = () => {
		if (percentage < 40) return styleRed;
		else if (percentage > 39 && percentage < 70) return styleYellow;
		else if (percentage > 69) return styleGreen;
		else return styleGray;
	};

	return (
		<div className="total-result" style={renderBackgorund()}>
			{parseFloat(percentage).toFixed(2)}%
		</div>
	);
}
