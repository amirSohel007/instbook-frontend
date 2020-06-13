import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = process.env.REACT_APP_API_URL 
// const apiUrl = 'http://localhost:5000'

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
};

//login 
export const login = async (e, email, password) => {
  e.preventDefault();
  const data = { email, password };
  let res = await axios.post(`${apiUrl}signin`, data);
  return res.data
}

//Register
export const register = async (e, name, email, password) => {
  e.preventDefault();
  const data = { name, email, password };
  let res = await axios.post(`${apiUrl}signup`, data);
  return res.data;
};

//suggessionUsers Users
export const suggessionUsers = async () => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
  };
  const users = await axios.get(`${apiUrl}allusers`, {headers})
  return users.data
};

//User profile 
export const getProfile = async (userId) => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
  };
  const user = await axios.get(`${apiUrl}user/${userId}`, {headers})
  return user.data
}

//get all feeds posts
export const getPosts = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
  let res = await axios.get(`${apiUrl}posts`, { headers });
  return res.data;
};

export const createPost = async (body, imageUrl) => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
  };
  const post = {body, imageUrl };
  let res = await axios.post(`${apiUrl}addpost`, post, {headers})
  .catch(error => {
    console.log(error)
  })
  return res.data
}

//Delete post
export const deletePost = async (postId) => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
  };
  const deleteItem = await axios.delete(`${apiUrl}delete/${postId}`, {headers})
  if(deleteItem.data.status){
    toast.success("Post has been deleted !", {position: toast.POSITION.BOTTOM_CENTER});
    return deleteItem.data
  }
  else
  toast.danger("Something went wrong !", {position: toast.POSITION.BOTTOM_CENTER});
}

//comment on post
export const commentPost = async (e, id) => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
  };
  e.preventDefault()
  const data = {text:e.target[0].value, postId:id}
  e.target[0].value = ''
  const comment = await axios.put(`${apiUrl}comment`, data, {headers})
  document.querySelectorAll('.comment').value = ''
  return comment.data
}

//like a post
export const likePost = async (id) =>{
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
  const likedPost = await axios.put(`${apiUrl}like`, {postId:id}, {headers})
  return likedPost.data
}

//unlike post 
export const unlikePost= async (id) =>{
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
const unlikedPost = await axios.put(`${apiUrl}unlike`, {postId:id}, {headers})
 return unlikedPost.data
}

export const followUser = async (id) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
  const data = {followId:id}
    const check = await axios.put(`${apiUrl}follow`, data, {headers})
    return check.data
}

export const unfollowUser = async (id) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
   const data = {unfollowId:id}
    const check = await axios.put(`${apiUrl}unfollow`, data, {headers})
    return check.data
}