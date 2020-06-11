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
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    
    const unlike = await axios.put('http://localhost:5000/api/like', {postId:id}, {headers})
    let updatedPost = posts.map(item => {
      if(item._id === unlike.data._id) return unlike.data
      else return item
      })
    setPosts(updatedPost)
 }
 
  const like = async (id) =>{
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    
    const like = await axios.put('http://localhost:5000/api/unlike', {postId:id}, {headers})
    let updatedPost = posts.map(item => {
      if(item._id === like.data._id) return like.data
      else return item
    })
    setPosts(updatedPost)
 }

	const getPosts = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    
		let res = await axios.get(`http://localhost:5000/api/posts`, {headers});
    setPosts(res.data);
  };
  
  const commentPost = async (e, id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    
    e.preventDefault()
    const data = {text:e.target[0].value, postId:id}
    e.target[0].value = ''
    const comment = await axios.put('http://localhost:5000/api/comment', data, {headers})
    document.querySelectorAll('.comment').value = ''
    let updatedPost = posts.map(item => {
      if(item._id === comment.data._id) return comment.data 
      else return item
    })
    setPosts(updatedPost)
  }


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
            <div className="user-header border-bottom d-flex align-items-center p-2">
              <img src="https://scontent.fudr1-1.fna.fbcdn.net/v/t1.0-1/cp0/p40x40/89032796_2568881379999310_9071156969955393536_o.jpg?_nc_cat=100&_nc_sid=7206a8&_nc_ohc=1HgK80DWbWcAX_cW4aV&_nc_ht=scontent.fudr1-1.fna&oh=a9943d102e4ef3ac606dd30d9ba09087&oe=5F03D6C1" />
              <h5 className="mb-0">
                {post.postedBy.name ? post.postedBy.name : "--"}
              </h5>
            </div>
            <div className="post-image">
              <img className="w-100" src={post.imageUrl} />
            </div>
            <div className="post-content text-left p-3">
              {post.likes && state._id && post.likes.includes(state._id) ? 
                <div className="heart like is-active"  onClick={() => like(post._id)}></div>
               :
                <div className="heart unlike" onClick={() => unlike(post._id)}></div>
              }
              <p className="mb-0 text-15">{post.likes.length} likes</p>
              <p className="sen-serif text-13 mb-1">{post.body}</p>
            {post.comments && post.comments.length > 0 ?  <h5 className="font-weight-bold text-13 text-black-50"> {post.comments.length } comments</h5> : '' }
              <div className="comment-section mb-3">
                {post.comments.map(comment => {
                  return(
                  <p className="mb-0 text-13" key={comment._id}><span className="font-weight-bold">{comment.postedBy.name}</span> - {comment.text}</p>
                  )
                })}
              </div>
              <form onSubmit={(e) => commentPost(e, post._id)}>
                <input type="text" className="comment"  placeholder="Write comment..." />
              </form>
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
