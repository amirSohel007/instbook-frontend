import React, { useEffect, useState, useContext } from "react";
import {Link} from 'react-router-dom'
import Layout from "./Layout";
import Sidebar from './Sidebar'
import {Loader} from '../../method/common'
import {UserContext} from '../../App'
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer } from 'react-toastify';
import {deletePost, commentPost, getPosts, likePost, unlikePost} from '../../API-Calls/Data-provider'
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const {state, dispatch} = useContext(UserContext)
  const [posts, setPosts] = useState([]);

  const like = async (id) => {
    const likedPost = await likePost(id);
    let updatedPost = posts.map((item) =>
      item._id === likedPost._id ? likedPost : item
    );
    setPosts(updatedPost);
  };

  const unlike = async (id) => {
    const unlikeItem = await unlikePost(id);
    let unlikedPost = posts.map((item) =>
      item._id === unlikeItem._id ? unlikeItem : item
    );
    setPosts(unlikedPost);
  };

  const getFeeds = async () => {
    const getFeeds = await getPosts();
    setPosts(getFeeds);
  };

  const commentOnPost = async (e, id) => {
    const commentedPost = await commentPost(e, id);
    let updatedPost = posts.map((item) =>
      item._id === commentedPost._id ? commentedPost : item
    );
    setPosts(updatedPost);
  };

  const deleteItem = async (postId) => {
    const deletedPost = await deletePost(postId);
    const filteredItem = posts.filter(
      (item) => item._id != deletedPost.removePost._id
    );
    setPosts(filteredItem);
  };

	useEffect(() => {
		getFeeds();
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
              <Link className="text-body" to={`/user/${post.postedBy._id}`}>{post.postedBy.name ? post.postedBy.name : "--"}</Link>
              </h5>
              <div className="action">
              {post.postedBy._id == state._id ? <AiOutlineDelete onClick={(e) => deleteItem(post._id)}/> :''} 
              </div>
              </div>
            <div className="post-image">
              <img className="w-100" src={post.imageUrl} />
            </div>
            <div className="post-content text-left p-3">
              {post.likes && state._id && post.likes.includes(state._id) ? 
                <div className="heart like is-active"  onClick={() => unlike(post._id)}></div>
               :
                <div className="heart unlike" onClick={() => like(post._id)}></div>
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
              <form onSubmit={(e) => commentOnPost(e, post._id)}>
                <input type="text" className="comment"  placeholder="Write comment..." />
              </form>
            </div>
          </div>
        );
      }): Loader.section_loading }
          </div>

          <div className="col-sm-4 offset-1">
            <Sidebar />
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000}/>
    </Layout>
  );
}

export default Home;
