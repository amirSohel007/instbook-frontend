import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import PostCard from './Post-card'
import Sidebar from './Sidebar'
import axios from "axios";

function Home() {
	const [posts, setPosts] = useState([]);
	const apiURL = process.env.REACT_APP_API_URL;

	const getPosts = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        `Bearer ${localStorage.getItem('authToken')}`,
    };
		let res = await axios.get(`http://localhost:5000/api/posts`, {headers:headers});
    setPosts(res.data);
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
    <Layout>
      <div className="main-container pb-5 pt-5">
        <div className="row">
          <div className="col-sm-7">
            {posts ? posts.map((post) => (
                <PostCard
                  key={post._id}
                  image={post.imageUrl}
                  author={post.postedBy}
                  id={post._id}
                  body={post.body}
                />)) : 'loading...'}
          </div>

          <div className="col-sm-4 offset-1">
           <Sidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
