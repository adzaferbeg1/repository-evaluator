import axios from "axios";

const auth = {
	auth: {
		username: `${process.env.REACT_APP_USERNAME}`,
		password: `${process.env.REACT_APP_TOKEN}`,
	},
};

class GitHubApiService {
	getBranches = async (repo) => {
		try {
			const response = await axios.get(
				"https://api.github.com/repos/" + repo + "/branches",
				auth
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getAllCommitsForBranch = async (repo, branch, i) => {
		try {
			const response = await axios.get(
				"https://api.github.com/repos/" +
					repo +
					"/commits?sha=" +
					branch +
					"&page=" +
					i +
					"&per_page=100",
				auth
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getCommitData = async (repo, sha) => {
		try {
			const response = await axios.get(
				"https://api.github.com/repos/" + repo + "/commits/" + sha,
				auth
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getPullsNo = async (repo) => {
		try {
			const response = await axios.get(
				"https://api.github.com/repos/" + repo + "/pulls?state=all",
				auth
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getOpenPullsNo = async (repo) => {
		try {
			const response = await axios.get(
				"https://api.github.com/repos/" + repo + "/pulls?state=open",
				auth
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getClosedPullsNo = async (repo) => {
		try {
			const response = await axios.get(
				"https://api.github.com/repos/" + repo + "/pulls?state=closed",
				auth
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};
}

export default new GitHubApiService();
