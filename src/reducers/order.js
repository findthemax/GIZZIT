import { ORDER_SUCCESS, ORDER_FAIL } from '../actions/types'

const initialState = {
    errors: [],
    order: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ORDER_SUCCESS:
            return {
                ...state,
                order: payload,
                errors: []
            }
        case ORDER_FAIL:
            return {
                ...state,
                errors: payload,
                order: null
            }
        default:
            return state
    }
}