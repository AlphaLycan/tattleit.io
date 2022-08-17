// export const initialState = { token: localStorage.getItem('jwtoken'),
// isAuthenticated: localStorage.getItem('jwtoken') ? true : false,
// isLoading: false,
// isRegistered: false};

export const initialState = null;
export const reducer = (state, action) => {
    if (action.type === "USER") {
        return action.payload;
    }
    return state;
}