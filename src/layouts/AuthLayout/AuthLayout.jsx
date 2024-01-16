
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

import "./AuthLayout.scss";
import { useSelector } from "react-redux";

const AuthLayout = () => {
    const token = useSelector(state => state.AuthReducer.ID);
    if (token) return <Navigate to="/" />
    else return (
        <div className="AuthLayout">
            <div className="AuthBox">
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Routes>
            </div>
        </div>
    );
}

export default AuthLayout;