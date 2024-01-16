import { useState } from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../redux/AuthRedux";

import {  toastError, toastInfo } from "../../common/common";

import Logo from "../Logo/Logo";

import "./Login.scss";

const Login = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        sdt: "",
        mat_khau: "",
    });
    const handleChange = e => {
        setInput({
            ...input, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { sdt, mat_khau } = input;
            await dispatch(LoginAction({ sdt, mat_khau }));
            toastInfo("Đăng nhập thành công");
        } catch (error) {
            toastError(error);
        }

    }
    return (
        <div className="Login-Container">
            <form className="Login-Box" onSubmit={handleSubmit}>
                <div className="login-logo">
                    <Logo />
                </div>
                <div className="input-line">
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        required
                        name="sdt"
                        value={input.sdt}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-line">
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        required
                        name="mat_khau"
                        value={input.mat_khau}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-line">
                    <input type="submit" className="login-btn" value="Đăng nhập" />
                </div>

                <div className="input-line or-name">
                    <span></span>
                    <div>HOẶC</div>
                    <span></span>
                </div>

                <div className="input-line register-direct">
                    <p>Bạn chưa có tài khoản ư?</p>
                    <Link to="register">
                        Đăng ký
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;