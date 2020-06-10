import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../../App'
import {Loader, headers} from '../../method/common'
import axios from 'axios'

const Sidebar = () => {
const {state, dispatch} = useContext(UserContext)
const [users, setUsers] = useState([])

  const getUsers = async () => {
    const users = await axios.get("http://localhost:5000/api/allusers", {headers,});
    setUsers(users.data);
  };


  useEffect(() => getUsers(),[])



    return (
      <div className="sidebar">
        <div className="user-header d-flex align-items-center p-2">
          <img src="https://scontent.fudr1-1.fna.fbcdn.net/v/t1.0-1/cp0/p40x40/89032796_2568881379999310_9071156969955393536_o.jpg?_nc_cat=100&_nc_sid=7206a8&_nc_ohc=1HgK80DWbWcAX_cW4aV&_nc_ht=scontent.fudr1-1.fna&oh=a9943d102e4ef3ac606dd30d9ba09087&oe=5F03D6C1" />
          <div>
            <h5 className="mb-0">{state && state.name}</h5>
            <p className="mb-0 text-13 text-black-50">{state && state.email}</p>
          </div>
        </div>
        <div className="user-suggestion mt-4">
          <h3 className="font-weight-bold text-15 text-black-50 mb-4">
            Suggestion For You
          </h3>
          <ul className="p-0 m-0 list-unstyled">
            {users && users.length > 0 ?  users.map(user => {
              return(
            <li className="mb-3" key={user._id}>
              <div className="follow-suggestion d-flex">
                <div className="align-items-center d-flex justify-content-between p-2 user-header w-100">
                  <img src="https://scontent.fudr1-1.fna.fbcdn.net/v/t1.0-1/cp0/p40x40/89032796_2568881379999310_9071156969955393536_o.jpg?_nc_cat=100&amp;_nc_sid=7206a8&amp;_nc_ohc=1HgK80DWbWcAX_cW4aV&amp;_nc_ht=scontent.fudr1-1.fna&amp;oh=a9943d102e4ef3ac606dd30d9ba09087&amp;oe=5F03D6C1" />
                  <div className="flex-grow-1">
                    <h5 className="mb-0">{user.name}</h5>
                    <p className="mb-0 text-13 text-black-50">
                   {user.email}
                    </p>
                  </div>
                  <div>
                    <button className="btn btn-primary follow-sm">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </li>
              )
            }) : Loader.section_loading}
          </ul>
        </div>
      </div>
    );
}
export default Sidebar