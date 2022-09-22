import swal from "sweetalert";
import { saveTokenInLocalStorage } from "../../../services/AuthService";
import { createContacts, getUserByIds, updateUsers } from "../../../services/UserServices/UserServices";
import { UPDATE_USER_ACTION } from "../AuthActions";


export function confirmUpdateUser(result) {
    return {
        type: UPDATE_USER_ACTION,
        payload: result
    }
}


export const updateUser = (id, data, token, accessToken) => {
    return async (dispatch) => {
        try {
            const result = await updateUsers(id, data, token);
            dispatch(confirmUpdateUser(result.data));
            saveTokenInLocalStorage({
                user: result.data,
                accessToken: accessToken
            });
            swal("Success", "Cập nhật thành công!!", "success");
        } catch (error) {
            swal("Error", "Cập nhật thất bại, vui lòng kiểm tra lại thông tin!!", "error");
        }
    };
};

export const getUserById = (id, accessToken) => {
    return async (dispatch) => {
        try {
            const result = await getUserByIds(id, accessToken.token);
            dispatch(confirmUpdateUser(result.data));
            saveTokenInLocalStorage({
                user: result.data,
                accessToken: accessToken
            });
        } catch (err) {
            console.log(err);
        }
    }
}

export const createContact = (data, token) => {
    return async (dispatch) => {
        try {
            const result = await createContacts(data, token);
            swal("Success", "Gửi tin nhắn thành công, vui lòng đợi kiểm duyệt và phản hồi!!", "success");
        } catch (err) {
            console.log(err)
            swal("Warning", "Bạn đã gửi tin nhắn trước đó, vui lòng đợi phản hồi sau!!", "warning");

        }
    }
}
