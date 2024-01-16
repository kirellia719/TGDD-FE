import { useEffect, useState } from "react";
import Table from "../Table/Table";
import "./OrderList.scss";
import axios from "axios";
import { BE_URL } from "../../variable";
import { showPrice, showTime, toastError } from "../../common/common";
import { useSelector } from "react-redux";



const StatusCard = ({ status, description }) => {
  return (
      <div className="center">
          <span className={`status-card ${status}`}>
            {description}
            </span>
        </div>
  );
};




const OrderList = () => {
    const auth = useSelector(state => state.AuthReducer);
    const [orders, setOrders] = useState([]);
    const [sum, setSum] = useState(0);

    const [year, setInputYear] = useState(new Date().getFullYear());
    const [status, setStatus] = useState('Tất cả');
    const [orderBy, setOrderBy] = useState(0);

    const handleStatusChange = async (e) => {
        setStatus(e.target.value);
    };

    const handleOrderByChange = async (e) => {
        setOrderBy(e.target.value);
    };

    const handleInputYearChange = (e) => {
        setInputYear(e.target.value);
    };

    const submitForm = e => {
        e.preventDefault();
        fetchData(year, status, orderBy);
    }


    const confirmPay = async (id) => {
        const check = window.confirm("Xác nhận đã nhận hàng?");
        if (check) {
            try {
                const { data } = await axios.put(`${BE_URL}/order/${id}`);
                data && fetchData();
            } catch (error) {
                toastError(error);
            }
        }
    }

    const Button = ({ID,  Trang_Thai }) => {
        if (Trang_Thai == "Đang chờ")
            return <div
                className="confirm-button"
                onClick={() => confirmPay(ID)}
            >
                <i className='bx bx-checkbox'></i>
            </div>;
        else
            return <></>
    }

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get(`${BE_URL}/order/${auth.ID}?${year ? `year=${year}&` : ``}${status ? `status=${status}&` : ``}${`order=${orderBy}`}`);
            for (let i = 0; i < data.length; i++) {
                data[i].Tong_Tien = <div className="right">{showPrice(data[i].Tong_Tien)}</div>;
                data[i].Ngay_Tao = showTime(data[i].Ngay_Tao);
                data[i].Tac_Vu = <Button {...data[i]} />
                data[i].Trang_Thai = data[i].Trang_Thai == 'Đang chờ' ? <StatusCard status='waiting' description='Đang chờ'/> : <StatusCard status='success' description='Đã nhận hàng'/>;
            }
            data && setOrders(data);

        } catch (error) {
            toastError(error);
        }
    }

    const fetchFee = async () => {
        try {
            const { data } = await axios.get(`${BE_URL}/order/sum/${auth.ID}?${year ? `year=${year}` : ``}`);
            if (data >= 0) setSum(data);

        } catch (error) {
            toastError(error);
        }
    }
    const fetchData = () => {
        fetchOrders();
        fetchFee();
    }

    useEffect(() => {
        fetchData();
    }, [year, status, orderBy])

    return (
        <div className="OrderList">
            <form className="Form-Filter" onSubmit={submitForm}>
                <div className="filter-container">
                    <div className="filter-label">
                        <label>Trạng thái</label>
                        <select value={status} onChange={handleStatusChange}>
                            <option value={'Tất cả'}>Tất cả</option>
                            <option value={'Đang chờ'}>Đang chờ</option>
                            <option value={'Thành công'}>Thành công</option>
                        </select>
                    </div>

                    <div className="filter-label">
                        <label>Sắp xếp</label>
                        <select value={orderBy} onChange={handleOrderByChange}>
                            <option value={0}>Mới nhất</option>
                            <option value={1}>Cũ nhất</option>
                        </select>
                    </div>

                    <div className="filter-label">
                        <label>Năm</label>
                        <input
                            type="number"
                            min={1970}
                            value={year}
                            onChange={handleInputYearChange}
                            placeholder="Nhập năm"
                        />
                    </div>
                    {/* <div className="submit filter-label">
                    <span></span>
                    <input className="Filter-Button" type="submit" value='Lọc'/>
                    </div> */}
                </div>
                <div className="Order-Infos">
                    <div>
                        {year ? `Tổng tiền đã thanh toán trong năm ${year}` : 'Tổng tất cả từ trước tới nay'}:
                    </div>
                    <b>{showPrice(sum)} VNĐ</b>
                </div>
            </form>
            <Table
                header={{ Ngay_Tao: "Ngày tạo", Noi_Nhan: "Chi nhánh", Tong_Tien: <div className="right">Tiền (VNĐ)</div>, Trang_Thai: <div className="center">Trạng thái</div>, Tac_Vu: <div className="center">Xác nhận</div> }}
                rows={orders}
            />
        </div>
    );
}

export default OrderList;