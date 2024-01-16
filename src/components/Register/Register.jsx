import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";
import { ActionRegister } from "../../redux/AuthRedux";

import "./Register.scss";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: "",
        fullname: "",
        password: "",
        confirm: ""
    });
    const handleChange = e => {
        setInput({
            ...input, [e.target.name]: e.target.value
        })
    }

    const showError = (msg) => {
        toast.error(msg, {
            position: "bottom-right",
            autoClose: 3000,
            closeButton: false,
            closeOnClick: true,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.password !== input.confirm) {
            showError("Mật khẩu không khớp");
        } else {
            try {
                const { username, fullname, password } = input;
                await dispatch(ActionRegister({ username, fullname, password }));
                toast.info("Đăng ký thành công", {
                    position: "bottom-right",
                    autoClose: 3000,
                    closeButton: false,
                    closeOnClick: true,
                })
                setTimeout(() => {
                    navigate("/auth");
                }, 2000)
            } catch (error) {
                console.log(error);
                showError(error.response.data)
            }
        }
    }
    return (
        <div className="Register-Container">
            <form className="Register-Box" onSubmit={handleSubmit}>
                <div className="login-logo">
                    <Logo />
                </div>


                <div className="input-line">
                    <input
                        type="text"
                        placeholder="Tên hiển thị"
                        name="fullname"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-line">
                    <input
                        type="text"
                        placeholder="Tên đăng nhập"
                        name="username"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-line">
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-line">
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        name="confirm"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-line">
                    <input
                        type="submit"
                        className="login-btn"
                        value="Tạo tài khoản"
                    />
                </div>

                <div className="input-line or-name">
                    <span></span>
                    <div>HOẶC</div>
                    <span></span>
                </div>

                <div className="input-line register-direct">
                    <p>Đã có tài khoản?</p>
                    <Link to="..">
                        Đăng nhập
                    </Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Register;