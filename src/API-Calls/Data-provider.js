import instance from "../../src/axios-instance";

//login
export const login = async (e, email, password) => {
  e.preventDefault();
  const data = { email, password };
  let res = await instance.post(`signin`, data);
  return res.data;
};

//Register
export const register = async (e, name, email, password) => {
  e.preventDefault();
  const data = { name, email, password };
  let res = await instance.post(`signup`, data);
  return res.data;
};

//Register
export const findUser = async (key) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
  let body = { key: key };
  let res = await instance.post(`search`, body, { headers });
  return res.data;
};

//suggessionUsers Users
export const suggessionUsers = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
  const users = await instance.get(`allusers`, { headers });
  return users.data;
};

//User profile
export const getProfile = async (userId) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
  const user = await instance.get(`user/${userId}`, { headers });
  return user.data;
};

//get all feeds posts
export const getPosts = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
  let res = await instance.get(`posts`, { headers });
  return res.data;
};

export const createPost = async (body, imageUrl) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
  const post = { body, imageUrl };
  let res = await instance.post(`addpost`, post, { headers }).catch((error) => {
    console.log(error);
  });
  return res.data;
};

//Delete post
export const deletePost = async (postId) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
  const deleteItem = await instance.delete(`delete/${postId}`, { headers });
  if (deleteItem.data.status) {
    // toast.success("Post has been deleted !", {position: toast.POSITION.BOTTOM_CENTER});
    return deleteItem.data;
  }
  // else
  // toast.danger("Something went wrong !", {position: toast.POSITION.BOTTOM_CENTER});
};

//comment on post
export const commentPost = async (e, id) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
  e.preventDefault();
  const data = { text: e.target[0].value, postId: id };
  e.target[0].value = "";
  const comment = await instance.put(`comment`, data, { headers });
  document.querySelectorAll(".comment").value = "";
  return comment.data;
};

//like a post
export const likePost = async (id) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
  const likedPost = await instance.put(`like`, { postId: id }, { headers });
  return likedPost.data;
};

//unlike post
export const unlikePost = async (id) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
  const unlikedPost = await instance.put(`unlike`, { postId: id }, { headers });
  return unlikedPost.data;
};

//follow user
export const followUser = async (id) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
  const data = { followId: id };
  const check = await instance.put(`follow`, data, { headers });
  return check.data;
};

//unfollow user
export const unfollowUser = async (id) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
  const data = { unfollowId: id };
  const check = await instance.put(`unfollow`, data, { headers });
  return check.data;
};

//change profile
export const updateProfilePicture = async (profileImg) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
  const data = { profileImg: profileImg };
  const newImageData = await instance.put(`update-image`, data, { headers });
  return newImageData;
};
