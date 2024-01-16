import { Route, Routes } from "react-router-dom";
import ProductList from "../ProductList/ProductList";
import ProductDetail from "../ProductDetail/ProductDetail";
import "./Dashboard.scss";

const Dashboard = () => {
    return (
        <div className="Dashboard">
            <div className="Content-Container">
                <Routes>
                    <Route path='/' element={<ProductList />} />
                    <Route path='/product/:id' element={<ProductDetail/>} />
                </Routes>
                
            </div>
        </div>
    );
}

export default Dashboard;