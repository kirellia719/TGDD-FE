import { toast } from "react-toastify";
import { LogoutAction } from "../redux/AuthRedux";

import { toastOption } from "../variable"

const ErrorController = (error, dispatch) => {
    if (error.response && error.response.data === "TokenExpiredError") {
        dispatch(LogoutAction());
        toast.error("Hết phiên đăng nhập", toastOption)
    }
}
export default ErrorController;

