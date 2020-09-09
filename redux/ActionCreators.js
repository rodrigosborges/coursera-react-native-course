import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if(response.ok){
                return response
            }else{
                var error = new Error(`Error: ${response.status}: ${response.statusText}`)
                error.response = response
                throw error
            }
        },
        error => {
            var errMess = new Error(error.message)
            throw errMess
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = (errMess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
})

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const date = new Date()
    setTimeout(() => {
        dispatch(addComment({
            dishId,
            rating,
            author,
            comment,
            date: date.toISOString(),
        }))
    }, 2000)
}

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})

export const fetchDishes = () => (dispatch) => {
    return fetch(baseUrl + 'dishes')
        .then(response => {
            if(response.ok){
                return response
            }else{
                var error = new Error(`Error: ${response.status}: ${response.statusText}`)
                error.response = response
                throw error
            }
        },
        error => {
            var errMess = new Error(error.message)
            throw errMess
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesLoading = (errMess) => ({
    type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const fetchPromos = () => (dispatch) => {
    return fetch(baseUrl + 'promotions')
        .then(response => {
            if(response.ok){
                return response
            }else{
                var error = new Error(`Error: ${response.status}: ${response.statusText}`)
                error.response = response
                throw error
            }
        },
        error => {
            var errMess = new Error(error.message)
            throw errMess
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)))
}

export const promosLoading = (errMess) => ({
    type: ActionTypes.PROMOS_LOADING
})

export const promosFailed = (errMess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMess
})

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})

export const fetchLeaders = () => (dispatch) => {
    return fetch(baseUrl + 'leaders')
        .then(response => {
            if(response.ok){
                return response
            }else{
                var error = new Error(`Error: ${response.status}: ${response.statusText}`)
                error.response = response
                throw error
            }
        },
        error => {
            var errMess = new Error(error.message)
            throw errMess
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = (errMess) => ({
    type: ActionTypes.LEADERS_LOADING
})

export const leadersFailed = (errMess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMess
})

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})

export const postFavorite = (dishId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorite(dishId))
    }, 2000)
}

export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
})

export const deleteFavorite = (dishId) => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: dishId
});