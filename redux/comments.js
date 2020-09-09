import * as ActionTypes from './ActionTypes'

export const comments = (state = {
        errMess: null,
        comments: []
    }, action) => {
        switch(action.type){
            case ActionTypes.ADD_COMMENTS:
                return {...state, errMess: null, comments: action.payload}

            case ActionTypes.COMMENTS_FAILED:
                return {...state, errMess: action.payload, comments: []}

            case ActionTypes.ADD_COMMENT:
                var lastComment = state.comments[state.comments.length-1]
                var newComment = action.payload
                newComment.id = lastComment.id+1
                return {...state, errMess: null, comments: state.comments.concat(newComment)}

            default:
                return state
        }
    }
