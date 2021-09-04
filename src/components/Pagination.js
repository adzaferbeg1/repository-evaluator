const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++)
		pageNumbers.push(i);

	return (
		<nav>
			<ul
				className="pagination"
				style={{ display: "flex", flexDirection: "row", paddingLeft: "0" }}
			>
				{pageNumbers.map((number) => (
					<li key={number + " pagination "} className="page-item">
						<div
							className="page-link"
							onClick={() => paginate(number)}
							style={{
								marginRight: "0.5em",
								backgroundColor: "white",
								width: "20px",
								border: "1px solid black",
								cursor: "pointer",
								textAlign: "center",
							}}
						>
							{number}
						</div>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
