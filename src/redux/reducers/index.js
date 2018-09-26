const initialState = {
    accessToken: '',
    isLoggedIn: false,
    todoData: []
};


const reducers = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_TOKEN':
            return Object.assign({}, state, {
                accessToken: action.accessToken
            });

        case 'SET_LOGGED_IN_STATUS':
            return Object.assign({}, state, {
                isLoggedIn: action.isLoggedIn
            });

        case 'SET_TODO_DATA':
            return Object.assign({}, state, {
                todoData: action.todoData
            });

        default:
            return state;
    }
};

export default reducers;