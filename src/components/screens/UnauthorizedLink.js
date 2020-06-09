import React, {useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

const UnauthorizedLink = (props) => {
    const {state, dispatch} = useContext(UserContext)
    if(state){
        return ''
    }
    return <Link {...props}>{props.children}</Link>
}

export default UnauthorizedLink