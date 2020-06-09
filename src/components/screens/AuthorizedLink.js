import React, {useContext} from 'react'
import {UserContext} from '../../App'

const AuthorizedLink = ({children}) => {
    const {state, dispatch} = useContext(UserContext)
    if(state){
        return <React.Fragment>{children}</React.Fragment>
    }
    else {
        return ''
    }
        
}

export default AuthorizedLink