export function getCategories() {
    return dispatch => {
        return dispatch({
            type: 'GET_CATEGORIES'
        });
    }
};

export function addCategories(data, isNew = false) {
    return dispatch => {
        return dispatch({
            type: 'ADD_CATEGORIES',
            payload: data,
            isNew: isNew,
        });
    }
};

export function editCategories(data) {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_CATEGORIES',
            payload: data,
        });
    }
};

export function deleteCategories(data) {
    return dispatch => {
        return dispatch({
            type: 'DELETE_CATEGORIES',
            payload: data,
        });
    }
};