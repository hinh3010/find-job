import {
    LOADING_TOGGLE_ACTION,
    LOGIN_CONFIRMED_ACTION,
    LOGIN_FAILED_ACTION,
    LOGOUT_ACTION,
    SIGNUP_CONFIRMED_ACTION,
    SIGNUP_FAILED_ACTION,
    UPDATE_USER_ACTION,
} from '../actions/AuthActions';

const initialState = {
    auth: {
        user: {
            "_id": "",
            "firstName": "",
            "lastName": "",
            "accountType": "",
            "email": "",
            "username": "",
            "accountStatus": "",
            "url": [],
            "hobby": [],
            "education": [],
            "workExperience": [],
            "skill": [],
            "certificate": [],
            "activity": [],
            "createdAt": "",
            "updatedAt": "",
            "fullName": "",
            "id": "",
            "password": "",
        },
        "accessToken": {
            "user": "",
            "token": "",
            "expiredAt": "",
            "refreshToken": "",
            "_id": "",
            "id": ""
        }
    },
    errorMessage: '',
    successMessage: '',
    showLoading: false,
    modal: {
        status: "hide",
        email: "",
        accountType: "",
    }
};

export function AuthReducer(state = initialState, action) {
    if (action.type === SIGNUP_CONFIRMED_ACTION) {
        return {
            ...state,
            auth: action.payload,
            errorMessage: '',
            successMessage: 'Signup Successfully Completed',
            showLoading: false,
        };
    }
    if (action.type === LOGIN_CONFIRMED_ACTION) {
        return {
            ...state,
            auth: action.payload,
            errorMessage: '',
            successMessage: 'Login Successfully Completed',
            showLoading: false,
        };
    }

    if (action.type === LOGOUT_ACTION) {
        return {
            ...state,
            errorMessage: '',
            successMessage: '',
        };
    }

    if (
        action.type === SIGNUP_FAILED_ACTION ||
        action.type === LOGIN_FAILED_ACTION
    ) {
        return {
            ...state,
            errorMessage: action.payload,
            successMessage: '',
            showLoading: false,
        };
    }

    if (action.type === LOADING_TOGGLE_ACTION) {
        return {
            ...state,
            showLoading: action.payload,
        };
    }

    if (action.type === UPDATE_USER_ACTION) {
        return {
            ...state,
            auth: {
                ...state.auth,
                user: {
                    ...action.payload,
                },
            },
        }
    }
    if(action.type === "displayModal") {
        return {
            ...state,
            modal: {
                status: "open",
                email: action.email, 
                accountType: action.accountType,
            }
        }
    }

    if(action.type === "hideModal") {
        return {
            ...state,
            modal: {
                status: "hide",
            }
        }
    }
    return state;
}


