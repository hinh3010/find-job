const initialState = {
    allPartner: [],
};

export const PartnerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_PARTNER": {
            state.allPartner = action.payload;
            return { ...state }
        }
        default:
            return { ...state };
    }
};
