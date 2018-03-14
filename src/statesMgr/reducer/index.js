const initState = {
    loginStatus : false,
    fetching: false
}
export const reducer = (state = initState, action) => {
    let newState = Object.assign({}, state)
    switch (action.type) {
    case 'SET_LOGIN_TRUE': 
        newState.loginStatus = true
        return newState
    case 'SET_LOGIN_FALSE':
        newState.loginStatus = false
        return newState
    case 'SET_FETCHING_FALSE':
        newState.fetching = false
        return newState
    case 'SET_FETCHING_TRUE':
        newState.fetching = true
        return newState
    default: return newState;
    }
};