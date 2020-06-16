export const initialState = null

export const reducer = (state, action) => {
    if (action.type=== 'USER'){
        return action.payload
    }

    if (action.type=== 'CLEAR'){
        return null
    }

    if (action.type=== 'IMAGE'){
        return{
            ...state,
            profileImg:action.payload.url
        }
    }
    return state
}