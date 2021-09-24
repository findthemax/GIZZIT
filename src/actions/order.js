import axios from 'axios'
import { URL, ORDER_SUCCESS, ORDER_FAIL } from "./types";

export const order = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(data)

    try {
        const res = await axios.post(`${URL}/order`, body, config)

        // console.log(res.data);
        dispatch({
            type: ORDER_SUCCESS,
            payload: res.data.returnData
        })

    } catch (err) {
        const errors = err.response.data.errors
        // console.log(errors);
        if(errors) {
            dispatch({
                type: ORDER_FAIL,
                payload: errors
            })
        }
    }

}