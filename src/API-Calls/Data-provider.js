import instance from '../../src/axios-instance'

//login 
export const login = async (e, email, password) => {
  e.preventDefault();
  const data = { email, password };
  let res = await instance.post(`signin`, data);
  return res.data
}

//Register
export const register = async (e, name, email, password) => {
  e.preventDefault();
  const data = { name, email, password };
  let res = await instance.post(`signup`, data);
  return res.data;
};

//Register
export const findUser = async (key) => {
  let body = {key:key}
  let res = await instance.post(`search`, body, );
  return res.data;
};

//suggessionUsers Users
export const suggessionUsers = async () => {
  const users = await instance.get(`allusers`, )
  return users.data
};

//User profile 
export const getProfile = async (userId) => {
  const user = await instance.get(`user/${userId}`, )
  return user.data
}

//get all feeds posts
export const getPosts = async () => {
  let res = await instance.get(`posts`);
  return res.data;
};

export const createPost = async (body, imageUrl) => {
  const post = {body, imageUrl };
  let res = await instance.post(`addpost`, post, )
  .catch(error => {
    console.log(error)
  })
  return res.data
}

//Delete post
export const deletePost = async (postId) => {
  const deleteItem = await instance.delete(`delete/${postId}`, )
  if(deleteItem.data.status){
    // toast.success("Post has been deleted !", {position: toast.POSITION.BOTTOM_CENTER});
    return deleteItem.data
  }
  // else
  // toast.danger("Something went wrong !", {position: toast.POSITION.BOTTOM_CENTER});
}

//comment on post
export const commentPost = async (e, id) => {
  e.preventDefault()
  const data = {text:e.target[0].value, postId:id}
  e.target[0].value = ''
  const comment = await instance.put(`comment`, data, )
  document.querySelectorAll('.comment').value = ''
  return comment.data
}

//like a post
export const likePost = async (id) =>{
  const likedPost = await instance.put(`like`, {postId:id}, )
  return likedPost.data
}

//unlike post 
export const unlikePost= async (id) =>{
const unlikedPost = await instance.put(`unlike`, {postId:id}, )
 return unlikedPost.data
}

//follow user
export const followUser = async (id) => {
  const data = {followId:id}
    const check = await instance.put(`follow`, data, )
    return check.data
}


//unfollow user
export const unfollowUser = async (id) => {
    const data = {unfollowId:id}
    const check = await instance.put(`unfollow`, data, )
    return check.data
}

//change profile
export const updateProfilePicture = async (profileImg) => {
  const data = {profileImg:profileImg}
  const newImageData = await instance.put(`update-image`, data, )
  return newImageData
}