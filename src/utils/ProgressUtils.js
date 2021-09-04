class ProgressUtils {
	calculateCommitProgress = (allBranchCommits, branches, pullsNumber) => {
		var totalCommitPercentage = 0;
		const mistakes = [];
		var mainBranch = branches.filter(
			(branch) => branch.name.includes("master") || branch.name.includes("main")
		);
		if (mainBranch.length === 1) {
			totalCommitPercentage += 25;
		} else {
			mistakes.push(
				"You are either missing master branch or have more than one"
			);
		}
		var deployBranch = branches.filter((branch) =>
			branch.name.includes("deploy")
		);
		if (deployBranch.length === 1) {
			totalCommitPercentage += 25;
		} else {
			mistakes.push(
				"You are either missing deploy branch or have more than one"
			);
		}
		if (allBranchCommits[branches.length - 1].length > pullsNumber + 1) {
			mistakes.push(
				"Too many commits on master branch. You should use pull requests to merge changes into master."
			);
		} else {
			totalCommitPercentage += 50;
		}
		console.log(mistakes);
		mainBranch = [];
		deployBranch = [];

		return totalCommitPercentage;
	};

	calculatePullProgress = (allPulls, closedPulls) => {
		if (allPulls.length === 0) {
			return "0%";
		}
		const percentage = (closedPulls.length / allPulls.length) * 100;
		return percentage + "%";
	};
}

export default new ProgressUtils();
