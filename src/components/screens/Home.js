import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";

function Home() {
	const [post, setPosts] = useState([]);
	const apiURL = process.env.REACT_APP_API_URL;

	const getPosts = async () => {
		// let res = await axios.get(`${apiURL}posts`);
		// setPosts(res.data);
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<Layout>
			<div className="main-container ptb-50">
				<div className="row">
					hi
					</div>
			</div>
		</Layout>
	);
}

export default Home;
