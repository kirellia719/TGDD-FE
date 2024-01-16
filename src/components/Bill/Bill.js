import "./Bill.scss";

import DropdownInput from '../DropdownInput/DropdownInput';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { BE_URL } from "../../variable";
import { showPrice, toastError, toastInfo } from "../../common/common";
import VoucherCard from "../VoucherCard/VoucherCard";


const Bill = ({ total, onOrder }) => {
    const auth = useSelector(state => state.AuthReducer);
    const [branches, setBranches] = useState([]);

    const [chiNhanh, setChiNhanh] = useState(null);
    const [note, setNote] = useState("");

    const [voucher, setVoucher] = useState("");
    const [appliedVoucher, setAppliedVoucher] = useState(null);

    const submitBill = async () => {
        if (chiNhanh == null) {
            toastError({ message: "Vui lòng chọn nơi nhận hàng" });
            return;
        }
        try {
            const pack = { ID_Khach_Hang: auth.ID, ID_Chi_Nhanh: chiNhanh, Ghi_Chu: note, ID_Ma_Giam_Gia: appliedVoucher ? appliedVoucher.ID : null }
            const { data } = await axios.post(`${BE_URL}/order`, pack);
            onOrder && onOrder();
            toastInfo("Đặt hàng thành công");
            setVoucher("") || setAppliedVoucher(null);
        } catch (error) {
            toastError(error);
        };
    }

    const noteInput = (e) => {
        setNote(e.target.value);
    }

    const selectBranch = (option) => {
        setChiNhanh(option);
    }

    useEffect(() => {
        try {
            const fetchBranches = async () => {
                const { data } = await axios.get(`${BE_URL}/branch`);
                data && setBranches(data);
            }
            fetchBranches();
        } catch (error) {
            toastError(error);
        }
    }, [])

    const checkVoucher = async () => {
        try {
            const pack = {
                ID_Tai_Khoan: auth.ID,
                ID_The_Giam_Gia: voucher
            }
            const { data } = await axios.post(`${BE_URL}/cart/checkVoucher`, pack);
            toastInfo(data);
            getVoucher(voucher);
        } catch (error) {
            toastError(error);
        }
    }

    const getVoucher = async (id) => {
        try {
            const { data } = await axios.post(`${BE_URL}/cart/voucher/${id}`, { ID_Tai_Khoan: auth.ID });
            setAppliedVoucher(data);
        } catch (error) {
            toastError(error);
        }
    }

    return (
        <div className="Bill">
            <div className="title">Thông tin đặt hàng</div>
            <div className="Customer-Info">
                <div className="Info-Line">
                    <div className="Info">
                        <div className="Info-Title">Người đặt hàng: </div>
                        <div className="Info-Value">{auth.Ho} {auth.Ten}</div>
                    </div>
                    <div className="Info">
                        <div className="Info-Title">Số điện thoại: </div>
                        <div className="Info-Value">{auth.SDT}</div>
                    </div>
                </div>
                <div className="Info-Line">
                    <div className="Info">
                        <div className="Info-Title">Chi nhánh nhận hàng: </div>
                        <div className="Info-Value">
                            <DropdownInput options={branches} onSelect={selectBranch} />
                        </div>
                    </div>
                </div>
                <div className="Info-Line">
                    <div className="Info">
                        <div className="Info-Title">Ghi chú: </div>
                    </div>
                    <div className="Info">
                        <div className="Info-Value">
                            <textarea
                                rows={2}
                                onChange={noteInput}
                                value={note}
                                placeholder="Thêm ghi chú..."
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="Voucher-Info">
                    <div className="Voucher-Area">
                        <div className="Info-Title">Sử dụng thẻ giảm giá: </div>
                        <input
                            className="Voucher-Input"
                            placeholder="Nhập mã..."
                            type="number"
                            onChange={e => setVoucher(e.target.value)}
                            value={voucher}
                        />
                        <button className="Apply-Button" onClick={checkVoucher}>Kiểm tra</button>
                    </div>
                    <div className="Voucher-Area">
                        {appliedVoucher && <VoucherCard
                            {...appliedVoucher}
                        />}
                    </div>
                </div>
                <div className="Calculate">
                    <div className="Info-Title">Thành tiền: </div>

                    <div className="Total">{showPrice(total-(appliedVoucher ? appliedVoucher.So_Tien_Duoc_Giam : 0))} <small>VNĐ</small></div>
                </div>
            </div>
            <div className="Submit-Button" onClick={submitBill}>
                Đặt hàng
            </div>
        </div>
    );
};

export default Bill;