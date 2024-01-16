import React, { useState } from 'react';
import { showPrice, toastError, toastInfo } from '../../common/common';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BE_URL } from '../../variable';
import { useSelector } from 'react-redux';

import './ProductCard.scss';

const ProductCard = ({ ID, Ten, Hang_San_Xuat, Bien_The_San_Pham = [] }) => {
    const auth = useSelector(state => state.AuthReducer);
    const [stt, setStt] = useState(0);

    const addToCart = async () => {
        try {
            const body = { ...Bien_The_San_Pham[stt], ID_Tai_Khoan: auth.ID };
            const { data } = await axios.post(`${BE_URL}/cart/add`, body);
            toastInfo(`Đã thêm ${Ten} ${body.Thong_So_Rieng} vào giỏ hàng`);
        } catch (error) {
            toastError(error);
        };
    }
    
    return (
        <div className="product-card">
            <div className='product-image'>
                <Link to={`product/${ID}`} state={{ stt }}>
                    <img src={Bien_The_San_Pham[stt].Hinh_Anh} alt={`${Ten} ${Bien_The_San_Pham[stt].Thong_So_Rieng}`} />
                </Link>
            </div>
            <div className="product-details">
                <h3>{Ten}</h3>
                <p className="provide">{Hang_San_Xuat} &nbsp;</p>
                <div className='variants'>
                    {Bien_The_San_Pham.map((variant, index) => (
                        <div key={index} className={`variant ${index==stt ? 'active' :''}`} onClick={() => setStt(index)}>
                            {variant.Thong_So_Rieng}
                        </div>
                    ))}
                </div>
                <div className="price"><b>{`${showPrice(Bien_The_San_Pham[stt].Gia)}`}</b> <small>VNĐ</small></div>
                <div className="buy-button" onClick={addToCart}>Thêm vào giỏ</div>
            </div>
        </div>
    );
};

export default ProductCard;
