import React, { useEffect, useState, useContext } from "react";
import Layout from "./Layout";
import Sidebar from './Sidebar'
import {headers, Loader} from '../../method/common'
import {UserContext} from '../../App'
import axios from "axios";

function Home() {
  const {state, dispatch} = useContext(UserContext)
	const [posts, setPosts] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;

  const unlike = async (id) =>{
    const unlike = await axios.put('http://localhost:5000/api/like', {postId:id}, {headers})
    let updatedPost = posts.map(item => {
      if(item._id === unlike.data._id) return unlike.data
      else return item
      })
    setPosts(updatedPost)
 }
 
  const like = async (id) =>{
    const like = await axios.put('http://localhost:5000/api/unlike', {postId:id}, {headers})
    let updatedPost = posts.map(item => {
      if(item._id === like.data._id) return like.data
      else return item
    })
    setPosts(updatedPost)
 }


	const getPosts = async () => {
		let res = await axios.get(`http://localhost:5000/api/posts`, {headers});
    setPosts(res.data);
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
    <Layout>
      <div className="main-container pb-5 pt-5">
        <div className="row">
          <div className="col-sm-7 text-center">
      {posts && posts.length > 0 ? posts.map(post =>{
        return (
          <div className="card mb-4" key={post._id}>
            <div className="user-header d-flex align-items-center p-2">
              <img src="https://scontent.fudr1-1.fna.fbcdn.net/v/t1.0-1/cp0/p40x40/89032796_2568881379999310_9071156969955393536_o.jpg?_nc_cat=100&_nc_sid=7206a8&_nc_ohc=1HgK80DWbWcAX_cW4aV&_nc_ht=scontent.fudr1-1.fna&oh=a9943d102e4ef3ac606dd30d9ba09087&oe=5F03D6C1" />
              <h5 className="mb-0">
                {post.postedBy.name ? post.postedBy.name : "--"}
              </h5>
            </div>
            <div className="post-image">
              <img className="w-100" src={post.imageUrl} />
            </div>
            <div className="post-content text-left p-3">
      
              {post.likes.includes(state._id) ? 
                <div className="heart like is-active" onClick={() => like(post._id)}></div>
               :<div className="heart unlike" onClick={() => unlike(post._id)}></div>
              }
              <p className="mb-0 text-15">{post.likes.length} likes</p>
              <p className="sen-serif text-13">{post.body}</p>
              <input
                type="text"
                className="comment"
                placeholder="Write comment..."
              />
            </div>
          </div>
        );
      }):Loader.section_loading}
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
