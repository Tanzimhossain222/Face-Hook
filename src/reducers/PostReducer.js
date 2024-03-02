import { actions } from "../actions";

const initialState = {
    posts: [],
    loading: false,
    error: null
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.post.DATA_FETCHING:
            return {
                ...state,
                loading: true
            }
        case actions.post.DATA_FETCHED: {
            return {
                ...state,
                posts: action.data,
                loading: false
            }
        }

        case actions.post.DATA_FETCH_ERROR: {
            return {
                ...state,
                error: action.error,
                loading: false
            }
        }

        default:
            return state;
    }

}

export { initialState, postReducer };
