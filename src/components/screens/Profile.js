import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../../App'
import Layout from './Layout'
import {headers, Loader} from '../../method/common'
import axios from 'axios'
 
const Profile = () => {
    const {state, dispatch} = useContext(UserContext)
    const [posts, setPosts] = useState([])

    const getMyPosts = async () => {
        const response = await axios.get('http://localhost:5000/api/mypost', {headers})
        setPosts(response.data)
        console.log(response.data)
    }

    useEffect(() => {
        getMyPosts()
    },[])
   

    return (
      <Layout>
        <div className="row justify-content-center pt-4">
          <div className="col-sm-9">
            <div className="card p-4 pt-3">
              <div className="row">
                <div className="col-sm-3">
                  <div className="user-avtar">
                    <img
                      className="w-100"
                      src="https://instagram.fudr1-1.fna.fbcdn.net/v/t51.2885-15/e35/95715753_621921261733712_3830589580592716532_n.jpg?_nc_ht=instagram.fudr1-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=DBwUh4F0PdQAX_IjDPf&oh=e9be9e4585b64b4978e0205d8990c3e2&oe=5F09160B"
                    />
                  </div>
                </div>
                <div className="col-sm-8 pl-5">
                  <div className="user-details">
                     <h3>{state? state.name : ''}</h3>
                    <ul className="d-flex justify-content-between list-unstyled m-0 mt-2 p-0">
                      <li>{posts && posts.length > 0 ? posts.length + ' posts' : Loader.section_loading}</li>
                      <li>671 followers</li>
                      <li>249 following</li>
                     </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
               {posts && posts.map(post => {
                   return(
                    <div className="col-sm-3">
                    <img key={post._id} className="w-100" src={post.imageUrl}/>
                     </div>
                   )
               })}
        </div>
      </Layout>
    );
}

export default Profile