import axios from "axios";

class GitHubApiService {
	getBranches = async (repo, token) => {
		try {
			const response = await axios.get(
				"https://api.github.com/repos/" + repo + "/branches",
				{
					auth: {
						username: `${process.env.REACT_APP_USERNAME}`,
						password: token,
					},
				}
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getAllCommitsForBranch = async (repo, branch, i, token) => {
		try {
			const response = await axios.get(
				"https://api.github.com/repos/" +
					repo +
					"/commits?sha=" +
					branch +
					"&page=" +
					i +
					"&per_page=100",
				{
					auth: {
						username: `${process.env.REACT_APP_USERNAME}`,
						password: token,
					},
				}
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getCommitData = async (repo, sha, token) => {
		try {
			const response = await axios.get(
				"https://api.github.com/repos/" + repo + "/commits/" + sha,
				{
					auth: {
						username: `${process.env.REACT_APP_USERNAME}`,
						password: token,
					},
				}
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getPullsNo = async (repo, token) => {
		try {
			const response = await axios.get(
				"https://api.github.com/repos/" + repo + "/pulls?state=all",
				{
					auth: {
						username: `${process.env.REACT_APP_USERNAME}`,
						password: token,
					},
				}
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getOpenPullsNo = async (repo, token) => {
		try {
			const response = await axios.get(
				"https://api.github.com/repos/" + repo + "/pulls?state=open",
				{
					auth: {
						username: `${process.env.REACT_APP_USERNAME}`,
						password: token,
					},
				}
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getClosedPullsNo = async (repo, token) => {
		try {
			const response = await axios.get(
				"https://api.github.com/repos/" + repo + "/pulls?state=closed",
				{
					auth: {
						username: `${process.env.REACT_APP_USERNAME}`,
						password: token,
					},
				}
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};
}

export default new GitHubApiService();
