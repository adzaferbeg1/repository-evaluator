import React, { useState } from "react";
import {
	IoMdArrowRoundBack,
	IoIosGitBranch,
	IoMdClose,
	IoMdOpen,
	IoIosGitPullRequest,
} from "react-icons/io";
import GitHubApiService from "../services/GitHubApiService";
import Pagination from "./Pagination";
import ProgressBar from "./ProgressBar";
import ProgressUtils from "../utils/ProgressUtils";
import TotalResult from "./TotalResult";
import "./Evaluator.css";
import { useTokenContext } from "../AppContext";

export default function Evaluator() {
	const [showInput, setShowInput] = useState(true);
	const [url, setUrl] = useState("");
	const [urlTitle, setUrlTitle] = useState("");
	const [branches, setAllBranches] = useState([]);
	const [allBranchCommits, setAllBranchCommits] = useState([]);
	const [index, setIndex] = useState(0);
	const [selectedBranch, setSelectedBranch] = useState("No branch selected");
	const [loading, setLoading] = useState(true);
	const [loadingPulls, setLoadingPulls] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	const [pullRequests, setPullRequests] = useState([]);
	const [documentationProvided, setDocumentationProvided] = useState(false);
	const [pullPercentage, setPullPercentage] = useState("0%");
	const [commitPercentage, setCommitPercentage] = useState("0%");
	const { token, setToken } = useTokenContext();

	const analyseData = async () => {
		if (url === "") {
			alert("No reposiroty URL provided");
		} else {
			setShowInput(false);
			const urlTitle = url.replace("https://github.com/", "");
			setUrlTitle(urlTitle);
			const branches = await GitHubApiService.getBranches(urlTitle, token);
			setAllBranches(branches);

			// GET COMMITS FOR EVERY BRANCH

			const allBranchCommits = [];
			for (let k = 0; k < branches.length; k++) {
				allBranchCommits.push([]);
			}
			for (let j = 0; j < branches.length; j++) {
				for (let i = 1; i < 6; i++) {
					const array = await GitHubApiService.getAllCommitsForBranch(
						urlTitle,
						branches[j].name,
						i,
						token
					);
					if (array.length === 0) break;
					allBranchCommits[j].push(...array);
				}
			}
			setAllBranchCommits(allBranchCommits);

			// GET ALL PULL REQUESTS

			const pullsNo = await GitHubApiService.getPullsNo(urlTitle, token);
			pullRequests.push(pullsNo);
			const openPullsNo = await GitHubApiService.getOpenPullsNo(urlTitle, token);
			pullRequests.push(openPullsNo);
			const closedPullsNo = await GitHubApiService.getClosedPullsNo(urlTitle, token);
			pullRequests.push(closedPullsNo);
			setLoadingPulls(false);
			setPullPercentage(
				ProgressUtils.calculatePullProgress(pullsNo, closedPullsNo)
			);
			setCommitPercentage(
				ProgressUtils.calculateCommitProgress(
					allBranchCommits,
					branches,
					pullRequests[2].length
				)
			);
		}
	};

	const renderItems = () => {
		if (showInput) {
			return (
				<>
					<input
						type="text"
						className="repo-link"
						placeholder="Paste GitHub repository URL here"
						value={url}
						onChange={(e) => {
							setUrl(e.target.value);
						}}
					/>
					<input
						type="text"
						placeholder="Paste AUTH token here"
						className="repo-link"
						value={token}
						onChange={(e) => {
							setToken(e.target.value);
						}}
					/>
					<button
						className="analyze-button"
						onClick={() => {
							analyseData();
						}}
					>
						Analyse
					</button>
				</>
			);
		} else {
			return (
				<div>
					<p className="analyze-title">
						You are analysing {urlTitle} repository
					</p>
				</div>
			);
		}
	};

	// LOAD COMMIT DATA FOR EVERY BRANCH

	const loadDataForBranch = async (index) => {
		console.log("Loading data...");
		for (let o = 0; o < allBranchCommits[index].length; o++) {
			allBranchCommits[index][o] = await GitHubApiService.getCommitData(
				urlTitle,
				allBranchCommits[index][o].sha,
				token
			);
		}
		setLoading(false);
	};

	//PAGINATE COMMIT RESULTS

	const indexOfLastPage = currentPage * postsPerPage;
	const indexOfFirstPage = indexOfLastPage - postsPerPage;
	let currentCommitsPage = [];

	if (allBranchCommits !== undefined) {
		if (allBranchCommits[index] !== undefined) {
			currentCommitsPage = allBranchCommits[index].slice(
				indexOfFirstPage,
				indexOfLastPage
			);
		}
	}

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className="evaluator">
			<div className="nav-bar">
				<label className="nav-label">Repository Evaluator v.1.0</label>
				<div className="nav-list">
					<a
						className="nav-list-label"
						href="https://www.overleaf.com/read/qhxztnhcvzcv"
					>
						Help
					</a>
					<a
						className="nav-list-label"
						href="https://www.overleaf.com/read/qhxztnhcvzcv"
					>
						Docs
					</a>
				</div>
			</div>
			<div className="middle-container">
				<IoMdArrowRoundBack
					className="back-svg"
					style={
						!showInput ? { visibility: "visible" } : { visibility: "hidden" }
					}
					onClick={() => {
						setShowInput(true);
						setSelectedBranch("No branch selected");
						setAllBranchCommits([]);
						setPullRequests([]);
						setCommitPercentage("0.00%");
						setPullPercentage("0.00%");
						setDocumentationProvided(false);
						setLoadingPulls(true);
						setLoading(true);
					}}
				/>
				<div className="page-content">
					<img alt="git" src="gitlogo.PNG" className="git-logo" />
					{renderItems()}
				</div>

				{!showInput ? (
					<div className="loaded-data">
						<div className="loaded-data-row">
							<div className="branches-card">
								<h4>BRANCHES</h4>
								{branches !== undefined
									? branches.map((branch, index) => (
											<h5
												key={branch + index}
												className="branch-name"
												onClick={() => {
													setSelectedBranch(branch.name);
													setIndex(index);
													setLoading(true);
													loadDataForBranch(index);
												}}
											>
												<IoIosGitBranch /> {branch.name}
											</h5>
									  ))
									: null}
							</div>
							<div className="commits-card">
								<h4>COMMITS FOR BRANCH {selectedBranch}</h4>
								<table className="commits-table">
									<thead className="commits-table-head">
										<tr>
											<th colSpan="2">Message</th>
											<th>Files changed</th>
											<th>Additions</th>
											<th>Deletions</th>
											<th>Modifications</th>
										</tr>
									</thead>
									<tbody>
										{allBranchCommits !== undefined && !loading
											? currentCommitsPage.map((commit, index) => (
													<tr key={commit.sha + index}>
														<td colSpan="2">{commit.commit.message}</td>
														<td>{commit.files.length}</td>
														<td style={{ color: "green" }}>
															{commit.stats.additions}
														</td>
														<td style={{ color: "red" }}>
															{commit.stats.deletions}
														</td>
														<td>{commit.stats.total}</td>
													</tr>
											  ))
											: null}
									</tbody>
								</table>
								{allBranchCommits[index] !== undefined && !loading ? (
									<div className="pagination-list">
										<Pagination
											postsPerPage={postsPerPage}
											totalPosts={allBranchCommits[index].length}
											paginate={paginate}
										/>

										<h5>
											TOTAL NUMBER OF COMMITS: {allBranchCommits[index].length}
										</h5>
									</div>
								) : null}
								{selectedBranch !== "No branch selected" && loading ? (
									<h4>Loading data...</h4>
								) : null}
							</div>
						</div>
						<div className="loaded-data-row">
							<div className="pulls-card">
								<h4>PULL REQUESTS</h4>
								{pullRequests !== undefined && !loadingPulls ? (
									<>
										<h5 key={pullRequests[0].length + 0} className="pull-name">
											<IoIosGitPullRequest /> total {pullRequests[0].length}
										</h5>
										<h5 key={pullRequests[1].length + 1} className="pull-name">
											<IoMdOpen /> open {pullRequests[1].length}
										</h5>
										<h5 key={pullRequests[2].length + 2} className="pull-name">
											<IoMdClose /> closed {pullRequests[2].length}
										</h5>
									</>
								) : null}
							</div>
							<div className="results-card">
								<h4>REPOSITORY EVALUATION RESULT</h4>
								<div className="progress-row">
									<p className="result-name">
										branching and commiting {(commitPercentage / 3).toFixed(2)}%
									</p>
									<ProgressBar currentValue={commitPercentage} />
								</div>
								<div className="progress-row">
									<p className="result-name">
										pull requests and merging{" "}
										{(pullPercentage.replace("%", "") / 3).toFixed(2)}%
									</p>
									<ProgressBar currentValue={pullPercentage} />
								</div>
								<div className="progress-row">
									<p className="result-name">
										documentation provided{" "}
										{documentationProvided ? "33.33%" : "0.00%"}
									</p>
									<label>YES/NO</label>
									<input
										type="checkbox"
										onChange={(e) => setDocumentationProvided(e.target.checked)}
									/>
									<ProgressBar
										currentValue={documentationProvided ? "100%" : "0%"}
									/>
								</div>
							</div>
						</div>
						<div>
							<TotalResult
								totalPercentage={
									documentationProvided
										? parseFloat((commitPercentage / 3).toFixed(2)) +
										  parseFloat(
												(pullPercentage.replace("%", "") / 3).toFixed(2)
										  ) +
										  33.33
										: parseFloat((commitPercentage / 3).toFixed(2)) +
										  parseFloat(
												(pullPercentage.replace("%", "") / 3).toFixed(2)
										  )
								}
							/>
						</div>
					</div>
				) : null}
			</div>
			<div className="footer">
				Praktično rješenje završnog rada prvog ciklusa na temu "Automatska
				evaluacija najboljih praksi pri korištenju Git repozitorija"
				<br />
				Autor: Ajla Džaferbegović
				<br />
				Elektrotehnički fakultet Univerziteta u Sarajevu
				<br />
				Septembar 2021. godine
			</div>
		</div>
	);
}
