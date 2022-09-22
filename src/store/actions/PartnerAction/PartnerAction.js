import { getAllPartner } from "../../../services/PartnerServices/PartnerServices";

export function confirmGetPartner(result) {
    return {
        type: "GET_ALL_PARTNER",
        payload: result
    }
}


export const getPartner = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "SHOW_LOADING"
            })
            const result = await getAllPartner();
            dispatch(confirmGetPartner(result.data.docs))
            dispatch({
                type: "HIDE_LOADING"
            })
        } catch (error) {
            dispatch({
                type: "HIDE_LOADING"
            })
        }
    };
};