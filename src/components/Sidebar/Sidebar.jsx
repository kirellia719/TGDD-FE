import { Link, NavLink } from "react-router-dom";
import "./Sidebar.scss";
import Logo from "../Logo/Logo";
import { useDispatch } from "react-redux";
import { LogoutAction } from "../../redux/AuthRedux";
import layouts from "../../layouts";

const styleActive = ({ isActive }) => (
    isActive ?
        {
            fontWeight: 700
        }
        : {}
)

const Sidebar = () => {
    const dispatch = useDispatch();
    const handleLogOut = async () => {
        await dispatch(LogoutAction())
    }
    return (
        <div className="Sidebar">
            <Link to="/" style={{ textDecoration: "none" }}>
                <Logo />
            </Link>

            <div className="nav-list">
                {layouts.map((layout, index) => (
                    <NavLink
                        key={index}
                        to={layout.to}
                        className='nav-item'
                        style={styleActive}
                    >
                        {({ isActive }) => {
                            const icon = isActive ? layout.active : layout.icon
                            return <>{icon}<span className="nav-text">{layout.title}</span></>
                        }}
                    </NavLink>
                ))}
            </div>

            <div className="more" onClick={handleLogOut}>
                <NavLink className='nav-item'>
                    <i className='bx bx-log-out nav-icon'></i>
                    <span className="nav-text">Đăng xuất</span>
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;