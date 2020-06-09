import React, {useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

const AuthorizedLink = (props) => {
    const {state, dispatch} = useContext(UserContext)
        if(state){
        return <Link {...props}>{props.children}</Link>
        }
        return ''
}

export default AuthorizedLink