import Sidebar from "../../components/Sidebar/Sidebar";

import { Navigate, Route, Routes } from "react-router-dom";

import "./MainLayout.scss";
import { useSelector } from "react-redux";
import layouts from "..";

const MainLayout = () => {
    const user = useSelector(state => state.AuthReducer.ID);
    if (!user) return <Navigate to="/auth" />
    else
        return (
            <div className="MainLayout">
                <div className="Sidebar-Container">
                    <Sidebar />
                </div>

                <div className="Content-Container">
                    <Routes>
                        {layouts.map((layout, index) => <Route key={index} path={layout.path} element={layout.element} />)}
                    </Routes>
                </div>
            </div>
        );
}

export default MainLayout;