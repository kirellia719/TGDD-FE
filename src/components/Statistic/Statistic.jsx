
import Table from "../Table/Table";
import "./Statistic.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BE_URL } from "../../variable";
import { showPrice, showTime, toastError } from "../../common/common";
import { Link } from "react-router-dom";

const Statistic = ({ }) => {
    const [lines, setLines] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${BE_URL}/products/statistic?year=${year}`);
            for (let i = 0; i < data.length; i++){
                data[i].Ten = <Link to={`/product/${data[i].ID}`}>{data[i].Ten}</Link>
            }
            data && setLines(data);
        } catch (error) {
            toastError(error);
        }
    }
        fetchData();
    }, [])
    
    return (
        <div className="Statistic-Container">
            <h1>Thống kê</h1>
            <div className="Statistic-List">
            <Table
                header={{ Ten: "Tên sản phẩm", Trung_Binh_Diem: "Trung bình", So_Danh_Gia: "Số lượng" }}
                rows={lines}
            />
            </div>
        </div>
    );
}

export default Statistic;