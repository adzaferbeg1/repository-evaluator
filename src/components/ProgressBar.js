const ProgressBar = ({ currentValue }) => {
	return (
		<div className="progress" style={{ width: "300px" }}>
			<div
				className="progress-bar"
				role="progressbar"
				style={{ width: currentValue, backgroundColor: "green" }}
				aria-valuemin="0"
				aria-valuemax="100"
			></div>
		</div>
	);
};

export default ProgressBar;
