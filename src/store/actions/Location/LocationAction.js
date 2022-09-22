import { GET_ALL_COUNTRY, GET_ALL_PROVINE } from "./LocationTypes";
import { getCountry, getProvine } from "../../../services/LocationServices/LocationServices";

export function confirmGetAllProvine(provinces) {
    return {
        type: GET_ALL_PROVINE,
        payload: provinces,
    };
}

export function confirmGetAllCountry(country) {
    return {
        type: GET_ALL_COUNTRY,
        payload: country
    }
}

export const getAllProvine = () => {
    return async (dispatch) => {
        try {
            const result = await getProvine();
            dispatch(confirmGetAllProvine(result.data.docs));
        } catch (error) {
            console.error(error);
        }
    };
};

export const getAllCountry = () => {
    return async (dispatch) => {
        try {
            const result = await getCountry();
            dispatch(confirmGetAllCountry(result.data.docs));
        } catch (error) {
            console.error(error);
        }
    }
}