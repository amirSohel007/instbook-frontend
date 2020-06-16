import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../../App'
import Layout from './Layout'
import {Loader} from '../../method/common'
import {getProfile, followUser, unfollowUser, updateProfilePicture} from '../../API-Calls/Data-provider'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { AiTwotoneSetting } from "react-icons/ai";

const Profile = () => {
  let test = useParams()
  const {state, dispatch} = useContext(UserContext)
  const [profileData, setprofileData] = useState('')
  const [isFollow, setFollow] = useState(false)
  const [image, setImage] = useState()
  const isAdministrator = '5edf5ddc0b47dc117f301ee5'
  const [uploading, setUploading] = useState(false)
  
  const userProfile = async () => {
    let userId = JSON.parse(localStorage.getItem('userInfo'))
    const findUser = await getProfile(test.username);
    if (findUser.userInfo.followers.indexOf(userId._id) != -1) setFollow(true)
    else setFollow(false)
    if (findUser) setprofileData(findUser);

    else console.log("error");
  };

  const follow = async () => {
    const data = await followUser(test.username)
    if(data){
      document.querySelector('.follow-count').innerHTML ++
      setFollow(true)
    }
  }

  const unfollow = async () => {
    const data = await unfollowUser(test.username)
    if(data){
      document.querySelector('.follow-count').innerHTML --
      setFollow(false)
    }
  }


  async function setProfileImage(e) {

    //posting image on server
    setUploading(true)
    const data = new FormData();
    data.append("file", e);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "amirsohel");
    let imageUrl = await axios.post(`https://api.cloudinary.com/v1_1/amirsohel/image/upload`,data)
    .catch(error => console.log(error))
    if(imageUrl.data.url) 
    await setImage(imageUrl.data) 

    //calling the update image api with image src 
    const updateImage = await updateProfilePicture(imageUrl.data.url)

    //dispatch the image url and updating in localStroge
    dispatch({type:'IMAGE', payload:imageUrl.data})
    const getUser = JSON.parse(localStorage.getItem('userInfo'))
    getUser.profileImg = imageUrl.data.url
    localStorage.setItem('userInfo', JSON.stringify(getUser))

    //updating the state
       setprofileData((preState) => {
         return {
           ...preState,
           userInfo: updateImage.data,
         };
       });
      setUploading(false)
  }

  useEffect(() => {
    userProfile();
  }, []);

    return (
      <Layout>
        <div className={`${profileData ? "" : "mt-5 text-center"}`}>
     {profileData && profileData ?
        <div className="row justify-content-center pt-4">
          <div className="col-sm-9">
            <div className="row">
              <div className="col-sm-3">
                <div className="user-avtar">
                  <img className="w-100"
                    src={uploading ? 'https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' :  profileData.userInfo && profileData.userInfo.profileImg }
                  />
                </div>
              </div>
              <div className="col-sm-8 pl-5">
                <div className="user-details">
                    {profileData.userInfo && 
                    <div>
                     {(profileData.userInfo._id) === (state && state._id) ?
                     <div className="update-dp">
                     <label>
                     <AiTwotoneSetting/>  Edit Image
                     <input type="file" id="change-dp" className="d-none"  onChange={(e) => setProfileImage(e.target.files[0])}/>
                     </label>
                   </div> : '' 
                    }
                      <h3>{profileData.userInfo.name} {(isAdministrator) == (profileData.userInfo && profileData.userInfo._id) ? <img className="official-icon" src="../../img/official.png"/> : ''} </h3>
                      <p>{profileData.userInfo.email}</p>
                      <div className="follow-action">
                          {(profileData.userInfo._id) != (state && state._id) ? //Checking if you are logged in user
                          profileData.userInfo.followers.includes(state && state._id) //if you have alredy followed
                        ? <button className="btn btn-primary unfollow" onClick={isFollow ? unfollow : follow}>{isFollow ? 'Unfollow' : 'Follow'}</button>
                        : <button className="btn btn-primary follow" onClick={isFollow ? unfollow : follow}> {isFollow ? 'Unfollow' : 'Follow'} </button> : ''}
                      </div>
                      </div>
                    }
                  <ul className="d-flex justify-content-between list-unstyled m-0 mt-2 p-0">
                    {profileData.userInfo && 
                    profileData.userPosts && 
                    profileData.userInfo.followers &&
                    <React.Fragment>
                    <li>{profileData.userPosts.length + " posts"}</li>
                     <li><span className="follow-count">{profileData.userInfo.followers.length}</span> Followers</li>
                     <li>{profileData.userInfo.following.length} Following </li>
                     </React.Fragment>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="seprator" />
        </div>
     : Loader.section_loading}
     </div>
        <div className="row mt-4">
         {profileData.userPosts && 
            profileData.userPosts.map((post) => {
              return (
                <div key={post._id} className="col-sm-3">
                  <div className="gallery-img">
                  <img className="w-100" src={post.imageUrl} />
                  </div>
                </div>
              );
            }) }
        </div>
          <div className="mt-5 text-center">{profileData.userPosts && profileData.userPosts.length === 0 ? 'You haven\'t post anything yet.' : ''}</div>
      </Layout>
    );
}


export default Profile