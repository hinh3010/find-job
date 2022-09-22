import { GET_ALL_COUNTRY, GET_ALL_PROVINE } from "../actions/Location/LocationTypes";

const initialState = {
    provinces: [
        {
            _id: "61b327306583182246621370",
            name: "Thành phố Hà Nội",
            type: "province",
            location_id: "01",
            parent: "6296ebbdb4382126ae3b13a5",
            id: "61b327306583182246621370"
        },
    ],
    country: [
        {
            _id: "6296ee56b4382126ae3b148e",
            name: "Vietnam",
            type: "country",
            id: "6296ee56b4382126ae3b148e"
        },
    ]
};

export const LocationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROVINE: {
            state.provinces = action.payload;
            return { ...state }
        }
        case GET_ALL_COUNTRY: {
            state.country = action.payload;
            return {...state}
        }
        default:
            return { ...state };
    }
};
