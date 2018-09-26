export const setUserToken = () => {
    return {
        type: 'SET_USER_TOKEN',
        accessToken: ''
    }
};

export const setLoggedInStatus = () => {
    return {
        type: 'SET_LOGGED_IN_STATUS',
        isLoggedIn: false
    }
};

export const setToDoData = () => {
    return {
        type: 'SET_TODO_DATA',
        todoData: []
    }
};