const initState = {
    loginStatus : false,
    fetching: false,
    inqList: [],
    curInq: null
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
    case 'SET_FETCHING':
        let pl = action.payLoad
        console.warn(Math.floor(pl.nonce % 4))
        if (Math.floor(pl.nonce % 4) === 0) {
            console.warn('Good Luck! Door open!')
            newState.fetching = true
            newState.loginStatus = true
        } else {
            console.info('Bad luck! Try again!')
            newState.fetching = false
            newState.loginStatus = false
        }
        return newState
    case 'SET_INQ_LIST':
        if (action.payLoad.type = 'add') {
            newState.inqList = newState.inqList.concat(action.payLoad.data)
        } else if (action.payLoad.type = 'remove') {
            newState.inqList.splice(action.payLoad.delIndex,1)
        } else if (action.payLoad.type = 'set') {
            newState.inqList[action.payLoad.delIndex] = action.payLoad.data
        }
        return newState
    default: return newState;
    }
};