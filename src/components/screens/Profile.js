import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../../App'
import Layout from './Layout'
import {Loader} from '../../method/common'
import {getProfile, followUser, unfollowUser} from '../../API-Calls/Data-provider'
import { useParams } from 'react-router-dom';
 

const Profile = () => {
  let test = useParams()
  const {state, dispatch} = useContext(UserContext)
  const [profileData, setprofileData] = useState('')
  const [isFollow, setFollow] = useState(false)
  
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
                    src="https://instagram.fudr1-1.fna.fbcdn.net/v/t51.2885-15/e35/95715753_621921261733712_3830589580592716532_n.jpg?_nc_ht=instagram.fudr1-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=DBwUh4F0PdQAX_IjDPf&oh=e9be9e4585b64b4978e0205d8990c3e2&oe=5F09160B"
                  />
                </div>
              </div>
              <div className="col-sm-8 pl-5">
                <div className="user-details">
                    {profileData.userInfo && 
                    <div>
                      <h3>{profileData.userInfo.name}</h3>
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
        <div className="row">
         {profileData.userPosts &&
            profileData.userPosts.map((post) => {
              return (
                <div key={post._id} className="col-sm-3">
                  <img className="w-100" src={post.imageUrl} />
                </div>
              );
            })}
        </div>
      </Layout>
    );
}

export default Profile