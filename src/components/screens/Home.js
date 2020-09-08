import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom'
import Layout from "./Layout";
import Sidebar from './Sidebar'
import { Loader } from '../../method/common'
import { UserContext } from '../../App'
import { AiOutlineDelete } from "react-icons/ai";

import { AiOutlineHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";
import { deletePost, commentPost, getPosts, likePost, unlikePost } from '../../API-Calls/Data-provider'


function Home() {
  const isAdministrator = '5edf5ddc0b47dc117f301ee5'
  const { state, dispatch } = useContext(UserContext)
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
            {posts && posts.length > 0 ? posts.map(post => {
              return (
                <div className="card mb-4" key={post._id}>
                  <div className="user-header border-bottom d-flex align-items-center p-2">
                    <img src={post.postedBy.profileImg} />
                    <h5 className="mb-0">
                      <Link className="text-body" to={`/user/${post.postedBy._id}`}>{post.postedBy.name ? post.postedBy.name : "--"} {isAdministrator == post.postedBy._id ? <img className="official-icon" src="../../img/official.png" /> : ''} </Link>
                    </h5>
                    <div className="action">
                      {post.postedBy._id == state._id ? <AiOutlineDelete onClick={(e) => deleteItem(post._id)} /> : ''}
                    </div>
                  </div>
                  <div className="post-image">
                    <img className="w-100" src={post.imageUrl} />
                  </div>
                  <div className="post-content text-left p-3">
                    {post.likes && state._id && post.likes.includes(state._id) ?
                      <AiTwotoneHeart className="liked_post" onClick={() => unlike(post._id)} />
                      :
                      <AiOutlineHeart onClick={() => like(post._id)} />
                    }
                    <p className="mb-0 text-15">{post.likes.length} likes</p>
                    <p className="sen-serif text-13 mb-3">{post.body}</p>
                    {post.comments?.length > 0 ? <h5 className="text-13 text-black-50"> {post.comments.length} comments</h5> : ''}
                    <div className="comment-section mb-3">
                      {post.comments.map(comment => {
                        return (
                          <p className="mb-0 text-13" key={comment._id}><span className="font-weight-500">{comment.postedBy.name}</span> - {comment.text}</p>
                        )
                      })}
                    </div>
                    <form onSubmit={(e) => commentOnPost(e, post._id)}>
                      <input type="text" className="comment" placeholder="Write comment..." />
                    </form>
                  </div>
                </div>
              );
            }) : Loader.section_loading}
          </div>

          <div className="col-sm-5">
            <Sidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
