import axios from "axios";
import { BE_URL } from "../variable";

const LOGIN = "UserLogin";
const LOGOUT = "LogOut";

const initialState = JSON.parse(localStorage.getItem("user")) || {};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            let data = { ...action.payload };
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        case LOGOUT:
            localStorage.removeItem('user');
            return {};
        default:
            return state;
    }
}


// ACTION
export const LoginAction = (data) => async (dispatch) => {
    const res = await axios.post(`${BE_URL}/users/login`, data);
    res.data && dispatch({ type: LOGIN, payload: res.data });
}

export const ActionRegister = (data) => async () => {

}

export const LogoutAction = () => async (dispatch) => {
    dispatch({ type: LOGOUT });
}

export default AuthReducer;